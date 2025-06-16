const mongoose= require('mongoose');

const interviewSchema = new mongoose.Schema({
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required : true
    },
    type: {
        type: String,
        enum : ['Frontend','Backend','Full-stack','Behavioral'],
        required : true
    },
    dateTime : {
        type: Date,
        required: true
    },
    interviewer : {
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ['upcoming','completed'],
        default: 'upcoming'
    },
    feedback : {
        type: String
    },
    score:{
        type: Number
    },
    result: {
        type :String,
        enum : ['pass','fail','pending'],
        default : 'pending'
    }
},{
    timestamps: true
}
   
  );

 module.exports = mongoose.model('Interview',interviewSchema);