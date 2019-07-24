const express = require('express');
const router = express.Router();
const fileupload = require('express-fileupload');
const Usuario = require('../models/usuario');

router.get('/', (req, res)=>{
    res.render('index');
})

router.get('/listado', async (req, res)=>{
    usuario = await Usuario.find();    
    res.render('listado',{usuario});
})

router.get('/delete/:id', async (req, res)=>{
    const {id} = req.params;
    await Usuario.remove({_id : id});
    res.redirect('/listado');
})

router.post('/update/:id', async(req, res)=>{    
    const {id} = req.params;
    await Usuario.update({_id : id}, req.body);
    res.redirect('/listado');

})

router.get('/edit/:id', async (req, res)=>{
    const {id} = req.params;
    const usuario = await Usuario.findById(id);
    res.render('edit', {usuario});
})

router.post('/add', async (req, res)=>{  
     let sampleFile = req.files.image;
     req.body.image = sampleFile.name;
     sampleFile.mv("src/img/"+ sampleFile.name, function(err){
         if(err) return res.status(500).send(err);
     });

    const data = new Usuario(req.body);
    console.log(data);
    await data.save();     
    res.redirect('/listado');
})


module.exports = router;