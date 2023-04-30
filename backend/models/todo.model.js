const mongoose = require("mongoose")

const todoSchema = mongoose.Schema(
    {
        "title":{type:String,required:true},
        "status":{type:Boolean,required:true},
        "priority":{type:String,required:true},
        "userName":{type:String,required:true},
        "userId":{type:String,required:true}
    }
)

const TodoModel = mongoose.model('todo' , todoSchema)

module.exports={
    TodoModel
}


// {
//     "title":"Node Assignment",
//     "status":false,
//     "priority":"High"
// }