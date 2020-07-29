const knex = require('knex');
const app = require('../src/app');
const makeSpiritArray = require('./spirits-fixtures');
const supertest = require('supertest');
const { expect } = require('chai');

describe('Spirits endpoints', () => {
    let db;

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL
        });
        app.set('db', db)
    });

    after('disconnect from db', () => db.destroy());

    before('cleanup', () => db('white_lightning_spirits').truncate());

    afterEach('cleanup', () => db('white_lightning_spirits').truncate());

    describe('GET /api/spirits', () => {
        context(`Given no spirits`, () => {
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                    .get('/api/spirits')
                    .expect(200)
            });
        });

        context(`Given there are spirits in the database`, () => {
            const testSpirits = makeSpiritArray();

            beforeEach('insert spirits', () => {
                return db
                    .into('white_lightning_spirits')
                    .insert(testSpirits)
            });

            it('responds with 200 and all of the spirits', () => {
                return supertest(app)
                    .get('/api/spirits')
                    .expect(200, testSpirits)
            });
        });
    });

    describe('DELETE /api/spirits/:spirit_id', () => {
        context(`Given no spirits`, () => {
            it(`responds with 404 when the spirit doesn't exist`, () => {
                const id = 12344;
                return supertest(app)
                    .delete(`/api/spirits/${id}`)
                    .expect(404, { error: { message: "Spirit doesn't exist"} } )
            });
        });

        context('Given there are spirits in the database', () => {
            const testSpirits = makeSpiritArray();

            beforeEach('insert spirits', () => {
                return db
                    .into('white_lightning_spirits')
                    .insert(testSpirits)
            });

            it('removes the spirit by ID', () => {
                const idToRemove = 2;
                const expectedSpirits = testSpirits.filter(spirit => spirit.id !== idToRemove);
                return supertest(app)
                    .delete(`/api/spirits/${idToRemove}`)
                    .expect(204)
                    .then(() => 
                        supertest(app)
                            .get(`/api/spirits`)
                            .expect(expectedSpirits)
                    );
            });
        });
    });

    describe('POST /api/spirits', () => {
        it(`adds a new spirit`, () => {
            const newSpirit = {
                spirit_name: 'test spirit',
                content: 'test content',
                category: 'test category',
                age: 'test age',
                abv: 'test abv',
                distillery_id: 1
            };
            return supertest(app)
                .post(`/api/spirits`)
                .send(newSpirit)
                .expect(201)
                .expect(res => {
                    expect(res.body.spirit_name).to.eql(newSpirit.spirit_name)
                    expect(res.body.content).to.eql(newSpirit.content)
                    expect(res.body.category).to.eql(newSpirit.category)
                    expect(res.body.age).to.eql(newSpirit.age)
                    expect(res.body.abv).to.eql(newSpirit.abv)
                    expect(res.body.distillery_id).to.eql(newSpirit.distillery_id)
                    expect(res.headers.location).to.eql(`/api/spirits/${res.body.id}`)
                })
                .then(res => {
                    supertest(app)
                        .get(`api/spirits/${res.body.id}`)
                        .expect(res.body)
                });
        });
    });

    describe(`PATCH /api/spirits/:spirit_id`, () => {
        context(`Given no spirits`, () => {
            it(`responds with 404`, () => {
                const spiritId = 5432;
                return supertest(app)
                    .patch(`/api/spirits/${spiritId}`)
                    .expect(404, { error: { message: `Spirit doesn't exist`} } )
            });
        });

        context(`Given there are spirits in the database`, () => {
            const testSpirits = makeSpiritArray();

            beforeEach('inset spirits', () => {
                return db
                    .into('white_lightning_spirits')
                    .insert(testSpirits)
            });

            it('updates the spirit with 204', () => {
                const idToUpdate = 2;
                const updateSpirit = {
                    spirit_name: 'test spirit',
                    content: 'test content',
                    category: 'test category',
                    age: 'test age',
                    abv: 'test abv',
                    distillery_id: 1
                };
                const expectedSpirits = {
                    ...testSpirits[idToUpdate - 1],
                    ...updateSpirit
                };
                return supertest(app)
                    .patch(`/api/spirits/${idToUpdate}`)
                    .send(updateSpirit)
                    .expect(204)
                    .then(res => {
                        supertest(app)
                            .get(`/api/spirits/${idToUpdate}`)
                            .expect(expectedSpirits)
                    });
            });
        });
    });
});