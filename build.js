
let path = process.argv[2];

let exec = require('child_process').exec;
exec('npm install', function(err, stdout, stderr) {
  if (err) throw err;
  console.log(stdout);
  exec('npm run build', function(err, stdout, stderr) {
    if (err) throw err;
    console.log(stdout);
    console.log("构建成功");
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
})


