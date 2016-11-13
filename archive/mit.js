class Mit {
  constructor() {
    this.counts = {};

    this.deliver = function(mochaTests) {
      return new Promise((resolve, reject) => {
        mochaTests(resolve);
      });
    };

    this.mit = function (itTitle, itFn, categories) {
      categories.forEach(category => {
        if (!this.counts[category]) {
          this.counts[category] = [0, 0];
        }
      });

      it(itTitle, () => {
        try {
          itFn();
          categories.forEach(category => {
            this.counts[category][0]++;
          });
        } catch(e) {
          throw new Error(e);
        } finally {
          categories.forEach(category => {
            this.counts[category][1]++;
          });
        }
      });
    }.bind(this);
  }
}

module.exports = new Mit;
