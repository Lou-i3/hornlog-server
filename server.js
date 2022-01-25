const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

var corsOptions = {
    origin: process.env.CLIENT_ORIGIN || "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to HornLog API." });
});

// include routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/test.routes")(app);

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

// Synch database and import models
const db = require("./app/models");
const Role = db.role;

// db.sequelize.sync(); for prod
db.sequelize.sync({ force: true }).then(() => {
    console.log('Drop and Resync Db');
    initial();
}); // for dev 

// this function is user for dev in prod we create the lines by hand 
function initial() {
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "moderator"
    });

    Role.create({
        id: 3,
        name: "admin"
    });
}