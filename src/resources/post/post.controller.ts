import { Router, Request, Response, NextFunction } from 'express'
import Controller from '@/utils/interfaces/controller.interface'
import HttpException from '@/utils/exception/http.exception'
import validationMiddleware from '@/middleware/validation.middleware'
import validate from './post.validation'
import PostService from './post.service'

class PostController implements Controller {
    public path = '/posts'
    public router = Router()
    constructor() {
        this.initialiseRoutes()
    }
    private initialiseRoutes(): void{
        
    }
}
