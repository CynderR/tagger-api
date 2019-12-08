module.exports = (app) => {
    const tags = require('../controllers/tags.controller.js');

    // Create a new tag
    app.post('/tags', tags.create);

    // Retrieve all tags
    app.get('/tags', tags.findAll);

    // Retrieve a single tag by id
    app.get('/tags/:id', tags.findOne);

    // Update a tag with tagId
    app.put('/tags/:id', tags.update);

    // Delete a tag with tagId
    app.delete('/tags/:id', tags.delete);
}
