export default function errorHandler(err, req, res, next) {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        message: statusCode === 500
           ? "Internal server error"
           : err.message,
        status: statusCode,
        timestamp: new Date().toISOString()
    });

    console.log(err.message);
}