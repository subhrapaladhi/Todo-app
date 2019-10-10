let express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const publicDir = require('path').join(__dirname,'/../');
app.use(express.static(publicDir));

app.get('/home', (req,res)=> {
    res.sendFile(publicDir+'/Frontend/homepage.html')
    console.log(publicDir);
})

app.listen(3000, ()=>console.log("connected to port 3000"))