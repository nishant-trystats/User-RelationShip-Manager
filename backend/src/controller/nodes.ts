import { Request, Response, NextFunction } from "express";

import {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../models/nodes";

import {
  deleteRelation,
  createRelation,
  getAllRelations,
} from "../models/relations";

interface goodResponse<T = unknown> {
  status: number;
  data: T;
  message: String;
  errors: Boolean;
  success: Boolean;
}

class ResponseClass implements goodResponse {
  status: number;
  data: any;
  message: String;
  errors: Boolean;
  success: Boolean;
  version?: String;

  constructor({
    status = 200,
    data = null,
    message = "",
    errors = false,
    success = true,
  }: Partial<goodResponse>) {
    this.status = status;
    this.data = data;
    this.message = message;
    this.errors = errors;
    this.success = success;
  }
}

function responseHandler(
  res: Response,
  responseData: Partial<goodResponse>
): Response {
  const response = new ResponseClass(responseData);
  return res.status(response.status).json(response);
}

function errResonseHandler(res: Response, error: unknown): Response {
  return responseHandler(res, {
    message: error instanceof Error ? error.message : "Internal Server Error",
    status: 500,
    data: null,
    success: false,
    errors: true,
  });
}

export class nodesController {
  //get all users

  public async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await getAllUsers();
      responseHandler(res, { message: "all users data", data: response });
    } catch (err) {
      errResonseHandler(res, err);
    }
  }

  //create new user
  public async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { user } = req.body;
      const response = await createUser(user);
      if (!response) throw new Error("Controllers Create user Database Error");
      responseHandler(res, { message: " user created", data: response });
    } catch (err) {
      errResonseHandler(res, err);
    }
  }

  //update user
  public async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { data } = req.body;
      const response = await updateUser(id, data);
      if (!response) throw new Error("Controllers UpdateUser database error");
      responseHandler(res, { message: `updated  user `, data: response });
    } catch (err) {
      errResonseHandler(res, err);
    }
  }

  //delete user
  public async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const response = await deleteUser(id);
      if (!response) throw new Error("Controllers deleteUser database error");
      responseHandler(res, { message: `Removed user `, data: { response } });
    } catch (err) {
      errResonseHandler(res, err);
    }
  }

  //Create relationship (friendship)
  public async createRelation(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { fromId } = req.body;
      const response = createRelation(fromId, id);
      if (!response)
        throw new Error("Controllers createRelation database error");
      responseHandler(res, { message: `created reation `, data: response });
    } catch (err) {
      errResonseHandler(res, err);
    }
  }

  // Remove relationship
  public async removeRelation(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { fromId } = req.body;
      const response = await deleteRelation(id, fromId);
      if (!response)
        throw new Error("Controllers removeRelation database error");
      responseHandler(res, { message: `removed reation `, data: response });
    } catch (err) {
      errResonseHandler(res, err);
    }
  }

  // Return graph data (users + relationships)
  public async getUsersGraph(req: Request, res: Response, next: NextFunction) {
    try {
        const users = await getAllUsers();
        const relations = await getAllRelations();
        responseHandler(res, { message: "all users graph data",data:{users,relations} });
    } catch (err) {
      errResonseHandler(res, err);
    }
  }
}

export default new nodesController();
