/*
 * IWT - Event router
 */


"use strict";

const express  = require("express");
/* our applications modules */
const auth    = require("../auth");
const Event = require("../models/event");

const router = new express.Router();

// create a event
router.post("/", function (req, res, next) {
    console.log("dans router.post")
    const input = req.body;
    Event.create(input).then(created => {
        return res.status(201 /* Created */).send(created);
        console.log(created)
    }).catch(next);
});

//add user to an event
router.post("/:id/users",
            (req, res, next) => {
    console.log("dans router.post add user***************")
    //const input = req.body;
    const input = req.body;
    console.log("req***************", req.params.id)
    console.log(input)
    Event.findById(req.params.id, (err, found) => {
        if (found){
          var updated = found;
          // if(updated.users.find((user)=>{
          //   user.id === input.id
          // })){
          //   return res.status(404)
          // }
          updated.users.push(input)
          const promise = Event.findByIdAndUpdate(req.params.id, updated, {overwrite: true, new: true});
              return promise.then(found => {
                  if (found){
                    console.log('found---------------', found);
                        return res.send(found);
                  }
                  else
                      return res.status(404 /* Not Found */).send();
              }).catch(next);
              //return res.send(found);
        }
        else
            return res.status(404 /* Not Found */).send();
    });

});

// read one Event
router.get("/:id", (req, res, next) => {
    const id = req.params.id;
    // callback example
    Event.findById(id, (err, found) => {
        if (found)
            return res.send(found);
        else
            return res.status(404 /* Not Found */).send();
    });
});

// read all the events
router.get("/",
            //auth.basic(),  c'est comme cela que cela devrait être fait sans passer par le login, il va de tout facon devoir verifier pour acceder aux events.
            (req, res, next) => {
    Event.find({/* no conditions */}).then(results => {
        return res.send(results);
    }).catch(next);
});

// delete a event
router.delete("/:id", (req, res, next) => {
    const id = req.params.id;
    Event.findByIdAndRemove(id).then(found => {
        if (found)
            return res.send(found);
        else
            return res.status(404 /* Not Found */).send();
    }).catch(next)
});


//Juste pour nettoyer la base de donnée
// delete all event
router.delete("/", (req, res, next) => {
    const id = req.params.id;
    Event.remove({}).then(found => {
        if (found)
            return res.send(found);
        else
            return res.status(404 /* Not Found */).send();
    }).catch(next)
});

module.exports = router;

// // update
// router.put("/:id", (req, res, next) => {
//     const id    = req.params.id;
//     const input = req.body;
//     const promise = Event.findByIdAndUpdate(id, input, {overwrite: true, new: true});
//     promise.then(found => {
//         if (found)
//             return res.send(found);
//         else
//             return res.status(404 /* Not Found */).send();
//     }).catch(next);
// });
//
// // partial update
// router.patch("/:id", (req, res, next) => {
//     const id    = req.params.id;
//     const input = req.body;
//     const promise = Event.findByIdAndUpdate(id, {$set: input}, {new: true})
//     promise.then(found => {
//         if (found)
//             return res.send(found);
//         else
//             return res.status(404 /* Not Found */).send();
//     }).catch(next);
// });
//
// // delete a event
// router.delete("/:id", (req, res, next) => {
//     const id = req.params.id;
//     Event.findByIdAndRemove(id).then(found => {
//         if (found)
//             return res.send(found);
//         else
//             return res.status(404 /* Not Found */).send();
//     }).catch(next)
// });

// expose our router to require()
