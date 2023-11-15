const express = require('express')
const router = express.Router();

const projectController = require('../controllers/project')
const isUserInProject = projectController.isUserInProject


// Middleware to check if the user is authenticated
// function isAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//       return next();
//     }
//     res.status(401).json({ message: 'Authentication required' });
//   }



router.post("/save" , projectController.createProject)
router.put('/update/:projectId' , projectController.updateProject)
router.delete("/delete/:projectId" , projectController.deleteProject)
router.delete("/delete" , projectController.deleteAllProjects)
router.get('/:projectId/issues', projectController.ProjectIssues)
router.get('/details/:projectId', projectController.getProjectDetails);
// router.get('/:projectId',  isAuthenticated, isUserInProject, projectController.getProjectDetails);
router.get("/check" , projectController.checkProject)
router.get("" , projectController.getProjects)
router.get('/userProject/:userID' , projectController.userProject)
router.post('/:projectId/add-members' , projectController.AddMembers)
router.delete('/:projectId/remove-member/:memberId', projectController.removeMembers);


// router.get("/get/:id" , projectController.getIssueById)



module.exports = router