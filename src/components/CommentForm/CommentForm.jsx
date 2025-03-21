import { useState } from 'react';
import styles from '../../css-styling/CommentForm.module.css';



const CommentForm = (props) => {
  const [formData, setFormData] = useState({ 
    author: '', 
    rating: 0, 
    content: '', 
});

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleRatingChange = (newRating) => {
    setFormData({...formData, rating: newRating});
  };

  const handleHover = (hoverRating) => {
    setFormData({...formData, hoverRating});
  };

  const handleHoverEnd = () => {
    setFormData({...formData, hoverRating: 0 });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.handleAddComment(formData);
    setFormData({ 
        author: '',
        rating: 0,
        content: '',
    });
  };

  return (
    <div className={styles.formContainer}>
     
    <form onSubmit={handleSubmit}>
    <div className={styles.formGroup}>
      <label className={styles.formTitle} htmlFor='content-input'>Your Comment:</label>
      <textarea
        className={styles.textarea}
        required
        type='text'
        name='content'
        id='content-input'
        value={formData.content}
        onChange={handleChange}
      />
    </div>
      <label className={styles.formTitle} htmlFor='rating-input'>Your Rating:</label>
      <div className={styles.formGroup}>
        {[1,2,3,4,5].map((star) => (
          <span
            key={star}
            onClick={() => handleRatingChange(star)}
            onMouseEnter={() => handleHover(star)}
            onMouseLeave={handleHoverEnd}
            style={{
               cursor: 'pointer',
               fontSize: '24px', 
               color: 
               formData.hoverRating >= star || formData.rating >= star
               ? 'gold' : 'gray',
               }}
               >
              ☆
            </span>
        ))}
      </div>
    
      <button className={styles.addButton} type='submit'>Submit Comment</button>
    </form>
    </div>
  );
};

export default CommentForm;
