import './pagestyles/About.css'

export default function Home() {
    return(
        <div className='capsule'>

            <div className="intro">
                <div className='intro-info'>
                    <img src="/images/face.jpg" alt="me" />
                    <div className='about-me'>
                        <h1>who am i?</h1>
                        <span id='opener'>Hi I'm Marcus, an engineering and business student at Western University in Ontario, Canada (Class of 2029). As I continue to learn to code, I like to create projects that not only I can find use of but so can others, like my mom. Coding is something I do whenever I have free time, so I like to embed the things I'm passionate about into the coding that I do and I am always looking for opportunities to contribute my skills to inspiring solutions. If you would like to reach me, I am only a message or an email away! Until then... back to vscode :)</span>
                    </div>
                </div>
                <div className='socials'>
                    <div className='linkedin'>
                        <img id='linkedin' src='/images/linkedin.png' alt='linkedin icon' />
                        <a id='linkedin-link' href='https://www.linkedin.com/in/marcusfan888/' target='_blank' rel='noreferrer'>linkedin</a>
                        <img id='share' src='/images/share.png' alt='go to' />
                    </div>

                    <div className='mail'>
                        <img id='mail' src='/images/mail.png' alt='mail'/>
                        <a id='mail-link' href="mailto:mfan65@uwo.ca">mfan65@uwo.ca</a>
                        <img id='share' src='/images/share.png' alt='go to'/>
                    </div>

                </div>
            </div>

            <div className="project">
                <div className='usage'>
                    <h2 className='about-title'>about the project</h2>
                    <span id='exp'>For this project, I wanted to share my love for ramen with others by creating a database or guide that could include most of the ramen restaurants in vancouver to help users find the best place to eat for them. I incorporated multiple APIs–including Google Maps API–and my own opinions to provide information on ratings, accessibility, and other necessary details that would be vital to make choosing a restaurant as seemless as possible!</span>
                    <span className='small-note'>This was my first project, so if there is some jankiness that's probably why :)</span>
                </div>

                <div className='imp-sources'>
                    <h2 className='imp'>important notes and sources</h2>
                    <span style={{display: 'block', fontSize: '1.125rem'}}>
                        - This guide has about 60 restaurants on the North Shore and in Vancouver, Richmond, Burnaby, Surrey, and Langley<br />
                        - Accessibility is based on a number of factors such as ease of access of parking (paid or unpaid), location, findability(whether it is easy to find or hidden somewhere)<br />
                        - Ratings are currently only based on Google on a 5 tier system, more to be included soon <br />
                        - Each restaurant page has a map to help give the general location <br/>
                        - All icons are from www.flaticon.com <br />
                        - All images are not original <br />
                        - Some of the ratings are slightly altered based on my own personal findings <br />
                        - My favorite restaurants will have an opinion part (feel free to take it with a grain of salt)
                    </span>
                </div>

            </div>

        </div>
    )
}