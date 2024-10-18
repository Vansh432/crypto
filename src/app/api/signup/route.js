import { NextResponse } from "next/server"
var jwt = require('jsonwebtoken');
export async function POST(request) {
   const data = await request.json();// handle the request data
   console.log(data);
   const { firstName, lastName, email, password } = data;
   var token = jwt.sign({ firstName, lastName, email, password }, 'shhhhh');// create a token
   return NextResponse.json({ success: true, token })// return the response
}