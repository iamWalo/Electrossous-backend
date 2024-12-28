import mongoose from "mongoose";


const productCartSchima = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true }
})

const productCartModel = mongoose.models.food || mongoose.model('Product', productCartSchima);
export default productCartModel;