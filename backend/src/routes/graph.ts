import { Router, Request, Response } from 'express';
import User from '../models/nodes';
const router = Router();
import userController from '../controller/nodes';
// Return graph data (users + relationships)

router.get('/', userController.getUsersGraph);

export default router;
