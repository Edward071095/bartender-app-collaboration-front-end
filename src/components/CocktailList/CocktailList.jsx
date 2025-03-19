import { Link } from "react-router";
import { useState } from "react";
import * as cocktailService from "../../services/cocktailService"


const CocktailList = (props) => {
    const [cocktail, setCocktail] = useState(null);
    
    if (!props.cocktails || props.cocktails.length === 0) {
        return (
            <main>
                <p>No cocktails, add some!</p>
            </main>
        );
    }

  const addCocktail = async (cocktailFormData) => {
    const newCocktail = await cocktailService.createCocktail(cocktailId, cocktailFormData);
    setCocktail(newCocktail);
  };

  return (
    <main>
        <div>
            <button onClick={addCocktail}>Add Cocktail</button>
        </div>
      {props.cocktails.map((cocktail) => (
        <Link key={cocktail._id} to={`/cocktails/${cocktail._id}`}>
          <article>
            <header>
              <h2>{cocktail.name}</h2>
              <p>
                {`${cocktail.author?.username || 'Unknown'} created on 
                ${new Date(cocktail.createdAt).toLocaleDateString()}`}
              </p>
            </header>
            <p>{cocktail.tags}</p>
          </article>
        </Link>
      ))}      
    </main>
  );
};

export default CocktailList;