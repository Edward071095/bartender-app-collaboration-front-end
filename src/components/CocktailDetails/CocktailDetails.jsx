import { useParams, Link } from 'react-router';
import { useState, useEffect, useContext } from 'react';
import * as cocktailService from '../../services/cocktailService';
import CocktailForm from '../CocktailForm/CocktailForm';
import { UserContext } from '../../contexts/UserContext';
import CommentForm from '../CommentForm/CommentForm';

const CocktailDetails = (props) => {
    const [cocktail, setCocktail] = useState(null);
    const { user } = useContext(UserContext);
    const { cocktailId } = useParams();
    console.log('cocktailId', cocktailId);


    useEffect(() => {
        const fetchCocktail = async () => {
        const cocktailData = await cocktailService.show(cocktailId);
        setCocktail(cocktailData);
        };
        fetchCocktail();
    }, [cocktailId]);

    console.log('cocktail state:', cocktail);

    const handleAddComment = async (commentFormData) => {
        const newComment = await cocktailService.createComment(cocktailId, commentFormData);
    setCocktail({...cocktail, comments: [...cocktail.comments, newComment] });
    };

    // const handleDeleteComment = async (commentId) => {
    //     console.log('commentId:', commentId);
        
    // setCocktail({
    //     ...cocktail, comments: cocktail.comments.filter((comment) => comment._id !== commentId),
    // });
    // };



return (

 <main>
 <section className="cocktail-details-container">
    <header className="cocktail-details-header-items">

    <div>
    {cocktail.imageUrl ? (
          <img src={cocktail.imageUrl} alt={cocktail.name} />
        ) : (
          <img src="path/to/default/image.jpg" alt="Default Cocktail" />
        )}
    </div>

        <h1 className="cocktail-details-name">{cocktail.name}</h1>
        <h2>{cocktail.author.username}</h2>
        <h3 className="cocktail-details-description">{cocktail.description}</h3>
    </header>

 <section className="cocktail-details-sub-info">
        <p>{cocktail.ingredients}</p>
        <p>{cocktail.instructions}</p>
    </section>

 <section>
        <p>{cocktail.glassType || cocktail.glassType.default}</p>
    </section>
 <section>
         {`Posted by: ${cocktail.author.username}
         on ${new Date(cocktail.createdAt).toLocaleDateString()}`}
    </section>
  <div>
        <p>{cocktail.tags}</p>
    </div>
    </section>

    <section className="cocktail-details-comments-container">
        <h2>Comments</h2>
        <CommentForm handleAddComment={handleAddComment}/>

        {!cocktail.comments.length && <p>There are no comments.</p>}

        {cocktail.comments.map((comment) => (
          <article key={comment._id}>
            <header>
              <p>
                {`${comment.author.username} posted on
                ${new Date(comment.createdAt).toLocaleDateString()}`}
              </p>
            </header>
            <p>{comment.content}</p>
            <p>{comment.rating}</p>
          </article>
        ))}
      </section>

</main>


    );
};




export default CocktailDetails;








