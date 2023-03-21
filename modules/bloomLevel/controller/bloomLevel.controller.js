import { bloomLevelModel } from "../../../DB/model/bloomLevel.model.js";

export const addBloomLevel = async (req, res) => {
    try {
        const { bloomLevel, ActivityCategories } = req.body;
        const BloomLevel = new bloomLevelModel({ bloomLevel, ActivityCategories })
        const savedBloomLeve = await BloomLevel.save()
        res.json({ message: "Done", savedBloomLeve })
    } catch (error) {
        res.json({ message: "error", error })
        console.log(error);
    }
};

export const getActivityCategories = async (req, res) => {
    const { bloomLevel } = req.params
    const { ActivityCategories: [Category] } = await bloomLevelModel.findOne({ bloomLevel }).select('ActivityCategories')
    if (!Category) {
        res.status(500).json({ message: "error" })
    } else {
        res.json({ message: "Done", Category })
    }

}
