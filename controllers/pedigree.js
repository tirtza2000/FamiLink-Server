const { response } = require('express');
const jsonfile = require('jsonfile')

const getPedigree = (connection, sql) => (req, res) => {
    const group = req.params.group;
    connection.connect()
    .then(() => {
        const request = new sql.Request(connection);
        request.query(`SELECT tree FROM Tree WHERE groupId=${group}`)
        .then(result => {
            res.send(result.recordset);
            connection.close();
        })
        .catch(err => {
            console.log('could not find tree\n', err);
            res.send(err);
            connection.close();
        })
    })
    .catch(err => console.log('could not connecto to the server'))
}

const createPedigree = (connection, sql) => (req, res) => {
    const { groupId, tree } = req.body;

    const treeString = `'${tree}'`;
    
    connection.connect()
    .then(() => {
        const request = new sql.Request(connection);
        request.query(`INSERT INTO Tree (groupId, tree) VALUES (${req.body.group}, N${treeString})`)
        .then(response => {
            res.send(response);
            connection.close();
        })
        .catch(err => {
            console.log('could not insert tree: ', err);
            connection.close();
        })
    })
    .catch(err => console.log('could not connect to database: ', err))
}

const updatePedigree = (connection, sql) => (req, res) => {
    const { groupId, tree } = req.body;

    const treeString = `'${tree}'`;
    
    connection.connect()
    .then(() => {
        const request = new sql.Request(connection);
        request.query(`UPDATE Tree SET tree = N${treeString} WHERE groupId=${req.body.group};`)
        .then(response => {
            res.send(response);
            connection.close();
        })
        .catch(err => {
            console.log('could not insert tree: ', err);
            connection.close();
        })
    })
    .catch(err => console.log('could not connect to database: ', err))
}
  
module.exports = { 
    getPedigree: getPedigree, 
    updatePedigree: updatePedigree,
    createPedigree: createPedigree
};