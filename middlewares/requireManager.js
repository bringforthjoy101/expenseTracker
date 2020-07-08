module.exports = (req, res, next) => {
    if (req.user.Role.role_name !== 'Manager') {
        console.log('Un authtorised user trying to access the site')
        return res.status(401).send({
            error: 'Permission denied! '
        });
    }
    next();
};