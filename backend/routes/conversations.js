const router = require("express").Router();
const Conversation = require("../models/Conversations");
const User = require("../models/User");
const verifyToken = require("../verifyToken").verifyToken;

//create convo
router.post("/:userId", async (req, res) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
        title: req.body.title,
        creatorId: req.params.userId
    });

    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get convos of a user

router.get("/:userId", async (req, res) => {
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId] },
        });
        res.status(200).json(conversation);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE a conversation
router.delete("/:userId", async (req, res) => {
    conversationId = req.body.conversationId;
    userId = req.params.userId;
    try{
        const conversation = await Conversation.findById(conversationId);
        if(conversation.creatorId == userId) {
            Conversation.findByIdAndDelete(conversationId);
            res.status(200).statusMessage("Successfully deleted conversation")
        }
        else {
            res.status(401).statusMessage("You do not have authorization to delete this conversation")
        }
    } catch (err) {
        res.status(500).json(err);
    }
})

// Join/Leave a conversation
router.put("/:id/join", verifyToken, async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const conversation = await Conversation.findById(req.body.conversationId);
      if (!user.conversations.includes(req.body.conversationId)) {
        await user.updateOne({ $push: { conversations: req.body.conversationId } });
        await conversation.updateOne({ $push: { members: req.params.id } });
        res.status(200).json("The conversation has been joined");
      } else {
        await user.updateOne({ $pull: { conversations: req.body.conversationId } });
        await conversation.updateOne({ $pull: { members: req.params.id } });
        res.status(200).json("The conversation has been left");
      }
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get("/searchconversations/:conversation", async (req, res) => {
    try {
        const convos = await Conversation.find({ title: { $regex: '.*' + req.params.conversation + '.*', '$options' : 'i'} }).limit(10);
        res.status(200).json(convos);
      } catch (err) {
        res.status(500).json(err);
      }
});

module.exports = router;