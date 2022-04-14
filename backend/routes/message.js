const router = require("express").Router();
const Message = require("../models/Messages");
const Conversation = require("../models/Conversations")

//add

router.post("/", async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get messages by conversationId

router.get("/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete messages by conversation id
// Fix this
router.delete("/:conversationId", async (req, res) => {
  const userId = req.body.userId;
  try {
    const conversation = await Conversation.findById(req.params.conversationId);
    if((conversation.members.includes(userId) && !conversation.isGroup) || conversation.creatorId == userId) {
      const messages = await Message.deleteMany({
        conversationId: req.params.conversationId,
      });
      res.status(200).json(messages);
    }
    else {
      res.status(401).json("Unauthorized to delete conversation");
    }
  } catch (err) {
    res.status(500).json(err);
  }
  });

module.exports = router;