const htmlmin = require("html-minifier");


module.exports = function(eleventyConfig) {

  // https://github.com/hankchizljaw/educationlinks.fyi
  // Limit feed items and shuffle them so they are random for
  // each build
  eleventyConfig.addFilter('shuffle', items => {
    let currentIndex = items.length;
    let temporaryValue;
    let randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = items[currentIndex];
      items[currentIndex] = items[randomIndex];
      items[randomIndex] = temporaryValue;
    }

    return items;
  });

  // A simple limiter
  eleventyConfig.addFilter('limit', items => {
    return items.slice(0, 20);
  });



  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    if( outputPath.endsWith(".html") ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
        preserveLineBreaks: true
      });
      return minified;
    }

    return content;
  });
};