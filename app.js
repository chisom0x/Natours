const fs = require('fs');
const  express = require('express');

const app = express();

app.use(express.json());


const tours = 
   JSON.parse(
    fs.readFileSync(`${__dirname}/starter/dev-data/data/tours-simple.json`
    ));


// getting all the tours

app.get('/api/v1/tours', (req, res)=>{
 res.json({
    status: 'success',
    results: tours.lenght,
    data: {
        tours: tours
    }
 })
})

// creating routes to specific tours

app.get('/api/v1/tours/:id', (req, res)=>{
    console.log(req.params);
    const id = req.params.id * 1;
    if(id> tours.length){
        return res.status(404).json({
            status: 'failed',
            message: 'invalid id'
        }) 
    } else {
        const tour = tours.find(el => el.id === id)
        res.json({
            status: 'success',
           data: {
             tour
           }
        })
    }
  
})

// uploading a new tour to the server

app.post('/api/v1/tours', (req, res,)=>{

 const newID = tours[tours.length - 1].id + 1;
 const newTour = Object.assign({ newID}, req.body);

 tours.push[newTour];
 
 fs.writeFile(`${__dirname}/starter/dev-data/data/tours-simple.json`, JSON.stringify(tours), err =>{
   res.status(201).json({
    status: "success",
    data: {
        tour: newTour
    }
   })
 })
})

// handling patch requests to update data

app.patch('/api/v1/tours/:id', (req, res)=>{
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status: 'failed',
            message: 'invalid 1d'
        })
    } 
        res.status(200).json({
            status: "success",
            data: {
                tour: '<updated tour>'
            }
        });
    
   
})


// handling delete requests to update data

app.delete('/api/v1/tours/:id', (req, res)=>{
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status: 'failed',
            message: 'invalid 1d'
        })
    } 
        res.status(204).json({
            status: "success",
            data: {
                tour: null
            }
        });
    
   
})



const port = 4000;
app.listen(port, ()=>{
    console.log(`listening on ${port}`)
});

