const express = require('express')
const router = express.Router();

const issueController = require('../controllers/issue')

router.post("/save" , issueController.createIssue)
router.put("/update/:id" , issueController.updateIssue)


router.delete("/delete:id" , issueController.deleteIssue)
router.get("/" , issueController.getIssues)
// router.get("/details/:id" , issueController.getIssueById)
router.get("/details/:id", issueController.getIssueById);
router.get("/check" , issueController.checkIssue)
router.get('/issuesByPriority', issueController.issuesByPriority)
router.get('/issuesByStatus', issueController.issueByStatus)








module.exports = router