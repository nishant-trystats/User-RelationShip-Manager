export interface IUser {
  _id?: string;
  username: string;
  age: number;
  hobbies: string[];
  friends: string[];
  popularityScore?: number;
}

export interface IRelation {
  from: string;
  to: string;
}

export interface IGraph {
  users: IUser[];
  relations: IRelation[];
}
