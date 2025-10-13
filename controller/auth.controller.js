import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import {JWT_EXPIRES_IN, JWT_SECRET} from "../config/env.js";


export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        const { name, email, password } = req.body;
        const existingUser = await User.find({email});

        if(existingUser){
            const error = new Error('User already exists');
            error.statusCode = 409;
            throw error;
        }
        
        const salt = await bcrypt.genDalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newUsers = await User.create([{name, email, password: hashedPassword}], {session})

        const token = jwt.sign({userId: newUsers[0]._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});   
        
        await session.commitTransaction();
        session.endSession();
        
        res.status(201).json({
            sucess: true,
            message: 'User sucessfully',
            data: {
                token,
                user: newUsers[0],
            }
        })
    } catch(error){
       await session.abortTransaction();
       session.endSession();
       next(error);
    }
}

export const signIn = (req, res, next) => {}

export const signOut = (req, res, next) => {}