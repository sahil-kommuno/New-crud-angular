const expresss = require('express');
const searchFormData = require('../APIs/Search.formdata');
const searchrouter = expresss.Router();
import { jwtAuthMiddleware } from '../Middleware/commonMiddleware/Authentication.JWT';
import loggerDetail from '../Middleware/commonMiddleware/common.Middleware';
searchrouter.post(
  '/searchbyname',
  loggerDetail,jwtAuthMiddleware,
  searchFormData.searchbyname
);
// searchrouter.get(
//   '/searchbyemail/:search',
//   loggerDetail,
//   searchFormData.searchbyemail
// );
// searchrouter.get(
//   '/searchbypassword/:search',
//   loggerDetail,
//   searchFormData.searchbypassword
// );

module.exports = searchrouter;
