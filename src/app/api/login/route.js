import { NextResponse } from "next/server"
//JWT Token 
var jwt = require('jsonwebtoken');
export async function POST(request) {
   const data = await request.json();// handle the request data
   const { email, password } = data;
   var token = jwt.sign({ email, password }, 'shhhhh'); // create a token
   return NextResponse.json({ success: true, token })// return the response
}