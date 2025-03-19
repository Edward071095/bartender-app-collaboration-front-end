import { Link } from "react-router";


const CocktailList = (props) => {
    if (!props.cocktails || props.cocktails.length === 0) {
        return (
            <main>
                <p>No cocktails, add some!</p>
            </main>
        );
    }


  return (
    <main>
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