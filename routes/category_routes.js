import { Router } from "express"
import { CategoryModel } from "../db.js"

const router = Router()

router.get('/', async (req, res) => res.send(await CategoryModel.find()))

export default router
