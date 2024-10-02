const { Schema, model } = require("mongoose");

const followerSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  follower_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  action: {
    type: String,
    enum: ["follow", "unfollow"],
    default: "follow",
    required: true,
  },
  followed_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

followerSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

const Follower = model("Follower", followerSchema);
module.exports = Follower;
