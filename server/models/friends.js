/*
 * IWT - friends model
 */
"use strict";

const mongoose = require("mongoose");

/* Schema */
const friendSchema = new mongoose.Schema({
    userId:  String,
    nickname: String
    // when: String,
    // where: String,
    // duration: String,

});

/* Model */
const Friend = mongoose.model('Friend', friendSchema);

/* expose Post to require() */
module.exports = Friend;
