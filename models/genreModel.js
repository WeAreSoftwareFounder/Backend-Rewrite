import { Schema, model } from 'mongoose';

const genreSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
});

const Genre = model('Genre', genreSchema);

export default Genre;
