import express from "express";
const productRoutes = express.Router();
import { upload } from "../../helper/imageUpload";
import {
    addNewProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
} from '../../controller/Admin/product.controller';

productRoutes.post('/add', upload.single('product_Image'), addNewProduct);
productRoutes.get('/getAll', getAllProducts);
productRoutes.put('/update/:id',upload.single('product_Image'), updateProduct);
productRoutes.delete('/delete/:id', deleteProduct);

export default productRoutes;