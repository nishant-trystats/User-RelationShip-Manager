import mongoose, { Schema, Document } from 'mongoose';


export interface IUser extends Document {
  username: string;
  age: number;
  hobbies: string[];
  friends: string[];
  createdAt: Date;
  popularityScore: number;
}

const UserSchema: Schema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true,
    min: 0
  },
  hobbies: {
    type: [String],
    required: true,
    default: []
  },
  friends: {
    type: [String], 
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true
  },
  popularityScore: {
    type: Number,
    default: 0

  }
});

const User = mongoose.model<IUser>('User', UserSchema);


// CREATE
export const createUser = async (data: Partial<IUser>): Promise<IUser> => {
  const user = new User(data);
  return await user.save();
};

// READ - All Users
export const getAllUsers = async (): Promise<IUser[]> => {
  return await User.find();
};

// READ - By ID
export const getUserById = async (id: string): Promise<IUser | null> => {
  return await User.findById(id);
};

// UPDATE
export const updateUser = async (
  id: string,
  updateData: Partial<IUser>
): Promise<IUser | null> => {
  return await User.findByIdAndUpdate(id, updateData, { new: true });
};

// DELETE
export const deleteUser = async (id: string): Promise<IUser | null> => {
  return await User.findByIdAndDelete(id);
};

// Export model separately if needed
export default User;