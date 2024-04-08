const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

const uri = "mongodb+srv://congntph34559:congAnh04@cars.8oln4qy.mongodb.net/AssRestApi";


const connect = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connect successfully");
  } catch (error) {
    console.log(error);
    console.log("Connect failed");
  }
};
module.exports = { connect };
