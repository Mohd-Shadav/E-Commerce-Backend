const express = require("express");
const { createAdmin, getAdmin, logoutAdmin, tokenVerify } = require("../controllers/admin.controller");
const { isAdmin } = require("../middlewares/isAdmin");

const router = express.Router();


router.post('/create-admin',createAdmin);

router.post('/get-admin',isAdmin,getAdmin);

router.post('/logout',logoutAdmin)

router.get('/verify-admin',tokenVerify);

module.exports = router;