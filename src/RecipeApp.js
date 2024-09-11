import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import Nav from "./Recipe_component/Nav";
import Banner from "./Recipe_component/Banner";
import List from "./Recipe_component/List";
import Footer from "./Recipe_component/Footer";
import Copy from "./Recipe_component/Copy";
const RecipeApp = () => {

    const [loading, setLoading] = useState(true);
    const [error, setErr] = useState(false);
    const [frecipe, setFRecipe] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const[keyword, setKeyWord] = useState('');

   useEffect(()=>{
     makeApiCall()
    
    }, [])
   
    const handleFilter = () => {
        const filtered_recipes = recipes.filter((recipe) => {
            return recipe.name.toLowerCase().includes(keyword.toLowerCase())
        })
        setFRecipe(filtered_recipes)
    }
    //make the call and get the data for us
    function makeApiCall(){
       axios.get("https://dummyjson.com/recipes")
       .then(function(resp){
        console.log(resp.data.recipes)
        setLoading(false)
        setRecipes(resp.data.recipes)
       })
       .catch(function(err){
        console.log(err)
        setLoading(false)
        setErr(true)

       })
    }

    return(
        <div className="container-fluid">
           <Nav />
           <Banner handleFilter={handleFilter} keyword={keyword} setKeyWord={setKeyWord}/>
           <List loading={loading} error={error} recipes={recipes} frecipe={frecipe} keyword={keyword} />
           <Footer />
           <Copy />
        </div>
    )
}
export default RecipeApp;