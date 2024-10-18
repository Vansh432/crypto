import { NextResponse } from "next/server"
var jwt = require('jsonwebtoken');
export async function POST(request) {
   const data=await request.json();
   const {email,password}=data;
   var token = jwt.sign({ email, password }, 'shhhhh');
  return NextResponse.json({success:true,token})
  }