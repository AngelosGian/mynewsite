const express = require('express')
const app = express();
const { compile } = require('ejs');
const path = require('path')
const nodemailer = require('nodemailer')


app.set('view engine', 'ejs')


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/public', express.static(path.join(__dirname,'public')))
app.get('/', (req, res) => {
    res.render('index.ejs', {})
})

app.post('/', (req, res) => {
    const output = `
        <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Company: ${req.body.company}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `
// create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com',
        port: 465,
        secure: true,
        auth: {
            user:'info@pickthemup.eu',
            password: '$^oRUrZR5BJzv^c'
        },
        tls:{
            rejectUnauthorized:false
        }
    })


    // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.render('contact', {msg:'Email has been sent'});
  });
})


PORT = process.env.PORT || 3002
app.listen(PORT, ()=>{
    console.log(`It is alive on port ${PORT}`);
})