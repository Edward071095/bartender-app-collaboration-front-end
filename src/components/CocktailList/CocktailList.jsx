import { Link, useNavigate } from "react-router";
import { useState } from "react";
import * as cocktailService from "../../services/cocktailService"
import styles from "../../css-styling/CocktailList.module.css";




const CocktailList = (props) => {
    const [cocktail, setCocktail] = useState(null);
    const navigate = useNavigate();
    
    if (!props.cocktails || props.cocktails.length === 0) {
        return (
          <main className={styles.pageContainer}>
            <p className={styles.emptyMessage}>No cocktails, add some!</p>
          </main>
        );
    }


//   const chunkArray = (array, size) => {
//     return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
//       array.slice(i * size, i * size + size)
//     );
//   };


//   const cocktailRows = chunkArray(props.cocktails, 3); 


  const addCocktail = async (cocktailFormData) => {
    const newCocktail = await cocktailService.createCocktail(cocktailId, cocktailFormData);
    setCocktail(newCocktail);
  };


  return (
    <main className={styles.pageContainer}>
    <h1 className={styles.pageTitle}>Cocktails</h1>
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
                    src={cocktail.imageUrl || 'src/assets/images/cocktail-placeholder.jpg'} 
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
  
                {/* {cocktail.tags && (
                  <div className={styles.cocktailTags}>
                    {cocktail.tags.split(',').map((tag, index) => (
                      <span key={index} className={styles.cocktailTag}>
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )} */}
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