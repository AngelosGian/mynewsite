const express = require('express')
const app = express();
const { compile } = require('ejs');
const path = require('path')

app.set('view engine', 'ejs')


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/public', express.static(path.join(__dirname,'public')))
app.get('/', (req, res) => {
    res.render('index.ejs', {})
})



PORT = process.env.PORT || 3002
app.listen(PORT, ()=>{
    console.log(`It is alive on port ${PORT}`);
})