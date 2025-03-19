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
        setCocktail({
            ...cocktail,
            comments: [...cocktail.comments, newComment],
        });
    };

    
    const handleDeleteComment = async (commentId) => {
        console.log('Deleting comment with Id:', commentId);
        await cocktailService.deleteComment(cocktailId, commentId);
        setCocktail({
            ...cocktail,
            comments: cocktail.comments.filter((comment) => comment._id !== commentId),
        });
    };

    
    const getGlassType = () => {
        return cocktail?.glassType?.default || 'No glass type specified';
    };

    
    const renderIngredients = () => {
        if (!cocktail || !cocktail.ingredients) return null; 
        return cocktail.ingredients.map((ingredient, idx) => (
            <li key={idx}>
                {ingredient.quantity} {ingredient.unit} {ingredient.name}
            </li>
        ));
    };

    
    if (!cocktail) {
        return <p>Loading...</p>; 
    }

    return (
        <main>
            <section className="cocktail-details-container">
                <header className="cocktail-details-header-items">
                    <div>
                        {cocktail.imageUrl ? (
                            <img src={cocktail.imageUrl} alt={cocktail.name} />
                        ) : (
                            <img src="/images/default-cocktail.png" alt="Default Cocktail" />
                        )}
                    </div>

                    <h1 className="cocktail-details-name">{cocktail.name}</h1>
                    <h2>{cocktail.author.username}</h2>
                    <h3 className="cocktail-details-description">{cocktail.description}</h3>
                </header>

                <section className="cocktail-details-sub-info">
                    <h3>Ingredients</h3>
                    <ul>
                        {renderIngredients() || <p>No ingredients available.</p>}
                    </ul>

                    <h3>Instructions:</h3>
                    <p>{cocktail.instructions}</p>
                </section>

                <section>
                    <p>{getGlassType()}</p>
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
                <CommentForm handleAddComment={handleAddComment} />

                {!cocktail.comments.length && <p>There are no comments.</p>}

                {cocktail.comments.map((comment) => (
                    <article key={comment._id}>
                        <header>
                            <p>
                                {`${comment.author.username} posted on
                                ${new Date(comment.createdAt).toLocaleDateString()}`}
                            </p>
                        </header>
                        <p>Rating: {comment.rating}/5</p>
                        <p>{comment.content}</p>
                        {user && comment.author && user._id === comment.author._id && (
                            <button onClick={() => handleDeleteComment(comment._id)} className="comment-delete-button">
                                Delete Comment
                            </button>
                        )}
                    </article>
                ))}
            </section>
        </main>
    );
};

export default CocktailDetails;








