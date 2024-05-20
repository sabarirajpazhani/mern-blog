import express from 'express';

const app=express();  //initializes an Express application, allowing you to set up a web server by defining routes, middleware, and server configurations.

app.listen(3000,()=>{//starts the Express server on port 3000
    console.log('Server is running on Port 3000!');
})