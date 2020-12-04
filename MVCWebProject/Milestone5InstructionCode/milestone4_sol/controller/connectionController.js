/**
 * Module dependencies.
 */

const express = require("express");
const Connection = require("../model/connection");
const ConnectionDB = require("../utility/connectionDB");

const UserConnection = require("../model/user-connection");

const UserProfile = require("../model/user-profile");

const router = express.Router();
const {check, validationResult} = require('express-validator');

var format = require('string-format')

let error = new Array(1);

/* route handler for main connections page.
 * and handles query string for connection
 * ALL HTTP methods (GET/POST/...) /cciconnect/connections
 */
router.all("/connections", async function (req, res, next) {
    let connectionId = req.query.connectionId;
    console.log("testing");
    // validate data
    if (validateConnectionId(connectionId)) {
        try {
            console.log("valid id");

            const connectionDB = new ConnectionDB();

            // getting specific connection data object
            let connection = await connectionDB.getConnection(connectionId);

            let data = {
                connection: connection,
            };

            res.render("connection", {data: data});
        } catch (e) {
            error.push(404);
            res.redirect("connections");
        }
    } else {
        next();
    }
});

/* route handler for a connection page with param
 * ALL HTTP methods (GET/POST/...) /cciconnect/connection
 */
router.all("/connection/:connectionId", async function (req, res, next) {
    let connectionId = req.params.connectionId;
    let connection;

    // validate data
    if (validateConnectionId(connectionId)) {
        try {
            let connectionDB = new ConnectionDB();
            // getting specific connection data object from DB
            connection = await connectionDB.getConnection(connectionId);

            let data = {
                connection: connection,
                theUser: req.session.theUser,
            };

            res.render("connection", {data: data, theUser: data.theUser});
        } catch (e) {
            error.push(404);
            res.redirect("/cciconnect/connections");
        }
    } else {
        error.push(400);
        res.redirect("/cciconnect/connections");
    }
});

router.post("/new", [
    // check('topic')
    //     .notEmpty() //校验是否有输入topic
    //     .isAlphanumeric().withMessage("Invalid value {0}, 'topic' must only contains letters and numbers"),
    // check('title')
    //     .notEmpty()
    //     .isAlphanumeric().withMessage("Invalid value {0} 'title' must only contains letters and numbers"),
    check('details')
        .notEmpty()
        .trim()
        .isLength({min: 3}).withMessage("Invalid value {0} ,'details' must be 3 or more characters"),
    check('where')
        .notEmpty()
        .isLength({min: 3}).withMessage("Invalid value {0}, 'where' must be 3 or more characters"),
    check('when')
        .notEmpty()
        .isISO8601()
        .isAfter().withMessage("Invalid value {0}, 'when' must be after today's date"),
    check('start')
        .notEmpty()
        .isLength({min: 5, max: 5}).withMessage("Invalid value {0}, 'start' must be 5 characters"),
    check('end')
        .notEmpty()
        .isLength({min: 5, max: 5}).withMessage("Invalid value {0}, 'end' must be 5 characters"),

], async function (req, res) {
    console.log("new connection");
    let topic = req.body.topic.trim();
    let title = req.body.title.trim();
    let details = req.body.details;
    let location = req.body.where;
    let date = req.body.when;
    let start = req.body.start;
    let end = req.body.end;
    if (req.session.theUser) {
        //存储具体的错误信息
        let msg = new Array();

        //正则表达式
        let reg = /^[A-Za-z0-9\s]+$/;
        if (!reg.test(topic)) {
            msg.push(format("Invalid value {0}, 'topic' must only contains letters and numbers", topic));
        }

        if (!reg.test(title)) {
            msg.push(format("Invalid value {0}, 'title' must only contains letters and numbers", topic));
        }

        let flag = false;
        //校验不通过就json格式返回错误
        var errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            for (let i = 0; i < errors.errors.length; i++) {
                let error = errors.errors[i];
                if (error.param == 'end' || error.param == 'start') {
                    flag = true;
                }
                let item = format(error.msg, error.value) + '\n\r';
                msg.push(item)
            }
        }

        //时间输入是合法的，比较end是否在start后面
        if (!flag) {
            if (end <= start) {
                msg.push(format("end {0} must after start {1}", end, start));
            }

        }
        if (msg.length > 0) {//有错误，直接返回4001
            return res.json({status: 4001, msg: msg});
        }
    }


    let userName =
        req.session.theUser._firstName + " " + req.session.theUser._lastName;

    let connectionDB = new ConnectionDB();
    let create = await connectionDB.createConnection(
        topic,
        title,
        details,
        location,
        date,
        start,
        end,
        userName,
        "logo.png"
    );

    console.log("new connection created");
    console.log(create);


    let userProfile = new UserProfile(
        req.session.userProfile._user,
        req.session.userProfile._userConnections
    );
    console.log("adding rsvp, profile before add");
    console.log(userProfile);
    let connection = await connectionDB.getConnection(create._connectionId);
    userProfile.addConnection(connection, "Yes");
    console.log("adding rsvp, profile after add");
    console.log(userProfile);

    req.session.userProfile = userProfile;
    res.json({status: 200, msg: "success"})
});


router.get("/savedConnections_1", async function (req, res) {
    res.render("savedConnections_1", {
        theUser: req.session.userProfile._user,
        userConnections: req.session.userProfile._userConnections,
    });
});

// default for this controller is the connections view
router.all("/*", async function (req, res) {
    console.log("no valid connection id with request");
    let status = null;
    // get the topics from ConnectionDb
    const connectionDB = new ConnectionDB();
    let topics = await connectionDB.getTopics();

    // getting all connections from db and creating Connection data object and pushing to array.
    let connections = await connectionDB.getConnections();

    console.log("Topics and connections from DB");
    console.log(connections);
    console.log(topics);

    let data = {
        topics: topics,
        connections: connections,
        status: status,
    };

    // check of user in session to customize header
    if (req.session.theUser) {
        res.render("connections", {
            data: data,
            theUser: req.session.theUser,
        });
    } else {
        // no user session exists
        res.render("connections", {data: data});
    }
});

function validateConnectionId(connectionId) {
    if (connectionId !== undefined) {
        if (Number.isInteger(Number.parseInt(connectionId))) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

module.exports = router;
