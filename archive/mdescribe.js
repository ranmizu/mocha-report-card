module.exports = function(describeTitle, describeFn, categories) {
  try {
    describe(describeTitle, describeFn);
    for (let category in categories) {
      categories[category]++;
    }
  } catch(e) {
    throw new Error(e);
  }
}
