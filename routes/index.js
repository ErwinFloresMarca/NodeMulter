var express = require('express');
var router = express.Router();
var filemanager =require('../utils/FilesManagerReq');
filemanager.setPathStorage('images/index');
filemanager.setDefaultNameAndExtencion('IMG','.jpg');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use(filemanager.cathFile());

router.post('/upload', function(req,res,next){
  res.status(200).json({
    'msn':'Guardado con exito',
    'img':req.file.filename
  });
});

router.get('/download',(req,res,next)=>{
  var img=filemanager.getFile(req.query.img);
  res.contentType('image/jpeg');
  res.status(200).send(img);
});

module.exports = router;
