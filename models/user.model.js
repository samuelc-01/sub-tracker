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
        match: /^[a-zA-Z0-9_-]+$/,
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