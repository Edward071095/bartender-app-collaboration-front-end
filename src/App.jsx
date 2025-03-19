import { useContext } from 'react';
import { Routes, Route } from 'react-router';

import * as cocktailService from './services/cocktailService';
import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import CocktailList from './components/CocktailList/CocktailList';
import CocktailDetails from './components/CocktailDetails/CocktailDetails';
import CocktailForm from './components/CocktailForm/CocktailForm';

import { UserContext } from './contexts/UserContext';

const App = () => {
  const { user } = useContext(UserContext);
  const [cocktails, setCocktails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllCocktails = async () => {
      const cocktailsData = await cocktailService.index();

      setCocktails(cocktailsData);
    };
    if (user) fetchAllCocktails();
  }, [user]);

  const handleAddCocktail = async (cocktailFormData) => {
    const newCocktail = await cocktailService.create(cocktailFormData);
    setCocktails([newCocktail, ...cocktails]);
    navigate('/cocktails');
  };

  const handleDeleteCocktail = async (cocktailId) => {
    const deletedCocktail = await cocktailService.deleteCocktail(cocktailId);
    setCocktails(cocktails.filter((cocktail) => cocktail.id !== deletedCocktail._id));
    navigate('/cocktails');
  };

  const handleUpdateCocktail = async (cocktailId, cocktailFormData) => {
    const updatedCocktail = await cocktailService.update(cocktailId, cocktailFormData);
    setCocktails(cocktails.map((cocktail) => (cocktailId === cocktail._id ? updatedCocktail : cocktail )));
    navigate(`/cocktails/${cocktailId}`);
  };
  
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        {user ? (
        <>
          <Route path='/cocktails' element={<CocktailList cocktails={cocktails} />} />

          <Route path='/cocktails/new' element={<CocktailForm handleAddCocktail={handleAddCocktail} />} />

          <Route 
          path='/cocktails/:cocktailId/edit'
          element={<CocktailForm handleUpdateCocktail={handleUpdateCocktail}/>}
          />

          <Route
          path='/cocktails/:cocktailId'
          element={<CocktailDetails handleDeleteCocktail={handleDeleteCocktail}/>}
          />
        </>
        ) : (
        <>
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />
        </>
        )}
      </Routes>
    </>
  );
};

export default App;
