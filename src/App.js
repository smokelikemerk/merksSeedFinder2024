import React from "react";
import {useEffect} from "react";
import { useState } from "react";
  
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from "./MovieCard";
import StrainCard from "./StrainCard";
import DropDown from "./DropDown";


//Api key: 841d905d 

const API_KEY2 = "841d905d";
const API_KEY = "30eb9835d49baf6e460bcf940282125f";
const API_URL2 = "http://www.omdbapi.com/?apikey=" + API_KEY;
const API_URL = "https://en.seedfinder.eu/api/json/search.json" + "?ac=" + API_KEY;
const LOGO_URL = "https://en.seedfinder.eu/pics/00breeder/";
const BRID_URL = "https://en.seedfinder.eu/api/json/ids.json" + "?ac=" + API_KEY;
const ID_URL = "https://en.seedfinder.eu/api/json/strains.json" + "?ac=" + API_KEY;



const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [dropdowns, setDropdowns] = useState([]);
    const [open, setOpen] = React.useState(false);
      
    
    let [movie, setMovie] = useState("select a strain");
    
    let handleMovieChange = (e) => {
      console.log(movie)

      setMovie(e.target.value);
      <MovieCard movie={movie}/>
      console.log(movie)

    }
    
    


  
  
    
    const searchMovies = async(title) => {
        const response = await fetch (`${API_URL}&output=0&q=${title}`);
        const data = await response.json();
        console.log ("data   " , data)
        console.log ("data.strains   " , data.strains)
        let result = data.count;
        let strainsFound = data.strains;
        let strainsArray = [];
        let strainsSpecs = [];
        
    console.log("result: ", result)
    console.log("strainsFound", strainsFound)

        for(let strains in strainsFound) {
        
           console.log("strains--- >   " , strains)
           console.log(" strainsFound[strains]  -- >   " , strainsFound[strains])
        
           strainsSpecs.push(strainsFound[strains]);
           
           strainsArray.push(strains);
        }
        
           console.log("strainsArray:  ", strainsArray)
           console.log("strainsSpecs ==== " , strainsSpecs)
           
           
        
        
        
        
        
        setMovies(strainsSpecs);
        console.log("movies = " , movies);

    }

    useEffect(
        () => {searchMovies("Paris");},
        []
    )

 
    
    
    
const handleAddDropdown = () => {
  const newDropdown = {
    options: ['Option 1', 'Option 2', 'Option 3'],
    onChange: (e) => console.log(e.target.value),
  };

  setDropdowns([...dropdowns, newDropdown]);
};


    
    
    
    
    
    return(
        <div className="app">
            <h1>CANNABIS SEED FINDER 2024</h1>
            <h3>a REACTjs app by Merk!</h3>                
            <div className="search">
                <input 
                    placeholder="Search for Cannabis Strains"
                    value={searchTerm}
                    onChange={(e) => {setSearchTerm(e.target.value)}}
                />

                <img 
                    src={SearchIcon}
                    alt="search"
                    onClick={() => {searchMovies(searchTerm)}}
                />
            </div>

            
            {movie}
            <br />
            <select onChange={handleMovieChange}>
            <option value=" select a strain! "> --SELECT A STRAIN --- </option>
                  {movies.map((movie) => <option  key={movie.id}  value={movie.name}>{movie.name}</option>)}

            </select>
            
            
            
            
            <h4> FOUND {movies.length} STRAINS</h4>
            {
                movies?.length > 0 ? 
                    <div className="container">
                    {
                        movies.map((movie => (
                            <MovieCard movie={movie}/>
                        )))
                        
                    }
                    
                    </div>
                :
                <div className="empty">
                    <h2>No movies found</h2>
                </div>
            }
            
        </div>    
    );
}

export default App;
