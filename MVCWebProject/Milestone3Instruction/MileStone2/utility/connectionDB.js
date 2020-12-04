
let connectionData = require("../models/connection")

// conID, name, topic, details, datetime

// connection_array.push(models.connectionData(1, 'Chopin Piano Concerto', 'concert', 'Chopin', new Date()))
// connection_array.push(models.connectionData(2, 'Harray Potter', 'concert', 'great show', new Date()))
// connection_array.push(models.connectionData(3, 'Star War', 'concert', 'concert', new Date()))
// connection_array.push(models.connectionData(4, 'Hornets vs Trail Blazers', 'basketball', 'world', new Date()))
// connection_array.push(models.connectionData(5, 'Hornets vs Rockets', 'basketball', 'world', new Date()))
// connection_array.push(models.connectionData(6, 'Hornets vs Pacers', 'basketball', 'world', new Date()))


const connections_List = [
    {
        topic: 'concert',
        data: [
            new connectionData(1, 'Chopin Piano Concerto', 'concert', 'Chopin last show', new Date(), "Knight Theater 430 S Tryon St"),
            new connectionData(2, 'Harray Potter', 'concert', 'great show for family', new Date(), "Knight Theater"),
            new connectionData(3, 'Star War', 'concert', 'concert for everyone', new Date(),"CatoHall"),
        ]
    },
    {
        topic: 'basketball',
        data: [new connectionData(4, 'Hornets vs Trail Blazers', 'basketball', 'Hornets vs Trail Blazers', new Date(),"Specturm Center"),
            new connectionData(5, 'Hornets vs Rockets', 'basketball', 'Hornets vs Rockets', new Date(),"Specturm Center"),
            new connectionData(6, 'Hornets vs Pacers', 'basketball', 'Hornets vs Pacers', new Date(),"Specturm Center"),
            new connectionData(7, 'new added team vs Pacers', 'basketball', 'new added team vs Pacers', new Date(),"SAC"),
            new connectionData(8, 'new added event for demo', 'basketball', 'just for a demo', new Date(),"home")
        ]
    }
]


function getConnections() {
    return connections_List;
}


function getConnection(connectionID) {
    // return connections_List[connectionID - 1];//if condeition match connection Id . if condition and for loop to make the value daymic
    for (var i = 0; i < connections_List.length; i++) {
        var innderData = connections_List[i].data;
        for (var j = 0; j < innderData.length; j++) {
            if (innderData[j].getConnectionID() == connectionID) {
                return innderData[j];
            }else {
                console.log("no matching content")
            }
        }
    }

}






module.exports = {
    getConnections,
    getConnection
}