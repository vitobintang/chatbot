import { Link } from 'react-router-dom'
import './homepage.css'
import { TypeAnimation } from 'react-type-animation'
import { useState } from 'react'

const Homepage = () => {

  const [typingStatus, setTypingStatus] = useState("Arthur")
  
  return (
    <div className='homepage'>
      <img src="/orbital.png" alt="" className="orbital"/>
      <div className="left">
        <h1>LAMA AI</h1>
        <h2>Supercharge your creativity and productivity</h2>
        <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus quae vel reprehenderit, corporis dolor.</h3>
        <Link to="/dashboard">Get Started</Link>
      </div>
      <div className="right">
        <div className="imgContainer">
          <div className="bgContainer">
            <div className="bg"></div>
          </div>
          <img src="/bot.png" alt="" className='bot' />
          <div className="chat">
            <img src={typingStatus === "Arthur" ? "/human1.jpeg " : typingStatus === "Rose" ? "/human2.jpeg" : "/bot.png"} alt="" />
            <TypeAnimation
              sequence={[
                'Arthur: lorem',
                2000, () => {
                  setTypingStatus("Robot")
                },
                'Robot: We produce food for Hamsters',
                2000, () => {
                  setTypingStatus("Rose")
                },
                'Rose: We produce food for Guinea Pigs',
                2000, () => {
                  setTypingStatus("Robot")
                },
                'Robot: We produce food for Chinchillas',
                2000, () => {
                  setTypingStatus("Arthur")
                },
              ]}
              wrapper="span"
              repeat={Infinity}
              cursor={true}
              omitDeletionAnimation={true}
            />
          </div>
        </div>
      </div>
      <div className="terms">
        <img src="/logo.png" alt="" />
        <div className="links">
          <Link to="/">Term of Service</Link>
          <span>|</span>
          <Link to="/">Privacy Policy</Link>
        </div>
      </div>
    </div>
  )
}

export default Homepage