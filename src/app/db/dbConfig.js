import mongoose from "mongoose";

export  async function connect(){
 
    try{
        mongoose.connect('mongodb+srv://vansharya703:OgzaTY4jUQieluH0@cluster0.irad0.mongodb.net/');
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        })

        connection.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            process.exit();
        })
    }catch(e){
     console.log("MongoDB connection error");
     console.error(e);
    }
}