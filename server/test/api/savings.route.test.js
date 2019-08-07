const server = require('../setup/server.setup');

const { expect } = require('../setup/chai.setup');

describe('/api/v1/savings', function() {
  describe('GET', function() {
    it('returns 200', async function () {
      this.timeout(100000)
      const res = await server().get('/api/v1/savings');
      expect(res.status).to.equal(200);
    });
  });
});