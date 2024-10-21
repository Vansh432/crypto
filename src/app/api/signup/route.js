import { NextResponse } from "next/server"
import User from "@/app/models/user";
import { connect } from "@/app/db/dbConfig";
import bcryptjs from "bcryptjs";
var jwt = require('jsonwebtoken');


connect();

export async function POST(request) {
   const data = await request.json();// handle the request data
   console.log(data);
   const { firstName, lastName, email, password } = data;
   const user =await User.findOne({email});

   if(user){
      return NextResponse.json({ success: false, message: 'Email already exists.Please go to login page' },{status:400})// return the response if email already exists
   }
   const salt=await bcryptjs.genSalt(10);
   const hashedPassword=await bcryptjs.hash(password,salt);
   const newUser =new User({
      firstName,
      lastName,
      email,
      password:hashedPassword
   })
   const savedUser = await newUser.save()

   var token = jwt.sign({ firstName, lastName, email, password }, 'shhhhh');// create a token
   return NextResponse.json({ 
      message:"User saved successfully",
      success: true,
      savedUser,
      token
    })// return the response
}