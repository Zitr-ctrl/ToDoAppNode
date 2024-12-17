import {Router} from 'express'
import pool from '../database.js'

const router = Router();

router.get('/add', (req,res)=>{
    res.render('personas/add');
});

router.post('/add', async(req, res)=>{
    try {
        const {name, lastname, age} = req.body;
        const newPersona = {
            name, lastname, age
        }
        await pool.query('INSERT INTO Personas Set ?', [newPersona])
        res.redirect('list');
    } catch (error) {
        res.status(500).json({message:err.message});
    }
})

router.get('/list', async(req, res)=>{
    try {
        const [result] = await pool.query('SELECT * FROM Personas');
        res.render('personas/list', {personas: result});
    } catch (error) {
        res.status(500).json({message:err.message});
    }
})

router.get('/edit/:id', async (req, res)=>{
    try {
        const {id} = req.params;
        const [persona] = await pool.query("SELECT * FROM Personas WHERE id = ?", [id]);
        const personaEdit = persona[0];
        res.render('personas/edit', {persona: personaEdit});

    } catch (error) {
        res.status(500).json({message:err.message});
    }
})

router.post('/edit/:id', async(req, res)=>{
    try {
        const {name, lastname, age} = req.body;
        const {id} = req.params;
        const editPersona = {name, lastname, age};
        await pool.query('UPDATE Personas Set ? Where id = ?', [editPersona, id])
        res.redirect('/list');
    } catch (error) {
        res.status(500).json({message:err.message});
    }
})

router.get('/delete/:id', async(req, res)=>{
    try {
        const {id} = req.params;
        await pool.query("Delete From Personas Where id = ?", [id])
        res.redirect("/list")
    } catch (error) {
        res.status(500).json({message:err.message});
    }
})

export default router;