import mongoose from 'mongoose';

const connectToDatabase = async (): Promise<void> => {
  const databaseName = process.env.databaseName||'test';

  if (!databaseName) {
    console.error(' database Name  is not defined in environment variables');
    process.exit(1);
  }

  try {
    await mongoose.connect(`mongodb://localhost:27017/${databaseName}`,{
        autoIndex:false
    });

    console.log(' Connected to MongoDB');
  } catch (err) {
    console.error(' MongoDB connection error:', err);
    process.exit(1);
  }
};

export default connectToDatabase;
