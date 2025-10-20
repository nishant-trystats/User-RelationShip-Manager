import mongoose, { Schema, Document } from 'mongoose';


export interface IRelation extends Document {
  
    from:String;
    to:String;
    createdAt: Date;
  
}

const RelationSchema: Schema = new Schema<IRelation>({
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true
  },
  from:{
    type:String,
    required:true
  },
  to:{
    type:String,
    required:true
  }
  }
);

const Relation = mongoose.model<IRelation>('Relation', RelationSchema);

//  CREATE function
export const createRelation = async (userA: string, userB: string): Promise<IRelation | null> => {
  
  const [from, to] = [userA, userB].sort();

  // Check if it already exists
  const existing = await Relation.findOne({ from, to });
  if (existing) {
    return null; // Prevent duplicate
  }

  // Create new relation
  const relation = new Relation({ from, to });
  return await relation.save();
};

//  DELETE function
export const deleteRelation = async (userA: string, userB: string): Promise<IRelation | null> => {
  // Sort the IDs to match stored format
  const [from, to] = [userA, userB].sort();

  // Find and delete
  return await Relation.findOneAndDelete({ from, to });
};

export const getAllRelations = async (): Promise<IRelation[]> => {
  return await Relation.find();
};

export default Relation;