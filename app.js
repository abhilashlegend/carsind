const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const siteRoutes = require('./routes/site');
const adminRoutes = require("./routes/admin");
const mongoose = require('mongoose');
const Site = require('./models/site');
const { siteSettings } = require('./controllers/admin');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, './public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap-icons/font')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(siteRoutes);
app.use("/admin", adminRoutes);

app.use((req, res, next) => {
    Site.find().then(siteSettings => {
        req.site = siteSettings[0];
        console.log(req.site);
        next();
    }).catch(error => {
        console.error(error);
    });
  
})

app.use((req, res, next) => {
    res.render("error/404.ejs", {pageTitle: "Page not found"});
})


mongoose.connect('mongodb://127.0.0.1:27017/carsind').then(result => {
    app.listen(4000, () => {
        console.log("listening on port 4000");
    })
}).catch(error => {
    console.log("Database error" + error);
})

