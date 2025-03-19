import { useState } from 'react';



const CommentForm = (props) => {
  const [formData, setFormData] = useState({ 
    author: '', 
    rating: '', 
    content: '', 
});

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.handleAddComment(formData);
    setFormData({ 
        author: '',
        rating: '',
        content: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='rating-input'>Your Rating:</label>
      <input
        required
        type='text'
        name='rating'
        id='rating-input'
        value={formData.rating}
        onChange={handleChange}
      />
      <label htmlFor='content-input'>Your Comment:</label>
      <textarea
        required
        type='text'
        name='content'
        id='content-input'
        value={formData.content}
        onChange={handleChange}
      />
      <button type='submit'>SUBMIT COMMENT</button>
    </form>
  );
};

export default CommentForm;
