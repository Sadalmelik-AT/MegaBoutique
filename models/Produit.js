const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProduitSchema = new Schema({
        code : String,
        nom : String,
        prix: Number,
        quantite: Number,
        image: String,
        disponible: Boolean,
});
const produit = mongoose.model('Produit', ProduitSchema);
module.exports = produit