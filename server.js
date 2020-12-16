const express = require("express");
require('./routes/api_routes');
require('./routes/html_routes');
const notesdb = require('./db/db.json');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

require("./routes/api_routes")(app);
require("./routes/html_routes")(app);

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});

