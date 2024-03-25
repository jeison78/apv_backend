import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors';
import conectarDB from './config/db.js';
import VeterinarioRoutes from './routes/veterinarioRoutes.js';
import pacienteRoutes from "./routes/pacienteRoutes.js";

const app = express();
app.use(express.json());//de esta forma le decimos que le vamos enviar datos de tipo json

dotenv.config();//Va escanear y va buscar el archivo ".env" automaticamente

conectarDB();

//Permitir ingresar al dominio de la API
const dominiosPermitidos = [process.env.FRONTEND_URL];

//Configuración de Cors
const corsOptions = {
    origin: function (origin, callback) {
        if (dominiosPermitidos.indexOf(origin) !== -1) {
            //El Origen del Request esta permitido
            callback(null, true)
        } else {
            callback(new Error('No permitido por CORS'));
        }
    },
};

app.use(cors(corsOptions));

app.use("/api/veterinarios", VeterinarioRoutes);
app.use("/api/pacientes", pacienteRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});