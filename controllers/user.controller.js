import User from "../models/user.model.js"
import bcrypt from 'bcryptjs';
import mongoose from "mongoose"

export const getUsers = async ( request, response, next ) => {
    try{
        const users = await User.find()

        response.status(200).json({success:true, data: users})
        
    } catch(error){
        next(error);
    }
}

export const getUser = async ( request, response, next ) => {
    try{
        const user = await User.findById(request.params.id).select('-password');

        if(!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        response.status(200).json({success: true, data: user});
    } catch(error) {
        next(error);
    }
}

export const UpdateUser = async ( request, response, next) => {
    try{
        const { id } = request.params;
        const updateData = request.body;

        if(!mongoose.Types.ObjectId.isValid(id)){
            const error = new Error('Invalid user ID');
            error.statusCode = 400;
            throw error;
        }
        
        const { password } = updateData;
        if (password) { 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        updateData.password = hashedPassword;
        }

        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true }).select('-password');

        if(!updatedUser){
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        response.status(200).json({ success: true, data: updatedUser });
    }catch(e){
        next(e)
    }
}

export const DeleteUser = async ( request, response, next) => {
    try{
        const { id } = request.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            const error = new Error('Invalid user ID');
            error.statusCode = 400;
            throw error;
        }

        const deleteUser = await User.findByIdAndDelete(id);

        if(!deleteUser){
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        response.status(200).json({ success: true, message: 'User deleted successfully'})
    } catch(e) {
        next(e)
    }
}