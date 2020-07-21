const express = require('express');
const SpiritsService = require('./spirits-service');
const spiritsRouter = express.Router();
const jsonParser = express.json();

const serializeSpirit = spirit => ({
    id: spirit.id,
    spirit_name: spirit.spirit_name,
    content: spirit.content,
    age: spirit.age,
    abv: spirit.abv,
    category: spirit.category,
    distillery_id: spirit.distillery_id
});

spiritsRouter
    .route('/')
    .get((req, res, next) => {
        SpiritsService.getAllSpirits(req.app.get('db'))
            .then(spirit => {
                res.json(spirit.map(serializeSpirit))
            })
            .catch(next)
    })

module.exports = spiritsRouter;