const Issue = require('../models/issue')

const createIssue = async (req, res) => {
    try {
      const newIssue = new Issue(req.body);
      await newIssue.save();
      res.status(200).json(newIssue);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while creating the issue.', error });
    }
  };


const getIssues = async (req, res) => {
  try {
    const issues = await Issue
    .find()
    .populate('project')
    
    res.status(200).json(issues);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching issues.' , error});
  }
};


const getIssueById = async (req, res) => {
  try {
    const id = req.params.id; 
    // console.log(id)
    const issue = await Issue.findById(id).populate('assignedTo')
    // console.log(issue)
    if (!issue) {
      return res.status(404).json({ error: 'Issue not found.' });
    }
    res.status(200).json(issue);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the issue.', error });
  }
};


const updateIssue = async (req, res) => {
  try {
    const updatedIssue = await Issue.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedIssue) {
      return res.status(404).json({ error: 'Issue not found.' , error });
    }
    res.status(200).json(updatedIssue);
  } catch (error) {
    res.status(500).json({ error: error.message , error});
  }
};



const deleteIssue = async (req, res) => {
  try {
    const deletedIssue = await Issue.findByIdAndRemove(req.params.id);
    if (!deletedIssue) {
      return res.status(404).json({ error: 'Issue not found.' });
    }
    res.status(204).send(); // 204 No Content response for successful deletion
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the issue.' });
  }
};

const checkIssue = async (req, res) => {
  try {
    const { issueTitle, projectId } = req.query;
    const existingIssue = await Issue.findOne({ title: issueTitle, project: projectId });

    if (existingIssue) {
   
      return res.json({ exists: true });
    } else {
      return res.json({ exists: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const issuesByPriority = async (req, res) => {
  try {
    const priorities = ['Low', 'Medium', 'High'];
    const counts = await Promise.all(
      priorities.map(async (priority) => {
        const count = await Issue.countDocuments({ priority });
        return count;
      })
    );

    res.json({ priorities, counts });
  } catch (error) {
    console.error('Error fetching priority data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const issueByStatus =  async (req, res) => {
  try {
    const statusCounts = await Issue.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    const statuses = statusCounts.map((statusCount) => statusCount._id);
    const counts = statusCounts.map((statusCount) => statusCount.count);

    res.json({ statuses, counts });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching ticket data', error });
  }
};






module.exports = {
  createIssue, 
  updateIssue,
   deleteIssue, 
   getIssueById, 
   getIssues,
   checkIssue,
   issuesByPriority,
   issueByStatus
  
  };