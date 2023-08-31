import express from 'express'
import bodyParser from 'body-parser'
import signale from 'signale'
import fs from 'fs'


const app = express()
      app.use(bodyParser.json())
//File's parser
const myData = JSON.parse(fs.readFileSync('src/json/data.json').toString())

//Read all data
app.get('/',(req,res,next)=>{
    res.send(myData)
})
//Add to json file
app.post('/',(req, res,next)=>{
    myData.push(req.body)
    fs.writeFileSync('src/json/data.json',JSON.stringify(myData))
    res.send('Added successfully')
})
//Delete from json file
app.delete('/:id',(req,res,next)=>{
    const itemId = req.params
    fs.readFileSync('src/json/data.json',(err, data)=>{
        if (err){
            console.log(err)
            res.status(500).send('Server error')
            return
        }
    })
    const item = myData
    const itemIndex = item.findIndex(item => item.id===itemId)
        if(itemId === -1){
            res.status(404)._construct('Item not found')
            return
        }
        item.splice(itemId,1)
        fs.writeFileSync('src/json/data.json',JSON.stringify(item))
        res.send('Deleted successfully')
})

app.listen(3000,()=>{
    signale.success('Listens on port')
})