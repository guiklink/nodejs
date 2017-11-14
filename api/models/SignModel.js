var mongoose = require('mongoose');
var Schema = mongoose.Schema;

require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;


var SignSchema = new Schema({
  name: {
    type: [{
      type: String,
      enum: ['pending', 'ongoing', 'completed']
    }],
    required: "A sign needs a name."
  },
  lat: {
    type: SchemaTypes.Double,
    required: 'A sign needs a latitude.'
  },
  long: {
    type: SchemaTypes.Double,
    required: 'A sign needs a longitude.'
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Sign', SignSchema);

module.exports = mongoose.model('Sign');