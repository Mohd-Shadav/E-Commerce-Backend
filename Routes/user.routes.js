const express = require('express');
const { createUser, getAuthorization, addToCart, getUser, getAllUsers, incrementQuantity, decrementQuantity, removeItemFromCart } = require('../controllers/user.controller');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();




router.get('/get-users',getAllUsers);

router.get('/get-user/:userid',getUser)


router.post('/create-user',createUser);


router.get('/auth',authMiddleware,getAuthorization)

router.post('/addtocart/:userid/:productid',addToCart);

router.post('/cart/incrementquantity/:userid/:productid',incrementQuantity)
router.post('/cart/decrementquantity/:userid/:productid',decrementQuantity)

router.delete('/cart/removeitem/:userid/:productid',removeItemFromCart)

module.exports = router;