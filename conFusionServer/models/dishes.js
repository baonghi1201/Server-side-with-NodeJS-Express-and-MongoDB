const mongoose=require('mongoose');

const Schema=mongoose.Schema;

// Use mongoose currency

require('mongoose-currency').loadType(mongoose); // This will load the 'currency' type to mongoose

const Currency = mongoose.Types.Currency; // This will use to define the 'Currency' in the schema




// Use mongoose currency

var commentSchema= new Schema({
    rating:{
        type: Number,
        min:1,
        max:5,
        required: true
    },

    comment:{
        type: String,
        required: true
    },

    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{
    timestamps:true
});

var dishSchema= new Schema({
    name:{
        type: String,
        required:true,
        unique:true
    },

    description:{
        type: String,
        required:true
    },

    image:{
        type: String,
        required: true
    },

    category:{
        type: String,
        required: true
    },

    label:{
        type: String,
        default:''
    },

    price :{
        type: Currency,
        min:0,
        required: true
    },

    feature:{
        type: Boolean,
        default: false
    },

    comments: [commentSchema]
},{
    timestamps:true
});

var Dishes=mongoose.model('Dish', dishSchema);

module.exports=Dishes;