import { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router";
import * as cocktailService from '../../services/cocktailService';


import styles from '../../css-styling/SearchBar.module.css'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/cocktails`;


const sampleData = [
  {
    id: 1,
    title: 'React Official Documentation',
  }
]

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  // const fetchData = () => {
  //   fetch(BASE_URL, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Authorization": `Bearer ${localStorage.getItem('token')}`
  //     }
  //   })
  //   .then((response) => response.json())
  //   .then((json) => {
  //     const matches = json.filter(() => {
  //       return ;
  //     })
  //   })
  //   .catch(error => console.error('Error fetching data:', error))
  // }

  const debounce = (func, delay) => {
    let timeoutId
    return (...args) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => func(...args), delay)
    };
  };

  const handleSearch = useCallback(
    debounce((term) => {
      if (term.trim() === '') {
        setResults([])
      } else {
        const matches = sampleData.filter((item) =>
          item.title.toLowerCase().includes(term.toLowerCase()),
        )
        setResults(matches)
      }
    }, 300),
    [],
  );

  // useEffect(() => {
  //   handleSearch(search)
  // }, [search])

  // useEffect(() => {
  //   const fetchAllCocktails = async () => {
  //     const cocktailsData = await cocktailService.searchCocktail('Lil Jon');

  //     setResults(cocktailsData);
  //   };
  //   // if (user) fetchAllCocktails();
  //   fetchAllCocktails();
  // }, []);

  const handleInput = (e) => {
    setSearch(e.target.value)
    // fetchData(e.target.value)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cocktailsData = await cocktailService.searchCocktail(search);

    setResults(cocktailsData);
    console.log(results)
  }




  return (
    <div className={styles.backgroundColor}>
      <div>
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
      </div>
    </div>

  )

}



export default SearchBar;