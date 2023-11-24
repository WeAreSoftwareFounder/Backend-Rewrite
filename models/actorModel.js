import { Schema, model } from 'mongoose';

const actorSchema = new Schema({
  name: { type: String, required: true },
  // Add other actor-related fields as needed
});

const Actor = model('Actor', actorSchema);

export default Actor;
