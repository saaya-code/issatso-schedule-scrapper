const express = require('express');
const db = require("./Startup/db")
const majorsRoute = require('./Routes/majors');
const classroomsRoute = require('./Routes/classrooms');
const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

require('./Startup')(app);

app.use('/api/v1/majors', majorsRoute);
app.use('/api/v1/classrooms', classroomsRoute);

require('./Middleware/sentry')(app);

app.listen(port, async () =>{
    await db("mongodb+srv://saaya:3737@nodeexpressproject.dvaec.mongodb.net/issatso?retryWrites=true&w=majority");
    console.log(`listening on port ${port}`);
})
