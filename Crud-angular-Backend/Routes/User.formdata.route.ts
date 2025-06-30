const expresss = require('express');
const userFormData = require('../APIs/User.formdata');
const router = expresss.Router();
import upload from '../Image.Upload/user.Upload.Image';
import loggerDetail from '../Middleware/commonMiddleware/common.Middleware';
import { adminlogin, postadmindata } from '../APIs/adminlogger';
const {
  jwtAuthMiddleware,
} = require('../Middleware/commonMiddleware/Authentication.JWT');

router.post(
  '/postdata',
  upload.single('image'),
  loggerDetail,jwtAuthMiddleware,
  userFormData.postdata
);
router.get('/getdata', loggerDetail,jwtAuthMiddleware, userFormData.getdata);
router.delete(
  '/deletedata/:id',
  loggerDetail,
  jwtAuthMiddleware,
  userFormData.deletedata
);
router.put(
  '/updatedata/:id',
  upload.single('image'),
  loggerDetail,
  jwtAuthMiddleware,
  userFormData.updatedata
);
router.post('/adminlogin', loggerDetail, adminlogin);
router.post('/postadmindata', loggerDetail, postadmindata);

module.exports = router;
