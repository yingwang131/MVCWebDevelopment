const connectionDB = require("./connectionDB");

const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

const userConnectionSchema = new mongoose.Schema({
  //define the schema - this can take place of the model
  user: String,
  connection: Number,
  rsvp: String,
});
const dbModel = mongoose.model(
  "UserConnection",
  userConnectionSchema,
  "UserConnections"
);

module.exports.selectUserConnections = function (userID) {
  return new Promise((resolve, reject) => {
    dbModel
      .find({ user: userID })
      .then((data) => {
        console.log("in selectUserItems all " + data);
        resolve(data);
      })
      .catch((err) => {
        return reject(err);
      });
  });
}; //end findAll

// finds objects for the addStudent() function
module.exports.findByID = function (userID, connectionID) {
  return new Promise((resolve, reject) => {
    dbModel
      .find({
        $and: [{ user: userID }, { connection: connectionID }],
      })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        return reject(err);
      });
  });
}; //end findByItemID

module.exports.updateConnection = function (userID, userConnection) {
  return new Promise((resolve, reject) => {
    dbModel
      .findOneAndUpdate(
        { $and: [{ user: userID }, { item: userConnection.item.code }] },
        {
          $set: {
            user: userID,
            item: userItem.item.code,
            rating: userConnection.rating,
            madeIt: userConnection.madeIt,
          },
        },
        { new: true, upsert: true },
        function (err, data) {
          console.log(data);
          resolve(data);
        }
      )
      .catch((err) => {
        return reject(err);
      });
  });
}; //end updateConnection

module.exports.updateRsvp = function (userID, connectionID, rsvp) {
  return new Promise((resolve, reject) => {
    dbModel
      .findOneAndUpdate(
        { $and: [{ user: userID }, { connection: connectionID }] },
        { $set: { rsvp: rsvp } },
        { new: true, upsert: true },
        function (err, data) {
          console.log(data);
          resolve(data);
        }
      )
      .catch((err) => {
        return reject(err);
      });
  });
}; ////end updateRsvp

// deletes this item

module.exports.remove = function (theUser, connectionID) {
  return new Promise((resolve, reject) => {
    dbModel
      .find({ $and: [{ user: theUser }, { connection: connectionID }] })
      .remove()
      .exec()
      .then(function () {
        resolve();
      })
      .catch((err) => {
        return reject(err);
      });
  });
}; //end remove

// module.exports.getItemAvgRating = function (itemCode) {
//   return new Promise((resolve, reject) => {
//     UserItem.aggregate([ { $match: {
//       item: itemCode
//   }}]).then(function (data) {
//     console.log("in get Avg rating: "+data);
//       resolve(data)
//     }).catch(err => { return reject(err); })

//   });
// } //end getItemAvgRating

module.exports.getNumberAttending = function (connectionID) {
  return new Promise((resolve, reject) => {
    dbModel
      .find({ $and: [{ connection: connectionID }, { rsvp: "Yes" }] })
      .then((data) => {
        console.log("in selectUserItems all " + data);
        resolve(data.length);
      })
      .catch((err) => {
        return reject(err);
      });
  });
}; //end getNumberAttending

// module.exports.addItem = function (userID, itemCode) {
// console.log("userId");
// console.log(userID);
//   return new Promise((resolve, reject) => {
//     dbModel.findOneAndUpdate({ $and: [{ user: userID }, { item: itemCode }] },
//       { $set: { user: userID, item: parseInt(itemCode), rating: 0, madeIt:0 } },
//       { new: true, upsert: true }, function (err, data) {
//         console.log(data);
//         resolve(data);
//       }).catch(err => { return reject(err); });
//   })
// };

// module.exports.getUserProfile = function (userID) {
//   return new Promise((resolve, reject) => {
//     dbModel.find({ user: userID }).then(data => {
//       console.log("in selectUserItems all " + data);
//       resolve(data);
//     }).catch(err => { return reject(err); })
//   })
// }//end findAll

// // finds objects for the addStudent() function
// module.exports.findByID = function (userID, itemCode) {
//   return new Promise((resolve, reject) => {
//     dbModel.find({
//       $and: [{ user: userID }, { item: itemCode }]
//     }).then(data => {
//       resolve(data);
//     }).catch(err => {
//       return reject(err);
//     })
//   });
// }//end findByItemID

// module.exports.updateItem = function (userID, userItem) {
//   return new Promise((resolve, reject) => {
//     dbModel.findOneAndUpdate({ $and: [{ user: userID }, { item: userItem.item.code }] },
//       { $set: { user: userID, item: userItem.item.code, rating: userItem.rating, madeIt: userItem.madeIt } },
//       { new: true, upsert: true }, function (err, data) {
//         console.log(data);
//         resolve(data);
//       }).catch(err => { return reject(err); });
//   }
//   )
// }//end updateItem

// module.exports.updateItemRating = function (userID, itemID, rating) {
//   return new Promise((resolve, reject) => {
//     dbModel.findOneAndUpdate({ $and: [{ user: userID }, { item: itemID }] },
//       { $set: { rating: rating } },
//       { new: true, upsert: true }, function (err, data) {
//         console.log(data);
//         resolve(data);
//       }).catch(err => { return reject(err); });
//   })
// }//end updateItem

// module.exports.updateItemFlag = function (userID, itemCode, madeItParam) {
//   return new Promise((resolve, reject) => {
//     console.log("userId in updateflag "+userID)
//     //console.log(userItem.item.code);
//     dbModel.findOneAndUpdate({ $and: [{ user: userID }, { item: itemCode }] },
//       { $set: { madeIt: madeItParam } }, function (err, data) {
//         console.log("updateItemFlag "+data);
//         resolve(data);
//       }).catch(err => {
//         console.log("updateItemFlag error");
//       return reject(err); });
//   }
//   )
// }//end updateItem

// // deletes this item

// module.exports.remove = function (theUser, itemCode) {
//   return new Promise((resolve, reject) => {
//     UserConnection.find({ $and: [{ user: theUser }, { item: itemCode }] }).remove().exec().then(function () {
//       resolve()
//     }).catch(err => { return reject(err); })

//   });
// } //end remove

// // module.exports.getItemAvgRating = function (itemCode) {
// //   return new Promise((resolve, reject) => {
// //     UserItem.aggregate([ { $match: {
// //       item: itemCode
// //   }}]).then(function (data) {
// //     console.log("in get Avg rating: "+data);
// //       resolve(data)
// //     }).catch(err => { return reject(err); })

// //   });
// // } //end getItemAvgRating

// module.exports.selectItemsForAvg = function (itemCode) {
//   return new Promise((resolve, reject) => {
//     UserConnection.find({ item: itemCode }).then(data => {
//       console.log("in selectUserItems all " + data);
//       resolve(data);
//     }).catch(err => { return reject(err); })
//   })
// }//end findAll
