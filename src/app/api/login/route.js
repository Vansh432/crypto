import { NextResponse } from "next/server"
import bcryptjs from "bcryptjs";
import User from "@/app/models/user";
import { connect } from "@/app/db/dbConfig";
//JWT Token 
var jwt = require('jsonwebtoken');

connect();
export async function POST(request) {
   const data = await request.json();// handle the request data
   const { email, password } = data;
   // Find user by email
   const user=await User.findOne({ email });

   if(!user){
      return NextResponse.json({ success: false, error: 'User not found' },{status:400});
   }

   const validPassword = await bcryptjs.compare(password, user.password)
   if(!validPassword){
       return NextResponse.json({error: "Invalid password"}, {status: 400})
   }


   var token = jwt.sign({ email, password }, 'shhhhh'); // create a token
   return NextResponse.json({ 
      success: true,
      user,
      token })// return the response
}