
const checkOrigin = (req, res, next) => {
    try {
        const { xapi } = req.headers
        if (xapi === 'xzv-condor-mkt-69') {
            next()
        } else {
            res.status(409)
            res.send({ error: 'Tu por aqui no pasas!' })
        }

    } catch (e) {
        next()
    }

}

module.exports = checkOrigin
