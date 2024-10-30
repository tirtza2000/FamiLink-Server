const addEvent = (connection, sql) => (req, res) => {
    const { EventId,name, group, date } = req.body;
    console.log(req.body)
    connection.connect()
    .then(() => {
        console.log({ EventId,name, group, date })
        const request = new sql.Request(connection);
        request.query(`INSERT INTO Events (EventId,GroupId, EventName, EventDate) VALUES ('${EventId}',${group}, N'${name}', '${date}')`)
        .then(result => { 
            console.log('event inserted')
            res.send({"message":'event inserted'});
            connection.close();
        })
        .catch(err => {
            console.log(err, 'could not insert event');
            connection.close();
        })
    })
    .catch(err => console.log('could not connect to the server'))
}

const RemoveEvent = (connection, sql) => (req, res) => {
    const { eventId, groupId } = req.body;
    connection.connect()
    .then(() => {
        console.log(eventId)
        const request = new sql.Request(connection);
        request.query(`DELETE FROM Events WHERE EventId='${eventId}' AND GroupId=${groupId}`)
        .then(result => { 
            res.send({"message":'event remove'});
            connection.close();
        })
        .catch(err => {
            console.log(err, 'could not remove event');
            connection.close();
        })
    })
    .catch(err => console.log('could not connect to the server'))
}

const UpdateEvent = (connection, sql) => (req, res) => {
    const { newDate,EventId, groupId } = req.body;
    connection.connect()
    .then(() => {
        console.log(EventId)
        const request = new sql.Request(connection);
        request.query(`UPDATE Events SET EventDate = '${newDate}' WHERE (GroupId=${groupId} AND EventId='${EventId}')`)
        .then(result => { 
            res.send({"message":'event update'});
            connection.close();
        })
        .catch(err => {
            console.log(err, 'could not update event');
            connection.close();
        })
    })
    .catch(err => console.log('could not connect to the server'))
}

const getEvents = (connection, sql) => (req, res) => {
    const group = req.params.group;
    connection.connect()
    .then(() => {
        const request = new sql.Request(connection);
        request.query(`SELECT * FROM Events WHERE GroupId=${group}`)
        .then(result => {
            console.log(result.recordset)
            res.send(result.recordset);
            connection.close();
        })
        .catch(err => {
            console.log('could not find events');
            connection.close();
        })
    })
    .catch(err => console.log('could not connecto to the server'))
}

module.exports = { 
    addEvent: addEvent,
    getEvents: getEvents,
    RemoveEvent:RemoveEvent,
    UpdateEvent:UpdateEvent
};