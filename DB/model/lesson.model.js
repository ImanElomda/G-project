import { Schema, model, Types } from "mongoose";

const lessonSchema = new Schema({
    name: { type: String, required: true },
    concepts: {type:String},
    bloomLevel:{type:String},
    studentId:{ type: Types.ObjectId, ref: 'Student', required: true}

}, {
    timestamps: true
})

export const lessonModel = model('Lesson', lessonSchema)