import { useParams, Link, useNavigate } from 'react-router';
import { useState, useEffect, useContext } from 'react';
import * as cocktailService from '../../services/cocktailService';
import CocktailForm from '../CocktailForm/CocktailForm';
import { UserContext } from '../../contexts/UserContext';
import CommentForm from '../CommentForm/CommentForm';
import styles from '../../css-styling/CocktailDetails.module.css'

const CocktailDetails = (props) => {
    const navigate = useNavigate();
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

    const deleteCocktail = () => {
        if (window.confirm("Are you sure you want to delete this cocktail?")) {
            props.handleDeleteCocktail(cocktailId);

            setCocktail(null);

            navigate('/cocktails');
        }
    } 

    const isAuthor = user && cocktail && user._id === cocktail.author._id;
    
    if (!cocktail) {
        return <p>Loading...</p>; 
    }

    return (
        <div className={styles.scrollableWrapper}>
            <section className={styles.formContainer}>
                <header className={styles.formTitle}>
                    <div className={styles.formGroup}>
                        {cocktail.imageUrl ? (
                            <img src={cocktail.imageUrl} alt={cocktail.name} />
                        ) : (
                            <img src="/images/default-cocktail.png" alt="Default Cocktail" />
                        )}
                    </div>

                    <h1 className={styles.formTitle}>Cocktail: {cocktail.name}</h1>
                    <h2 className={styles.formTitle}>Creator: {cocktail.author.username}</h2>
                    <h3 className={styles.textarea}>Description: {cocktail.description}</h3>
                </header>

                {isAuthor && (
                    <div className="creator-actions">
                        <Link to={`/cocktails/${cocktailId}/edit`} className={styles.addButton}>
                            Edit Cocktail
                        </Link>
                        <button 
                            onClick={deleteCocktail}
                            className={styles.submitButton}
                        >
                            Delete Cocktail
                        </button>
                    </div>
                )}

                <section className={styles.ingredientsContainer}>
                    <h3 className={styles.formTitle}>Ingredients</h3>
                    <ul className={styles.instructionsList}>
                        {renderIngredients() || <p>No ingredients available.</p>}
                    </ul>

                    <h3 className={styles.formTitle}>Instructions:</h3>
                    <ul className={styles.ingredientList}>{cocktail.instructions}
                    </ul>
                </section>

                <section>
                    <p className={styles.formTitle}>{getGlassType()}</p>
                </section>

                <section className={styles.formTitle}>
                    {`Posted by: ${cocktail.author.username}
                    on ${new Date(cocktail.createdAt).toLocaleDateString()}`}
                </section>

                <section className={styles.formTitle}>
                    <h3>Tags</h3>
                    {cocktail.tags && cocktail.tags.length > 0 ? (
                        <div className="tags-container">
                        {cocktail.tags.map((tag, idx) => (
                            <span key={idx} className="tag-label">{tag}</span>
                        ))}
                        </div>
                    ) : (
                        <p>No tags</p>
                    )}
                </section>
            </section>

            <section className="cocktail-details-comments-container">
                <h2>Comments</h2>
                <CommentForm handleAddComment={handleAddComment} />

                {!cocktail.comments.length && <p>There are no comments.</p>}

                {cocktail.comments.map((comment) => (
                    <article key={comment._id}>
                        <header>
                            <p className={styles.formTitle}>
                                {`${comment.author.username} posted on
                                ${new Date(comment.createdAt).toLocaleDateString()}`}
                            </p>
                        </header>
                        <p className={styles.formTitle}>Rating: {comment.rating}/5</p>
                        <p className={styles.formTitle}>{comment.content}</p>
                        {user && comment.author && user._id === comment.author._id && (
                            <button className={styles.submitButton} onClick={() => handleDeleteComment(comment._id)}>
                                Delete Comment
                            </button>
                        )}
                    </article>
                ))}
            </section>
        </div>
    );
};

export default CocktailDetails;








