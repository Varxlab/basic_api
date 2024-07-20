const express = require("express");
const userRouter = require("./routes/userRoutes");
const noteRouter = require("./routes/noteRoutes");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log("HTPP_Method -" + req.method + ", URL-" + req.url);
    next();
});

app.use("/users", userRouter);
app.use('/note', noteRouter);

app.get("/", (req, res) => {
    res.send("hello");
})

mongoose.connect("mongodb+srv://admin:Admin345@cluster0.985maob.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
        console.log('connected to mongodb');
        app.listen(5000, () => {
            console.log("server started on port no. 5000");
        })

    }).catch((error) => {
        console.log(error);
    })

