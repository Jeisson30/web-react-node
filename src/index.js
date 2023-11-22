import express  from 'express'
import { pool } from './db.js'
import cors from 'cors'

const app = express()
app.use(cors());
app.use(express.json());


app.get('/ping', async (req, res) => {
    const [nombre] = await pool.query('SELECT "PONG" AS nombre' )
    res.json(nombre[0])
})

//crear usuario

app.post('/api/createUser', async (req, res) => {
    try {
        const { nombre, fechaNacimiento, sexo } = req.body;

        // Formatea la fecha a un formato compatible con MySQL 
        const formattedFechaNacimiento = new Date(fechaNacimiento).toISOString().split('T')[0];

        const result = await pool.query('INSERT INTO registros (nombre, fecha, sexo) VALUES (?, ?, ?)', [nombre, formattedFechaNacimiento, sexo]);
        res.status(200).json({ message: 'Usuario registrado con éxito' });
    
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ message: 'Hubo un error al registrar el usuario' });
    }
});

// Consultar todos los usuarios
app.get('/api/getUsers', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM registros');
        res.status(200).json(result);
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).json({ message: 'Hubo un error al obtener los usuarios' });
    }
});

//Eliminar usuarios

app.delete('/api/deleteUser/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query('DELETE FROM registros WHERE id = ?', [id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Usuario eliminado con éxito' });
        } else {
            res.status(404).json({ message: 'Eliminado' });
        }
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(500).json({ message: 'Hubo un error al eliminar el usuario' });
    }
});

// Actualizar usuario 

app.patch('/api/updateUser/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, fechaNacimiento, sexo } = req.body;

        // Formatea la fecha 
        const formattedFechaNacimiento = new Date(fechaNacimiento).toISOString().split('T')[0];

        const result = await pool.query('UPDATE registros SET nombre = ?, fecha = ?, sexo = ? WHERE id = ?', [nombre, formattedFechaNacimiento, sexo, id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Usuario actualizado con éxito' });
        } else {
            res.status(404).json({ message: 'Actualizado' });
        }
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(500).json({ message: 'Actuliza' });
    }
});





app.listen(3001, () => {
    console.log('ejecuto puerto 3001');
})

