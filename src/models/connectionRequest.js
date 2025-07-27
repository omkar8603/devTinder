const mongoose = require('mongoose');


const connectionRequestSchema = new mongoose.Schema({
    fromUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
    },
    toUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
    },
    status: {
    type: String,
    required: true,
    enum: {
        values: ['interested', 'ignored', 'accepted', 'rejected'],
        message: `{VALUE} is not a valid status`
    }
}

} ,{ timestamps : true})

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

connectionRequestSchema.pre('save', async function (next) {
    const connectionRequest = this;
    // Check if the fromUserId and toUserId are the same
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("you cannot send a connection request to yourself");
    }
    next();
})


const ConnectionRequest = mongoose.model('ConnectionRequest', connectionRequestSchema);
module.exports = ConnectionRequest;


