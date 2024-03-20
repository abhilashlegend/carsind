const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const siteRoutes = require('./routes/site');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap-icons/font')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(siteRoutes);

app.use((req, res, next) => {
    res.render("error/404.ejs", {pageTitle: "Page not found"});
})

app.listen(4000, () => {
    console.log("listening on port 4000");
})
