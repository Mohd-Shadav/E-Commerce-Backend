const express = require('express');
const { createUser, getAuthorization, addToCart, getUser, getAllUsers, incrementQuantity, decrementQuantity, removeItemFromCart, userLogout, userLogin, addToCartByQuantity, saveAddress, setDefaultAddress, removeAddress, updateUserData } = require('../controllers/user.controller');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { isUser } = require('../middlewares/isUser');
const router = express.Router();




router.get('/get-users',getAllUsers);

router.get('/get-user/:userid',getUser)


router.post('/create-user',createUser);


router.get('/auth',authMiddleware,getAuthorization)

router.put('/update-user',updateUserData);

router.post('/addtocart/:userid/:productid',addToCart);
router.post('/addtocart/:userid/:productid/:quantitycount/:variant',addToCartByQuantity)

router.post('/cart/incrementquantity/:userid/:productid',incrementQuantity)
router.post('/cart/decrementquantity/:userid/:productid',decrementQuantity)

router.delete('/cart/removeitem/:userid/:productid',removeItemFromCart)

router.post('/save-address/:userid',saveAddress)
router.post('/:userid/set-default-address/:index',setDefaultAddress)
router.delete('/:userid/remove-address/:index',removeAddress)


router.post('/login',isUser,userLogin);


router.get('/logout',userLogout)

module.exports = router;