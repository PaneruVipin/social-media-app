const { model, Schema } = require("mongoose");

const likeSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  post_id: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  action: { type: String, enum: ["like", "unlike"], required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

likeSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

const Like = model("Like", likeSchema);
module.exports = Like;
