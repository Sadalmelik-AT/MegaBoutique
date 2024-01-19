const Produit = require('../models/Produit');
module.exports = async(req,res)=>{
    try{
        const Produits = await Produit.find({ disponible: true }); //gets all product with disponible set to true
        res.render('afficherProduit', {Produits})
    } catch (error){
        console.log(error);
        res.render('error');
    }
    
}