const fs = require('fs');
const path = require('path');

class ReportCard {
  constructor() {
    this.scores = {};
    this.timestamp = new Date().toISOString();
    this.files = [];

    this.deliver = function(mochaTests) {
      return new Promise((resolve, reject) => {
        mochaTests(resolve);
      })
      .then(() => {
        const newReport = {
          timestamp: this.timestamp,
          scores: this.scores,
        };
        return newReport;
      });
    }.bind(this);

    this.describe = function (describeTitle, describeFn, categories = []) {
      categories.forEach(category => {
        if (!this.scores[category]) {
          this.scores[category] = [0, 0];
        }
      });

      describe(describeTitle, () => {
        try {
          describeFn();
          categories.forEach(category => {
            this.scores[category][0]++;
          });
        } catch(e) {
          throw new Error(e);
        } finally {
          categories.forEach(category => {
            this.scores[category][1]++;
          });
        }
      });
    }.bind(this);

    this.it = function (itTitle, itFn, categories = []) {
      categories.forEach(category => {
        if (!this.scores[category]) {
          this.scores[category] = [0, 0];
        }
      });

      it(itTitle, () => {
        try {
          itFn();
          categories.forEach(category => {
            this.scores[category][0]++;
          });
        } catch(e) {
          throw new Error(e);
        } finally {
          categories.forEach(category => {
            this.scores[category][1]++;
          });
        }
      });
    }.bind(this);
  }

  addFile (file) {
    this.files.push(file);
  }

  addFiles (files) {
    files.forEach(file => this.files.push(file));
  }

  run (writeLocation) {
    const newScores = {};
    const promiseArray = [];
    const filenames = [];

    let promiseObj;

    this.files.forEach(filepath => {
      promiseObj = require(filepath);
      if (promiseObj.constructor === Promise) {
        promiseArray.push(require(filepath));
        filenames.push(filepath.slice(filepath.indexOf('/') + 1).replace('-test', ''));
      }
    });

    return Promise.all(promiseArray).then((scores) => {
      scores.forEach((score, i) => {
        newScores[filenames[i]] = score;
      });
      fs.writeFileSync(writeLocation, JSON.stringify(newScores, null, 2));
      return newScores;
    })
  };

  gradeByFile (filepath) {
    const categories = {}
    const scores = JSON.parse(fs.readFileSync(filepath));
    Object.keys(scores).forEach(test => {
      Object.keys(scores[test].scores).forEach(category => {
        if (!categories[category]) categories[category] = [0, 0];
        categories[category][0] += scores[test].scores[category][0];
        categories[category][1] += scores[test].scores[category][1];
      });
    });
    Object.keys(categories).forEach(score => console.log(score, ':', categories[score]))
  }
}


module.exports = ReportCard;
