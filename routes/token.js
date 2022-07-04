var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

const { Users } = require('../models');

router.get('/',async (req, res) => {
    const refreshToken = req.cookies.refresh_token;
    if(!refreshToken) return res.sendStatus(401);
    const user = await Users.findAll({
        where: {
        refresh_token: refreshToken
        }
      });

      if(!user[0]) return res.sendStatus(403);
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded)=>{
        if(err) return res.sendStatus(403);
        const userId = user[0].id;
        const nama = user[0].nama;
        const email = user[0].email;
        const accessToken = jwt.sign({userId, nama, email}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '1d'
          });

          res.json({accessToken});
    
    })
});


module.exports = router;