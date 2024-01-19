const Produit = require('../models/Produit');
module.exports = async (req,res,next)=>{
  const errors = [];//to save errors 
    try {
        
        const reqURL = req.url;
        switch(reqURL){
            case '/produit/new': 
            res.render('newProduitForm', { errors });
                break;
            case '/produit/add':
                //Get data from request
            const { code, nom, prix } = req.body;
        
            // Check if inouts have data
            if (!code || !nom || !prix) {
              errors.push('Tous les champs sont requis' );//adds error message
            }
        
            // Check if the code entry is unique in the collection
            const existingProduit = await Produit.findOne({ code });
            if (existingProduit) {
              errors.push('ce code de produits existe deja.')
            }
        
            // Validate data types of prix
            if (isNaN(parseInt(prix))) {
              errors.push('Donnees numeriues requises pour prix est quantite');
            }
            //If form error detected 
            if (errors.length > 0) {
                return res.render('newProduitForm', { errors });
              }
            break;
        }

        // If all validations pass, continue to the next middleware
        next();
      } catch (error) {
        console.log(error);
      }
}