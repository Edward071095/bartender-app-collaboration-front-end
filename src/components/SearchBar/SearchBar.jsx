import { useState } from "react";
import { Link } from "react-router";
import * as cocktailService from '../../services/cocktailService';

import styles from '../../css-styling/SearchBar.module.css';
import ed from '../../assets/images/cocktail-placeholder.jpg';


const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/cocktails`;


const SearchBar = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);


  const handleInput = (e) => {
    setSearch(e.target.value)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cocktailsData = await cocktailService.index();
    const matches = cocktailsData.filter((cocktailData) => {

      if (cocktailData.name.toLowerCase().includes(search)) {
        return true;
      }

      if (cocktailData.ingredients.some(ingredient =>
        ingredient.name.toLowerCase().includes(search)
      )) {
        return true;
      }

      if (cocktailData.tags.some(tag =>
        tag.toLowerCase().includes(search)
      )) {
        return true;
      }

      return false;
    });
    setResults(matches);
  }


  return (
    <div className={styles.pageContainer}>
      <form className={styles.searchBarContainer} onSubmit={handleSubmit}>
        <input
          type="text"
          value={search}
          onChange={handleInput}
          className={styles.input}
          placeholder="Search for a drink!"
        />
        <button className={styles.searchButton}>Search</button>
      </form>


      {results.length > 0 && (
        <div className={styles.shelfRow}>
          <div className={styles.cellarGrid}>
            {results.map((cocktail) => (
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
                    <div className={styles.cocktailCard}>
                      <h3 className={styles.cocktailName}>{cocktail.name}</h3>
                      <p className={styles.cocktailMeta}>
                        {`${cocktail.author?.username || 'Unknown'} created on 
                  ${new Date(cocktail.createdAt).toLocaleDateString()}`}
                      </p>
                    </div>
                  </div>
                </article>

              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}



export default SearchBar;