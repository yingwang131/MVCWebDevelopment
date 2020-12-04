/*
UserProfile - represents the user profile. Contains the list of user connections as well as functions to support
getting, adding and removing connections from the user profile. In other words,it's a class/module with methods/functions to store and manage the user connections in the user profile.
properties:
User ID or User to associate this UserProfile object to the user
a list containing UserConnection objects for this user
methods/functions
addConnection – adds a UserConnection for this connection / rsvp to the user profile.
The profile should not allow multiple UserConnections for the same connection, but should update appropriately if one already exists.
removeConnection– removes the UserConnection associated with the given connection.
updateRSVP- updates an RSVP property for a specified UserConnection
getUserConnections – returns a List / Collection of UserConnection from the user profile
Any other methods/functions you find necessary
 */


let userConnection = require("./userConnection");

// const userConnectionList =
//     {
//
//         data: [
//             /*
//             new userConnection("ywang131@uncc.edu", 1, "Yes", 1),
//             new userConnection("najar@uncc.edu", 2, "No", 2),
//             new userConnection("jack@uncc.edu", 3, "yes", 3),
//             new userConnection("zerongliu@uncc.edu", 4, "Yes", 4),
//             new userConnection("jacobK@uncc.edu", 5, "No", 5),
//             new userConnection("ywang131@uncc.edu", 6, "yes", 6)
//
//              */
//         ]
//     }

class userProfile {
    constructor() {
        this.userConnectionList = {};
        this.userConnectionList.data = [];
    }
}

module.exports = userProfile;