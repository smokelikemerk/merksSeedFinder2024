import React, { useState, useEffect } from 'react';
import axios from 'axios';





let information;
const StrainCard = ({ strain, breeder }) => {
  const API_KEY = "30eb9835d49baf6e460bcf940282125f";
  const [strainData, setStrainData] = useState();
console.log("strain=== ", strain, "   and breeder==== ", breeder)   
  useEffect(() => {
    const STRAIN_URL = `https://de.seedfinder.eu/api/json/strain.json?ac=${API_KEY}&output=0&br=${breeder}&str=${strain}&parents=1&hybrids=1&medical=1&comments=10&pics=1&reviews=1&tasting=1`;

    axios.get(STRAIN_URL)
      .then((getResponse) => {
        console.log("GET Response", getResponse.data);
        // Assuming the response contains an object with keys corresponding to items.
         information= getResponse.data;
         console.log("_______------ >  ", Object.values(getResponse.data.brinfo))
        setStrainData = Object.values(getResponse.data.brinfo);
    
     //   }
      })
      .catch((error) => {
        console.error("Error fetching movie data", error);
      });
  }, []); 

  return (
      <div className="">
        {strainData}
    </div>
  );
};

export default StrainCard;
