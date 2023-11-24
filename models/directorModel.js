import { Schema, model } from 'mongoose';

const directorSchema = new Schema({
  name: { type: String, required: true },
  bio: { type: String },
  birthYear: { type: Date},
  deathYear: { type: null},
});

const Director = model('Director', directorSchema);

export default Director;
