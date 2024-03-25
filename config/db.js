import mongoose from 'mongoose'
import dotenv from 'dotenv';

dotenv.config()

const conectarDB = async () => {
    try {
        const db = await mongoose.connect(
        process.env.MONGO_URI
        // ,
        // {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        // }
        );
        
        //Aquí me dará una URL y el puerto en el que se esta conectando
        const url = `${db.connection.host}:${db.connection.port}`
        console.log(`MongoDB conectado en: ${url}`);
    } catch (error) {
        console.log(`error: ${error.message}`);
        process.exit(1);//con este código nos va a imprimir un mensaje de error
    }
}

export default conectarDB;