import { Router } from "express";
import * as kc from './controller/KolbStyle.controller.js'
const router = Router()

router.post("/addkolbStyle",kc.addKolbStyle)
export default router