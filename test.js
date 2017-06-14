var fs=require('fs');
var file="./public/file/data.json";
var result=JSON.parse(fs.readFileSync( file));
console.log(result);
console.log(result[1].data);
result[1].data=14;
fs.writeFileSync(file, JSON.stringify(result));
