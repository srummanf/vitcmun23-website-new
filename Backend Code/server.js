import { APP_PORT } from './config';
import errorHandler from './middleware/errorHandling';
import routes from './routes';
const express = require('express');
const db = require('mongoose');

// Database Connection
db.connect('mongodb://localhost:27017/job_portal', {
    useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology : true,
    useFindAndModify : false,
}).then(()=>{
    console.log("Connection to database is established");
}).catch((err)=>{
    console.log(err);
})

const app = express();


app.use(express.json());
app.use('/api',routes);

app.use(errorHandler);




app.listen(APP_PORT, ()=>{
    console.log(`Server is Online at Port : ${APP_PORT}`);
})
