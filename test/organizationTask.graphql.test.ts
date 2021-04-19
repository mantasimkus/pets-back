import { expect } from 'chai';
import supertest from 'supertest';
import validate from './validators/organizationTask.interface.validator';

require('dotenv').config({ path: './test/.env' });

const url = process.env.TEST_URL || 'http://localhost:8081';
const request = supertest(url);

describe('GraphQL organization task integration tests', () => {
    it('Return list of animal items', (done) => {
        request
            .post('/graphql')
            .send({
                query: `
                    {
                        organizationTasks {
                            id,
                            title,
                            description,
                            organizationId,
                            isDone
                        }
                    }
                `
            })
            .set('Authorization', `Bearer ${process.env.BEARER_TOKEN}`)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    console.log(res.body);
                    return done(err);
                }
                const {body: {data: { organizationTasks }}} = res;
                validate(organizationTasks[0]);
                expect(organizationTasks).to.be.an('array');
                // expect(organizationTasks).length.above(1);
                return done();
            })
    });

    it('Return organization task by id', (done) => {
        request
            .post('/graphql')
            .send({
                query: `
                    {
                        organizationTask(id:1) {
                            id,
                            title,
                            description,
                            organizationId,
                            isDone
                        }
                    }
                `
            })
            .set('Authorization', `Bearer ${process.env.BEARER_TOKEN}`)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    console.log(res.body);
                    return done(err);
                }
                const {body: {data: { organizationTask }}} = res;
                validate(organizationTask);
                return done();
            })
    });
});
