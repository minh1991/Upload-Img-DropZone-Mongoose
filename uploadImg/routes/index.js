var express = require('express');
var multer  = require('multer')
var mongoose = require('mongoose');
var router = express.Router();
// getting-started.js
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sanPhamUploadImg');
//tạo liên kết với modal
var updateSpModal = require('../modal/upDateSp');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //lưu vào folder nào 
    cb(null, './ImgUpload')
  },
  filename: function (req, file, cb) {
    //Kiểu đặt tên ảnh
    cb(null, Date.now() + '-' + file.originalname  )
  }
})
var upload = multer({ storage: storage })
var imgArray = [];


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST upload img. */
router.post('/uploadfile', upload.any(), function(req, res, next) {
  //Kiểm tra thông tin ảnh
  console.log(req.files[0].path);
  imgArray.push(req.files[0].path);
  //Kiểm tra thử imgArray sau khi push
  console.log(imgArray);
  //sau khi upload thì thông báo OK ....
  res.status(200).send(req.files);
});

/* POST nội dung ảnh. */
router.post('/imgcontent', function(req, res, next) {
  // Kiểm tra xem đã bắt path ảnh 
  console.log(imgArray);
  // Kiểm tra xem các thông tin đã bắt được chưa
  var ten = req.body.tensp;
  var gia = req.body.giasp;
  console.log(ten);
  console.log(gia);

  // định nghĩa một đối tượng để insert
  var itemSp = {
    "tenSp" : ten,
    "giaSp" : gia,
    "anhSp" : imgArray
  };
  var newData = new updateSpModal(itemSp);
  newData.save();

  res.render('imgcontent', { title: 'ImgContents' });
});

/* GET Views. */
router.get('/view', function(req, res, next) {
  // lấy dữ liệu đã có của mongo để đổ ra view
  updateSpModal.find({}, function (err, dulieu) {
    //Kiểm tra xem dulieu ok chưa
    console.log(dulieu);
    res.render('view', { title: 'view', data:dulieu });
  })
});
module.exports = router;

