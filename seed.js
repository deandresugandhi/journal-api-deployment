import { EntryModel, CategoryModel, closeConnection } from "./db.js"

const categories = [
    {
        name: 'Food',
    },
    {
        name: 'Gaming',
    },
    {
        name: 'Coding',
    },
    {
        name: 'Other',
    },
]

await CategoryModel.deleteMany()
console.log()
console.log('Deleted categories')
let cats = await CategoryModel.insertMany(categories)
console.log('Added categories')

const entries = [
    { category: cats[0]._id, content: 'Pizza good'},
    { category: cats[1]._id, content: 'Starfield good'},
    { category: cats[2]._id, content: 'JavaScript good'},
]

await EntryModel.deleteMany()
console.log('Deleted entries')
await EntryModel.insertMany(entries)
console.log('Added entries')

closeConnection()

