var mongoose = require('mongoose');
var Schema = mongoose.Schema;

require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;


// var SignSchema = new Schema({
//   name: {
//     type: String,
//     required: 'A sign needs a name.'
//   },
//   lat: {
//     type: SchemaTypes.Double,
//     required: 'A sign needs a latitude.'
//   },
//   long: {
//     type: SchemaTypes.Double,
//     required: 'A sign needs a longitude.'
//   },
//   created_date: {
//     type: Date,
//     default: Date.now
//   }
// });

var SignSchema = new Schema({
  name: {
    type: String,
    required: 'A sign needs a name.'
  },
    coordinates: { 
      type: [Number], index: '2dsphere',
      required: 'A sign needs coordinates.'
    },
  created_date: {
    type: Date,
    default: Date.now
  }
});

//SignSchema.index({'coordinates' : '2dsphere'})

// var SignSchema = new Schema({
//   properties: {
//     name:       { type: String, required: 'A sign needs a name.' },
//     date:        { type:Date, default:Date.now }
//   },
//   geometry: {
//     coordinates: { type: [Number], index: '2dsphere'}
//   }
// });

mongoose.model('Sign', SignSchema);

module.exports = mongoose.model('Sign');