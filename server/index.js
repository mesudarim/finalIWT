/*
 * IWT - Index
 */

"use strict";

const app = require("./app");
console.log("entré dans index")

// connect our app to the MongoDB database.
app.locals.connect().then(() => {
    console.log("dans app.locals")
    console.log(app.locals.name + ' connected to MongoDB');

    // listen to the configured port for incoming requests.
    const port = app.locals.config.server.port;
    app.listen(port, function () {
        console.log(app.locals.name + ' listening on port ' + port);
    });
}).catch(err => {
    console.log("planté")
    console.error(err.message);
});
