import express from 'express';
import Interview from '../models/interview.js'

const router = express.Router();

router.route("/save").post(async (req, res) => {
    try {
        const {userId, conversation} = req.body;
        const inter = await Interview.findOne({userId: userId, conversation: conversation});
        if(!inter){
            await new Interview({userId: userId,conversation: conversation}).save();
            return res.json({"status":"Interview Saved."});
        }else return res.json({"status":"Interview Already Saved"});
    } catch (error) {
        console.log(error);
        return res.json({"status":"There was a problem."}).status(500);
    }
})

export default router;