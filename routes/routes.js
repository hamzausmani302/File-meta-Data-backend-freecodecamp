const express=  require('express');
const multer = require('multer');
const router = express.Router();
const db = require(__dirname + '/../Db/db');

var upload = multer({ dest: 'uploads/' })
const path = require('path');
router.get('/' , function(req,res){
    res.sendfile(__dirname + '/../public/index.html')
})
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
router.post('/api/fileanalyse' , function(req,res){
  
   let upload = multer({storage : storage}).single('upfile');
   
    upload(req, res,async function(err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any
        let obj= {};
        obj.originalname = req.file.originalname;
        obj.encoding = req.file.encoding;
        obj.mimetype = req.file.mimetype;
        obj.filename = req.file.filename;
        obj.path = req.file.path;
        obj.size = req.file.size;
         const data = await db.post_image(obj);
         if(data == undefined){
              return res.send({error : "Error"});

         }
         console.log(data);
         if(data.error){
           return res.send(data);
         }


        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        // Display uploaded image for user validation
        res.send(`You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`);
    });


 
  
})

router.get('/api/uploads/:id' , function(req,res){
      
      res.sendFile(__dirname + '/' + req.params.id + ".pptx");
})

module.exports = router;