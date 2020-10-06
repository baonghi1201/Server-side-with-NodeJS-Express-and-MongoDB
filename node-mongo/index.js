const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper= require('./operations');

const url='mongodb://localhost:27017/';
const dbname='conFusion';

MongoClient.connect(url, (err, client)=>{
    assert.equal(err, null);

    console.log('Connected correctly to server ');

    const db=client.db(dbname);
    
    dboper.insertDocument(db, {name:"donut", description:'testing'}, 'dishes', (result)=>{
       console.log('Insert Document:\n', result.ops);
       dboper.findDocument(db,'dishes', docs=>{
           console.log('Found Documents:\n', docs);

           dboper.updateDocument(db, {name:'donut'}, {description:'Updated'}, 'dishes', result=>{
               console.log('Updated document:\n', result.result);

               dboper.findDocument(db, 'dishes', docs=>{
                   console.log('Document found:\n', docs);

                   db.dropCollection('dishes', result=>{
                       console.log('Dropped collection:\n', result);

                       client.close();
                   })
               })
           });
       });
    });
});