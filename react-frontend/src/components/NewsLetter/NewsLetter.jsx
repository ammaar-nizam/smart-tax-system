import React from 'react'
import './NewsLetter.css'
const NewsLetter = () => {
  return (
    <div id="news-letter" className="nl-wrapper">
      <div className="paddings innerWidth nl-container">
        <div className="flexColCenter inner-container">
          <span className="primaryText">Stay Informed: Subscribe to Our Newsletter</span>
          <span className="secondaryText">
          Sign up for our newsletter to receive the latest updates, exclusive content, and insider insights.
            <br />
            Stay in the know with news, trends, and exciting announcements delivered straight to your inbox.
          </span>
          <button className="button">
            <a href="mailto:ammaarnizam31@gmail.com">Subscribe Now</a>
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewsLetter
