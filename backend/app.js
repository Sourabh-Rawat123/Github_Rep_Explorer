const express=require("express");
const cors=require("cors");
const app=express();
const ApiError=require("./utils/Api_Error.js");
const Async_handler=require("./utils/Async_Handler.js");
const rateLimit=require("express-rate-limit");
let methodOverride = require('method-override');


app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cors());
app.use(methodOverride("_method"));


const githubLimiter=rateLimit({
    windowMs:15*60*100,
    max:100,
    message:"To many requests please try again later"
});

app.get("/",Async_handler(async(req,res)=>{
    res.status(200).json({
    message: "Use GET /api/github/:username to fetch a GitHub profile and repos.",
    });
})
);
// import routes
const github_route=require("./routes/github_routes.js")
app.use("/api/github",github_route);
app.use(githubLimiter);

//Error Handlers for the route not found
app.use((req, res, next) => {

    next(new ApiError(404, `Route ${req.url} not found`));
});
// For internal server side error
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong!";

    console.error("❌ Error:", err);

    // Otherwise render error page
    res.status(statusCode).json({
        statusCode,
    message,
    error: process.env.NODE_ENV === "development" ? err : undefined,
    });
});
module.exports = app;