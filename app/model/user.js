
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    phone: { type: String },
    userName: { type: String },
    password: { type: String },
    lastLoginTime: { type: Number },
  });

  return mongoose.model('User', UserSchema);
}