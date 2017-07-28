/*
 * IWT - Event model
 */
"use strict";

const mongoose = require("mongoose");

/* Schema */
const eventSchema = new mongoose.Schema({
    eventName:  {type: String, required: true},
    eventOwner:   String,
    when: {type: String, required: true},
    where: {type: Object, required: true},
    duration: {type: String, required: true},
    users: {type:Array},
    pic: {type:Array},
});

/* Model */
const Event = mongoose.model('Event', eventSchema);

/* expose Post to require() */
module.exports = Event;
