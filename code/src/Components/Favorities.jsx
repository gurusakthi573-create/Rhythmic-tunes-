import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';
import { FaHeart, FaMugHot, FaMusic, FaPause, FaPauseCircle, FaPlay, FaPlayCircle } from 'react-icons/fa';

function Favorities() {
  const [playlist, setPlaylist] = useState([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

  useEffect(() => {

      axios
        .get(`http://localhost:3000/favorities`)
        .then((response) => {
          const playlistData = response.data;
          setPlaylist(playlistData);
        })
        .catch((error) => {
          console.error('Error fetching playlist items: ', error);
        });
    

    const handleAudioPlay = (itemId, audioElement) => {
      if (currentlyPlaying && currentlyPlaying !== audioElement) {
        currentlyPlaying.pause(); // Pause the currently playing audio
      }
      setCurrentlyPlaying(audioElement); // Update the currently playing audio
    };

    // Event listener to handle audio play
    const handlePlay = (itemId, audioElement) => {
      audioElement.addEventListener('play', () => {
        handleAudioPlay(itemId, audioElement);
      });
    };

    // Add event listeners for each audio element
    playlist.forEach((item) => {
      const audioElement = document.getElementById(`audio-${item.id}`);
      if (audioElement) {
        handlePlay(item.id, audioElement);
      }
    });

    // Cleanup event listeners
    return () => {
      playlist.forEach((item) => {
        const audioElement = document.getElementById(`audio-${item.id}`);
        if (audioElement) {
          audioElement.removeEventListener('play', () => handleAudioPlay(item.id, audioElement));
        }
      });
    };
  }, [playlist, currentlyPlaying]);

 

  const removeFromFavorites = async (itemId) => {
    try {
      // Find the item in the wishlist by itemId
      const selectedItem = playlist.find((item) => item.itemId === itemId);
      if (!selectedItem) {
        throw new Error('Selected item not found in wishlist');
      }
      // Make a DELETE request to remove the item from the wishlist
      await axios.delete(`http://localhost:3000/favorities/${selectedItem.id}`);
      // Refresh the wishlist items
      const response = await axios.get('http://localhost:3000/favorities');
      setPlaylist(response.data);
    } catch (error) {
      console.error('Error removing item from wishlist: ', error);
    }
  };
  

  
  
  return (
    <div >
      <div style={{marginLeft:"240px",color:"silver",display:"block",marginRight:"50px"}}>
     <div className="container mx-auto p-8">
      <center>
        <h3 className="favorities" >FAVORITIES❤️</h3>
        </center>
       <center>
        <Table  responsive style={{width:"1150px",margin:"20px",marginRight:"0px"}} >

            <thead>
              <tr>
                <th>S.No</th>
                <th>Title</th>
                <th>Genre</th>
                <th></th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {playlist.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div style={{ display: 'flex' }}>
                      <img
                        src={item.imgUrl}
                        alt="Item Image"
                        className="rounded"
                        style={{ height: '50px', width: '50px' }}
                      />
                      <div style={{ paddingLeft: '20px' }}>
                        <strong> {item.title}</strong>
                        <p><td>{item.singer}</td></p>
                      </div>
                    </div>
                  </td>
                  <td>{item.genre}</td>
                  <td>
                    <Button
                      style={{ backgroundColor: '#16deceff', border: 'none',paddingBottom:"10px",marginTop:"0" ,paddingLeft:'20px',paddingRight:"20px",justifyContent:"center",display:"inline"}}
                      onClick={() => removeFromFavorites(item.itemId)}
                    >
                      <h6 style={{color:"red",marginTop:"15px",display:"flex-inline",paddingBottom:"-5px",width:"15px"}}><FaHeart/></h6> 
                    </Button>
                  </td>
                  <td>
                  <audio controls id={`audio-${item.id}`} style={{ width: '500px' }}>
                  <source src={item.songUrl} />
                </audio>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </center>
      </div>
     </div>
    
    </div>
  );
}

export default Favorities;
