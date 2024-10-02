const { Schema, model } = require("mongoose");

const postSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true }, 
  content: { type: String, required: true },
  // all other column here
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

postSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

const Post = model("Post", postSchema);

module.exports = Post;
