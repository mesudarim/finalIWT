"use strict";

const express = require("express");
const auth    = require("../auth");
/* our applications modules */
const User = require("../models/user");

const router = new express.Router();




/* when we see the uid parameter, set res.locals.user to the User found in the
   database or return a 404 Not Found directly. */
router.param('uid', (req, res, next, uid) => {
    User.findById(uid).then(user => {
        if (!user) {
            return res.status(404 /* Not Found */).send();
        } else {
            res.locals.user = user;
            return next();
        }
    }).catch(next);
});

//login
router.post('/login', (req, res, next) => {
  console.log("dans server login");
  console.dir("req.body.email " + req.body.email);
  console.dir("req.body.password " + req.body.password);

  User.authenticate(req.body.email, req.body.password);

});

// create a user
router.post("/", (req, res, next) => {
  console.dir(req.body);
    User.create(req.body).then(created => {
        return res.status(201 /* Created */).send(created);
    }).catch(err => {
        if (err.name === 'ValidationError') {
            return res.status(400 /* Bad Request */).send({
                message: err.message
            });
        }
        return next(err);
    });
});


// set a user's password
router.post("/:uid/actions/set-password", (req, res, next) => {
    const password = req.body.password;
    const user = res.locals.user;
    if (user.hash)
        return res.send(400 /* Bad Request */);
    user.resetPassword(password).then(() => {
        res.status(200 /* OK */).send();
    }).catch(next);
});

// change a user's password
router.post("/:uid/actions/reset-password", auth.basic(), function (req, res, next) {
    const logged_in = req.user;
    const target = res.locals.user;
    console.dir(logged_in.toJSON(), {colors: true});
    console.dir(target.toJSON(), {colors: true});
    if (logged_in._id.toString() === target._id.toString())
        return next();
    else
        res.status(403 /* Forbidden */).end();
}, (req, res, next) => {
    const password = req.body.password;
    const user = res.locals.user;
    user.resetPassword(password).then(() => {
        res.status(200 /* OK */).send();
    }).catch(next);
});



// read the events of a user
router.get("/:uid/myEvents", (req, res, next) => {
    const user = res.locals.user;
    return res.send(user);
});


// read the notification of the logged user
router.get("/:uid/notifications",
            //auth.basic(),
            (req, res, next) => {
    const user = res.locals.user;
    console.log("entré dans get notifications " + user._id)
    User.find(user._id).then(results => {
        console.log(results)

        return res.send(results.notifications);
    }).catch(next);
    //return res.send(user);
    // User.find({req.body._id}).then(results => {
    //          return res.send(results);
    //      }).catch(next);
});

// push the notification of the logged user
router.post("/:uid/notifications",
              //auth.basic(),
              (req, res, next) => {
    const user = res.locals.user;
    User.find(user._id).then(results => {
        console.log('-------------',results)
        let updated = user
        if(updated.notifications.length === 0 ) {
          updated.notifications = []
        }
        //return resultats.notifications.push(req.body);
        // resultats.notifications.push(req.body);
        updated.notifications.push(req.body);
        console.log('updated--------------', updated);
        const promise = User.findByIdAndUpdate(user._id, resultats.notifications, {overwrite: true, new: true});
            return promise.then(found => {
                if (found){
                  console.log('found----------------');
                      return res.send(found);
                }

                    // return found
                else
                    return res.status(404 /* Not Found */).send();
            }).catch(next);

    })
    .catch(next);

    // .then(resultats=>{ console.log("xxx resultats ",  resultats)
    //   const promise = User.findByIdAndUpdate(user._id, resultats.notifications, {overwrite: true, new: true});
    //       return promise.then(found => {
    //           if (found)
    //               //return res.send(found);
    //               return found
    //           else
    //               return res.status(404 /* Not Found */).send();
    //       }).catch(next);
    // }).then(found =>{
    //   return res.send(user);
    // }).catch(next);


    //return res.send(user);

});

// read all the users
router.get("/", (req, res, next) => {
    User.find({}).then(results => {
        return res.send(results);
    }).catch(next);
});

// expose our router to require()
module.exports = router;



// // read a user
// router.get("/:uid", (req, res, next) => {
//     const user = res.locals.user;
//     return res.send(user);
// });

// // read all the users
// router.get("/", (req, res, next) => {
//     User.find({}).then(results => {
//         return res.send(results);
//     }).catch(next);
// });




// // delete a user
// router.delete("/:uid", auth.basic(), function (req, res, next) {
//     const logged_in = req.user;
//     const target = res.locals.user;
//     if (logged_in._id.toString() === target._id.toString())
//         return next();
//     else
//         res.status(403 /* Forbidden */).end();
// }, (req, res, next) => {
//     const user = res.locals.user;
//     user.remove().then(removed => res.send(removed)).catch(next);
// });
//
