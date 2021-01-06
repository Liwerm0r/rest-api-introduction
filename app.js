const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ejs = require('ejs');

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/wikiDB', {useNewUrlParser: true, useUnifiedTopology: true});
const articleSchema = new mongoose.Schema({
  title: String,
  content: String
});
const Article = mongoose.model('Article', articleSchema);



app.get("/", (req, res) => {
  res.send("Hello world");
});




app.listen(3000, () => {
  console.log("Server is running");
});
