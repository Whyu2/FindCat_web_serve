var express = require('express');
var router = express.Router();
const Validator = require('fastest-validator');


const { Post} = require('../models');
const v = new Validator;
/* GET users listing. */

router.post('/', async (req, res) => {
  const { nama, id_hewan, daerah, lokasimap, jenis, kelamin, informasi} = req.body;
    const schema = {
        nama: 'string',
        id_hewan: 'string',
        daerah: 'string',
        lokasimap: 'string',
        jenis: 'string',
        kelamin: 'string',
        informasi: 'string|optional'
    }
      const validate = v.validate(req.body, schema);
      if(validate.length){
        return res
        .status(400)
        .json(validate);
       }
       //Uji coba date
       const tgl_hilang	 = new Date().toISOString();
        const newPost = {
        nama, id_hewan, daerah, lokasimap,tgl_hilang, jenis, kelamin, informasi
     };

      const post = await Post.create(newPost);
      res.json(post);
  });

  router.put('/:id',async  (req, res) => {
    const { nama, id_hewan, daerah, lokasimap, jenis, kelamin, informasi} = req.body;
    const id = req.params.id;
    let post = await Post.findByPk(id);

    if(!post){
       return res.json({message : 'Data post tidak ditemukan'});
      }

      const schema = {
        nama: 'string|optional',
        id_hewan: 'string|optional',
        daerah: 'string|optional',
        lokasimap: 'string|optional',
        jenis: 'string|optional',
        kelamin: 'string|optional',
        informasi: 'string|optional'
    }
      const validate = v.validate(req.body, schema);

      if(validate.length){
       return res
       .status(400)
       .json(validate);
      }

      const tgl_hilang	 = new Date().toISOString();
      const newPost = {
      nama, id_hewan, daerah, lokasimap,tgl_hilang, jenis, kelamin, informasi
   };
    post = await post.update(newPost);
    res.json(post);
  });

  router.get('/',async  (req, res) => {
    const post = await Post.findAll();
    return res.json(post);

    });
    router.get('/:id',async  (req, res) => {
        const id = req.params.id;
        const post = await Post.findByPk(id);
        if(!post){
            return res.json({});
           }
        return res.json(post);
        });

        router.delete('/:id',async  (req, res) => {
            const id = req.params.id;
            let post = await Post.findByPk(id);
            if(!post){
               return res.json({message : 'Data post tidak ditemukan'});
              }
              await  post.destroy();
            return res.json(
                {message : 'Data berhasil dihapus'}
                );
            });
    
module.exports = router;
