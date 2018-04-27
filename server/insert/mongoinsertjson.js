/*var mongoose = require('mongoose');
var db = mongoose.connection;

var data = require('../json/xml.json');

db.open(function(err, db) {
    var collection = db.usersenergy("simple_document_insert_collection_no_safe");
        // Insert a single document
        collection.insert(data);
      
        // Wait for a second before finishing up, to ensure we have written the item to disk
        setTimeout(function() {
      
          // Fetch the document
          collection.findOne(data, function(err, item) {
            assert.equal(null, err);
            assert.equal('data', item.energy);
            db.close();
          })
        }, 100);
});
*/