/*
 * IWT - Event router
 */


"use strict";

const express  = require("express");
/* our applications modules */
const Event = require("../models/event");

const router = new express.Router();

// create a event
router.post("/", function (req, res, next) {
    console.log("dans router.post")
    const input = req.body;
    Event.create(input).then(created => {
        return res.status(201 /* Created */).send(created);
    }).catch(next);
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
router.get("/", (req, res, next) => {
    Event.find({/* no conditions */}).then(results => {
        return res.send(results);
    }).catch(next);
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
