import express from "express";
import path from "path";


const app = express();
//creating view and public folders
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));




app.get('/', (req, res)=>{
 
  res.render('index');
  });

const port = parseInt(process.env.PORT, 10) || 8000;

app.listen(port, ()=> {
    console.log(`Server started on port: ${port}`);
})
