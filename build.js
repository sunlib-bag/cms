
var path = process.argv[2];

var exec = require('child_process').exec;

var child = exec('npm run build', function(err, stdout, stderr) {
  if (err) throw err;
  console.log(stdout)
  console.log("构建成功")
  if(path){
    exec('cp -rf ./dist/* ../2018', function(err, stdout, stderr) {
      if (err) {
        console.log(stderr);
        throw err;
      }
      console.log('已将dist build到'+path)
    });
  }
 
});

