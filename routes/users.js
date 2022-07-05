var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken')
const Validator = require('fastest-validator');
require('dotenv').config()
var verifyToken = require('../middleware/VerifyToken.js');
const { Users } = require('../models');

const v = new Validator;

/* GET users listing. */
router.get('/',verifyToken ,async  (req, res) => {
  const user = await Users.findAll({
    attributes : ['id', 'nama' , 'email']
  });
  return res.json(user);
});

router.post('/login',async (req, res) => {
  const user = await Users.findOne({
    where: {
      email: req.body.email
    }
  });

  if (!user) return res.status(400).json({msg : 'Email salah'});
 const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) return res.status(400).json({msg : 'Password Salah'});
  const userId = user.id;
  const nama = user.nama;
  const email = user.email;
  const accessToken = jwt.sign({userId, nama, email}, process.env.ACCESS_TOKEN_SECRET,{
    expiresIn: '15s'
  });

  const refreshToken = jwt.sign({userId, nama, email}, process.env.REFRESH_TOKEN_SECRET,{
    expiresIn: '1d'
  });

  await Users.update({refresh_token:refreshToken},{
    where: {
      id : userId
    }
  });

  res.cookie('refreshToken', refreshToken,{
    httpOnly: true,
    maxAge : 24 * 60 * 60 * 1000
  });
  res.json({accessToken});
});

router.post('/register', async (req, res) => {
  const { nama, email, password, cnfrmpassword} = req.body;
  const schema = {
    nama: 'string',
    email: 'string',
    password:'string',
    cnfrmpassword:'string',
}
  const validate = v.validate(req.body, schema);
    if(validate.length){
      return res
      .status(400)
      .json(validate);
 }
 if(cnfrmpassword!==password)
 return res
 .status(400)
 .json({"msg" : "Confirmasi Password Tidak Sesuai"});

const salt = await bcrypt.genSalt();
const hashPassword = await bcrypt.hash(password, salt);

const user = await Users.create({
  nama : nama,
  email : email,
  password : hashPassword
});
res.status(200)
.json({"msg" : "Akun Berhasil Dibuat"});
}) 

router.delete('/logout',async (req, res) => {
  const refreshToken = req.cookies.refresh_token;
  if(!refreshToken) return res.sendStatus(204);
  const user = await Users.findOne({
      where: {
      refresh_token: refreshToken
      }
    });
    if(!user) return res.sendStatus(403);
    const userId = user.id;
    await Users.update({refresh_token :null}, {
      where: {
        id : userId
      }
    });
    res.clearCookie('refresh_token');
    return res.sendStatus(200);
  });

module.exports = router;
