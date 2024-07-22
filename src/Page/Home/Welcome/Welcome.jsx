import React from 'react'
import './Welcome.css'

const Welcome = () => {
  return (
    <div className='welcome-container'>
        <div className='logo-welcome'>
             <img src="https://wpbingosite.com/wordpress/bootin/wp-content/uploads/2019/04/banner3-1.jpg" alt="" />
        </div>

        <div className='conten-welcome'>
            <h1 className='h1-conten-welcome'>Welcome to Bookmart</h1>
            <h2 className='h2-conten-welcome'>A MONTHLY BOOK REVIEW PUBLICATION</h2>
            <p className='p-conten-welcome'>There is no friend as silent and loyal as a book. 
              <br/>
              There is no wiser advisor than books. Books are the most patient teachers in our lives.</p>
        </div>

        <div className='img-welcome'>
            <img src="https://wpbingosite.com/wordpress/bootin/wp-content/uploads/2019/04/banner3-2.jpg" alt="" />
        </div>
    </div>
  )
}

export default Welcome