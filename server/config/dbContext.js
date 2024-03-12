import mongoose from 'mongoose'

const connectToDb = async () => {

    try {
        mongoose.set("strictQuery", true);
        const con = await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

        console.log("Db connected " + con.connection.host);
    } catch (error) {
        console.log("DB connection error ", error.message);
        process.exit();
    }
}

export default connectToDb;