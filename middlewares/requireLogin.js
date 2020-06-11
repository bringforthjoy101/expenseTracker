module.exports = (req, res, next) => {
    if(!req.user) {
     console.log('Un authtorised user trying to access the site')
     return res.status(401).send({error: 'You must be logged in'});
   }
  next();
  
};
