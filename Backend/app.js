let express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    cors        = require('cors');

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const publicDir = require('path').join(__dirname,'/../');
app.use(express.static(publicDir));

let taskList = new Array();

app.get('/',(req,res)=> {
    res.sendFile(publicDir+'/Frontend/homepage.html')
})

app.get('/tasksList', (req,res)=> {
    res.json({
        taskList:  taskList
    })  
})

app.post('/addWebinar', (req,res)=>{
    taskList.push(req.body.task);
    res.json({save: true});
})



app.listen(3000, ()=>console.log("connected to port 3000"))