const { Client } = require('@googlemaps/google-maps-services-js');
const fs = require('fs').promises;
require('dotenv').config();

const client = new Client({});

async function getPlacePhoto(placeId, apiKey) {
    try {
        const response = await client.placeDetails({
            params: {
                place_id: placeId,
                fields: ['photos'],
                key: apiKey
            }
        });

        if (response.data.result.photos && response.data.result.photos.length > 0) {
            const photoReference = response.data.result.photos[0].photo_reference;
            return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;
        }
        return null;
    } catch (error) {
        console.error(`Error fetching photo for place ${placeId}:`, error.message);
        return null;
    }
}

async function getPlaceDetails(placeId, apiKey) {
    try {
        const response = await client.placeDetails({
            params: {
                place_id: placeId,
                fields: ['formatted_phone_number', 'opening_hours', 'website'],
                key: apiKey
            }
        });
        return response.data.result;
    } catch (error) {
        console.error(`Error fetching details for place ${placeId}:`, error.message);
        return null;
    }
}

function formatToField(name) {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')  // Replace any non-alphanumeric chars with dash
        .replace(/^-+|-+$/g, '')      // Remove leading/trailing dashes
        .replace(/-+/g, '-');         // Replace multiple dashes with single dash
}

function getCityFromAddress(address) {
    // Extract city from address using regex
    const match = address.match(/, ([^,]+), BC/);
    if (match && match[1]) {
        return match[1].trim();
    }
    return 'Vancouver'; // Default to Vancouver if no city found
}

async function searchRamenRestaurants() {
    try {
        const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
        if (!apiKey) {
            throw new Error('Please set REACT_APP_GOOGLE_API_KEY in your .env file');
        }

        let allResults = [];
        let nextPageToken = null;
        const maxResults = 60; // Set this to control how many results you want

        do {
            const response = await client.textSearch({
                params: {
                    query: 'ramen restaurant vancouver',
                    location: '49.2827,-123.1207', // Vancouver coordinates
                    radius: 50000, // 50km radius
                    type: 'restaurant',
                    key: apiKey,
                    ...(nextPageToken && { pagetoken: nextPageToken })
                }
            });

            // Process restaurants and get photos
            const restaurants = await Promise.all(response.data.results.map(async place => {
                const [imageUrl, details] = await Promise.all([
                    getPlacePhoto(place.place_id, apiKey),
                    getPlaceDetails(place.place_id, apiKey)
                ]);

                // Create a URL-friendly ID from the name
                const id = formatToField(place.name);

                // Format hours array (default to 7 days of same hours if not available)
                const hours = details?.opening_hours?.weekday_text
                    ? details.opening_hours.weekday_text.map(day => day.split(': ')[1])
                    : Array(7).fill('11:00 - 22:00');

                // Get city from address
                const city = getCityFromAddress(place.formatted_address);

                const restaurant = {
                    id: place.place_id,
                    name: place.name.toLowerCase(),
                    imageUrl: imageUrl || '',
                    to: `/places/${place.place_id}`,
                    number: details?.formatted_phone_number || '',
                    address: place.formatted_address,
                    menulink: details?.website || '',
                    lat: place.geometry.location.lat.toString(),
                    lng: place.geometry.location.lng.toString(),
                    hours: hours,
                    wheelchair_accessible_entrance: details?.wheelchair_accessible_entrance || null,
                    description: `Located at ${place.formatted_address}, ${place.name} offers authentic Japanese ramen in a welcoming atmosphere.`,
                    location: ['All', city],
                    rating: ['Any', place.rating ? place.rating.toString() : '0'],
                    parking: ['All', 'Free'],
                    price: ['All', place.price_level ? place.price_level.toString() : 'N/A']
                };

                return restaurant;
            }));

            allResults = [...allResults, ...restaurants];
            nextPageToken = response.data.next_page_token;

            // If we have a next page token, we need to wait a short time before making the next request
            if (nextPageToken) {
                await new Promise(resolve => setTimeout(resolve, 2000));
            }

        } while (nextPageToken && allResults.length < maxResults);

        // Save to JSON file
        await fs.writeFile(
            'src/ramen-restaurants.json',
            JSON.stringify(allResults, null, 2)
        );

        console.log(`Found ${allResults.length} ramen restaurants in Vancouver`);
        console.log('Results have been saved to src/ramen-restaurants.json');

    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Run the search
searchRamenRestaurants();