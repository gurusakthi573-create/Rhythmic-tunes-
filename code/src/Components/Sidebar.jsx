import React from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router
import { FaHome, FaHeart, FaSearch, FaMusic, FaLine, FaPlayCircle, FaList, FaSignOutAlt, FaSignInAlt, FaSign } from 'react-icons/fa';
import './sidebar.css'

const Sidebar = () => {
           
  return (
    <nav className="sidebar">
      <ul className="list-unstyled">
        <strong style={{display:"flex",justifyContent:"center",fontSize:"30px",color:"#a9a9a9",fontFamily:"cursive"}}><h3>NK Musics..</h3></strong>
       <div style={{marginTop:"35px"}}>
        
       <li>
          <Link to="/songs">
          <p style={{paddingLeft:"10px",color:"#000000"}}> <FaHome /> </p> <p style={{paddingLeft:"10px",color:"#000000"}}>Home</p>
          </Link>
        </li>
        </div>
        
       <div>
       <h4 style={{display:"flex",justifyContent:"center",color:"#ece4e4ff"}}>🗂️ Your Library</h4>
        <li>
          <Link to="/favorities">
          <p style={{paddingLeft:"10px",color:"#000000",marginTop:"15px"}}> <FaHeart /> </p> <p style={{paddingLeft:"10px",color:"#000000",marginTop:"15px"}}>Favorites</p>
          </Link>
        </li>
        <li>
          <Link to="/playlist">
           <p style={{paddingLeft:"10px",color:"#000000"}}> <FaList /> </p> <p style={{paddingLeft:"10px",color:"#000000"}}>PlayList</p>
          </Link>
        </li>
        <div class="vl"></div>
        
        </div>
       
      </ul>
      {/* <div class="vl"></div> */}
    </nav>
  );
};

export default Sidebar;
