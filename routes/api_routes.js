const fs = require('fs');
const db = require('../db/db.json');
const path = require('path')

const { nanoid } = require("nanoid/non-secure");

module.exports = app => {

app.route("/api/notes")
    // Grab the notes list 
    .get(function (req, res) {
        res.json(db);
    })

    // Add a new note to the json db file.
    .post(function (req, res) {
        let dbPath = path.join(__dirname, "../db/db.json");
        let newNote = req.body;

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
        // request to delete note by id.
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