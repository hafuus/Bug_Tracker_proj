const Project = require('../models/Project');
const Issue = require('../models/issue');
const User = require('../models/user');

const createProject = async (req, res) => {
  try {
    const { projectName, description, createdBy, teamMembers } = req.body;

    const project = new Project({ projectName, description, createdBy, teamMembers });
    await project.save();

    res.status(200).json(project); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Project creation failed' , error});
  }
};

const getProjectDetails = async (req, res) => {
  try {
    const projectId = req.params.projectId; 
    // console.log(projectId);
    const project = await Project.findById(projectId)
      .populate('createdBy', 'fullname')
      .populate('teamMembers', 'fullname');
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    return res.status(200).json({ message: "succefull" , project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch project details' ,error});
  }
};


const updateProject = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    // console.log(projectId);
    const { projectName, description, teamMembers } = req.body;

    const project = await Project.findByIdAndUpdate(
      projectId,
      { projectName, description, teamMembers },
      { new: true } 
    );
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    return res.status(200).json({ message: "succefull", project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Project update failed' });
  }
};

const deleteProject = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const project = await Project.findByIdAndDelete(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    return res.status(200).json({ message: "'Project deleted successfully'", project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Project deletion failed' });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate('createdBy teamMembers', 'username fullname'); // Populate createdBy and teamMembers with user details
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteAllProjects = async (req, res) => {
  try {
    const result = await Project.deleteMany({});

    res.json({ message: `${result.deletedCount} projects deleted successfully` });
  } catch (error) {
    console.error('Error deleting projects:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
 
const ProjectIssues = async (req, res) => {
  const projectId = req.params.projectId;

  try {
    // Query the issues collection for issues related to the specified project
    const issues = await Issue.find({ project: projectId });
    res.status(200).json({ issues });
  } catch (error) {
    console.error('Error fetching issues:', error);
    res.status(500).json({ error: 'An error occurred while fetching issues.', error });
  }
};

const checkProject = async (req, res) => {
  const { projectName } = req.query;
  try {
    const existingProject = await Project.findOne({ projectName });
    if (existingProject) {
      // Project with the same name already exists
      res.json({ exists: true });
    } else {
      // Project with the same name doesn't exist
      res.json({ exists: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const isUserInProject = async(req, res, next) => {
  const projectId = req.params.projectId;

  try {
    const project = await Project.findById(projectId).exec();

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.users.includes(req.user._id)) {
      return next();
    } else {
      res.status(403).json({ message: 'You do not have access to this project' });
    }
  } catch (error) {
    console.error('Error checking user access to project:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const userProject = async (req, res) => {
  try {
    const userId = req.params.userID;
    // console.log(userId);

    const projects = await Project.find({ teamMembers: userId });

    if (projects.length > 0) {
      // Extract team members for each project
      const projectsWithTeamMembers = await Promise.all(
        projects.map(async (project) => {
          const teamMembersDetails = await User.find({ _id: { $in: project.teamMembers } });
          return {
            project: project,
            teamMembers: teamMembersDetails,
          };
        })
      );

      res.status(200).json(projectsWithTeamMembers);
    } else {
      res.status(404).json({ message: 'No assigned projects found for the user.' });
    }
  } catch (error) {
    console.error('Error fetching user-specific projects:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const AddMembers = async (req, res) => {
  const projectId = req.params.projectId;
  const newMembers = req.body.members.filter(member => member !== null);
  console.log(newMembers)

  try {
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

   
    if (!project.teamMembers || !Array.isArray(project.teamMembers)) {
      return res.status(400).json({ error: 'Invalid project team members data' });
    }


    project.teamMembers = [...project.teamMembers, ...newMembers];

    // Save the updated project
    await project.save();

    res.json({ message: 'Members added successfully', project });
  } catch (error) {
    console.error('Error adding members:', error);
    res.status(500).json({ error: 'Internal Server Error', error });
  }
};





const removeMembers = async (req, res) => {
  const { projectId, memberId } = req.params;

  try {
 
    const project = await Project.findById(projectId);

   
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    if (!project.teamMembers || !Array.isArray(project.teamMembers)) {
      return res.status(400).json({ error: 'Invalid project team members data' });
    }

    project.teamMembers = project.teamMembers.filter(member => member.toString() !== memberId);

    await project.save();

    res.json({ message: 'Member removed successfully', project });
  } catch (error) {
    console.error('Error removing member:', error);
    res.status(500).json({ error: 'Internal Server Error', error });
  }
};





module.exports = {
  createProject,
  getProjectDetails,
  updateProject,
  deleteProject,
  getProjects,
  deleteAllProjects,
  ProjectIssues,
  checkProject,
  isUserInProject,
  userProject,
  AddMembers,
  removeMembers
};
