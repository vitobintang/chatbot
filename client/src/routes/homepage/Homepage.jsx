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
        <h1>MEMI AI</h1>
        <h2>Empower your brilliance with every conversation.</h2>
        <h3>Our AI chat companion boosts your productivity by understanding images and engaging in voice conversations, providing a seamless and interactive experience to help you achieve your goals.</h3>
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
                'Arthur: Hi, how are you?',
                2000, () => {
                  setTypingStatus("Robot")
                },
                'Robot: Hello, I am good!',
                2000, () => {
                  setTypingStatus("Rose")
                },
                'Rose: How many people are in the world?',
                2000, () => {
                  setTypingStatus("Robot")
                },
                'Robot: There are 8 billion people in the world.',
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