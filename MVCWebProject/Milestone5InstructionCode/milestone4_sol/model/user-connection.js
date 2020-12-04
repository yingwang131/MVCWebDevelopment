const Connection = require("./connection");

class UserConnection {
  constructor(connection, rsvp) {
    this._connection = connection; // this should be of Connection object

    this._rsvp = rsvp;
  }

  getConnection() {
    return this._connection;
  }

  setConnection(value) {
    if (value instanceof Connection) {
      this._connection = value; // this should be of Connection object
    } else {
      throw new Error("connection should be a Connection Object");
    }
  }

  getRsvp() {
    return this._rsvp;
  }

  setRsvp(value) {
    this._rsvp = value;
  }
}

module.exports = UserConnection;
