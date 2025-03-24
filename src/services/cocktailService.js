const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/cocktails`;

const index = async () => {
    try {
      const res = await fetch(BASE_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const show = async (cocktailId) => {
    try {
      const res = await fetch(`${BASE_URL}/${cocktailId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const create = async (cocktailFormData) => {
    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cocktailFormData),
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const createComment = async (cocktailId, commentFormData) => {
    try {
      const res = await fetch(`${BASE_URL}/${cocktailId}/comments`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentFormData),
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCocktail = async (cocktailId) => {
    try {
      const res = await fetch(`${BASE_URL}/${cocktailId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

  async function update(cocktailId, cocktailFormData) {
    try {
      const res = await fetch(`${BASE_URL}/${cocktailId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cocktailFormData),
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const searchCocktail = async (cocktails) => {
    try {
      const res = await fetch(`${BASE_URL}/search?name=${cocktails}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      })
      return res.json();
    } catch (error) {
      console.log('Error loading search results:', error)
    }
  }

  const deleteComment = async (cocktailId, commentId) => {
    try {
      const res = await fetch(`${BASE_URL}/${cocktailId}/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return res.json();
    } catch (error) {
      console.log('Error deleting comment:', error);
      throw error;
    }
  };

  
  export { 
    index,
    show,
    create,
    createComment,
    searchCocktail,
    deleteCocktail,
    update,
    deleteComment,
  };