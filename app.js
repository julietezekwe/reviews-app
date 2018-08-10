import express from "express";
import bodyParser from "body-parser";
import path from "path";
import expressValidator from "express-validator";

const app = express();
//creating view and public folders
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//home page route
app.get('/', (req, res)=>{
 
  //form process route
  
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
    
    
    console.log(url);
    
    
  

  }
  });

const port = parseInt(process.env.PORT, 10) || 8000;

app.listen(port, ()=> {
    console.log(`Server started on port: ${port}`);
})
