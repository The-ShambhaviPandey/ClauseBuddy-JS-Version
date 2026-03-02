import mongoose, { Schema, } from "mongoose";


const chatSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  messages: [{
    role: { type: String, enum: ['user', 'ai'], required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    files: [{
      fileName: { type: String, required: true },
      fileType: { type: String, required: true },
      fileSize: { type: Number, required: true },
      filePath: { type: String, required: true }
    }]
  }]
}, {
  timestamps: true
});

export default mongoose.model("Chat", chatSchema);
