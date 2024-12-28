import express from "express";
const router = express.Router();
import { addProduct, deleteProduct, showAllProducts } from '../controllers/productCartController.js';
import multer from "multer";

const storage = multer.diskStorage({
    destination: "uploads", // Ensure the "uploads" folder exists
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
});


const upload = multer({ storage: storage });




// router.post('/addProduct', upload.single("image"), addProduct);
router.post('/addProduct', upload.single("image"), addProduct);

router.route('/showAllProducts')
    .get(showAllProducts)
router.route('/deleteProduct/:id')
    .delete(deleteProduct)


export default router;