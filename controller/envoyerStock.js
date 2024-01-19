const Produit = require("../models/Produit");
module.exports = async (req,res)=>{
    const retrait = parseInt(req.body.quantite);
    const code = req.body.code;
try{
    // Check if the code entry is unique in the collection
 const existingProduit = await Produit.findOne({ code });
 
 if(existingProduit){
    existingProduit.quantite -= retrait;
    await existingProduit.save();
    console.log('quantite mise a jour');
    console.log(existingProduit.quantite);
    
}
}catch(error){
    console.log(error);
}

}
