const handleLogin = (connection, sql, bcrypt) => (req, res) => {

  console.log(req.body);

  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    res.json({"message": "יש למלא את כל השדות"});
  }

  function notFound() {
    res.status(404);
    console.log('not found');
    res.json({"message": "שם המשתמש או הסיסמה שגויים"});
  }

  connection.connect()
  .then(() => {
    const request = new sql.Request(connection);
    request.query(`SELECT * FROM Users WHERE Email='${email}'`)
    .then((result) => {
      if (result.recordset.length === 0) notFound();
      else {
        console.log(password);
        console.log(result.recordset[0].Password);
        bcrypt.compare(password, result.recordset[0].Password, (err, valid) => {
          if (err || !valid) notFound();
          else {res.send(result.recordset[0]); console.log(result.recordset[0]);}
        })
      }
      connection.close();
    })
    .catch((err) => {
      res.status(500);
      console.log(err);
      connection.close();
    })
  })
  .catch((err) => res.status(503))

}

module.exports = { handleLogin: handleLogin };
