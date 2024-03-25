import mongoose from 'mongoose';
import bcrypt from "bcrypt";
import generarId from '../helpers/generarId.js';

const veterinarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,//para tener validación en el servidor
        trim: true//para eliminar los espacios en blanco
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    telefono: {
        type: String,
        default: null,
        trim: true,
    },
    web: {
        type: String,
        default: null,
    },
    token: {
        type: String,
        default: generarId,
    },
    confirmado: {
        type: Boolean,
        default: false,
    }
});

//Antes de...
veterinarioSchema.pre("save", async function (next) {
    //Para un password que ya este hasheado, ya no lo vuelva a hashear
    if(!this.isModified("password")) {
        next();
    }
    //genSalt(): generar el salt( rondas de hasheo)
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt);
});

veterinarioSchema.methods.comprobarPassword = async function (
    passwordFormulario
) {
    return await bcrypt .compare(passwordFormulario, this.password) //compare --> nos va permitir en comprobar o comparar si es el mismo./ RETORNA TRUE O FALSE
}

const Veterinario = mongoose.model("Veterinario", veterinarioSchema);
export default Veterinario;