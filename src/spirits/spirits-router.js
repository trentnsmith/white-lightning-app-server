const express = require('express');
const path = require('path');
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
    .post(jsonParser, (req, res, next) => {
        const { spirit_name, content, age, abv, category, distillery_id } = req.body;
        const newSpirit = { spirit_name, content, age, abv, category, distillery_id };

        for (const [key, value] of Object.entries(newSpirit)) {
            if (!value) {
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body`}
                });
            };
        };

        SpiritsService.createSpirit(
            req.app.get('db'),
            newSpirit
        )
        .then(spirit => {
            res
                .status(201)
                .location(path.posix.join(req.originalUrl, `/${spirit.id}`))
                .json(serializeSpirit(spirit))
        })
        .catch(next)
    })

module.exports = spiritsRouter;