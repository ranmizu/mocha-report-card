const expect = require('chai').expect;
const { counts, deliver, mit } = require('./mit');
let pow;
try {
  pow = require('./pow.js');
} catch (e) {
  console.log('pow could not be tested');
}

const sample = deliver((resolve) => {

  if (typeof pow === 'function') {
    describe('Pow Test', function() {
      mit('should return correct computation', function() {
        expect(pow(1, 2)).to.eql(1);
        expect(pow(2, 2)).to.eql(4);
        expect(pow(3, 4)).to.eql(81);
        expect(pow(5, 5)).to.eql(3125);
        expect(pow(0, 10)).to.eql(0);
        expect(pow(10, 0)).to.eql(1);
      }, ['recursion', 'math']);
      mit('should work with negative bases', function() {
        expect(pow(-2, 2)).to.eql(4);
        expect(pow(-5, 3)).to.eql(-125);
      }, ['negatives', 'edge cases']);

      after(() => {
        resolve(counts);
        // for (let count in counts) {
        //   if (counts[count][1] > 0) {
        //     console.log(count, 'score:', counts[count][0]/counts[count][1]);
        //   }
        // }
      });
    });
  } else {
    console.log('pow was not exported properly');
  }
});


module.exports = sample;
