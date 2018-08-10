import express from "express";

const app = express();

const port = parseInt(process.env.PORT, 10) || 8000;

app.listen(port, ()=> {
    console.log(`Server started on port: ${port}`);
})
