import './pagestyles/Home.css';
import AnimatedText from '../components/AnimatedText';
import items from '../ramen-restaurants.json';

function getRandomRestaurants(arr, n) {
  const shuffled = arr.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

export default function Home() {
    const randomRestaurants = getRandomRestaurants(items, 4);
    return(
        <>

        <div className="container">
            <AnimatedText text={'noodly'} speed={115} className='logo' element='span'/>
            <AnimatedText text={`metro vancouver's only all inclusive noodle shop database`} speed={45} element='h3' />
        </div>

        <h1 className='rand-sug'>random suggestions</h1>

        <div className='grid'>
          {randomRestaurants.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => { window.location.href = item.to }}
              className='cell'
              id={`o${idx+1}`}
            >
              <img src={item.imageUrl} alt={item.name} />
              <h1 id='home-title'>{item.name}</h1>
            </button>
          ))}
        </div>
        </>
    );
}