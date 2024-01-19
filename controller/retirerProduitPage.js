const Produit = require('../models/Produit');
module.exports = async(req,res)=>{
    const Produits = await Produit.find({});
    res.render('retirerProduit', {Produits});
}