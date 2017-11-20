var mongoose = require('mongoose');
var Schema = mongoose.Schema;

require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;



var SignSchema = new Schema({
  name: {
    type: String,
    required: 'A sign needs a name.',
    enum: ['SPEED_LIMIT_30', 'SPEED_LIMIT_50', 'SPEED_LIMIT_70', 'PASSING_RESTRICTION', 'STOP', 'NO_PARKING', 'NO_U_TURN', 'NO_LEFT_TURN', 'NO_RIGHT_TURN', 'NO_TRUCK', 'RIGHT_TURN_AHEAD', 'LEFT_TURN_AHEAD']
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


mongoose.model('Sign', SignSchema);

module.exports = mongoose.model('Sign');