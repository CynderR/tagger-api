const Tags = require('../models/tags.model.js');

// Create and Save a new tag
exports.create = (req, res) => {
    // Validate request
    if(!req.body.id) {
        return res.status(400).send({
            message: "Tag content can not be empty"
        });
    }
    // Save tag in the database
    Tags.findOneAndUpdate(
        {id: req.body.id}, 
        {
            id: req.body.id,
            tapeNumber: req.body.tapeNumber, 
            date: req.body.date,
            description: req.body.description,
            tags: req.body.tags
        },
        {upsert: true, new: true}
    ).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Tag."
        });
    });
};

// Retrieve and return all tags from the database.
exports.findAll = (req, res) => {
    Tags.find()
    .then(tags => {
        res.send(tags);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Tags."
        });
    });
};

// Find a single tag with a Id
exports.findOne = (req, res) => {
    Tags.findOne({id: req.params.id})
    .then(tag => {
        if(!tag) {
            return res.status(404).send({
                message: "Tag not found with id " + JSON.stringify(req.params)
            });            
        }
        res.send(tag);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Tag not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving tag with id " + req.params.id
        });
    });
};

// Update a tag identified by the Id in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "tag content can not be empty"
        });
    }

    // Find tag and update it with the request body
    Tags.findByIdAndUpdate(req.params.id, {
        tapeNumber: req.body.tapeNumber, 
        date: req.body.date,
        description: req.body.description,
        tags: req.body.tags
    }, {new: true})
    .then(tag => {
        if(!tag) {
            return res.status(404).send({
                message: "Tag not found with id " + req.params.id
            });
        }
        res.send(tag);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Tag not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating tag with id " + req.params.id
        });
    });
};

// Delete a tag with the specified Id in the request
exports.delete = (req, res) => {
    Tags.findByIdAndRemove(req.params.id)
    .then(tag => {
        if(!tag) {
            return res.status(404).send({
                message: "Tag not found with id " + req.params.id
            });
        }
        res.send({message: "Tag deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Tag not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete tag with id " + req.params.id
        });
    });
};
