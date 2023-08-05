import React from "react";
import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <>
      <section>
        <div className="home-container">
          <p className="para-1">
            You got the travel plans,we<br></br>
            got the travel vans.
          </p>
          <p className="para-2">
            Add adventure to your life by joining the #vanlife movement.
            <br></br>Rent the perfect van to make your perfect road trip.
          </p>
          <div className="find">
            
            <Link to='/van' className="find-btn">Find your van</Link>
          </div>
        </div>
        {/* <footer>
          <div>
            <p>
              
           <span style={{fontSize:'20px'}}>&copy; </span> 2022 #VANLIFE
            </p>
          </div>
        </footer> */}
      </section>
    </>
  );
};

export default Home;
