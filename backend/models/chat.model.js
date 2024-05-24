const mongoose = require('mongoose');

const ChatModel = mongoose.Schema(
    {
        chatName: {type: String, trim:true},
        groupChat: {type: Boolean, default:false},
        users:[{type: mongoose.Schema.Types.ObjectId, ref:'users'}],
        latestMessage:{
            type: mongoose.Schema.Types.ObjectId, ref:'message'
        },
        groupAdmin:{
            type: mongoose.Schema.Types.ObjectId, ref:'users'
        }
    },
    {timestamps: true}
);

const Chat = mongoose.model("chat", ChatModel)
module.exports = Chat;