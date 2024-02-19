// Import Express app initialization function
import express from 'express';
import initialize from './app/app.js';
const app = express();
// Set up the server to listen on a specific port
const port = 6000;
initialize(app);
app.listen(port, ()=> console.log(`server is listening at port ${port}`));
