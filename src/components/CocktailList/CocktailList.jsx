import { Link } from "react-router";


const CocktailList = (props) => {
  return (
    <main>
      {props.cocktails.map((cocktail) => (
        <Link key={cocktail._id} to={`/cocktails/${cocktail._id}`}>
          <article>
            <header>
              <h2>{cocktail.name}</h2>
              <p>
                {`${cocktail.author.username} created on 
                ${new Date(cocktail.createdAt).
                toLocaleDateString()}`}
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