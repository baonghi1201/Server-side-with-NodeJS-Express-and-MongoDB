const assert = require('assert');

exports.insertDocument=(db, document, collection, callback)=>{
    const coll = db.collection(collection);
    coll.insert(document, (err, result)=>{
        assert.equal(err,null);
        console.log('Inserted'+ result.result.n + 'doculemts into the collection '+collection);
        callback(result);
    });
};

exports.findDocument=(db, collection, callback)=>{
    const coll = db.collection(collection);
    coll.find({}).toArray((err, docs)=>{
        assert.equal(err, null);
        callback(docs);
    })
};

exports.removeDocument=(db, document, collection, callback)=>{
    const coll = db.collection(collection);
    coll.remove(document, (err, result)=>{
        assert.equal(err, null);
        console.log('Remove the document', document);
        callback(result);
    })
    
};


exports.updateDocument=(db, document,update, collection, callback)=>{    
    const coll = db.collection(collection);
    coll.updateOne(document, {$set:update}, null, (err, result)=>{
        assert.equal(err, null);
        console.log('Update the document with ', update);
        callback(result);
    });
};

