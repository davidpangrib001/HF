module.exports = {
    isAuthenticated: function(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      req.flash('error_msg', 'Please Login!');
      res.redirect('/users/login');
    },
    notAuthenticated: function(req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      }
      res.redirect('/docs');      
    },
    captchaRegister: function(req, res, next) {
      if (req.recaptcha.error) {
          req.flash('error_msg','reCAPTCHA Not Valid!');
          res.redirect('/users/register');
      } else {
          return next();
     };
    },
    captchaLogin: function(req, res, next) {
      if (req.recaptcha.error) {
          req.flash('error_msg','reCAPTCHA Not Valid!');
          res.redirect('/users/login');
      } else {
          return next();
      };
    }
  };