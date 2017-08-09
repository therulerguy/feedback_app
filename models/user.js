const mongoose = require('mongoose');

// const Schema = mongoose.Schema is the same as below
// basically saying this mongoose object has a property called Schema and assign it
// to Schema

const { Schema } = mongoose;

// using the Schema object to define every individual record

const userSchema = new Schema({
    googleId: String
});

// model creates a new collection
// first argument for model is collection, second is schema
mongoose.model('users', userSchema);