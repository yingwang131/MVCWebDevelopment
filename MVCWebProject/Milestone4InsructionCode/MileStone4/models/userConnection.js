/*
UserConnection – represents a connection object saved to the user profile
( associates a connection to a user profile) with the following properties:

Connection
rsvp
Any other fields you find necessary (optional)
 */


class userConnection {
    get userConnectionID() {
        return this._userConnectionID;
    }

    set userConnectionID(value) {
        this._userConnectionID = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get connectionID() {
        return this._connectionID;
    }

    set connectionID(value) {
        this._connectionID = value;
    }

    get rsvpStatus() {
        return this._rsvpStatus;
    }

    set rsvpStatus(value) {
        this._rsvpStatus = value;
    }

    get connectionTopic() {
        return this._connectionTopic;
    }

    set connectionTopic(value) {
        this._connectionTopic = value;
    }

    get connectionName() {
        return this._connectionName;
    }

    set connectionName(value) {
        this._connectionName = value;
    }

    constructor(email, connectionID, rsvpStatus, userConnectionID) {
        //user class 里面的 email
        //conncetcion class 里面的 connectionID
        this._userConnectionID = userConnectionID;
        this._email = email;
        this._connectionID = connectionID;
        this._rsvpStatus = rsvpStatus;


    }
}

module.exports = userConnection;