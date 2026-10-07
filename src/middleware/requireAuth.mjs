export const requireAuth = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).send({ msg: 'Authentication required' });
    }

    return next();
};
