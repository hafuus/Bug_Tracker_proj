
const mongoose = require("mongoose"); 
mongoose.set('strictQuery', false);

mongoose
  .connect(`mongodb+srv://${process.env.DB_Username}:${process.env.DB_Password}@cluster0.qxizy.mongodb.net/bugTracker`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // serverSelectionTimeoutMS: 60000, 
    // bufferCommands: false,
    // bufferTimeoutMS: 0,
  })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.error("Error connecting to DB:", err);
  });



