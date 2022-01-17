const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/wikiDB", {
  useNewUrlParser: true
});

//schema
const articleSchema = {
  title: String,
  content: String
};

const Article = mongoose.model("Article", articleSchema);


app.get("/articles", (req, res) => {
  //modelname, conditions, results
  //if then statement to show errors or results
  Article.find((err, foundArticles) => {
    if (!err) {
      res.send(foundArticles);
    } else {
      res.send(err);
    }
  });
});

app.post("/articles", (req, res) => {
  console.log();
  console.log();

  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content
  });
  newArticle.save();
});




app.listen(3000, function() {
  console.log("Server started on port 3000");
});
