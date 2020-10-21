module.exports = {
  error500: (res, error) => {
    res.status(500).send({
      success: false,
      message: error.message ? error.message : error,
    });
  },
};
