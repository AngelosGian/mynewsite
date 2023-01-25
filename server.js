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

    let transporter = nodemailer.createTransport({
        host: '',
        port: 587,
        secure: false,
        auth: {
            user:'',
            password: ''
        }
        tls:{
            rejectUnauthorized:false
        }
    })
})


PORT = process.env.PORT || 3002
app.listen(PORT, ()=>{
    console.log(`It is alive on port ${PORT}`);
})