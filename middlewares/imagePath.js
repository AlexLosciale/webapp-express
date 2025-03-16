function setImagePath(req, res, next) {
    req.ImagePath = `${req.protocol}://${req.get('host')}/img/movis/`;
    next();
}

export default setImagePath;