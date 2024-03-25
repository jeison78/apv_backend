import express, { Router } from 'express'
const router = express.Router();
import {
    registrar,
    perfil,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    actualizarPerfil,
    actualizarPassword,
} from '../controllers/veterinarioController.js';
import checkAuth from '../middleware/authMiddleware.js';

//Área publica
router.post("/", registrar);
router.get("/confirmar/:token", confirmar);//si se pone "/:"" --> esto lo hace un parametro dinamico"
router.post("/login", autenticar);
router.post('/olvide-password', olvidePassword);
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword)

//Área privada
router.get("/perfil", checkAuth, perfil );
router.put('/perfil/:id', checkAuth, actualizarPerfil);
router.put('/actualizar-password', checkAuth, actualizarPassword);

export default router;