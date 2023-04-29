import { Router } from "express";
import * as kc from './controller/KolbStyle.controller.js'
const router = Router()

router.post("/addkolbStyle",kc.addKolbStyle)
router.get("/getLesssonNumber",kc.getLesssonNumber)
export default router