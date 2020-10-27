const express= require('express');
const bodyParser=require('body-parser');
const { Router } = require('express');
const promoRouter=express.Router();

const mongoose= require('mongoose');

const authenticate = require('../authenticate');

const Promos = require('../models/promotions');



promoRouter.use(bodyParser.json());

promoRouter.route('/')

.get((req,res,next)=>{
    Promos.find({})
    .then(promo=>{
        res.statusCode=200;
        res.setHeader('Content-type', 'application/json');
        res.json(promo);
    }, err=>next(err))
    .catch(err=>next(err));
})

.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next)=>{
    Promos.create(req.body)
    .then(promo=>{
        console.log('New promotion created', promo);
        res.statusCode=200;
        res.setHeader('Content-type', 'application/json');
        res.json(promo)
    }, err=>next(err))
    .catch(err=>next(err));
})

.put(authenticate.verifyUser, authenticate.verifyAdmin, (req,res, next)=>{
    res.statusCode=403;
    res.end('PUT not supported in on /promos');
})

.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next)=>{
    Promos.remove()
    .then(resp=>{
        console.log('Promotion removed');
        res.statusCode=200;
        res.setHeader('Content-type', 'application/json');
        res.json(resp);
    }, err=>next(err))
    .catch(err=>next(err));
});

// Promo with ID

promoRouter.route('/:promoId')
.get((req,res,next)=>{
    Promos.findById(req.params.promoId)
    .then(promo=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, err=>next(err))
    .catch(err=>next(err));
})

.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next)=>{
    res.statusCode=403;
    res.end('POST not supported in /promo/ ' + req.params.promoId);
})

.put(authenticate.verifyUser, authenticate.verifyAdmin, (req,res, next)=>{
    Promos.findByIdAndUpdate(req.params.promoId,{
        $set:req.body
    }, {new:true})
    .then(promo=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);     
    }, err=>next(err))
    .catch(err=>next(err));
})

.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next)=>{
    Promos.findByIdAndRemove(req.params.promoId)
    .then(resp=>{
        console.log('Deleting promo details ' + req.params.promoId);
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, err=>next(err))
    .catch(err=>next(err));
});


module.exports=promoRouter;