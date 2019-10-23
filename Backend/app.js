let express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    cors        = require('cors')

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const publicDir = require('path').join(__dirname,'/../');
app.use(express.static(publicDir));

mongoose.connect('mongodb://localhost:27017/todo',{useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection
        .once('open', ()=>console.log('connected to db'))
        .on('error',(error)=>console.log('connection to database failed'))

const Task = require('./models/task');
const User = require('./models/user');

app.get('/auth', (req,res)=>{
    res.sendFile(publicDir+'/Frontend/login_signup.html')
})

app.post('/login', (req, res)=>{
    User.findOne(req.body)
        .then((data)=>{
            if(data){
                res.json({'auth': true});
                console.log(data);
            }else{
                res.json({'auth': false});
                console.log(`wrong username or password:`);  
            }
        })
})

app.post('/signup', (req,res) =>{
    new User(req.body)
        .save()
        .then((data)=>{
            res.json({save: true});
            console.log(data);
        })
        .catch((err)=>{
            res.json({save: false});
            console.log(err);
        })
})

app.get('/:username',(req,res)=> {
    res.sendFile(publicDir+'/Frontend/homepage.html')
})

app.get('/:username/tasksList', (req,res)=> {

    Task.find({username: req.params.username})
        .then((taskList)=>{
            res.json({taskList:  taskList});
            console.log(taskList) 
        })
        .catch((err)=>{
            console.log(err);
            res.json({taskList: taskList});
        })
})

app.post('/:username/addTask', (req,res)=>{
    console.log(req.body)
    new Task(req.body)
        .save()
        .then((data)=>{
            res.json({save: true});
        })
        .catch((err)=>{
            console.log(err);
            res.json({save: false});
        })    
}) 

app.delete('/delete/:id', (req, res)=>{
    console.log('id ===== ', req.params.id)
    Task.deleteOne({_id: req.params.id})
        .then((data)=>{
            console.log(data);
            res.json({delete: true});
        })
        .catch((err)=>{
            console.log(err);
            res.json({delete: false});
        })
})

app.get('/details/:id',(req, res)=>{
    res.sendFile(publicDir+'/Frontend/details.html')
})

app.get('/data/:id', (req, res)=>{
    Task.findById(req.params.id)
        .then((data)=>{
            res.json(data);
        })
        .catch((err)=>{
            console.log(err);
        })
})

app.put('/update/:id', (req,res)=>{
    Task.findByIdAndUpdate(req.params.id, {details:req.body.details},{new: true})
            .then((data)=>{
                console.log(data);
                res.json(data);
            })
            .catch((err)=>{
                console.log(err);
            })
    console.log(req.body);
})

app.listen(3000, ()=>console.log("connected to port 3000"))