const generateCryptoId = require('../../src/utils/generateCryptoId');

describe('Generate crypto id', () => {
  it('should generate an crypto Id', () => {
    const id = generateCryptoId();
    expect(id).toHaveLength(8);
  });
});
