const Produit = require('../models/Produit');
module.exports = async (req,res,next)=>{
    let errors = [];//to save errors
    try {
        const reqURL = req.url;
        
        switch(reqURL){
            case '/produit/stock': 
            errors =[];
            res.render('recevoirStockForm', { errors });
                break;
            case '/produit/stock/recevoir':
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
            //If form error detected 
            if (errors.length > 0) {
                return res.render('recevoirStockForm', { errors });
              } 
            break;
        }
        // If all validations pass, continue to the next middleware
        next();

      } catch (error) {
        console.log(error);
      }
}