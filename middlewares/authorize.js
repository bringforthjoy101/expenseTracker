function authorize(roles = []) {

    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Staff, Role.Manager] or ['Manager', 'Staff'])

    if (typeof roles === 'string') {
        roles = [roles];
    }

    return [

        // authorize based on user role
        (req, res, next) => {
            
            // check if the user has logged in...
            if (req.isAuthenticated()) {
            
            console.log("The logged in user role is = " + req.user.role );
    
   // compare the role with the required role for authorization i.e. authorize(Role.Manager) in router
  // you can change this in the router for the user role you want to give access to... i.e. authorize(Role.Staff)

            if (roles.length && !roles.includes(req.user.role)) {
                // user's role is not authorized
                return res.status(401).json({ message: 'Unauthorized page for this user' });
            }
        
            // authentication and authorization successful
            next();
            
            } else {
                // oops user is not logged in
                res.redirect('/login?m=not-logged-in');
            }
        }
    ];
}

module.exports = authorize;
