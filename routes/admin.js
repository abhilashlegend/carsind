const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

router.get("/dashboard", adminController.dashboard);

router.get("/site-settings", adminController.siteSettings);

router.post('/site-settings', adminController.saveSiteSettings);

router.get("/brands", adminController.brands);

module.exports = router;


