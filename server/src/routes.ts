import express, { request, response } from 'express'
import { celebrate, Joi } from 'celebrate'
import multer from 'multer'
import multerConfig from './config/multer'

import PointsController from './controller/pointsController'
import ItensController from './controller/itemsController'

const routes = express.Router()

//Index: quando quer listar varios
//Show: quando quer listar apenas um especifico
// Create, update, delete

const upload = multer(multerConfig)

const pointsController = new PointsController()
const itensController = new ItensController()

routes.get('/items', itensController.index)


routes.get('/points', pointsController.index)
routes.get('/points/:id', pointsController.show)




routes.post('/points',
    upload.single('image'),
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.number().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required(),
        })
    },{
        abortEarly: false
    }),
    pointsController.create)

export default routes