const mongoose = require('mongoose');


const UserModel = mongoose.Schema(
    {
        name: {type: String, require:true, trim:true},
        email: {type: String, require:true, unique:true},
        password: {type: String, require:true},
        pic: {
            type: String,
            default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        }
    },
    {timestamps: true}
);

// UserModel.methods.matchPassword = async function(enteredPassword){
//     console.log("return await bcrypt.compare(enteredPassword, this.password)",  await bcrypt.compare(enteredPassword, this.password));
//     return await bcrypt.compare(enteredPassword, this.password)
// }
// UserModel.pre('save', async function(next){
//     if(!this.isModified){
//         next()
//     }
//     const salt = await bcrypt.genSalt(10)
//     this.password = await bcrypt.hash(this.password, salt)
// })


const User = mongoose.model("user", UserModel)
module.exports = User;