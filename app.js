import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import path from "path";
import expressValidator from "express-validator";

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));


app.use((req, res, next)=>{
res.locals.errors = null;

next();
});

app.use(expressValidator({
  errorFormatter: (param, msg, value) => {
    let namespace = param.split('.')
    , root  = namespace.shift()
    ,  formParam = root;

    while(namespace.length){
      formParam += '[' + namespace.shift() + ']';
    }
    return{
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));
app.get('/', (req, res)=>{
 
res.render('index', {
  title:'title here',
  
});
});



app.post('/process/url', (req, res) => {
  
  req.checkBody('url', 'URL is equired').notEmpty();

  let errors = req.validationErrors();
  if(errors){
    res.render('index', {
      title:'title here',
      errors: errors
    });
    console.log('Errors');
  }
  else{
    let url = req.body.url;
    
    if(url.split('/').length == 8){
      let placeName = url.split('/')[5];
      let placeCord = url.split('/')[6];
      placeCord = placeCord.slice(1,23);
    // console.log(placeName);
    // console.log(placeCord);
    
    let place_Id;
    var url4 = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${placeName}&inputtype=textquery&fields=place_id&locationbias=circle:2000@${placeCord}&key=AIzaSyB08GyWMugkWe4mL-w_TdGrxhy79-8_gIo`;
  
  
    axios.get(url4)
    .then(function(response) {
      place_Id = response.data.candidates[0].place_id;
  
      var placeReview = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${place_Id}&key=AIzaSyB08GyWMugkWe4mL-w_TdGrxhy79-8_gIo`;
        axios.get(placeReview)
          .then(function(response) {
            let data = response.data.result.reviews;
            
            res.render('process/url',{
              data:data,
              url:url
           });
          })
          .catch(function (error) {
            res.json(error);
          });
      })
      .catch(function (error) {
        res.json(error);
      });
  
    }

    else{
    res.send("invalid url");
    }
   
     
  console.log('successs');
  }
});

const port = parseInt(process.env.PORT, 10) || 8000;

app.listen(port, ()=> {
    console.log(`Server started on port: ${port}`);
})
