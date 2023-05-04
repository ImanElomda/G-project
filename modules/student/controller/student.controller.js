import { bloomLevelModel } from "../../../DB/model/bloomLevel.model.js";
import axios from "axios";
import { qbankModel } from "../../../DB/model/qbank.model.js";
import { studentModel } from "../../../DB/model/student.model.js";
import { DomainModel } from "../../../DB/model/Domain.model.js";
import { KolbStyleModel } from "../../../DB/model/KolbStyle.model.js";

export const addStudent = async (req, res) => {
    try {
        const { name, KolbStyle, GPDK } = req.body;
        const student = await studentModel({ name, KolbStyle, GPDK })
        const savedStudent = await student.save()
        res.json({ message: "Done", savedStudent })
    } catch (error) {
        res.json({ message: "error", error })
        console.log(error);
    } git
};
export const getStudent = async (req, res) => {
    const { studentName } = req.params
    const student = await studentModel.findOne({ studentName }).select('KolbStyle')
    if (!student) {
        res.status(500).json({ message: "error" })
    } else {
        res.json({ message: "Done", KolbStyle: student.KolbStyle })
    }


}

// const getLesssonNumber = (stKolbStyle) => {
//     const { character } = stKolbStyle

//     const KolbStyle = KolbStyleModel.findOne({character })
//     if (!KolbStyle) {
//         // res.status(500).json({ message: "error" })
//         console.log('no kolbStyle');
//         return 0
//     } else {
//         const learning_styles = KolbStyle.learning_styles

//         const indecators =[]
//         if(learning_styles.length === 1){
//             indecators.push(0);
//         }else if(learning_styles.length === 2){
//             indecators.push(0, -1);
//         }else if(learning_styles.length === 3){
//             indecators.push(0, -1, 1)
//         }else{
//             // res.status(404).json({ message: "error" })
//             return 0
//         }
//         console.log(indecators);

//         console.log(learning_styles);
//         // res.json({ message: "Done", learning_styles })
//         return indecators
//     }

// }



export const studentQuestion = async (req, res) => {
    const { GPDK, KolbStyle } = req.params
    const { bloomLevel, domain, subDomain, currentLesson } = req.body


    let question
    let { data: { activityCategories } } = await axios.get(`http://localhost:8000/api/v1/bloomLevel/getActivityCategories/${bloomLevel}`)
    // console.log(activityCategories);

    let { data: { answerFormat } } = await axios.get(`http://localhost:8000/api/v1/domain/getAnswerFormat/${domain}/${subDomain}`)

    let { data: { indecators } } = await axios.get(`http://localhost:8000/api/v1/kolbStyle/getIndecators/${KolbStyle}`)

    console.log(indecators);

    console.log(answerFormat);


    if (KolbStyle == "Divergent") {

        try {
            if (GPDK == "Beginner") {
                // question = await qbankModel.findOne({ $and: [{ $or: [{ complexity: 1 }, { complexity: 2 }] }, { indecators: 1 }] })
                // console.log(question);
                console.log("in beginner divergent");
                // console.log(activityCategories);
                question = await qbankModel.findOne({complexity: {$in: [1,2]}, indecators: indecators[0], activityCategories: activityCategories, currentLesson: currentLesson})
                // console.log(question);
                res.json({ message: `${question.questionStyle}. Present your answer using examples and images` })



            } else if (GPDK == "Intermediate") {
                console.log("in intermiate");
                question = await qbankModel.findOne({complexity: {$in: [3,4]}, indecators: indecators[1], activityCategories: activityCategories})
                console.log(question);
                // console.log(question);
                res.json({ message: `${question.questionStyle}. Present your answer using examples and images` })



            }
            else if (GPDK == "Excellent") {
                question = await qbankModel.findOne({complexity: {$in: [5,6]}, indecators: indecators[2], activityCategories: activityCategories})
                console.log(question);
                res.json({ message: `${question.questionStyle}. Present your answer using examples and images` })
            }

            else {
                res.json({ message: "Not found" })
            }


        }
        catch (error) {
            res.json({ message: "catch error", error })
            console.log(error);
        }
    } else if (KolbStyle == "Assimilator") {
        try {
            if (GPDK == "Beginner") {

                question = await qbankModel.findOne({complexity: {$in: [1,2]}, indecators: indecators[0], activityCategories: activityCategories})

                res.json({ message: `${question.questionStyle}. Present your answer in an organized shape like a table` })


            } else if (GPDK == "Intermediate") {
                question = await qbankModel.findOne({complexity: {$in: [3,4]}, indecators: indecators[1], activityCategories: activityCategories})

                res.json({ message: `${question.questionStyle}. Present your answer in an organized shape like a table` })

            }
            else if (GPDK == "Excellent") {
                question = await qbankModel.findOne({complexity: {$in: [5,6]}, indecators: indecators[2], activityCategories: activityCategories})
                res.json({ message: `${question.questionStyle}. Present your answer in an organized shape like a table` })


            } else {
                res.json({ message: "Not found" })
            }


        }
        catch (error) {
            res.json({ message: "catch error", error })
        }
    } else if (KolbStyle == "Convergent") {
        try {
            if (GPDK == "Beginner") {

                question = await qbankModel.findOne({complexity: {$in: [1,2]}, indecators: indecators[0], activityCategories: activityCategories})
                console.log(question);

                res.json({ message: `${question.questionStyle}.Present your answer as an organized shape. ${answerFormat}` })


            } else if (GPDK == "Intermediate") {
                question = await qbankModel.findOne({complexity: {$in: [3,4]}, indecators: indecators[1], activityCategories: activityCategories})
                res.json({ message: `${question.questionStyle}. Present your answer as an organized shape. ${answerFormat}` })



            }
            else if (GPDK == "Excellent") {
                question = await qbankModel.findOne({complexity: {$in: [5,6]}, indecators: indecators[1], activityCategories: activityCategories})
                res.json({ message: `${question.questionStyle}. Present your answer as an organized shape. ${answerFormat}` })


            } else {
                res.json({ message: "Not found" })
            }


        }
        catch (error) {
            res.json({ message: "catch error", error })
            console.log(error);
        }
    } else if (KolbStyle == "Accommodator") {
        try {
            if (GPDK == "Beginner") {
                question = await qbankModel.findOne({complexity: {$in: [1,2]}, indecators: indecators[0], activityCategories: activityCategories})
                console.log(question);

                res.json({ message: `${question.questionStyle}.Present your answer as a recorded video/audio that explain your opinion` })


            } else if (GPDK == "Intermediate") {
                question = await qbankModel.findOne({complexity: {$in: [3,4]}, indecators: indecators[0], activityCategories: activityCategories})

                res.json({ message: `${question.questionStyle}. Present your answer as a recorded video/audio that explain your opinion` })



            }
            else if (GPDK == "Excellent") {
                question = await qbankModel.findOne({complexity: {$in: [5,6]}, indecators: indecators[0], activityCategories: activityCategories})
                res.json({ message: `${question.questionStyle}. Present your answer as a recorded video/audio that explain your opinion` })


            } else {
                res.json({ message: "Not found" })
            }


        }
        catch (error) {
            res.json({ message: "catch error", error })
        }
    }
}
