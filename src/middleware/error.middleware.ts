import { Request, Response, NextFunction } from 'express'
import HttpException from '@/utils/exception/http.exception'

function errorMiddleware(
    error: HttpException,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    const status = error.status || 5000
    const message = error.message || 'SOMETHING WENT WRONG'
    res.status(status).send({
        status,
        message,
    })
}

export default errorMiddleware
