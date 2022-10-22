const jwt = require('jsonwebtoken');

// sử dụng cho web
exports.checkLoginAdmin = function (req, res, next) {
    const { session } = req;
    const url = req.originalUrl.toLowerCase();
    if (!session) {
        if (url.includes('login-admin')) {
            next();
        } else {
            res.redirect('/admin/login-admin');
        }
    } else {
        const { token } = session;
        if (!token) {
            if (url.includes('login-admin')) {
                next();
            } else {
                res.redirect('/admin/login-admin');
            }
        } else {
            jwt.verify(token, 'admin', function (error, decoded) {
                if (error) {
                    if (url.includes('login-admin')) {
                        next();
                    } else {
                        res.redirect('/admin/login-admin');
                    }
                } else {
                    if (url.includes('login-admin')) {
                        res.redirect('/admin/home-admin');
                    } else {
                        next();
                    }
                }
            })
        }
    }
}

// sử dụng cho web
exports.checkLoginOwner = function (req, res, next) {
    const { session } = req;
    const url = req.originalUrl.toLowerCase();
    if (!session) {
        if (url.includes('login-owner')) {
            next();
        } else {
            res.redirect('/owner/login-owner');
        }
    } else {
        const { token } = session;
        if (!token) {
            if (url.includes('login-owner')) {
                next();
            } else {
                res.redirect('/owner/login-owner');
            }
        } else {
            jwt.verify(token, 'owner', function (error, decoded) {
                if (error) {
                    if (url.includes('login-owner')) {
                        next();
                    } else {
                        res.redirect('/owner/login-owner');
                    }
                } else {
                    if (url.includes('login-owner')) {
                        res.redirect('/owner/home-owner');
                    } else {
                        next();
                    }
                }
            })
        }
    }
}