let express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    cors        = require('cors');

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const publicDir = require('path').join(__dirname,'/../');
app.use(express.static(publicDir));

app.get('/',(req,res)=> {
    res.sendFile(publicDir+'/Frontend/homepage.html')
})

app.get('/home', (req,res)=> {
    res.json({
        taskList:  ['task1','task2','task3','task4','task5']
    })  
})

app.listen(3000, ()=>console.log("connected to port 3000"))