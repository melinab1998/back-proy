import mongoose from 'mongoose'

const usersSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    /* required: true, */
    unique: true,
  },
  age: {
    type: Number,
    required: true,
    default: 0
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'user'
  },
  cart:{
    type: mongoose.SchemaTypes.ObjectId,
    ref:'carts'
  },
  isGithub: {
    type: Boolean,
    required: true,
    default: false
  },
  documents:[{
    name: {
        type: String,
        required: true
    },
    reference: {
        type: String,
        required: true
    },
    _id: false
  }], 
  last_connection:{
    type: Date
  },
  uploadedDocuments:{
    type: Boolean,
    default: false
  }  
})

export const userModel = mongoose.model('Users',usersSchema)