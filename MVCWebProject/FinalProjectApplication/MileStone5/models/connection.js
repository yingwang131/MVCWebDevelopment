
class connectionData {
    constructor(connectionID, connectionName, connectionTopic, details, dateTime, address) {
        this.connectionID = connectionID;
        this.connectionName = connectionName;
        this.connectionTopic = connectionTopic;
        this.details = details;
        this.dateTime = dateTime;
        this.address = address;

    }

    getConnectionID() {
        return this.connectionID;
    }

    setConnectionID(connectionID) {
        this.connectionID = connectionID
    }

    getConnectionName() {
        return this.connectionName
    }

    setConnectionName(connectionName) {
        this.connectionName = connectionName
    }

    getConnectionTopic() {
        return this.connectionTopic
    }

    setConnectionTopic(connectionTopic) {
        this.connectionTopic = connectionTopic
    }

    getDetails() {
        return this.details
    }

    setDetails(details) {
        this.details = details
    }

    getDateTime() {
        return this.dateTime
    }

    setDateTime(dateTime) {
        this.dateTime = dateTime
    }

    getAddress() {
        return this.address
    }

    setAddress(address) {
        this.address = address
    }

    getConnectionDetails() {
        return {
            connectionID: this.connectionID,
            connectionName: this.connectionName,
            connectionTopic: this.connectionTopic,
            details: this.details,
            dateTime: this.dateTime
        }
    }
}

module.exports = connectionData;