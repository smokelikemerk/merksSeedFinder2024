import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StrainCard from "./StrainCard"

const MovieCard = ({ movie }) => {
  const API_KEY = "30eb9835d49baf6e460bcf940282125f";
  const [logoImage, setLogoImage] = useState("");
  const [strainInfo, setStrainInfo] = useState("");
  const [breederLink, setBreederLink] = useState("");
  const [breederName, setBreederName] = useState("");
  const [strainFlower, setStrainFlower] = useState("");
  const [strainPic, setStrainPic] = useState("");


  useEffect(() => {
    const BRID_URL = `https://en.seedfinder.eu/api/json/ids.json?ac=${API_KEY}&br=${movie.brid}`;

    axios.get(BRID_URL)
      .then((getResponse) => {
        console.log("GET Response", getResponse.data);
        // Assuming the response contains an object with keys corresponding to items.
        for (let items in getResponse.data) {
          console.log("logo___", getResponse.data[items]["logo"]);
          const imageUrl = `https://en.seedfinder.eu/pics/00breeder/${getResponse.data[items]["logo"]}`;
          console.log("logoImage == ", imageUrl);
          setLogoImage(imageUrl); // Update the state with the new image URL.
        }
      })
      .catch((error) => {
        console.error("Error fetching movie data", error);
      });
  }, [movie.brid]); // Only re-run if movie.brid changes.

   
 function GetStrainInfo (movie){

 console.log("inside of GetStrainInfo with ", movie.name)
   
    const STRAIN_URL = `https://en.seedfinder.eu/api/json/strain.json?ac=${API_KEY}&br=${movie.brid}&str=${movie.id}`;

    axios.get(STRAIN_URL)
      .then((getResponse) => {
        console.log("GET Response", getResponse.data);
          console.log("company link == ", getResponse.data.brinfo.link ) ;
          setBreederLink(getResponse.data.brinfo.link);
          console.log("company link == ", getResponse.data.brinfo.flowering.info ) ;
          setStrainFlower(getResponse.data.brinfo.flowering.info);
  console.log("company name --------- ", getResponse.data.brinfo.name )
  
          setStrainPic(getResponse.data.brinfo.pic);
          setBreederName(getResponse.data.brinfo.name);
          console.log("strain description == ", getResponse.data.brinfo.descr ) ;
         // setLogoImage(imageUrl); // Update the state with the new image URL.
        setStrainInfo(getResponse.data.brinfo.descr ); 
        
      })
      .catch((error) => {
        console.error("Error fetching strain data", error);
      });
      
      
  
   
 }   
  
  
  return (
    <div className="movie">
      <div>
        <p>{movie.Year}</p>
      </div>
      
      <p>{strainFlower}</p>
       <img src={strainPic} />
      <div>
        <img src={logoImage} alt={movie.name}    onClick={() => { GetStrainInfo(movie) }}/>
      </div>
      <div>
         <StrainCard 
        strain={movie.id}
        breeder={movie.brid}
        />
   
        <span>{movie.brname}</span>
        <h3>
      <a href={breederLink}><button> {breederName} </button></a>
      {movie.name}</h3>
      </div>
    </div>
  );
};

export default MovieCard;
