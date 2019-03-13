var ObjectID= require('mongodb').ObjectID
module.exports = function(app,db){
  app.post('/dice',(req,res)=>{
    let num=Math.floor(Math.random() * 6) + 1
    const OBJ={roll:num}
    db.collection('dice').insert(OBJ,(err,results)=>{
      if(err){
        res.send({'error':'An error has occured'})
      }
      else{
        console.log(results.ops[0])
        console.log("posted!")
        res.send(results.ops[0])
      }
    })
  })

  app.put('/dice/:id/:roll',(req,res)=>{
    const id= req.params.id
    const details={'_id':new ObjectID(id)}
    const OBJ={roll:parseInt(req.params.roll)}
    db.collection('dice').update(details,OBJ,(err,item)=>{
      if(err){
        res.send({'error':'An error has occured'})
      }
      else{
        console.log("Updated!")
        res.send("Updated")
      }
    })
  })

  app.get('/dice/:id',(req,res)=>{
    const id= req.params.id
    const details={'_id':new ObjectID(id)}
    db.collection('dice').findOne(details,(err,item)=>{
      if(err){
        res.send({'error':'An error has occured'})
      }
      else{
        console.log("Got!")
        res.send(item)
      }
    })
  })

  app.get('/dice',(req,res)=>{
    db.collection('dice').find().toArray((err,item)=>{
      if(err){
        res.send({'error':'An error has occured'})
      }
      else{
        res.send(item)
      }
    })
  })

  app.delete('/dice/:id',(req,res)=>{
    const id= req.params.id
    const details={'_id':new ObjectID(id)}
    db.collection('dice').remove(details,(err,item)=>{
      if(err){
        res.send({'error':'An error has occured'})
      }
      else{
        console.log("Deleted")
        res.send('Deleted')
      }
    })
  })


app.get('/dicestats',(req,res)=>{
  db.collection('dice').find().toArray((err,item)=>{
    if(err){
      res.send({'error':'An error has occured'})
    }
    else{
      let stats = createStatObj(item)
      res.send(stats)
    }
  })
})
}//exports
function createStatObj(Obj){
  console.log(Obj)
let stats={
  total:Obj.length,
  1:Obj.filter(dice=> dice.roll===1).length,
  "1%":Obj.filter(dice=> dice.roll===1).length/Obj.length,
  2:Obj.filter(dice=> dice.roll===2).length,
  "2%":Obj.filter(dice=> dice.roll===2).length/Obj.length,
  3:Obj.filter(dice=> dice.roll===3).length,
  "3%":Obj.filter(dice=> dice.roll===3).length/Obj.length,
  4:Obj.filter(dice=> dice.roll===4).length,
  "4%":Obj.filter(dice=> dice.roll===4).length/Obj.length,
  5:Obj.filter(dice=> dice.roll===5).length,
  "5%":Obj.filter(dice=> dice.roll===5).length/Obj.length,
  6:Obj.filter(dice=> dice.roll===6).length,
  "6%":Obj.filter(dice=> dice.roll===6).length/Obj.length,


}
  return stats
}
