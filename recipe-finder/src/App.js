import './App.css';
import {useEffect, useState , useRef} from "react";
function App() {

  const [ingredientList, updateIngredientList]= useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef  = useRef(null);
  const API_KEY = "enter api key here";
  const APP_ID  = "enter app id here";

  const search = ()=>{
    //console.log(inputRef);
   SearchForRecipe(inputRef.current.value);
   inputRef.current.value = "";
  };
 


  const SearchForRecipe = query => {

    setLoading(true)
    let url = `search?q=${query}&app_id=${APP_ID}&app_key=${API_KEY}`;
    fetch(url, {mode:"no-cors"}).then(response => {
      return response.json();
    })
    .then(res=>{
      console.log(res.hits);
     updateIngredientList(res.hits);
     setLoading(false);
    })
    .catch(err =>{
      console.log("error",err)
      setLoading(false);
    });
  }


 useEffect(()=>{
   SearchForRecipe(' ')
  },[]);


  return (
    <div className="App">
      <header className="App-header">
      <div className="InputWrapper">
     <input ref={inputRef} placeholder="Search for recipe"/>
     <button onClick={search}>Search</button>
      </div>
      {loading && <p> Loading...</p>}

         <div className= "wrapper">
         {ingredientList.map(({recipe})=>{
           const {label, image, ingredientLines} = recipe;
            return(
              <div key ={label}className="Ingredient">
                 <span>{label}</span>
                 <img src={image} alt="imag" />
                
                

              </div>
            )
         })}

         </div> 
      </header>
    </div>
  );
}

export default App;
