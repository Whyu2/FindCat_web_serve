var express = require("express");
var router = express.Router();
const Validator = require("fastest-validator");
var verifyToken = require("../middleware/VerifyToken.js");
const { Post, Users,Index } = require("../models");


const v = new Validator();
/* GET users listing. */

router.post("/",verifyToken, async (req, res) => {
  const { judul_postingan, user_id,jenis, postingan} = req.body;
  const foto = req.file.path;
      const schema = {
        judul_postingan: 'string',
        jenis: 'string',
        postingan: 'string'
      };
        const validate = v.validate(req.body, schema);
        if(validate.length){
          return res
          .status(400)
          .json(validate);
         };
         const tgl_hilang	 = new Date().toISOString();
          const newPost = {
            user_id ,judul_postingan, jenis, postingan,foto
       };
        const post = await Post.create(newPost);
        res.json(post);
    });

    router.put('/:id',async  (req, res) => {
      const { judul_postingan, user_id,jenis, postingan} = req.body;
      const foto = req.file.path;
      const id = req.params.id;
      let post = await Post.findByPk(id);

      if(!post){
         return res.json({message : 'Data post tidak ditemukan'});
        }

        const schema = {
          judul_postingan: 'string',
          jenis: 'string',
          postingan: 'string|optional'
      }
        const validate = v.validate(req.body, schema);

        if(validate.length){
         return res
         .status(400)
         .json(validate);
        }
        const newPost = {
          user_id ,judul_postingan, jenis, postingan,foto
     };
      post = await post.update(newPost);
      res.json(post);
});

router.get("/",verifyToken, async (req, res) => {
  const post = await Post.findAll({
    include: [
      {
      model: Users,
      as: 'user' 
    }
    ]
  });
  return res.json(post);
});
router.get("/user-post/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Post.findAll({
    where: {
      user_id: id,
    }, include: [
      {
      model: Users,
      as: 'user' 
    }
    ]
  });
  return res.json(post);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Post.findByPk(id);
  if (!post) {
    return res.json({});
  }
  return res.json(post);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  let post = await Post.findByPk(id);
  if (!post) {
    return res.json({ message: "Data post tidak ditemukan" });
  }
  await post.destroy();
  return res.json({ message: "Data berhasil dihapus" });
});

module.exports = router;
