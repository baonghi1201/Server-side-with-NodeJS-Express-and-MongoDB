const express= require('express');
const bodyParser=require('body-parser');
const { Router } = require('express');

const promoRouter=express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all((req, res, next)=>{
    res.statusCode=200;
    res.setHeader='Content-Type', 'Text/Plain';
    next();
})

.get((req,res,next)=>{
    res.end('Will send all the promos you ');
})

.post((req, res, next)=>{
    res.end('Will add promo ' + req.body.name + ' with details ' + req.body.description);
})

.put((req,res, next)=>{
    res.end('PUT not supported in on /promos');
})

.delete((req,res,next)=>{
    res.end('Deleting promo details');
})

promoRouter.route('/:promoId')
.get((req,res,next)=>{
    res.end('Will send all the promos details ' + req.params.promoId + ' to you');
})

.post((req, res, next)=>{
    res.statusCode=403;
    res.end('POST not supported in /promo/ ' + req.params.promoId);
})

.put((req,res, next)=>{
    res.write('Updating promo details ' + req.params.promoId + '\n');
    res.end('Update dish promo ' + req.body.name + ' with details ' + req.body.description);
})

.delete((req,res,next)=>{
    res.end('Deleting promo details ' + req.params.promoId);
})


module.exports=promoRouter;