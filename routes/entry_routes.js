import { Router } from "express"
import { EntryModel } from "../db.js"

const router = Router()

router.get('/', async (req, res) => res.send(await EntryModel.find().populate('category')))

router.get('/:id', async (req, res) => {
    const entry = await EntryModel.findOne({_id: req.params.id })
    if (entry) {
        res.send(entry)
    } else {
        res.status(404).send({"error": "Not Found"})
    }
})

router.post('/', async (req, res) => {
    try {
        // let cat = await CategoryModel.findOne({ name: req.body.category })  
        const insertedEntry = await (await EntryModel.create(req.body)).populate('category')
        res.status(201).send(insertedEntry)
    }
    catch(err) {
        res.status(400).send({ error: err.message})
    }
})

router.put('/:id', async (req, res) => {
    try {
        const updatedEntry = await EntryModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (updatedEntry) {
            res.status(200).send(updatedEntry)
        } else {
            res.status(404).send({ error: 'Entry not found'})
        }
    }
    catch(err) {
        res.status(500).send({ error: err.message})
    }
})


router.delete('/:id', async (req, res) => {
    try {
        const deletedEntry = await EntryModel.findByIdAndDelete(req.params.id)
        if (deletedEntry) {
            res.status(204).send({ 'message': 'Entry deleted'})
        } else {
            res.status(404).send({ error: 'Entry not found'})
        }
    }
    catch(err) {
        res.status(500).send({ error: err.message})
    }
})

export default router