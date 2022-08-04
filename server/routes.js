
module.exports = function(app) {
    "use strict";

	const path = require('path');
    const bodyParser = require('body-parser');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));


    app.get("/", function(req, res) {

        res.sendFile(path.join(__dirname, '../public/view', 'chat.html'));
    });

    app.get("/contact/", function(req, res) {
        res.sendFile(path.join(__dirname, '../public/view', 'contact.html'));
    });

    app.post("/contact/", function(req, res) {
        require('./contactForm')(req, res);
    });

   
    app.get("/help/", function(req, res) {
      
        res.sendFile(path.join(__dirname, '../public/view', 'help.html'));
    });
};
