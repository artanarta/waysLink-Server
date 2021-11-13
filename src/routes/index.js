const express = require('express')

const router = express.Router()
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, ""));
  },
});

const upload = multer({
  storage,
});

//middleware
const { auth } = require('../middlewares/auth');
const { uploadFile } = require('../middlewares/uploadFile');

// Controller
const { getUsers, deleteUser, updateUser, getIdUsers } = require('../controllers/user')
const { register, login,checkAuth } = require('../controllers/auth');
const { addTemplate, getAllLink, deleteLink, getIdLink, updateLinkForm } = require('../controllers/link');
const { getIdTemplate, updateViewCount} = require('../controllers/template');

// Route
// Login & Register
router.post('/register', register);
router.post('/login', login);
router.get("/check-auth", auth, checkAuth);

//user
router.get('/users', getUsers);
router.get('/user/:id', getIdUsers);
router.patch('/user/:id', auth, updateUser);
router.delete('/user/:id', deleteUser);

//link
router.get('/links',auth, getAllLink);
router.get('/link/:id', getIdLink);
router.post('/link', auth, upload.any("image"), addTemplate);
router.delete('/link/:id', deleteLink);
router.patch('/link/:id', auth, uploadFile("logo"), updateLinkForm);

//template
router.get('/brand/:id', getIdTemplate);
router.patch("/brand/:id", auth, updateViewCount);

module.exports = router