const register = (firstName, lastName, id, birthday, email, password, groupId, connection, sql, bcrypt, res) => {
    connection.connect()
    .then(() => {
        const request = new sql.Request(connection);
        request.query(`SELECT * FROM Users WHERE UserId='${id}'`)
        .then((result) => {
            connection.close();
            if(result.recordset.length === 0) {
                connection.connect()
                .then(() => {
                    const request = new sql.Request(connection);
                    const hash = bcrypt.hashSync(password, 10);
                    request.query(`INSERT INTO Users (UserId, Password, LastName, FirstName, Email, BirthDate, GroupId) OUTPUT INSERTED.* VALUES ('${id}', '${hash}', N'${lastName}', N'${firstName}', '${email}', '${birthday}', ${groupId})`)
                    .then((result) => { 
                        res.json(result.recordset[0].GroupId);
                        console.log('inserted user')
                        connection.close();
                    })
                    .catch((err) => {
                        console.log(err)
                        res.send(err + 'error inserting user');
                        connection.close();
                    })
        
                })
                .catch((err) => console.log(err + ' error connecting to database'))
            } else {
                res.send('תעודת זהות קיימת');
            }
        })
        .catch(err => {
            console.log('could not access the users table');
            connection.close();
        })
    })
    .catch(err => console.log('could not connect to the server'))
}

const handleRegister = (connection, sql, bcrypt) => (req, res) => {

    let { firstName, lastName, id, birthday, email, password, groupName, groupId } = req.body;

    console.log(req.body)

    if (groupName) {
        connection.connect()
        .then(() => {
            const request = new sql.Request(connection);
            request.query(`INSERT INTO [dbo].[Group] (GroupName) OUTPUT INSERTED.* VALUES (N'${groupName}')`)
            .then((result) => {
                connection.close();
                groupId = result.recordset[0].GroupId;
                register(firstName, lastName, id, birthday, email, password, groupId, connection, sql, bcrypt, res);
            })
            .catch(err => {
                console.log(err, 'could not insert new group');
                connection.close();
            })
        })
        .catch(err => console.log('could not connect to the database (from register)'))
    } else register(firstName, lastName, id, birthday, email, password, groupId, connection, sql, bcrypt, res);

}
  
  module.exports = { handleRegister: handleRegister };