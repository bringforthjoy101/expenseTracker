module.exports = (req, res, next) => {
    if(!req.isAuthenticated()) {
     console.log('Un authtorised user trying to access the site')
     req.flash('error', 'Please, login first!');
     return res.redirect('/login/?m=not-logged-in');
    //  return res.status(401).send({error: 'You must be logged in'});
   }
  next();
  
};
