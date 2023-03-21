import { lessonModel } from "../../../DB/model/lesson.model.js"


export const addLessons = async (req, res) => {
    try {
        const { name, concept, bloomLevel } = req.body;
        const { studentId } = req.params
        const lesson = new lessonModel({ name, concept, bloomLevel,studentId })
        const savedlesson = await lesson.save()
        res.json({ message: "Done", savedlesson })
    } catch (error) {
        res.json({ message: "error", error })
        console.log(error);
    }
};



export const getLesson = async (req, res) => {
    const { lessonName } = req.params
    const lesson = await lessonModel.findOne({ lessonName }).select('concept bloomLevel')
    if (!lesson) {
        res.status(500).json({message:"error"})
    } else {
        res.json({message:"Done",concept:lesson.concept,bloomLevel:lesson.bloomLevel})
    }


}