var express = require('express');
var router = express.Router();
var fs = require('node:fs');

router.get('/', function(req, res, next) {
  var filedup = [];
  fs.readdir(`./uploads`, {withFileTypes: true}, function(err, files){
    files.forEach(function(dirent){
      filedup.push({filename: dirent.name, folderHai: dirent.isDirectory()});
    })
    res.render('index', {files: filedup});
  })
});

router.get('/createfile', function(req, res, next){
  fs.writeFile(`./uploads/${req.query.filename}`, "", function(err){
    res.redirect('/');
  })
})

router.get('/createfolder', function(req, res, next){
  fs.mkdir(`./uploads/${req.query.foldername}`, function(err){
    res.redirect('/');
  })
})

router.get('/file/delete/:filename', function(req, res, next){
  fs.unlink(`./uploads/${req.params.filename}`, function(err){
    res.redirect('/');
  })
})

router.get('/folder/delete/:filename', function(req, res, next){
  fs.rmdir(`./uploads/${req.params.filename}`, function(err){
    res.redirect('/');
  })
})

router.post('/change/:oldfilename', function(req, res, next){
  fs.rename(`./uploads/${req.params.oldfilename}`, `./uploads/${req.body.filename}`, function(err){
    res.redirect('/');
  })
})

router.get('/file/:filename', function(req, res, next){
  var filedup = [];
  fs.readdir(`./uploads`, {withFileTypes: true}, function(err, files){
    files.forEach(function(dirent){
      filedup.push({filename: dirent.name, folderHai: dirent.isDirectory()});
    })
    fs.readFile(`./uploads/${req.params.filename}`, "utf8", function(err, data){
      res.render('openedfile', {files: filedup, filename: req.params.filename, data: data});
    })
  })
})


module.exports = router;
