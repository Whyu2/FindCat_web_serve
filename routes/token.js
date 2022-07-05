var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

const { Users } = require('../models');

router.get('/',async (req, res) => {
    
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(401);
    const user = await Users.findOne({
        where: {
        refresh_token: refreshToken
        }
      });
      if(!user) return res.sendStatus(403);
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded)=>{
        if(err) return res.sendStatus(403);
        const userId = user.id;
        const nama = user.nama;
        const email = user.email;
        const accessToken = jwt.sign({userId, nama, email}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '1d'
          });
          res.json({accessToken});
    })
});


module.exports = router;