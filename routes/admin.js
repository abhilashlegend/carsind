const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

router.get("/dashboard", adminController.dashboard);

router.get("/site-settings", adminController.siteSettings);

router.post('/site-settings', adminController.saveSiteSettings);

router.get("/brands", adminController.brands);

router.get("/brand/add-brand", adminController.addBrand);

router.post("/brand/add-brand", adminController.saveBrand);

module.exports = router;


