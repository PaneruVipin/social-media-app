const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const Follower = require("../models/Follower");
const Like = require("../models/Like");

router.get("/feed", async (req, res) => {
  // const { userId } = req.loggedInUser;  // Method in authmiddleware but this time not implemented so:
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }
  try {
    const followedUsers = await Follower.find({
      follower_id: userId,
      action: "follow",
    }).select("user_id");
    const followedUserIds = followedUsers.map((f) => f.user_id);
    const posts = await Post.find({ user_id: { $in: followedUserIds } })
      .populate("user_id", "name image")
      .lean();

    const enrichedPosts = await Promise.all(
      posts.map(async (post) => {
        const likes = await Like.find({
          post_id: post._id,
          action: "like",
        }).populate("user_id", "name image");
        const likedByUser = await Like.exists({
          post_id: post._id,
          user_id: userId,
          action: "like",
        });

        return {
          ...post,
          likes: likes.map((like) => ({
            likedAt: like.updated_at,
            user: like.user_id.name,
            image: like.user_id.image,
          })),
          likedByUser: Boolean(likedByUser),
          likeCount: likes.length,
        };
      })
    );

    res.json({ posts: enrichedPosts });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the feed." });
  }
});

module.exports = router;
