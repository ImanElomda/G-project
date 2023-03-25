import { Schema, model, Types } from "mongoose";

const qSchema = new Schema({
    questionStyle: { type: String, required: true },
    complexity: { type: Number },
    domain: { type: String },
    subDomain: { type: String },
    concept: { type: String },
    answerFormat:{type:String},
    ActivityCategories:{type:String},
    lessonName:{type:String}
    // reciverId: { type: Types.ObjectId, ref: 'Student', required: true }


}, {
    timestamps: true
})

export const qbankModel = model('qbank', qSchema)