const expect = require('chai').expect;
const mdescribe = require('./mdescribe');
const { counts, mit } = require('./mit');

console.log('counts', counts);
console.log('mit', mit);

describe('my test', () => {
  mit('should do', () => {
    expect(5).to.eql(5);
  }, ['addition', 'subtraction']);

  after(() => {
    for (let count in counts) {
      if (counts[count][1] > 0) {
        console.log(count, 'score:', counts[count][0]/counts[count][1]);
      }
    }
  });
});
