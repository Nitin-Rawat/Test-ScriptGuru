import mongoose from "mongoose"; 

const connectDB = async()=>{
  const DB_NAME = "ScriptTest"
try {
  const connectionInstance = await mongoose.connect(
    `${process.env.MONGODB_URL}`
  );
  console.log(`\n MongoDB connected !! DB HOST :: ${connectionInstance.connection.host}`);

} catch (error) {
    console.log("MongoDB connection Failed at Db/index :: ",error);
    process.exit(1);
    
}
}


export default connectDB;