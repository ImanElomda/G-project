import { bloomLevelModel } from "../../../DB/model/bloomLevel.model.js";
import axios from "axios";
import { qbankModel } from "../../../DB/model/qbank.model.js";
import { studentModel } from "../../../DB/model/student.model.js";

export const addStudent = async (req, res) => {
    try {
        const { name, KolbStyle, GPDK } = req.body;
        const student = await studentModel({ name, KolbStyle, GPDK })
        const savedStudent = await student.save()
        res.json({ message: "Done", savedStudent })
    } catch (error) {
        res.json({ message: "error", error })
        console.log(error);
    }
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



export const studentQuestion = async (req, res) => {
    const { GPDK, KolbStyle } = req.params
    const{bloomLevel}=req.body
    let question
    let {data:{Category}} = await axios.get(`http://localhost:3000/api/v1/bloomLevel/getActivityCategories/${bloomLevel}`)
    console.log(Category);
    if (KolbStyle == "Divergent") {
        try {
            if (GPDK == "Beginner") {
                question = await qbankModel.findOne({ $or: [{ complexity: 0 }, { complexity: 1 }] })
                // console.log(question);

                res.json({ message: `${question.questionStyle}. Present your answer using examples and images` })



            } else if (GPDK == "Intermediate") {
                question = await qbankModel.findOne({ complexity: 2 })
                // console.log(question);
                res.json({ message: `${question.questionStyle}. Present your answer using examples and images` })



            }
            else if (GPDK == "Excellent") {
                question = await qbankModel.find({ complexity: 3 })
                for (let qNum = 0; qNum < question.length; qNum++) {
                    const element = question[qNum];
                    res.json({ message: `${question[qNum].questionStyle}. Present your answer using examples and images` })
                }

            } else {
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
                question = await qbankModel.findOne({ $or: [{ complexity: 0 }, { complexity: 1 }] })
                console.log(question);

                res.json({ message: `${question.questionStyle}. Present your answer in an organized shape like a table` })


            } else if (GPDK == "Intermediate") {
                question = await qbankModel.find({ complexity: 2 })
                for (let qNum = 0; qNum < question.length; qNum++) {
                    const element = question[qNum];
                    res.json({ message: `${question[qNum].questionStyle}. Present your answer in an organized shape like a table` })
                }


            }
            else if (GPDK == "Excellent") {
                question = await qbankModel.find({ complexity: 3 })
                for (let qNum = 0; qNum < question.length; qNum++) {
                    const element = question[qNum];
                    res.json({ message: `${question[qNum].questionStyle}. Present your answer in an organized shape like a table` })
                }

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

                question = await qbankModel.findOne({ $or: [{ complexity: 0 }, { complexity: 1 }] })
                console.log(question);

                res.json({ message: `${question.questionStyle}.Present your answer as an organized shape. Describe your experiment together with your conclusion` })


            } else if (GPDK == "Intermediate") {
                question = await qbankModel.find({ complexity: 2 })
                for (let qNum = 0; qNum < question.length; qNum++) {
                    const element = question[qNum];
                    res.json({ message: `${question[qNum].questionStyle}. Present your answer as an organized shape. Describe your experiment together with your conclusion` })
                }


            }
            else if (GPDK == "Excellent") {
                question = await qbankModel.find({ complexity: 3 })
                for (let qNum = 0; qNum < question.length; qNum++) {
                    const element = question[qNum];
                    res.json({ message: `${question[qNum].questionStyle}. Present your answer as an organized shape. Describe your experiment together with your conclusion` })
                }

            } else {
                res.json({ message: "Not found" })
            }


        }
        catch (error) {
            res.json({ message: "catch error", error })
        }
    } else if (KolbStyle == "Accommodator") {
        try {
            if (GPDK == "Beginner") {
                question = await qbankModel.findOne({ $or: [{ complexity: 0 }, { complexity: 1 }] })
                console.log(question);

                res.json({ message: `${question.questionStyle}.Present your answer as a recorded video/audio that explain your opinion` })


            } else if (GPDK == "Intermediate") {
                question = await qbankModel.find({ complexity: 2 })
                for (let qNum = 0; qNum < question.length; qNum++) {
                    const element = question[qNum];
                    res.json({ message: `${question[qNum].questionStyle}. Present your answer as a recorded video/audio that explain your opinion` })
                }


            }
            else if (GPDK == "Excellent") {
                question = await qbankModel.find({ complexity: 3 })
                for (let qNum = 0; qNum < question.length; qNum++) {
                    const element = question[qNum];
                    res.json({ message: `${question[qNum].questionStyle}. Present your answer as a recorded video/audio that explain your opinion` })
                }

            } else {
                res.json({ message: "Not found" })
            }


        }
        catch (error) {
            res.json({ message: "catch error", error })
        }
    }
}
