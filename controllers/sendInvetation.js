//send email
const sendInvetation = (transporter) => (req, res) => {

    const { subject, message, email_to } = req.body;
  
    console.log(req.body);

    var mailOptions = {
        from: 'familink4@gmail.com',
        to: email_to,
        subject: subject,
        text: message
    };

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) res.json({"message": 'could not send email'})
        else res.json({"message": 'invetation was send succesfully'})
    })
  }
  
  module.exports = { sendInvetation: sendInvetation };
  