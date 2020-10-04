const express= require('express');
const bodyParser=require('body-parser');
const { Router } = require('express');

const leaderRouter= express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all((req, res, next)=>{
    res.statusCode=200;
    res.setHeader='Content-Type', 'Text/Plain';
    next();
})

.get((req,res,next)=>{
    res.end('Will send all the leader you ');
})

.post((req, res, next)=>{
    res.end('Will add leader ' + req.body.name + ' with details ' + req.body.description);
})

.put((req,res, next)=>{
    res.end('PUT not supported in on /leaders');
})

.delete((req,res,next)=>{
    res.end('Deleting leader details');
})

leaderRouter.route('/:leaderId')
.get((req,res,next)=>{
    res.end('Will send all the leader details ' + req.params.leaderId + ' to you');
})

.post((req, res, next)=>{
    res.statusCode=403;
    res.end('POST not supported in /leader/ ' + req.params.leaderId);
})

.put((req,res, next)=>{
    res.write('Updating leader details ' + req.params.leaderId + '\n');
    res.end('Update dish leader ' + req.body.name + ' with details ' + req.body.description);
})

.delete((req,res,next)=>{
    res.end('Deleting leader details ' + req.params.leaderId);
})

module.exports=leaderRouter;
