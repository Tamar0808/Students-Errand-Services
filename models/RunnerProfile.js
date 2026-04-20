import mongoose from 'mongoose';

const RunnerProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  rating: {
    type: Number,
    default: 5.0,
    min: 0,
    max: 5,
  },
  completedCount: {
    type: Number,
    default: 0,
  },
  acceptRate: {
    type: Number,
    default: 100,
    min: 0,
    max: 100,
  },
});

export default mongoose.models.RunnerProfile || mongoose.model('RunnerProfile', RunnerProfileSchema);
