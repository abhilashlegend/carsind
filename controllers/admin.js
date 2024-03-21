const Site = require('../models/site');

exports.dashboard = (req, res, next) => {
    res.render("./admin/dashboard.ejs", {pageTitle: "Dashboard"});
}

exports.siteSettings = (req, res, next) => {
    Site.find().then(sitedata => {
        res.render("./admin/site-settings.ejs", {pageTitle: "Site Settings", sitedata: sitedata[0] });
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