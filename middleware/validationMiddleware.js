import { object, string, date } from 'joi';

const registrationSchema = object({
  username: string().min(3).max(30).required(),
  password: string().min(6).required(),
  email: string().email().required(),
  dateOfBirth: date(),
});

const validationMiddleware = (req, res, next) => {
  const { error } = registrationSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

export default validationMiddleware;
