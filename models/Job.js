import mongoose from "mongoose"

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Please provide company name'],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, 'Please provide position'],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ['interview', 'declined', 'pending'],
      default: 'pending',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'users',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true,
    collection:'Jobs',
    versionKey:false
   }
)

const jobModel = mongoose.model('Jobs', JobSchema);

export default jobModel;