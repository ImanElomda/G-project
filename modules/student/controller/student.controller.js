import { bloomLevelModel } from "../../../DB/model/bloomLevel.model.js";
import axios from "axios";
import { qbankModel } from "../../../DB/model/qbank.model.js";
import { studentModel } from "../../../DB/model/student.model.js";
import { DomainModel } from "../../../DB/model/Domain.model.js";

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



export const studentQuestion = async (req, res) => {
    const { GPDK, KolbStyle } = req.params
    const { bloomLevel, domain, subDomain } = req.body
    let question
    let { data: { Category } } = await axios.get(`http://localhost:3000/api/v1/bloomLevel/getActivityCategories/${bloomLevel}`)

    let { data: { answerFormat } } = await axios.get(`http://localhost:3000/api/v1/domain/getAnswerFormat/${domain}/${subDomain}`)
    console.log(answerFormat);

    // console.log(Category);
    if (KolbStyle == "Divergent") {
        try {
            if (GPDK == "Beginner") {
                question = await qbankModel.findOne({ $or: [{ complexity: 1 }, { complexity: 2 }] })
                // console.log(question);

                res.json({ message: `${question.questionStyle}. Present your answer using examples and images` })



            } else if (GPDK == "Intermediate") {
                question = await qbankModel.findOne({ $or: [{ complexity: 3 }, { complexity: 4 }] })
                // console.log(question);
                res.json({ message: `${question.questionStyle}. Present your answer using examples and images` })



            }
            else if (GPDK == "Excellent") {
                question = await qbankModel.findOne({ $or: [{ complexity: 5 }, { complexity: 6 }] })
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
                question = await qbankModel.findOne({ $or: [{ complexity: 1 }, { complexity: 2 }] })
                console.log(question);

                res.json({ message: `${question.questionStyle}. Present your answer in an organized shape like a table` })


            } else if (GPDK == "Intermediate") {
                question = await qbankModel.findOne({ $or: [{ complexity: 3 }, { complexity: 4 }] })

                res.json({ message: `${question.questionStyle}. Present your answer in an organized shape like a table` })

            }
            else if (GPDK == "Excellent") {
                question = await qbankModel.findOne({ $or: [{ complexity: 5 }, { complexity: 6 }] })
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

                question = await qbankModel.findOne({ $or: [{ complexity: 1 }, { complexity: 2 }] })
                console.log(question);

                res.json({ message: `${question.questionStyle}.Present your answer as an organized shape. ${answerFormat}` })


            } else if (GPDK == "Intermediate") {
                question = await qbankModel.findOne({ $or: [{ complexity: 3 }, { complexity: 4 }] })
                res.json({ message: `${question.questionStyle}. Present your answer as an organized shape. ${answerFormat}` })



            }
            else if (GPDK == "Excellent") {
                question = await qbankModel.findOne({ $or: [{ complexity: 5 }, { complexity: 6 }] })
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
                question = await qbankModel.findOne({ $or: [{ complexity: 1 }, { complexity: 2 }] })
                console.log(question);

                res.json({ message: `${question.questionStyle}.Present your answer as a recorded video/audio that explain your opinion` })


            } else if (GPDK == "Intermediate") {
                question = await qbankModel.findOne({ $or: [{ complexity: 3 }, { complexity: 4 }] })

                res.json({ message: `${question.questionStyle}. Present your answer as a recorded video/audio that explain your opinion` })



            }
            else if (GPDK == "Excellent") {
                question = await qbankModel.findOne({ $or: [{ complexity: 5 }, { complexity: 6 }] })
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
