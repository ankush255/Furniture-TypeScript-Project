import express from 'express';
import verifyToken from '../../helper/verifyToken';
import { 
    createShippingAdd, 
    getAllShippingAdd, 
    removeShippingAdd 
} from '../../controller/User/shippingAdd.controller';

const shippingAddressRoutes = express.Router();

shippingAddressRoutes.post('/create', verifyToken, createShippingAdd);
shippingAddressRoutes.get('/show', verifyToken, getAllShippingAdd);
shippingAddressRoutes.delete('/remove', verifyToken, removeShippingAdd);

export default shippingAddressRoutes;
