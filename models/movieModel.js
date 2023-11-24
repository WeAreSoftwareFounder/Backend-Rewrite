import { Schema, model } from 'mongoose';

const movieSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  genre: { type: Schema.Types.ObjectId, ref: 'Genre' },
  director: { type: Schema.Types.ObjectId, ref: 'Director' },
  actors: [{ type: Schema.Types.ObjectId, ref: 'Actor' }],
  imageUrl: { type: String },
  isFeatured: { type: Boolean, default: false },
});

const Movie = model('Movie', movieSchema);

export default Movie;
