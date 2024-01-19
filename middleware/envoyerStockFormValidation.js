const Produit = require('../models/Produit');
module.exports = async (req,res,next)=>{
    let errors = [];//to save errors
    try {
        const reqURL = req.url;
        
        switch(reqURL){
            case '/produit/stock/envoyer': 
            errors =[];
            res.render('envoyerStockForm', { errors });
                break;
            case '/produit/stock/retirer_stock':
                //Get data from request
            const { code, quantite } = req.body;
        
            // Check if inouts have data
            if (!code || !quantite) {
              errors.push('Tous les champs sont requis' );//adds error message
            }
        
            // Check if the code entry is unique in the collection
            const existingProduit = await Produit.findOne({ code });
            if (!existingProduit) {
              errors.push('code de produits inexistant')
            }
        
            // Validate data types of quantite
            if (isNaN(parseInt(quantite))) {
              errors.push('Donnees numerique requise  quantite');
            }
            //Verify if quantite > 0
            if (parseInt(quantite) <= 0 ) {
                errors.push('Donnees numerique superieur a 0 requise');
              }
              if(existingProduit.quantite - quantite < 0){
                errors.push('Le stock ne peut etre negatif');
              }

            //If form error detected 
            if (errors.length > 0) {
                return res.render('envoyerStockForm', { errors });
              } 
            break;
        }
        // If all validations pass, continue to the next middleware
        next();

      } catch (error) {
        console.log(error);
      }
}