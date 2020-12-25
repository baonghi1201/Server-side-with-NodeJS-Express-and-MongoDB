const express= require('express');
const bodyParser=require('body-parser');
const { Router } = require('express');

const leaderRouter= express.Router();

const mongoose = require('mongoose');
const cors= require('./cors');
const authenticate = require('../authenticate');

const Leaders = require('../models/leaders');
const {corsWithOption} = require('./cors');

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.options(cors.corsWithOption,(req,res)=>{res.sendStatus=200;})
.get(cors.cors,(req,res,next)=>{
    Leaders.find({})
    .then(leader=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, err=>next(err))
    .catch(err=>next(err));
})

.post(cors.corsWithOption,authenticate.verifyUser,authenticate.verifyAdmin, (req, res, next)=>{
    Leaders.create(req.body)
    .then(leader=>{
        res.statusCode=200,
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, err=>next(err))
    .catch(err=>next(err));
})

.put(cors.corsWithOption,authenticate.verifyUser, authenticate.verifyAdmin, (req,res, next)=>{
    res.end('PUT not supported in on /leaders');
})

.delete(cors.corsWithOption,authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next)=>{
    Leaders.remove()
    .then(resp=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, err=>next(err))
    .catch(err=>next(err));
})


// Leader with ID

leaderRouter.route('/:leaderId')
.options(cors.corsWithOption,(req,res)=>{res.sendStatus=200;})
.get(cors.cors,(req,res,next)=>{
    Leaders.findById(req.params.leaderId)
    .then(leader=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, err=>next(err))
    .catch(err=>next(err));
})

.post(cors.corsWithOption,authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next)=>{
    res.statusCode=403;
    res.end('POST not supported in /leader/ ' + req.params.leaderId);
})

.put(cors.corsWithOption,authenticate.verifyUser, authenticate.verifyAdmin,(req,res, next)=>{
    Leaders.findByIdAndUpdate(req.params.leaderId,{
        $set:req.body
    }, {new:true})
    .then(leader=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, err=>next(err))
    .catch(err=>next(err));
})

.delete(cors.corsWithOption,authenticate.verifyUser, authenticate.verifyAdmin,(req,res,next)=>{
    Leaders.findOneAndRemove(req.params.leaderId)
    .then(resp=>{
        console.log('Deleting leader details ' + req.params.leaderId)
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, err=>next(err))
    .catch(err=>next(err));
})

module.exports=leaderRouter;
