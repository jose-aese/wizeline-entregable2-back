const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type:String,required:true},
    surname: {type:String,required:true},
    nick: {type:String,required:true, index: true, unique: true},
    email: {type:String,required:true, index: true, unique: true,
        validate: {
            validator: (v) => {
                const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
                return (!v || !v.trim().length) || re.test(v)
            },
            message: 'Email invalido'
        }

    },
    password: {type:String,required:true},
    image: {type:String,required:false},

    role: {
        type: String,
        enum: ['admin', 'user','root'],
        default: 'user'
    }
},{
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('User', userSchema);
