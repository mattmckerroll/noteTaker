const fs = require('fs');
const db = require('../db/db.json');
const path = require('path');

//it took me longer than i'd like to admit to figure out how to add in nanoid
const { nanoid } = require("nanoid/non-secure");

module.exports = app => {

app.route("/api/notes")
    // pull up the existing notes from the db
    .get(function (req, res) {
        res.json(db);
    })

    // Add a new note to the db file.
    .post(function (req, res) {
        let dbPath = path.join(__dirname, "../db/db.json");
        let newNote = req.body;

        //this uses nanoid to quickly generate a unique ID 
        newNote.id = nanoid();

        // push to db.json.
        db.push(newNote)

        // write the json file again.
        fs.writeFile(dbPath, JSON.stringify(db), function (err) {

            if (err) {
                return console.log(err);
            }
            console.log("Your note was saved!");
        });
        // response is the new note 
        res.json(newNote);
    });

    app.delete("/api/notes/:id", function (req, res) {
        let dbPath = path.join(__dirname, "/db/db.json");
        // delete note by id.
        for (let i = 0; i < db.length; i++) {
    
            if (db[i].id == req.params.id) {
                //Points to the note to be deleted, then removes it.
                db.splice(i, 1);
                break;
            }
        }
        // Write the db.json file again.
        fs.writeFileSync(dbPath, JSON.stringify(db), function (err) {
    
            if (err) {
                return console.log(err);
            } else {
                console.log("Your note was deleted!");
            }
        });
        res.json(db);
    });

}