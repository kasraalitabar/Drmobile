const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// مسیر ذخیره فایل‌ها
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // زمان + پسوند اصلی
  }
});

const upload = multer({ storage });

// route آپلود
router.post('/', upload.single('image'), (req, res) => {
  res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

module.exports = router;
