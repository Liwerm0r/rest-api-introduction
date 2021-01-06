const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/wikiDB', {useNewUrlParser: true, useUnifiedTopology: true});
const articleSchema = new mongoose.Schema({
  title: String,
  content: String
});
const Article = mongoose.model('Article', articleSchema);


app.route('/articles')

.get(function (req, res) {
  Article.find((err, articles) => {
    if ( !err ) {
      res.send(articles);
    } else {
      res.send(err);
    }
  });
})
.post(function (req, res) {
  const article = new Article({
    title: req.body.title,
    content: req.body.content
  });
  article.save((err) => {
    if ( !err ) {
      res.send("successfully added a new article.");
    } else {
      res.send(err);
    }
  });
})
.delete(function (req, res) {
  Article.deleteMany((err) => {
    if ( !err ) {
      res.send("Successfully deleted all articles.");
    } else {
      res.send(err);
    }
  });
});

/// Request targetting a specific article ///

app.route("/articles/:articleTitle")

.get(function (req, res) {
  Article.findOne(
    { title: req.params.articleTitle },
    (err, article) => {
    if ( article) {
      res.send(article);
    } else {
      res.send("No articles matching that title was found.");
    }
  });
})

.put(function (req, res) {
  Article.replaceOne(
    { title: req.params.articleTitle },
    req.body,
    function(err, results) {
      if ( !err ) {
        res.send("Item successfully replaced");
      } else {
        res.send(err);
      }
    }
  );
})

.patch(function (req, res) {
  Article.updateOne(
    { title: req.params.articleTitle },
    { $set: req.body },
    function(err, results) {
      if ( !err ) {
        res.send("Item successfully replaced");
      } else {
        res.send(err);
      }
    }
  );
})

.delete(function (req, res) {
  Article.deleteOne(
    { title: req.params.articleTitle },
    function(err) {
      if ( !err ) {
        res.send("Item deleted");
      } else {
        res.send(err);
      }
    }
  );
});





app.listen(3000, () => {
  console.log("Server is running");
});
