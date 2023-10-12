import express from "express";
import exphbs from "express-handlebars";

// import pgPromise from "pg-promise";

// const pgp = pgPromise();
const app = express();

const handlebarSetup = exphbs.engine({
  partialsDir: "./views/partials",
  viewPath: "./views",
  layoutsDir: "./views/layouts",
});
app.engine("handlebars", handlebarSetup); //configure express as middleware
app.set("view engine", "handlebars");

app.set("views", "./views");
app.use(express.static("public")); // middleware to make public folder visible

app.use(express.urlencoded({ extended: false })); // set up body parser to create middleware for when settings are updated

app.use(express.json()); // To handle JSON data

app.get("/", function (req, res) {
  //set default root
  res.render("index", {});
});
const PORT = process.env.PORT || 3005;
app.listen(PORT, function () {
  console.log("App started at port", PORT);
});
