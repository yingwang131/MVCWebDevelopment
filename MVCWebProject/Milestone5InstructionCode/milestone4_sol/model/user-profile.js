const User = require("./user");
const UserConnection = require("./user-connection");
const Connection = require("./connection");
const userProfileDB = require("../utility/userProfileDB");

class UserProfile {
  constructor(user, userConnections) {
    this._user = user;
    this._userConnections = userConnections;
  }

  getUser() {
    return this._user;
  }

  setUser(value) {
    this._user = value;
  }
  getUserConnections() {
    return this._userConnections;
  }

  setUserConnections(value) {
    this._userConnections = value;
  }

  //used same function for adding and updating.
  addConnection(connection, rsvp) {
    var flag = 0;
    console.log("in addConnection");
    console.log(connection);
    console.log(rsvp);

    if (connection instanceof Connection && rsvp != undefined) {
      for (let i = 0; i < this._userConnections.length; i++) {
        console.log(this._userConnections[i]._connection._connectionId);
        console.log(connection._connectionId);
        if (
          this._userConnections[i]._connection._connectionId ===
          connection._connectionId
        ) {
          this._userConnections[i]._rsvp = rsvp;
          flag = 1;
          // DB call for update
          userProfileDB.updateRsvp(
            this._user._email,
            connection._connectionId,
            rsvp
          );
          break;
        }
      }
      if (flag == 0) {
        console.log("adding connection. Updated userconnections array");

        let newUserCon = new UserConnection(connection, rsvp);
        this._userConnections.push(newUserCon);

        // DB call for update
        userProfileDB.updateRsvp(
          this._user._email,
          connection._connectionId,
          rsvp
        );
      }
      console.log(this._userConnections);
    } else {
      throw new Error("connection should be a Connection object");
    }
  }

  removeConnection(connection) {
    for (let i = 0; i < this._userConnections.length; i++) {
      if (
        this._userConnections[i]._connection._connectionId ==
        connection._connectionId
      ) {
        // remove connection nd break loop
        console.log(
          "found connection  to delete in profile " + connection._connectionId
        );
        this._userConnections.splice(i, 1);
        // DB call for delete
        userProfileDB.remove(this._user._email, connection._connectionId);

        break;
      }
    }
  }

  getConnections() {
    // DB call to read to keep profile synced
    this.userConnections = userProfileDB.selectUserConnections(this.user.email); //can use async if need to wait for DB
    return this._userConnections;
  }

  updateConnection(userConnection) {
    if (userConnection instanceof UserConnection) {
      for (let i = 0; i < this.userConnections.length; i++) {
        if (
          this._userConnections[i].connection.connectionName ===
          userConnection.connection.connectionName
        ) {
          this._userConnections[i] = userConnection;
          break;
        }
      }
    } else {
      throw new Error("userConnection should be a UserConnection object");
    }
  }
}

module.exports = UserProfile;
