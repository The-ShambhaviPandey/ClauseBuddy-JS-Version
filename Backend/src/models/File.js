import mongoose, { Schema, } from "mongoose";











const fileSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  fileName: { type: String, required: true }, // stored filename
  originalName: { type: String, required: true }, // original filename
  fileType: { type: String, required: true },
  fileSize: { type: Number, required: true },
  filePath: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now }
});

export default mongoose.model("File", fileSchema);
