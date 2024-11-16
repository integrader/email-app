import mongoose from 'mongoose';

const emailStatusSchema = new mongoose.Schema({
  recipient: { type: String, required: true },
  prompt: { type: String, required: true },
  status: { type: String, enum: ['Sent', 'Failed'], default: 'Sent' },
  sentAt: { type: Date, default: Date.now },
});

export default mongoose.model('EmailStatus', emailStatusSchema);
