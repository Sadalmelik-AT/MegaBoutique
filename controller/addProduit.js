const Produit = require("../models/Produit");
const fileupload = require('express-fileupload');
const path = require('path');
module.exports = async (req,res)=>{
    let image = req.files.image;
    image.mv(path.join(__dirname, '../public/assets/productImg', image.name), async(error)=>{
        await Produit.create({...req.body,quantite: 0, image: '/assets/productImg/'+ image.name, disponible: true})
        console.log('produit ajoute')
        
    })
}