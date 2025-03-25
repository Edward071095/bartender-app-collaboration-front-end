import { Link, useNavigate } from "react-router";
import { useState } from "react";
import styles from "../../css-styling/CocktailList.module.css";
import ed from '../../assets/images/cocktail-placeholder.jpg';

import SearchBar from "../SearchBar/SearchBar";

const CocktailList = (props) => {
  const navigate = useNavigate();
  const [displayedCocktails, setDisplayedCocktails] = useState(props.cocktails);

  const handleSearchResults = (results) => {
    setDisplayedCocktails(results);
  };

  if (!props.cocktails || props.cocktails.length === 0) {
    return (
      <main className={styles.pageContainer}>
        <p className={styles.emptyMessage}>No cocktails, add some!</p>
      </main>
    );
  }

  return (
    <main className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Cocktails</h1>
      <SearchBar
        cocktails={props.cocktails}
        onSearchResults={handleSearchResults}
      />
      <div className={styles.shelfRow}>
        <div className={styles.cellarGrid}>
          {props.cocktails.map((cocktail) => (
            <Link
              key={cocktail._id}
              to={`/cocktails/${cocktail._id}`}
              className={styles.cocktailCard}
            >
              <div className={styles.cocktailImageContainer}>
                <img
                  src={cocktail.imageUrl || ed}
                  alt={cocktail.name}
                  className={styles.cocktailImage}
                />
              </div>
              <article>
                <div className={styles.cocktailHeader}>
                  <h2 className={styles.cocktailName}>{cocktail.name}</h2>
                  <p className={styles.cocktailMeta}>
                    {`${cocktail.author?.username || 'Unknown'} created on 
                    ${new Date(cocktail.createdAt).toLocaleDateString()}`}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
      <button className={styles.addButton} onClick={() => navigate('/cocktails/new')}>+</button>
    </main>
  );
}


export default CocktailList;