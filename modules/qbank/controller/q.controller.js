import { qbankModel } from "../../../DB/model/qbank.model.js";

export const addQuestion = async (req, res) => {
    try {
        const { questionStyle, complexity, domain, subDomain, concept } = req.body;
        const Myquestion = new qbankModel({ questionStyle, complexity,domain, subDomain, concept  })
        const savedquestion = await Myquestion.save()
        res.json({ message: "Done", savedquestion })
    } catch (error) {
        res.json({ message: "error", error })
        console.log(error);
    }

}
// export const addQuestion2 = async (req, res) => {
//     try {
//         const { questionStyle, complexity } = req.body;
//         const Myquestion = new qbankModel({ questionStyle, complexity })
//         const savedquestion = await Myquestion.save()
//         res.json({ message: "Done", savedquestion })
//     } catch (error) {
//         res.json({ message: "error", error })
//         console.log(error);
//     }

// }
// export const addQuestion3 = async (req, res) => {
//     try {
//         const { questionStyle, complexity } = req.body;
//         const Myquestion = new qbankModel({ questionStyle, complexity })
//         const savedquestion = await Myquestion.save()
//         res.json({ message: "Done", savedquestion })
//     } catch (error) {
//         res.json({ message: "error", error })
//         console.log(error);
//     }

// }
// export const addQuestion4 = async (req, res) => {
//     try {
//         const { questionStyle, complexity } = req.body;
//         const Myquestion = new qbankModel({ questionStyle, complexity })
//         const savedquestion = await Myquestion.save()
//         res.json({ message: "Done", savedquestion })
//     } catch (error) {
//         res.json({ message: "error", error })
//         console.log(error);
//     }

// }


export const getQuestion = async (req, res) => {
    const { complexity } = req.params
    const question1 = await qbankModel.findOne({ complexity })
    if (!question1) {
        res.status(500).json({ message: "error" })
    } else {
        res.json({ message: `${question1.questionStyle}` })
        // res.json({ message: `Compare between ${question1.c1} and ${question1.c2}` })
    }


}