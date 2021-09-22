const request = require('supertest');
const app = require('../../src/server');

describe('Magneto API', () => {
  const dna = ['ATGCGA', 'CAGTGC', 'TTATGT', 'AGAAGG', 'CCCCTA', 'TCACTG'];
  it('POST / should return the isMutant true', (done) => {
    request(app.start_test())
      .post('/api/mutant')
      .send({dna})
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body).not.toBeNull();
        expect(res.body).not.toBeUndefined();
        done();
      });
  });

  it('POST / should return 403 Forbidden', (done) => {
    const dnaWrong = ['GTGCGA', 'CGGTGC', 'TTATGT', 'AGATGG', 'CTCCTA', 'TCACTG']
    request(app.start_test())
      .post('/api/mutant')
      .send({dna: dnaWrong})
      .expect('Content-type', /json/)
      .expect(403)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body).not.toBeNull();
        expect(res.body).not.toBeUndefined();
        done();
      });
  });

  it('POST / should return the isMutant true', (done) => {
    const dnaWrong = []
    request(app.start_test())
      .post('/api/mutant')
      .send({dna: dnaWrong})
      .expect('Content-type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body).not.toBeNull();
        expect(res.body).not.toBeUndefined();
        done();
      });
  });

  it('GET / should return stats of mutants', (done) => {
    request(app.start_test())
      .get('/api/stats')
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body).toHaveProperty('count_mutant_dna');
        expect(res.body).toHaveProperty('count_human_dna');
        expect(res.body).toHaveProperty('ratio');
        expect(res.body).not.toBeNull();
        expect(res.body).not.toBeUndefined();
        done();
      });
  });



  it('GET / should return a 404 status code', (done) => {
    request(app.start_test())
      .get('/api/mutant-human')
      .expect('Content-type', /json/)
      .expect(404)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body).not.toBeNull();
        expect(res.body).not.toBeUndefined();
        done();
      });
  });
});
