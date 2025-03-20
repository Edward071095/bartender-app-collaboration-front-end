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
   const [tagText, setTagText] = useState('')

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

   const handleTagChange = (evt) => {
        setTagText(evt.target.value);
   };

   const addTag = () => {
    const trimTag = tagText.trim();

    if (trimTag !== '' && !formData.tags.includes(trimTag)) {
        const updatedTags = [...formData.tags, trimTag];

        setFormData({...formData, tags: updatedTags});
        setTagText('');
    }
   };

   const removeTag = (removedTag) => {
    const updatedTags = formData.tags.filter(tag => tag !== removedTag);
    setFormData({...formData, tags: updatedTags})
   }

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
    
    <div className="tags-section">
              <label htmlFor='tags-input'>Tags</label>
              <div className="tag-input-container">
                <input
                  type='text'
                  id='tags-input'
                  value={tagText}
                  onChange={handleTagChange}
                  placeholder="Add a tag and press Enter"
                />
                <button type="button" onClick={addTag}>Add Tag</button>
              </div>
              
              <div className="tags-list">
                {formData.tags.map((tag, idx) => (
                  <div key={idx} className="tag-item">
                    <span>{tag}</span>
                    <button type="button" onClick={() => removeTag(tag)}>×</button>
                  </div>
                ))}
              </div>
            </div>

            <button type='submit'>SUBMIT</button>
      </form>
    </main>
  );
};

export default CocktailForm;