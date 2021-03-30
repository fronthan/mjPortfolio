const express = require('express');
const mongoose = require('mongoose');

const app = express();
//const cookieParser = require('cookie-parser');

const config = require('./config/key');
//const {auth} = require('./middleware/auth');

//const { User } = require('./models/User');

//app.use(express.bodyParser()); ????
//app.use(cookieParser());


//DB setting
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(config.mongoURI).then(()=> {console.log('DB connected pk')}).catch(err => {console.log(err)});
var db = mongoose.connection;

db.on('error', function(err) {
    console.log('DB ERROR: ', err)
});

//Other settings
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Routes
app.get('/', (req, res) => res.send(`블라블라`));

//Port setting
const port = 5000; //back server
app.listen(port, () => console.log(`pk app listening on port ${port}!`))

// app.post('/api/users/register', (req,res) => {
//     const user = new User(req.body);

//     user.save((err, user) => {
//         if(err) return res.json({success:false, err});
//         return res.status(200).json({
//             success:true
//         });
//     });
// });

// app.post('/api/users/login', (req, res) => {
//     //요청된 데이터를 디비에 있는지 찾는다.
//     User.findOne({ email: req.body.email }, (err, user)=> {
//         if(!user) {
//             return res.json({
//                 loginSuccess: false,
//                 message: "입력한 이메일에 해당하는 유저가 없습니다."
//             })
//         }

//         //이메일이 디비에 있다면, 비번이 맞는지 확인
//         user.comparePassword(req.body.password, (err, isMatch) => {
//             if( !isMatch ) {
//                 return res.json({ loginSuccess:false, message: "비밀번호가 틀렸습니다." })
//             }
            
//             //비번까지 맞다면, 토큰을 생성한다.
//             user.generateToken((err, user) => {
//               if(err) return res.status(400).send(err);
              
             
//               res.cookie("x_auth", user.token)
//               .status(200).json({ loginSuccess:true, userId: user._id})
//             })
//         })
//     })

// })


// app.get('/api/users/auth', auth, (req, res) => {
//     res.status(200).json({
//         _id: req.user._id,
//         isAdmin:req.user.role === 0 ? false : true,
//         isAuth: true,
//         email:req.user.email,
//         name: req.user.name,
//         lastname: req.user.lastname,
//         role:req.user.role,
//         image:req.user.image
//     })
// })


// app.get('/api/users/logout', auth, (req, res) => {
//     User.findOneAndUpdate({ _id: req.user._id }, {
//         token: ""
//     }, (err, user)=> {
//         if(err) return res.json({ success: false, err });
//         return res.status(200).send({
//             success: true
//         })
//     })
// })