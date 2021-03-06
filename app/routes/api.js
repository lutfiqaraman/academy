const User = require('../models/users');
const jwt  = require('jsonwebtoken'); 
const secret = 'secrettoken';

module.exports = function(router) {

    //User Registeration process
    router.post("/users", function(req, res) {
        const user = new User();
      
        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;
      
        if (req.body.username == null || req.body.username == '' || req.body.password == null || req.body.password == '' || req.body.email == null || req.body.email == '') {
            res.json({
                success : false, 
                message: 'Ensure username, password and email were provided'
            });

        } else {
            user.save(function(err) {
                if (err) {
                    res.json({
                        success : false, 
                        message: 'Username or email is already exist !'
                    });
                } else {
                    res.json({
                        success : true, 
                        message: 'user has been created'
                    });
                }
            })
        }
      });

      //User Login process
      router.post('/authenticate', function(req, res) {
          User
          .findOne({username : req.body.username})
          .select('email username password').exec(function(err, user) {
              if (err) throw err;

              if (!user) {
                  res.json({ success: false, message: 'Could not authenticate user !'});
              } else if (user) {

                  if(req.body.password) {
                      var validPassword = user.comparePassword(req.body.password);
                  } else {
                    res.json({ success: false, message: 'Password is not provided ...'});  
                  }
                  
                  if (!validPassword) {
                      res.json({ success: false, message: 'Could not authenticate user !'});
                  } else {
                      const token = jwt.sign({username : user.username, email: user.email}, secret, {expiresIn: '24h'});
                      res.json({ success: true, message: 'User has been authenticate ...', token : token});
                  }
              }
          });
      });

      router.use(function(req, res, next) {
          const token = req.body.token || req.body.query || req.headers['x-access-token'];

          if (token) {
            jwt.verify(token, secret, function(err, decoded) {
                if (err) {
                    res.json({success : false, message : 'Token invalid ....'});    
                } else {
                    req.decoded = decoded;
                    next();
                }
            });  
        } else {
              res.json({success : false, message : 'No token provided!'});
          }
      });

      router.post('/me', function(req, res) {
          res.send(req.decoded);
      });

      return router;
}

