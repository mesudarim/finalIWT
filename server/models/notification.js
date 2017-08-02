/*
 * IWT - Notifications model
 */
"use strict";

const mongoose = require("mongoose");

/* Schema */
const notificationSchema = new mongoose.Schema({
    eventName:  String,
    when: String,
    where: String,
    // duration: String,
    nickname: String,
    id : String
});

/* Model */
const Notification = mongoose.model('Notification', notificationSchema);

/* expose Post to require() */
module.exports = Notification;
