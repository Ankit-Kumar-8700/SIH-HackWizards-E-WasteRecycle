const verifyUser = (req, res, next) => {
        
    if(req.user && req.user.role === 'user')   next();
    else return res.status(403).json({ message: 'Access denied. User role required.' });
}


const verifyCollector = async(req,res,next) => {
    if(req.user && req.user.role === 'collector')   next();
    else return res.status(403).json({ message: 'Access denied. Collector role required.' });
}
const verifyCenter = async(req,res,next) => {
    if(req.user && req.user.role === 'center')   next();
    else return res.status(403).json({ message: 'Access denied. E-Waste Center is authorized for this route' });
}
const verifyCollectorOrCentre = async(req,res,next) => {
    if(req.user && (req.user.role === 'center' ||  req.user.role === 'collector'))   next();
    else return res.status(403).json({ message: 'Access denied. E-Waste Center and collector is authorized for this route' });
}


export {verifyUser,verifyCollector,verifyCenter, verifyCollectorOrCentre};