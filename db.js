import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

try {
    const m = await mongoose.connect(process.env.DB_URI)
    console.log(m.connection.readyState === 1 ? 'MongoDB connected!' : 'MongoDB failed to connect')
}
catch (err) {
    console.error(err)
}

const closeConnection = () => { 
    console.log('Disconnecting...')
    mongoose.disconnect() 
}

process.on('SIGINT', async () => {
    try {
        console.log('Disconnecting...');
        mongoose.disconnect();
        console.log('Disconnected from MongoDB. Exiting process.');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
});

const entriesSchema = new mongoose.Schema({
    category: { type: mongoose.ObjectId, ref: 'Category' },
    content: { type: String, required: true }
})

const categoriesSchema = new mongoose.Schema({
    name: { type: String, required: true}
})

const EntryModel = mongoose.model('Entry', entriesSchema)

const CategoryModel = mongoose.model('Category', categoriesSchema)


export { closeConnection, EntryModel, CategoryModel }