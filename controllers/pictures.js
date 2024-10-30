const addPictures = (connection, sql) => (req, res) => {
    const { name, group } = req.body;
    console.log(req.body)
    connection.connect()
    .then(() => {
        const request = new sql.Request(connection);
        request.query(`INSERT INTO Image (ImageName, GroupId) VALUES ('${name}', ${group})`)
        .then(result => { 
            res.send('images inserted');
            connection.close();
        })
        .catch(err => {
            console.log(err, 'could not insert image');
            connection.close();
        })
    })
    .catch(err => console.log('could not connect to the server'))
}

const getPictures = (connection, sql) => (req, res) => {
    const group = req.params.group;
    connection.connect()
    .then(() => {
        const request = new sql.Request(connection);
        request.query(`SELECT ImageName FROM Image WHERE GroupId=${group}`)
        .then(result => {
            res.send(result.recordset);
            connection.close();
        })
        .catch(err => {
            console.log('could not find images');
            connection.close();
        })
    })
    .catch(err => console.log('could not connecto to the server'))
}

module.exports = { 
    addPictures: addPictures,
    getPictures: getPictures
};