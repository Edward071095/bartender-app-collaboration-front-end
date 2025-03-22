import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import * as cocktailService from '../../services/cocktailService';

import styles from '../../css-styling/CocktailForm.module.css'


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
    <div className={styles.scrollableWrapper}>
      <div className={styles.formContainer}>
        <h1 className={styles.formTitle}>
          {cocktailId ? 'Edit Cocktail' : 'New Cocktail'}
        </h1>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label 
              className={styles.label} htmlFor="name-input">
                Name
            </label>
            <input
                className={styles.input} 
                required
                type='text'
                name='name'
                id='name-input'
                value={formData.name}
                onChange={handleChange}
                maxLength={100}
            />
          </div>
            
          <div className={styles.formGroup}>
            <label 
              className={styles.label} htmlFor="description-input">
                Description
            </label>
            <textarea
              className={styles.textarea}
              name='description'
              id='description-input'
              value={formData.description}
              onChange={handleChange}
              maxLength={500}
            />
          </div>

          <div className={styles.ingredientsContainer}>
          <h3 className={styles.label}>Ingredients</h3>
            <div className={styles.ingredientsContainer}>
              {formData.ingredients.map((ingredient,idx) => (
                <div key={idx} className={styles.ingredientRow}>
                        <div className={styles.nameRow}>

                <label className={styles.label} htmlFor={`ingredient-name-${idx}`}>Name</label>
                  <textarea
                    className={styles.textarea}
                    required
                    type='text'
                    name='name'
                    id={`ingredient-name-${idx}`}
                    value={ingredient.name}
                    onChange={(evt) => handleIngredientChange(idx, evt)}
                  />
                </div>
                
                <div className={styles.measurementRow}>
                <div className={styles.measurementField}>
                <label className={styles.label} htmlFor={`ingredient-quantity-${idx}`}>Quantity</label>
                  <input
                    className={styles.input}
                    required
                    type='text'
                    name='quantity'
                    id={`ingredient-quantity-${idx}`}
                    value={ingredient.quantity}
                    onChange={(evt) => handleIngredientChange(idx, evt)}
                  />
                </div>
                
                <div className={styles.measurementField}>
                <label className={styles.label} htmlFor={`ingredient-unit-${idx}`}>Unit</label>
                  <input
                    className={styles.input}
                    type='text'
                    name='unit'
                    id={`ingredient-unit-${idx}`}
                    value={ingredient.unit}
                    onChange={(evt) => handleIngredientChange(idx, evt)}
                  />
                
                {idx > 0 && (
                  <button 
                    type="button" 
                    className={styles.submitButton}
                    onClick={() => removeIngredient(idx)}>
                      x
                  </button>
                )}
                </div>
              </div>
            </div>
            ))}

                  <button 
                    type="button" 
                    className={styles.addButton}
                    onClick={addIngredient}>
                      Add Ingredient
                  </button>
                  </div>
                  </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor='instructions-input'>Instructions</label>
            <textarea
              className={styles.textarea}
              required
              name='instructions'
              id='instructions-input'
              value={formData.instructions}
              onChange={handleChange}
            />
          </div>

            <div className={styles.formGroup}>  
              <label className={styles.label} htmlFor='glassType-input'>Glass Type</label>
              <input
                className={styles.input}
                type='text'
                name='glassType'
                id='glassType-input'
                value={formData.glassType}
                onChange={handleChange}
              />
            </div>
    
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor='imageUrl-input'>Image URL</label>
              <input
                className={styles.input}
                type='text'
                name='imageUrl'
                id='imageUrl-input'
                value={formData.imageUrl}
                onChange={handleChange}
              />
            </div>
    
            <div className={styles.formGroup}>
            <label className={styles.label} htmlFor='tags-input'>Tags</label>
                <input
                  className={styles.input}
                  type='text'
                  id='tags-input'
                  value={tagText}
                  onChange={handleTagChange}
                  placeholder="Add a tag and press Enter"
                />
                <button type="button" className={styles.addButton} onClick={addTag}>Add Tag</button>
            </div>
              
              <div className="tags-list">
                {formData.tags.map((tag, idx) => (
                  <div key={idx} className="tag-item">
                    <span>{tag}</span>
                    <button className={styles.tagButton} type="button" onClick={() => removeTag(tag)}>×</button>
                  </div>
                ))}
              </div>
          
            <button type='submit' className={styles.addButton}>SUBMIT</button>
      </form>
      </div>
    </div>
  );
};

export default CocktailForm;