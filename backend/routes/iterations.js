const router = require('express').Router();
const mongoose = require('mongoose');
const { Iteration } = require('../models/iteration');
const { Project } = require('../models/project');

/*router.post('/', async function(req, res) {
    let iteration = new Iteration({
        title: req.body.title,
        description: req.body.description
    });
});*/

router.get('/', function(req, res){
    
});

router.delete('/:prId/iteration/:itId', async function(req, res){
    try{
        let project = await Project.update({ _id: req.params.prId }, { $pull: { iterations: { _id: req.params.itId } } });
        res.json(project);
    }
    catch{
        return res.status(404).send('The iteration with the given ID was not found');
    }
});

router.get('/:prId/iteration/:itId', async function(req, res){
    try{
        const project = await Project.findOne({ _id: req.params.prId });
        const iteration = project.iterations.find(x => x._id == req.params.itId);
        res.json(iteration);
    }
    catch{
        return res.status(404).send('The iteration with the given ID was not found');
    }
    
});

module.exports = router;