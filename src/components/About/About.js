import './About.css'
import photo from '../../images/image-03.png'

function About() {
    return (
        <div className="about">
            <div className="about__container">
                <img className='about__image' src={photo} alt='photo' />
                <div className='about__group'>
                    <h2 className='about__title'>About the author</h2>
                    <p className="about__text">
                        This block describes the project author. Here you should indicate your name, what you do, and which development technologies you know.
                    </p>
                    <p className="about__text">
                        You can also talk about your experience with Practicum, what you learned there, and how you can help potential customers.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default About