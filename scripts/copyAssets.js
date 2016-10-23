var glob = require("glob");
var fs = require("fs-extra");

// options is optional
glob("src/app/**/*.scss", {}, function (er, files) {
  files.forEach((file) => {
    fs.copySync(file, file.replace('src/', 'compiled/'))
  });
});