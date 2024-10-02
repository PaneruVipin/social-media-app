const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String },
  // other keys :if needed
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

userSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});
const User = model("User", userSchema);

module.exports = User;
