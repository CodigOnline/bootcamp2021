import * as express from 'express';

const app = express()
app.get('/*',function (req,res){
  res.sendFile('index.html',{root:'dist/frontend'})
});

app.listen(4200,()=>{
  console.log("Servidor iniciado");
})

