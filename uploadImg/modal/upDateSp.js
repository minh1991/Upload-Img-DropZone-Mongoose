// getting-started.js
var mongoose = require('mongoose');
// khai báo schema ứng với collection
var upDateSp = new mongoose.Schema({ tenSp: 'string', giaSp: 'number', anhSp: 'Array' }, 
{ collection: 'upDateSp' });
// Exports module modal 
module.exports = mongoose.model('upDateSp', upDateSp);