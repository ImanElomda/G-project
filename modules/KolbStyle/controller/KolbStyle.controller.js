import { KolbStyleModel } from "../../../DB/model/KolbStyle.model.js";


export const addKolbStyle = async (req, res) => {
    try {
        const { character, learning_styles } = req.body;
        const KolbStyle = new KolbStyleModel({ character, learning_styles})
        const savedkolbStyle = await KolbStyle.save()
        res.json({ message: "Done", savedkolbStyle })
    } catch (error) {
        res.json({ message: "error", error })
        console.log(error);
    }
};
export const getLearninStyle = async (req, res) => {
    try {
        const { character} = req.body;
        const learning_styles = await KolbStyleModel.find({learning_styles})
        const savedkolbStyle = await KolbStyle.save()
        res.json({ message: "Done", savedkolbStyle })
    } catch (error) {
        res.json({ message: "error", error })
        console.log(error);
    }
};