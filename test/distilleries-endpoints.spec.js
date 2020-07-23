const knex = require('knex');
const app = require('../src/app');
const makeDistilleryArray = require('./distilleries-fixtures');
const supertest = require('supertest');
const { expect } = require('chai');

describe('Distilleries endpoints', () => {
    let db;

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        });
        app.set('db', db)
    });

    describe('GET /api/distilleries', () => {
        context('Given no courses', () => {
            it('responds with 200 and an empty list', () => {
                return supertest(app)
                    .get('/api/distilleries')
                    .expect(200)
            });
        });

        context('Given there are distilleries in the database', () => {
            const testDistilleries = makeDistilleryArray();
            
            beforeEach('insert distilleries', () => {
                return db 
                    .into('white_lightning_distilleries')
                    .insert(testDistilleries)
            });

            it('responds with 200 and all of the courses', () => {
                return supertest(app)
                    .get('/api/distilleries')
                    .expect(200)
            });
        });
    });
});

