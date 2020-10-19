module.exports = {
    error500: function (res, error) {
        res.status(500).send({
            succes: false,
            message: error.message ? error.message : error
        })
    },
}