import { bloomLevelModel } from "../../../DB/model/bloomLevel.model.js";

export const addBloomLevel = async (req, res) => {
    try {
        const { bloomLevel, activityCategories } = req.body;
        const BloomLevel = new bloomLevelModel({ bloomLevel, activityCategories })
        const savedBloomLeve = await BloomLevel.save()
        res.json({ message: "Done", savedBloomLeve })
    } catch (error) {
        res.json({ message: "error", error })
        console.log(error);
    }
};

export const getActivityCategories = async (req, res) => {
    const { bloomLevel } = req.params
    const { activityCategories: [Category] } = await bloomLevelModel.findOne({ bloomLevel }).select('activityCategories')
    if (!Category) {
        res.status(500).json({ message: "error" })
    } else {
        res.json({ message: "Done", Category })
    }

}
