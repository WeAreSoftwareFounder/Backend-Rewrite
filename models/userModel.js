import { Schema, model } from 'mongoose';
import { hash } from 'bcrypt';

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dateOfBirth: { type: Date },
  favorites: [{
    movie: { type: Schema.Types.ObjectId, ref: 'Movie' },
    actors: [{ type: Schema.Types.ObjectId, ref: 'Actor' }],
  }],
});

// Hash the password before saving to the database
userSchema.pre('save', async function (next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  const hashedPassword = await hash(user.password, 10);
  user.password = hashedPassword;
  next();
});

const User = model('User', userSchema);

export default User;
