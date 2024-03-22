const Site = require('../models/site');
const Brand = require('../models/brand');

exports.dashboard = (req, res, next) => {
    res.render("./admin/dashboard.ejs", {pageTitle: "Dashboard", path: req.path });
}

exports.siteSettings = (req, res, next) => {
    Site.find().then(sitedata => {
        res.render("./admin/site-settings.ejs", {pageTitle: "Site Settings", path: req.path, sitedata: sitedata[0] });
    })
    
}

exports.saveSiteSettings = (req, res, next) => {
    const id = req.body.id
    const title = req.body.title;
    const tagline = req.body.tagline;
    const showtopbar = req.body.showtopbar;
    const showcarousel = req.body.showcarousel;

    if(id){
        Site.findById(id).then(siteSettings => {
            siteSettings.title = title;
            siteSettings.tagline = tagline;
            siteSettings.showtopbar = showtopbar;
            siteSettings.showcarousel = showcarousel;

            return siteSettings.save()
        }).then(result => {
            res.redirect("/admin/site-settings");
        }).catch(error => {
            console.error(error);
        })
    } else {
        const site = new Site({
            title: title,
            tagline: tagline,
            showtopbar: showtopbar,
            showcarousel: showcarousel
        });
        
        site.save().then(result => {
            res.redirect('/admin/site-settings')
        }).catch(error => {
            console.error(error)
        })
    
    }   
}

exports.brands = (req, res, next) => {
    Brand.find().then(brands => {
        res.render("./admin/brands.ejs", {pageTitle: "Brands", brands: brands, path: req.path})
    }).catch(error => {
        console.error(error);
    })
}

exports.addBrand = (req, res, next) => {
    res.render("./admin/add-brand.ejs", {pageTitle: "Add Brand", path: req.path})
}

exports.saveBrand = (req, res, next) => {
    const title = req.body.title;
    const logo = req.body.logo;
    const description = req.body.description;

    const brand = new Brand({
        title: title,
        description: description,
        logo: logo
    });
    brand.save().then(result => {
        res.redirect("/admin/brands");
    }).catch(error => {
        console.error(error);
    });
}

exports.editBrand = (req, res, next) => {
    Brand.findById(req.params.id).then(brand => {
        res.render("./admin/edit-brand.ejs", {pageTitle: "Edit Brand", path: req.path, brand: brand });
    }).catch(error => {
        console.error(error);
    })
}