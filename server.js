"use strict";
//dependencies
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const path = require('path');
const fileupload = require('express-fileupload');
const bodyParser = require('body-parser');

//middlwares
const produitValidation = require('./middleware/produitFormValidation');
const recevoirStockValidation = require('./middleware/recevoirStockFormValidation');
const envoyerStockValidation = require('./middleware/envoyerStockFormValidation');

//Application settings
const app = express();
app.set('view engine' , 'ejs');
app.use(express.static(path.join(__dirname,'public')));
app.use(fileupload());
app.use(express.urlencoded({ extended: true }));
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1/megaBoutique', {useNewUrlParser: true})

//Application models
const Produit = require('./models/Produit');
//Application pages
const homePage = require('./controller/homePage');//home page
const addProduitPage = require('./controller/addProduitPage');// add product page
const recevoirStockPage = require('./controller/recevoirStockPage');//recevoir stock page
const envoyerStockPage = require('./controller/envoyerStockPage');//envoyer stock page
const afficherProduitsPage = require('./controller/afficherProduitPage');
const retirerProduitsPage = require('./controller/retirerProduitPage');
//App controller
const addProduitController = require('./controller/addProduit');
const recevoirStockController = require('./controller/recevoirStock');
const envoyerStockController = require('./controller/envoyerStock');
app.listen(4000, (req,res)=>{
    console.log('listening on port 4000')
})

//Routing
//get requests 
app.get('/', homePage);//to home page
app.get('/produit/new',produitValidation, addProduitPage);//to add product page
app.get('/produit/stock',recevoirStockValidation,recevoirStockPage);
app.get('/produit/stock/envoyer',envoyerStockValidation,envoyerStockPage);
app.get('/produit/stock/retier', retirerProduitsPage);
app.get('/produits', afficherProduitsPage);
app.get('/produits/find',async(req,res)=>{
    const Produits = await Produit.find({
        nom : {$regex : req.query.search , $options:'i'}
    })
    res.render('afficherProduit', {Produits})
})
//post requests
app.post('/produit/add',produitValidation, addProduitController);
app.post('/produit/stock/recevoir',recevoirStockValidation, recevoirStockController);
app.post('/produit/stock/retirer_stock',envoyerStockValidation,envoyerStockController);
app.post('/produit/stock/retier/:produitId', async (req, res) => {
    try {
        const produitId = req.params.produitId;
        // Find the product by its Id
        const existingProduit = await Produit.findById(produitId);

        if (existingProduit) {
            // Toggle the 'disponible' property
            existingProduit.disponible = !existingProduit.disponible;
            await existingProduit.save();
            console.log('produit retire');
        } else {
            console.log('produit non trouve')
        }
    } catch (error) {
        console.log(error);
        
    }
});




