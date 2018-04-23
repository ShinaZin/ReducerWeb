import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt-nodejs';

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: {unique: true}
  },
  profile: {
    local: {
      password: {
        type: String,
        required: true
      },
      isActivated: {
        type: Boolean,
        required: true,
        default: false
      },
      activation: {
        token: {
          type: String
        },
        created: {
          type: Date
        }
      },
      reset: {
        token: {
          type: String
        },
        created: {
          type: Date
        }
      }
    },
    google: {},
    facebook: {}
  }
});

// generating a hash
schema.methods.generateHash = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

module.exports = mongoose.model('User', schema);
