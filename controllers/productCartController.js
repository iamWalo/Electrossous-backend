import asyncWraper from '../middlewares/asyncWraper.js';
import productCartModel from '../models/productCartsModel.js';

const createMessage = (message, data) => ({ message: message || '', data: data || '' });

const addProduct = asyncWraper(async (req, res) => {
    const { title, price } = req.body;

    if (!req.file) {
        return res.status(400).json(createMessage('Image file is required.'));
    }

    const image = req.file.filename;

    const existingProduct = await productCartModel.findOne({
        $or: [
            { title },
            { image }
        ]
    });

    if (existingProduct) {
        return res.status(200).json({ success: true, message: "Product already exists" });
    }

    const product = new productCartModel({ title, price, image });
    await product.save();

    res.status(201).json({ success: true, message: "product created successfully" });
});


const showAllProducts = asyncWraper(async (req, res) => {
    try {

        const products = await productCartModel.find({});
        if (products.length === 0) {
            return res.status(200).json({ success: false, message: `there is no product` })
        }

        const updatedProducts = products.map(product => ({
            ...product._doc,
            image: `${req.protocol}://${req.get('host')}/uploads/${product.image}`
        }));

        res.status(200).json(createMessage('Products retrieved successfully ', updatedProducts));
    } catch (error) {
        res.json({ error: "error can not show the products" });
    }
});


const deleteProduct = asyncWraper(async (req, res) => {
    const { id } = req.params;

    const product = await productCartModel.findById(id);
    if (!product) {
        return res.status(404).json(createMessage('Product not found'));
    }

    await productCartModel.findByIdAndDelete(id);

    res.status(200).json(createMessage('Product deleted successfully'));
});

export { addProduct, showAllProducts, deleteProduct };
