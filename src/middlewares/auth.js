const adminAuth = (req, res, next) => {
    const token = "xyz";
    const isAuthorized = token === 'xyz'
    if (!isAuthorized) {
        res.status(401).send('unauthorized user')
    }
    else {
        next()
    }
}

const UserAuth = (req, res, next) => {
    const token = "xyz";
    const isAuthorized = token === 'xyz'
    if (!isAuthorized) {
        res.status(401).send('unauthorized user')
    }
    else {
        next()
    }
}

module.exports = {
    adminAuth,
    UserAuth
}