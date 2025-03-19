import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import * as cocktailService from '../../services/cocktailService';


const CocktailForm = (props) => {
   const { cocktailId } = useParams();
   console.log(cocktailId);

   const initalState = {
    name: '',
    description: '',
    ingredients: [{ name: '', quantity: '', unit: '' }],
    instructions: '',
    glassType: 'Rocks Glass',
    imageUrl: '',
    tags: []
   };

   const [formData, setFormData] = useState(initalState);

   useEffect(() => {
    const fetchCocktail = async () => {
        const cocktailData = await cocktailService.show(cocktailId);
        setFormData(cocktailData);
    };
    if (cocktailId) fetchCocktail();
    return () => setFormData(initalState);
   },[cocktailId]);

   const handleChange = (evt) => {
    setFormData({...formData, [evt.target.name]: evt.target.value});
   };

   const handleIngredientChange = (idx, evt) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[idx][evt.target.name] = evt.target.value;
    setFormData({ ...formData, ingredients: updatedIngredients });
   };

   const addIngredient = () => {
    setFormData({
        ...formData,
        ingredients: [...formData.ingredients, { name: '', quantity: '', unit: '' }]
      });
   };

   const removeIngredient = (idx) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients.splice(idx, 1);
    setFormData({ ...formData, ingredients: updatedIngredients });
   };

//    const handleTagChange = (evt) => {

//    };

   const handleSubmit = (evt) => {
    evt.preventDefault();
    if (cocktailId) {
      props.handleUpdateCocktail(cocktailId, formData);
    } else {
      props.handleAddCocktail(formData);
    }
   };

   return (
    <main>
        <h1>{cocktailId ? 'Edit Cocktail' : 'New Cocktail'}</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name-input">Name</label>
            <input 
                required
                type='text'
                name='name'
                id='name-input'
                value={formData.name}
                onChange={handleChange}
                maxLength={100}
            />
            
            <label htmlFor="description-input">Description</label>
            <textarea 
                name='description'
                id='description-input'
                value={formData.description}
                onChange={handleChange}
                maxLength={500}
            />

            <h3>Ingredients</h3>
            {formData.ingredients.map((ingredient,idx) => (
                <div key={idx} className="ingredient-row">
                <label htmlFor={`ingredient-name-${idx}`}>Name</label>
                <input
                  required
                  type='text'
                  name='name'
                  id={`ingredient-name-${idx}`}
                  value={ingredient.name}
                  onChange={(evt) => handleIngredientChange(idx, evt)}
                />
                
                <label htmlFor={`ingredient-quantity-${idx}`}>Quantity</label>
                <input
                  required
                  type='text'
                  name='quantity'
                  id={`ingredient-quantity-${idx}`}
                  value={ingredient.quantity}
                  onChange={(evt) => handleIngredientChange(idx, evt)}
                />
                
                <label htmlFor={`ingredient-unit-${idx}`}>Unit</label>
                <input
                  type='text'
                  name='unit'
                  id={`ingredient-unit-${idx}`}
                  value={ingredient.unit}
                  onChange={(evt) => handleIngredientChange(idx, evt)}
                />
                
                {idx > 0 && (
                  <button type="button" onClick={() => removeIngredient(idx)}>Remove</button>
                )}
              </div>
            ))}

            <button type="button" onClick={addIngredient}>Add Ingredient</button>
    
            <label htmlFor='instructions-input'>Instructions</label>
            <textarea
              required
              name='instructions'
              id='instructions-input'
              value={formData.instructions}
              onChange={handleChange}
            />
    
            <label htmlFor='glassType-input'>Glass Type</label>
            <input
              type='text'
              name='glassType'
              id='glassType-input'
              value={formData.glassType}
              onChange={handleChange}
            />
    
            <label htmlFor='imageUrl-input'>Image URL</label>
            <input
              type='text'
              name='imageUrl'
              id='imageUrl-input'
              value={formData.imageUrl}
              onChange={handleChange}
            />
    
            {/* <label htmlFor='tags-input'>Tags</label>
            <input
            /> */}
            <button type='submit'>SUBMIT</button>
      </form>
    </main>
  );
};

export default CocktailForm;