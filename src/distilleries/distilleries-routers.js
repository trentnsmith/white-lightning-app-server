const path = requre('path');
const express = require('express');
const DistilleryService = require('./distilleries-service');
const distilleryRouter = express.Router();
const jsonParser = express.json();

const serializeDistillery = distillery => ({
    id: distillery.id,
    distillery_name: distillery.distillery_name,
    description: distillery.description,
    website: distillery.website
});

distilleryRouter
    .route('/')
    .get((req, res, next) => {
        DistilleryService.getAllDistilleries(req.app.get('db'))
        .then(distilleries => {
            return res.json(distilleries.map(serializeDistillery));
        })
        .catch(next)
    })


module.exports = distilleryRouter;