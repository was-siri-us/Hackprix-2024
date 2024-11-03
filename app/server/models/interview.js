import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    role : String,
    content : String,
    grade : Number
},{_id:false});

const interviewSchema = new mongoose.Schema({
    userId : String,
    conversation : [messageSchema]
})

const interview = mongoose.model("Interview",interviewSchema);

export default interview;