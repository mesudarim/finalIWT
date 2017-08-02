"use strict";

const express = require("express");
const auth    = require("../auth");
/* our applications modules */
const User = require("../models/user");
const Notifications = require("../models/notification");
const Friends = require("../models/friends");

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
  console.log("je suis dans login")
  User.authenticate(req.body.email, req.body.password).then(user => {
    console.log("user dans login", user.toJSON())
    if (user){
      res.send(user);
      console.log(user)
    }

    else {
      res.status(401).send()
    }
  }
  ).catch(err => {
      if (err.name === 'ValidationError') {
          return res.status(400 /* Bad Request */).send({
              message: err.message
          });
      }
      return next(err);
  });

});

///////////////////////////////
///////////USERS
//////////////////////////////

// create a user
router.post("/", (req, res, next) => {
  console.dir(req.body);
    User.create(req.body).then(created => {
      console.log("created " + created)
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

// read all the users
router.get("/", (req, res, next) => {
    User.find({}).then(results => {
        return res.send(results);
    }).catch(next);
});


//Juste pour nettoyer la base de donnée
// delete all event
router.delete("/", (req, res, next) => {
    const id = req.params.id;
    User.remove({}).then(found => {
        if (found)
            return res.send(found);
        else
            return res.status(404 /* Not Found */).send();
    }).catch(next)
});

// read a user
router.get("/:uid", (req, res, next) => {
    const user = res.locals.user;
    return res.send(user);
});


// delete a user
router.delete("/:uid",
              //auth.basic(),
              function (req, res, next) {
    const logged_in = req.user;
    const target = res.locals.user;
    if (logged_in._id.toString() === target._id.toString())
        return next();
    else
        res.status(403 /* Forbidden */).end();
}, (req, res, next) => {
    const user = res.locals.user;
    user.remove().then(removed => res.send(removed)).catch(next);
});




///////////////////////////////
///////////PASSWORD
//////////////////////////////

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
router.post("/:uid/actions/reset-password",
            //auth.basic(),
            function (req, res, next) {
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

///////////////////////////////
///////////EVENTS
//////////////////////////////

// read the events of a user
router.get("/:uid/events", (req, res, next) => {
    const user = res.locals.user;
    return res.send(user);
});

//add event to a user
router.post("/:uid/events",
              //auth.basic(),
              (req, res, next) => {
    const user = res.locals.user;
    //console.log("post events-------------------", user)
    //User.find(user._id).then(results => {
        //console.log('results',results)
        let updated = user
        if(updated.events.length === 0 ) {
          updated.events = []
        }
        updated.events.push(req.body);
        //console.log('updated-------------', updated);
        ////////////ICI CELA ECRASE LE HASH!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        const promise = user.save();
        //const promise = User.findByIdAndUpdate(user._id, updated, {overwrite: true, new: true});
            return promise.then(found => {
                if (found){
                  //console.log('found---------------', found);
                      return res.send(found);
                }
                    // return found
                else
                    return res.status(404 /* Not Found */).send();
            }).catch(next);
    //})
    //.catch(next);
});

///////////////////////////////
///////////NOTIFICATIONS
//////////////////////////////

// read the notification of the logged user
router.get("/:uid/notifications",
            //auth.basic(),
            (req, res, next) => {
    const user = res.locals.user;
    const notifications = user.notifications
    console.log("notifications " + notifications)
    console.log("entré dans get notifications " + user._id)
    res.send(notifications);
});

// push the notification of the logged user
router.post("/:uid/notifications",
              //auth.basic(),
              (req, res, next) => {
    const user = res.locals.user;
    //console.log("post notification-------------------", user)
    //User.find(user._id).then(results => {
        //console.log('results',results)
        let updated = user
        if(updated.notifications.length === 0 ) {
          updated.notifications = []
        }
        updated.notifications.push(req.body);
        //console.log('updated-------------', updated);
        ////////////ICI CELA ECRASE LE HASH!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        const promise = user.save();
        //const promise = User.findByIdAndUpdate(user._id, updated, {overwrite: true, new: true});
            return promise.then(found => {
                if (found){
                  //console.log('found---------------', found);
                      return res.send(found);
                }
                    // return found
                else
                    return res.status(404 /* Not Found */).send();
            }).catch(next);
    //})
    //.catch(next);
});

///////////////////////////////
///////////FRIENDS
//////////////////////////////

//Get the friend list of the logged user

// router.get("/:uid/friends",
// //router.get("/:uid/friends",
//             auth.basic(),
//             (req, res, next) => {
//     //const user = app.locals.user;
//     const user = req.user;
//     const friends = user.friends
//     console.log("friends " + friends)
//     console.log("entré dans get friends " + user._id)
//     res.send(friends);
// });

// push the new friends of the logged user
router.post("/:uid/friends",
              //auth.basic(),
              (req, res, next) => {
    const user = res.locals.user;
    // User.find(user._id).then(results => {
    //     console.log('results',results)
        let updated = user
        if(updated.friends.length === 0 ) {
          updated.friends = []
        }
        updated.friends.push(req.body);
        console.log('updated', updated);
        ////////////ICI CELA ECRASE LE HASH!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        const promise = user.save();
        // const promise = User.findByIdAndUpdate(user._id, updated, {overwrite: true, new: true});
            return promise.then(found => {
                if (found){
                  console.log('found', found);
                      return res.send(found);
                }
                    // return found
                else
                    return res.status(404 /* Not Found */).send();
            }).catch(next);
    // })
    // .catch(next);
});

// remove a friend from the list of the logged user
router.delete("/:uid/friends",
              //auth.basic(),
              (req, res, next) => {
    const user = res.locals.user;
    User.find(user._id).then(results => {
        console.log('results',results)
        let updated = user
        if(updated.friends.length === 0 ) {
          updated.friends = []
        }
        updated.friends.push(req.body);
        console.log('updated', updated);
        const promise = User.findByIdAndUpdate(user._id, updated, {overwrite: true, new: true});
            return promise.then(found => {
                if (found){
                  console.log('found', found);
                      return res.send(found);
                }
                    // return found
                else
                    return res.status(404 /* Not Found */).send();
            }).catch(next);
    })
    .catch(next);
});

// expose our router to require()
module.exports = router;





// // read all the users
// router.get("/", (req, res, next) => {
//     User.find({}).then(results => {
//         return res.send(results);
//     }).catch(next);
// });




// delete a user
router.delete("/:uid", auth.basic(), function (req, res, next) {
    const logged_in = req.user;
    const target = res.locals.user;
    if (logged_in._id.toString() === target._id.toString())
        return next();
    else
        res.status(403 /* Forbidden */).end();
}, (req, res, next) => {
    const user = res.locals.user;
    user.remove().then(removed => res.send(removed)).catch(next);
});
