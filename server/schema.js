import mongoose from './mongoose';

const { Schema } = mongoose;

const userSchema = Schema({
  fbggId: {
    type: String,
    index: { unique: true },
    required: true,
  },
  displayName: {
    type: String,
  },
  profile: Schema.Types.Mixed,
});

const choiceArrSchema = Schema(
  {
    choiceName: {
      type: String,
      index: true,
      required: true,
      maxlength: [30, 'Label too long.'],
    },
    voteCount: {
      type: Number,
      required: true,
      min: [0, 'Negative value.'],
    },
  },
  { _id: false },
);

const pollSchema = Schema({
  pollTitle: {
    type: String,
    index: { unique: true },
    required: true,
    maxlength: [100, 'Title too long.'],
  },
  choiceArr: { type: [choiceArrSchema], required: true },
  choiceCount: {
    type: Number,
    index: true,
    required: true,
    min: [1, 'Should be at least 1.'],
  },
  voteSum: {
    type: Number,
    index: true,
    required: true,
    min: [1, 'Should be at least 1.'],
  },
  creatorId: {
    type: String,
    index: true,
    required: true,
    maxlength: [50, 'UserId too long.'],
  },
});

export const User = mongoose.model('User', userSchema);
export default mongoose.model('Poll', pollSchema);
