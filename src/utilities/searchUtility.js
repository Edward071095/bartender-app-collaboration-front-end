

const searchByTag = (cocktails, searchTags) => {
    
    if (!searchTags || searchTags.length === 0) {
      return cocktails;
    }
    
   
    let tagsArray = searchTags;
    if (!Array.isArray(searchTags)) {
      tagsArray = [searchTags];
    }
    
  
    let results = [];
    for (let i = 0; i < cocktails.length; i++) {
      let cocktail = cocktails[i];
      
  
      if (!cocktail.tags) {
        continue;
      }
      

      let hasTag = false;
      for (let j = 0; j < tagsArray.length; j++) {
        let searchTag = tagsArray[j].toLowerCase();
        
        for (let k = 0; k < cocktail.tags.length; k++) {
          let cocktailTag = cocktail.tags[k].toLowerCase();
          
          if (cocktailTag === searchTag) {
            hasTag = true;
            break;
          }
        }
        
        if (hasTag) {
          break;
        }
      }
      
      if (hasTag) {
        results.push(cocktail);
      }
    }
    
    return results;
  }
  

  export { searchByTag };





