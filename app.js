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


///////requests targeting all articles /////////

app.route("/articles")
.get((req, res) =>{
//modelname, conditions, results
//if then statement to show errors or results
 Article.find((err, foundArticles) => {
  if (!err) {
    res.send(foundArticles);
  } else {
    res.send(err);
  }

});
})
.post((req, res) => {
  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content
  });
  newArticle.save((err) =>{
    if (!err){
      res.send("Successfully added a new article.")
    } else {
      res.send(err);
    }
  });
})
.delete((req, res) => {
  Article.deleteMany((err) =>{
    if(!err){
      res.send("Successfully deleted all articles");
    } else {
      res.send(err);
    }
  });
});

///////requests targeting specific articles /////////

app.route("/articles/:articleTitle")
.get((req, res) => {
  //looks thru collection of articles find ONE document where title is = to req.params
  Article.findOne({title:req.params.articleTitle }, (err, foundArticle) => {
    if (foundArticle) {
      res.send(foundArticle);
    } else {
      res.send("No articles matching that title was found.");
    }
  });
})
.put((req, res) => {
  Article.replaceOne(
    {title:req.params.articleTitle},
    {title:req.body.title, content: req.body.content},
    {overwrite: true},
    (err, )=>{
      if (!err){
        res.send("Successfully updated article.")
      }
    }
  );
});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
