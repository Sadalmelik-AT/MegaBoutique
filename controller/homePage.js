const Produit = require('../models/Produit');
module.exports = async(req,res)=>{
    try{
        const count = await Produit.countDocuments();
        res.render('index', {count})
    } catch (error){
        console.log(error);
        res.render('error');
    }
    
}