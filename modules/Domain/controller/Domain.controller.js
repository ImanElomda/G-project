import { DomainModel } from "../../../DB/model/Domain.model.js";

export const addDomain = async (req, res) => {
    try {
        const { domain, subDomain, answerFormat } = req.body;
        const Domain = new DomainModel({ domain, subDomain, answerFormat })
        const savedDomain = await Domain.save()
        res.json({ message: "Done", savedDomain })
    } catch (error) {
        res.json({ message: "error", error })
        console.log(error);
    }
};

export const getAnswerFormat = async (req, res) => {

    const { domain, subDomain } = req.params
    try {
        const subDomain1 = await DomainModel.find({ domain }).select('subDomain')
        console.log(subDomain1);
        if (!subDomain1.subDomain == "null") {
            const answerFormat = await DomainModel.findOne(subDomain).select('answerFormat')
            if (!answerFormat) {
                res.status(500).json({ message: "error" })
            } else {
                res.json({ message: "Done", answerFormat })
            }
        } else {
            const answerFormat = await DomainModel.find({ domain }).select('answerFormat')
            if (!answerFormat) {
                res.status(500).json({ message: "error" })
            } else {
                res.json({ message: "Done", answerFormat })
            }
        }
    } catch (error) {
        res.json({ message: "error Catch", error })
    }
}





