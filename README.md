##  RESTful API

an api using database robo3t/mongodb, a node.js server with express and mongoose, postman to send get, post, and delete requests. 

### What I learned: 
how to chain route handlers using express.
send get, post, put, patch, and delete requests through postman.


### Here is some code I recently learned:
```
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
})
.patch((req, res) => {
  Article.updateOne(
    {title: req.params.articleTitle},
    {$set: req.body},
    (err)=>{
      if (!err) {
        res.send("Successfully updated article.")
      } else {
        res.send(err);
      }
    }
  );
})
.delete((req, res) => {
  Article.deleteOne(
    {title: req.params.articleTitle},
    (err)=>{
      if (!err){
        res.send("Successfully deleted content.")
      } else {
      res.send(err);
    }
  }
);
});
```
