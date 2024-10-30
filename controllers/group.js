const getGroupName = (connection, sql) => (req, res) => {
    const group = req.params.group;
    connection.connect()
    .then(() => {
        const request = new sql.Request(connection);
        request.query(`SELECT [GroupName] FROM [dbo].[Group] WHERE [GroupId]=${group}`)
        .then(result => {
            res.send(result.recordset);
            console.log(result.recordset)
            connection.close();
        })
        .catch(err => {
            console.log(err, 'could not find group name');
            connection.close();
        })
    })
    .catch(err => console.log('could not connecto to the server'))
}

module.exports = { getGroupName: getGroupName };