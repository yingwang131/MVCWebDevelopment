// connection object
class Connection {
  constructor(
    connectionId,
    connectionName,
    connectionTopic,
    detail,
    location,
    host,
    date,
    startTime,
    endTime,
    image
  ) {
    this._connectionId = connectionId;
    this._connectionName = connectionName;
    this._connectionTopic = connectionTopic;
    this._detail = detail;
    this._location = location;
    this._host = host;
    this._date = date;
    this._startTime = startTime;
    this._endTime = endTime;
    this._image = image;
  }

  getConnectionId() {
    return this._connectionId;
  }

  setConnectionId(value) {
    this._connectionId = value;
  }

  getConnectionName() {
    return this._connectionName;
  }

  setConnectionName(value) {
    this._connectionName = value;
  }

  getConnectionTopic() {
    return this._connectionTopic;
  }

  setConnectionTopic(value) {
    this._connectionTopic = value;
  }

  getDetail() {
    return this._detail;
  }

  setDetail(value) {
    this._detail = value;
  }

  getDate() {
    return this._date;
  }

  setDate(value) {
    this._date = value;
  }
  getHost() {
    return this._host;
  }

  setHost(value) {
    this._host = value;
  }

  getStartTime() {
    return this._startTime;
  }

  setStartTime(value) {
    this._startTime = value;
  }

  getEndTime() {
    return this._endTime;
  }

  setEndTime(value) {
    this._endTime = value;
  }

  getLocation() {
    return this._location;
  }

  setLocation(value) {
    this._location = value;
  }

  getImage() {
    return this._image;
  }

  setImage(value) {
    this._image = value;
  }
}

module.exports = Connection;
