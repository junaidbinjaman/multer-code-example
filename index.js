var express = require("express");
var multer = require("multer");

var app = express();
app.use(function(req, res, next) {
  console.log("I am application level middkle ware");
  next()

})

app.use('/about', function(req, res, next) {
  console.log("I am about level middle ware");
  next()
})


var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, "./upload")
  },
  filename: function(req, file, callback) {
    callback(null, file.originalname)
  },
})

var upload = multer({storage}).single('myfile');

app.post("/", function(req, res) {
  upload(req, res, function(error) {
    if(error) {
      res.send("file upload failed");
    }else {
      res.send("File Uploaf Success");
    }
  })
})

app.get('/home', function(req, res){
  res.send('Hello, THis is Home')
})

app.get('/about', function(req, res){
  res.send('THis is About')
})

app.listen(8000, function () {
  console.log("Server Run Success");
});


