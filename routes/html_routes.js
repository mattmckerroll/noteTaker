const path = require('path');


//serves up html files based on path
module.exports = (app) => {

    // this is for /notes path
    app.get("/notes", (req, res) =>{
        res.sendFile(path.join(__dirname,'../public/notes.html'))
    });

    //this is for blank/empty path or just '/'
    app.get('/', (req, res) =>{
        res.sendFile(path.join(__dirname,'../public/index.html'))
    });
}