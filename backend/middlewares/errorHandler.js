const notFound = (req, res, next) => {
    const error = new Error(`Not Found : ${req.originalUrl}`);
    next(error);
};

const errorHandler = (err, req, res, next) => {
    const statusCode = req.statusCode == 200 ? 500 : res.statusCode;
    req.status(statusCode).json({
        message: err?.message,
        stack: err?.stack
    });
};

module.exports = { notFound, errorHandler };