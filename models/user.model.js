import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minLength: 3,
        maxLength: 20
    },

    email: {
        type: String,
        unique: true,
        trim: true,
        required: [true, "Email is required"],
        minLength: 5,
        maxLength: 60,
        lowercase: true,
        match: /^[\w.-]+@[a-z\d.-]+\.[a-z]{2,}$/i,
    },

    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 5,

    }

},{ timestamps: true } );

const User = mongoose.model("User", UserSchema);

export default User;