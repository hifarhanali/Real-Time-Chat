import mongoose from 'mongoose'

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
    lastMessageAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

export default mongoose.model("Conversation", ConversationSchema);