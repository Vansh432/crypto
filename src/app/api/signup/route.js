import { NextResponse } from "next/server"
var jwt = require('jsonwebtoken');
export async function POST(request) {
   const data=await request.json();
   console.log(data);
   const {firstName,lastName,email,password} =data;
   var token = jwt.sign({ firstName,lastName,email,password }, 'shhhhh');
  return NextResponse.json({success:true,token})
  }