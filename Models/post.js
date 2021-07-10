const mongoose = require ('mongoose');

const PostSchema = mongoose.Schema ({

   lastname: {
       type:String,
       required:true
   },
   firstname: {
    type:String,
    required:true
    },

   phonenumbers:  {
       type: [String], require:true
   }

});

module.exports = mongoose.model('Contacts', PostSchema);