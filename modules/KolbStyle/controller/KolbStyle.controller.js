import { KolbStyleModel } from "../../../DB/model/KolbStyle.model.js";


export const addKolbStyle = async (req, res) => {
    try {
        const { character, learning_styles } = req.body;
        const KolbStyle = new KolbStyleModel({ character, learning_styles })
        const savedkolbStyle = await KolbStyle.save()
        res.json({ message: "Done", savedkolbStyle })
    } catch (error) {
        res.json({ message: "error", error })
        console.log(error);
    }
};
// export const getLearninStyle = async (req, res) => {
//     try {
//         const { character} = req.body;
//         const learning_styles = await KolbStyleModel.find({character}).select('learning_styles -_id')
//         if (learning_styles) {
//                console.log(learning_styles);
//         } else {
//             console.log(errorrrr);
//         }

//     } catch (error) {
//         res.json({ message: "error", error })
//         console.log(error);
//     }
// };
export const getLesssonNumber = async (req, res) => {
    const { character } = req.body
    const style = await KolbStyleModel.findOne({ character }).select('learning_styles')
    if (!style) {
        res.status(500).json({ message: "error" })
    } else {
        res.json({ message: "Done", learning_styles: style.learning_styles })
        if (style.learning_styles == "direct") {
               lessonNumber=[currentLesson,currentLesson]
        } else {

        }
    }

}