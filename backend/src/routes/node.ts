import { Router, Request, Response } from 'express';
import userController from '../controller/nodes';
const router = Router();

// Fetch all users  
router.get('/',userController.getAllUsers);

  //Create new user  
router.post('/',userController.createUser);

// Update user
router.put('/:id',userController.updateUser);

// Delete user
router.delete('/:id',userController.deleteUser);

  //Create relationship (friendship) 
router.post('/:id/link',userController.createRelation);


// Remove relationship  
router.delete('/:id/unlink',userController.removeRelation);



export default router;
