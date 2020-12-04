let userConnection = require("../models/userProfile");

function maxUserConnectionID(userConnectionList) {
    if (userConnectionList.data.length === 0) {
        return 0;
    }
    let arr = [];
    userConnectionList.data.forEach((item) => {
        arr.push(item._userConnectionID)
    });
    return Math.max.apply(null, arr)
};

function addConnection(userConnection, profile) {
    for (let i = 0; i < profile.userConnectionList.data.length; i++) {
        let item = profile.userConnectionList.data[i];
        if (item._email == userConnection.email && item._connectionID == userConnection.connectionID) {
            userConnection._userConnectionID=item._userConnectionID;
            updateRSVP(userConnection,profile);
            return false;
        }
    }
    userConnection.userConnectionID = maxUserConnectionID(profile.userConnectionList) + 1;

    profile.userConnectionList.data.push(userConnection);
    return true;
}


function removeConnection(userConnectionID, profile) {
    //根据传进来的id先找到对应的userconnection，然后再从数组中删除
    let itemIndex = 0;
    for (let i = 0; i < profile.userConnectionList.data.length; i++) {
        let item = profile.userConnectionList.data[i];
        if (item._userConnectionID == userConnectionID) {
            profile.userConnectionList.data.splice(itemIndex, 1);
        }
        itemIndex++;
    }

}


//先要根据id 去找到对应的object，然后再根据 RSVP property来更新
function updateRSVP(userConnection, profile) {
    for (let i = 0; i < profile.userConnectionList.data.length; i++) {
        let item = profile.userConnectionList.data[i];
        if (item._userConnectionID == userConnection._userConnectionID) {
            item._rsvpStatus = userConnection._rsvpStatus;
        }
    }
}


function getUserConnections(email, profile) {
//根据这个emial去找到属于这个用户的userconnections
    let arr = [];
    for (let i = 0; i < profile.userConnectionList.data.length; i++) {
        let item = profile.userConnectionList.data[i];
        if (item._email == email) {
            //把相同email里面的obj都拿出来，放到对应user的数组里面
            //放什么，放当前的obj
            arr.push(item);
        }
    }
    return arr;
}

module.exports = {
    addConnection, removeConnection, updateRSVP, getUserConnections
}