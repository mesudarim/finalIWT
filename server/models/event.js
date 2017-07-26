/*
 * IWT - Post model
 */
"use strict";

const mongoose = require("mongoose");

/* Schema */
const eventSchema = new mongoose.Schema({
    eventName:  String,
    eventOwner:   String,
    when: String,
    where: String,
    duration: String
});

/* Model */
const Event = mongoose.model('Event', eventSchema);

/* expose Post to require() */
module.exports = Event;
