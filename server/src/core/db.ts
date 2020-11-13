import mongoose from "mongoose";

async function startDB() {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}`, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log("db connected");
  } catch (error) {
    if (error) {
      throw Error(error);
    }
  }
}

startDB();
