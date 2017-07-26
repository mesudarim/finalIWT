"use strict";

const chai     = require("chai");
const expect   = chai.expect;
const request  = require("supertest");
/* our applications modules */
const app  = require("../app");
const Event = require("../models/event");

function hiphop(obj) {
    return JSON.parse(JSON.stringify(obj));
}

describe("blogging", () => {
    // useful variable for testing.
    let valid_event_id = null;   // will be set in beforeEach().
    const invalid_event_id = new require("mongodb").ObjectID();

    // before the tests are run, ensure that we are connected to MongoDB.
    before(async () => {
        await app.locals.connect();
    });

    // before each test, empty the database and populate it with known values
    beforeEach(async () => {
        await Event.remove({});
        // FIXME: should use a Factory module here, like rosie.
        await Event.create([
            {title: "Bacon Avocado Salad", body: "Place bacon in a large..."},
            {title: "Crispy Orange Beef",  body: "Lay beef strips out in..."},
            {title: "Simple BBQ Ribs",     body: "Place ribs in a large..."},
        ]);
        // setup valid_event_id
        const first = await Event.findOne({});
        valid_event_id = first._id;
    });

    describe("create a event", () => {
        const event_to_create = {
            title: "Awesome BBQ Ribs",
            body: "it takes time but it worth it...",
        };
        it("should return 201 Created", done => {
            request(app).post('/api/events').send(event_to_create).end((err, res) => {
                expect(res.status).to.eql(201);
                return done();
            });
        });
        it("should return the newly created event", done => {
            request(app).post('/api/events').send(event_to_create).end((err, res) => {
                for (let key in event_to_create)
                    expect(res.body[key]).to.eql(event_to_create[key]);
                return done();
            });
        });
        it("should have been added to the database", done => {
            request(app).post('/api/events').send(event_to_create).end((err, res) => {
                const created = res.body;
                // app.locals.find(p => p._id == created._id);
                Event.findById(created._id, (err, saved_in_database) => {
                    expect(created).to.be.eql(hiphop(saved_in_database));
                    return done();
                });
            });
        });
    });

    describe("read all the events", () => {
        it("should return 200 OK", done => {
            request(app).get('/api/events').end((err, res) => {
                expect(res.status).to.eql(200);
                return done();
            });
        });
        it("should return the events from the database", done => {
            request(app).get('/api/events').end((err, res) => {
                Event.find({}, (err, results) => {
                    expect(res.body).to.eql(hiphop(results));
                    return done();
                });
            });
        });
    });

    describe("read one event", () => {
        context("when the event id is invalid", () => {
            it("should return 404 Not Found", done => {
                request(app).get(`/api/events/${invalid_event_id}`).end((err, res) => {
                    expect(res.status).to.eql(404);
                    return done();
                });
            });
            it("should return an empty body", done => {
                request(app).get(`/api/events/${invalid_event_id}`).end((err, res) => {
                    expect(res.body).to.be.empty;
                    return done();
                });
            });
        });
        context("when the event id is valid", () => {
            it("should return 200 OK", done => {
                request(app).get(`/api/events/${valid_event_id}`).end((err, res) => {
                    expect(res.status).to.eql(200);
                    return done();
                });
            });
            it("should return the event from the database", done => {
                request(app).get(`/api/events/${valid_event_id}`).end((err, res) => {
                    Event.findById(valid_event_id, (err, expected) => {
                        expect(res.body).to.eql(hiphop(expected));
                        return done();
                    });
                });
            });
        });
    });

    describe("update a event", () => {
        const updated = {
            title: "Bacon Salad without Avocado", // changed
            body: "Place bacon in a large..."
        };
        context("when the event id is invalid", () => {
            it("should return 404 Not Found", done => {
                request(app).put(`/api/events/${invalid_event_id}`).send(updated).end((err, res) => {
                    expect(res.status).to.eql(404);
                    return done();
                });
            });
            it("should return an empty body", done => {
                request(app).put(`/api/events/${invalid_event_id}`).send(updated).end((err, res) => {
                    expect(res.body).to.be.empty;
                    return done();
                });
            });
        });
        context("when the event id is valid", () => {
            it("should return 200 OK", done => {
                request(app).put(`/api/events/${valid_event_id}`).send(updated).end((err, res) => {
                    expect(res.status).to.eql(200);
                    return done();
                });
            });
            it("should return the event from the database", done => {
                request(app).put(`/api/events/${valid_event_id}`).send(updated).end((err, res) => {
                    Event.findById(valid_event_id, (err, expected) => {
                        expect(res.body).to.eql(hiphop(expected));
                        return done();
                    });
                });
            });
        });
    });

    describe("partial update", () => {
        const partial = {
            title: "Bacon Salad without Avocado", // changed
        };
        context("when the event id is invalid", () => {
            it("should return 404 Not Found", done => {
                request(app).patch(`/api/events/${invalid_event_id}`).send(partial).end((err, res) => {
                    expect(res.status).to.eql(404);
                    return done();
                });
            });
            it("should return an empty body", done => {
                request(app).patch(`/api/events/${invalid_event_id}`).send(partial).end((err, res) => {
                    expect(res.body).to.be.empty;
                    return done();
                });
            });
        });
        context("when the event id is valid", () => {
            it("should return 200 OK", done => {
                request(app).patch(`/api/events/${valid_event_id}`).send(partial).end((err, res) => {
                    expect(res.status).to.eql(200);
                    return done();
                });
            });
            it("should return the event from the database", done => {
                request(app).patch(`/api/events/${valid_event_id}`).send(partial).end((err, res) => {
                    Event.findById(valid_event_id, (err, expected) => {
                        expect(res.body.title).to.eql(partial.title);
                        return done();
                    });
                });
            });
        });
    });

    describe("delete a event", () => {
        context("when the event id is invalid", () => {
            it("should return 404 Not Found", done => {
                request(app).delete(`/api/events/${invalid_event_id}`).end((err, res) => {
                    expect(res.status).to.eql(404);
                    return done();
                });
            });
            it("should return an empty body", done => {
                request(app).delete(`/api/events/${invalid_event_id}`).end((err, res) => {
                    expect(res.body).to.be.empty;
                    return done();
                });
            });
        });
        context("when the event id is valid", () => {
            it("should return 200 OK", done => {
                request(app).delete(`/api/events/${valid_event_id}`).end((err, res) => {
                    expect(res.status).to.eql(200);
                    return done();
                });
            });
            it("should return the event from the database", done => {
                // find the Event first, because after the request it won't be
                // in the db anymore.
                Event.findById(valid_event_id, (err, victim) => {
                    request(app).delete(`/api/events/${valid_event_id}`).end((err, res) => {
                        expect(res.body).to.eql(hiphop(victim));
                        return done();
                    });
                });
            });
            it("should remove the event from the database", done => {
                request(app).delete(`/api/events/${valid_event_id}`).end((err, res) => {
                    Event.findById(valid_event_id, (err, result) => {
                        expect(result).to.not.exist;
                        return done();
                    });
                });
            });
        });
    });
});
