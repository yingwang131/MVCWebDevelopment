const createError = require("http-errors");
const express = require("express");

const Connection = require("../model/connection");
const ConnectionDB = require("../utility/connectionDB");

const User = require("../model/user");
const userDB = require("../utility/userDB");

const UserProfile = require("../model/user-profile");
const userProfileDB = require("../utility/userProfileDB");

const UserConnection = require("../model/user-connection");

const router = express.Router();

const {check, validationResult} = require('express-validator');


let error = new Array(1);

/* GET /cciconnect/login  */
router.get("/login", async function (req, res, next) {
    await intializeSessionVariable(req, res);

    let data = {
        userProfile: req.session.userProfile,
    };
    console.log("session initialized with user profile data ");
    console.log(data.userProfile._user);
    res.render("savedConnections_1", {
        theUser: data.userProfile._user,
        userConnections: data.userProfile._userConnections,
    });

    console.log("in login");
});

/* GET /cciconnect/login  */
router.post("/login", [
    check('email')
        .notEmpty() //校验是否有用户email
        .isEmail(), //校验用户email是否正确
    check('password').notEmpty() //校验有没有password
], async function (req, res, next) {
    // await intializeSessionVariable(req, res);
    //
    // let data = {
    //     userProfile: req.session.userProfile,
    // };
    // console.log("session initialized with user profile data ");
    // console.log(data.userProfile._user);
    // res.render("savedConnections_1", {
    //     theUser: data.userProfile._user,
    //     userConnections: data.userProfile._userConnections,
    // });
    //
    // console.log("in login");

    //校验不通过就json格式返回错误
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return res.json({status: 4001, msg: "username or password do not exist. please try again!"});
    }
    let username = req.body.email
    let password = req.body.password
    //校验通过的话，查询数据库用户表，email和密码匹不匹配
    userDB.findUser(username, password).then(async function (user) {
        await intializeSessionVariable(req, res);

        let data = {
            userProfile: req.session.userProfile,
        };
        console.log("session initialized");
        console.log(data);

        //校验通过就保持这样
        // res.render("savedConnections_1", {
        //     theUser: data.userProfile._user,
        //     userConnections: data.userProfile._userConnections,
        // });
        return res.json({status: 200, msg: "success"});
    }, function (err) {
        return res.json({status: 4001, msg: "username or password do not exist. please try again!"});
    })
});

/* mount middleware to check for session data */
router.use("/", function (req, res, next) {
    console.log("test cciconnect/myConnections ");
    //checking if session is already created
    if (!req.session.theUser) {
        //session doesn't exit route to login
        res.render("login");
    } else {
        // session exists go to next in the call stack
        next();
    }
});

/* GET /cciconnect/myconnections  */
router.get("/", function (req, res) {
    console.log("request to cciconnect/myConnections ");

    let data = {
        userProfile: req.session.userProfile,
    };
    res.render("savedConnections_1", {
        theUser: data.userProfile._user,
        userConnections: data.userProfile._userConnections,
    });
});

/* POST /cciconnect/myconnections/login  */
router.post("/login", [
    check('email')
        .notEmpty() //校验是否有用户email
        .isEmail(), //校验用户email是否正确
    check('password').notEmpty() //校验有没有password
], function (req, res, next) {
    console.log("in login");

    //校验不通过就json格式返回错误
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return res.json({status: 4001, msg: "username or password do not exist. please try again!"});
    }

    //校验通过的话，查询数据库用户表，email和密码匹不匹配
    userDB.findUser(username, password).then(function (user) {
        intializeSessionVariable(req, res);

        let data = {
            userProfile: req.session.userProfile,
        };
        console.log("session initialized");
        console.log(data);

        //校验通过就保持这样
        res.render("savedConnections_1", {
            theUser: data.userProfile.user,
            userConnections: data.userProfile.userConnections,
        });
    }, function (err) {
        return res.json({status: 4001, msg: "username or password do not exist. please try again!"});
    })
});

