const router = require("express").Router();
const Conversation = require("../models/Conversations");

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

//get conv of a user

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

//DELETE THIS API
// get conv includes two userId

router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
    try {
        const conversation = await Conversation.findOne({
            members: { $all: [req.params.firstUserId, req.params.secondUserId] },
        });
        res.status(200).json(conversation)
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;