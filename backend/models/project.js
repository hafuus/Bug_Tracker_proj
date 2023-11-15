const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  projectName: String,
  description: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  teamMembers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