/* POST /cciconnect/myconnections  */
router.post("/rsvp", async function (req, res) {
    let code = req.body.connectionId;

    let rsvp = "";

    if (
        req.body.rsvp.toUpperCase() == "YES" ||
        req.body.rsvp.toUpperCase() == "NO" ||
        req.body.rsvp.toUpperCase() == "MAYBE"
    ) {
        rsvp = req.body.rsvp;
    }

    try {
        let userProfile = new UserProfile(
            req.session.userProfile._user,
            req.session.userProfile._userConnections
        );
        console.log("adding rsvp, profile before add");
        console.log(userProfile);
        let connectionDB = new ConnectionDB();
        let connection = await connectionDB.getConnection(code);
        userProfile.addConnection(connection, rsvp);
        console.log("adding rsvp, profile after add");
        console.log(userProfile);

        req.session.userProfile = userProfile;
        res.render("savedConnections_1", {
            theUser: req.session.userProfile._user,
            userConnections: req.session.userProfile._userConnections,
        });
    } catch (e) {
        console.log(e);
        error.push(404);
        res.redirect("/cciconnect/connections");
    }
});

/* POST /cciconnect/delete  */
router.post("/delete", async function (req, res, next) {
    let code = req.body.connectionId;
    if (req.session.theUser) {
        try {
            let userProfile = new UserProfile(
                req.session.userProfile._user,
                req.session.userProfile._userConnections
            );
            let connection = await new ConnectionDB().getConnection(code);
            userProfile.removeConnection(connection);
            req.session.userProfile = userProfile;
            res.render("savedConnections_1", {
                theUser: req.session.userProfile._user,
                userConnections: req.session.userProfile._userConnections,
            });
        } catch (e) {
            error.push(404);
            res.redirect("/cciconnect/connections");
        }
    } else {
        intializeSessionVariable(req, res);
    }
});

/* GET /cciconnect/signout  */
router.get("/signout", function (req, res, next) {
    req.session.destroy();
    res.render("index", {title: "Home", theUser: undefined});
});

/* GET /cciconnect/newConnection  */
router.get("/newConnection", function (req, res, next) {
    if (!req.session.theUser) {
        intializeSessionVariable(req, res);
    }
    res.render("newConnection", {
        title: "Home",
        theUser: req.session.userProfile._user,
    });
});

/* GET /cciconnect/myconnections/*  */
router.get("/*", function (req, res, next) {
    res.render("index", {title: "Home", theUser: req.session.theUser});
});

// initialzing session data
async function intializeSessionVariable(req, res) {
    //get username from request
    let username = req.body.email;
    if (username == undefined) {
        username = req.query.email;
    }
    //only two users are currently saved. If neither use a default
    if (username != "norm@mail.com" && username != "noora@mail.com") {
        username = "norm@mail.com";
    }

    //get user from database
    let user = await userDB.getUser(username);

    console.log(user);

    // get userprofile from database
    userProfileConnections = await userProfileDB.selectUserConnections(
        user._email
    );

    // create UserProfile object
    let userProfile = new UserProfile();

    let userConnectionList = new Array();

    // create user connections for view (include connection details)
    if (userProfileConnections.length >= 1) {
        userConnectionList = await makeProfileConnectionsForView(
            userProfileConnections
        );
    }

    userProfile.setUser(user);
    userProfile.setUserConnections(userConnectionList);

    //creating session variable/property and storing a User in it
    req.session.theUser = user;

    // creating session variable/property and storing UserProfile object in it
    req.session.userProfile = userProfile;
}

async function makeProfileConnectionsForView(userConnections) {
    let userConnectionsArr = [];
    let theConnection;
    const connectionDB = new ConnectionDB();

    await asyncForEach(userConnections, async (element) => {
        try {
            theConnection = await connectionDB.getConnection(element.connection);
        } catch {
            console.log("error in fetching connection");
        }

        userConnection = new UserConnection(theConnection, element.rsvp);

        userConnectionsArr.push(userConnection);
    });
    return userConnectionsArr;
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

module.exports = router;
