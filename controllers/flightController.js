const flights=require('../models/Flight')
const allFlights=flights.exampleModel;
const moment=require('moment')


//Base url
exports.example = (req, res) => {
    console.log("example")
    res.send("Flight example")
}
// Add/Book Flight
exports.bookFlight = (req, res) => {
      const newFlight={
        title:req.body.title,
        time:new Date().toLocaleTimeString('en-US', { hour: 'numeric',minute: 'numeric'}),
        price:req.body.price,
        date:moment().format('DD-MM-YYYY')
 }
// checks if all fields have been filled
if(!newFlight.title | !newFlight.price){
        return res.status(400).json({message:'Please fill all fields'})
    }
    //  adds the element to the array
    allFlights.push(newFlight)
    //  adds id to each element to be uniquely identified
    allFlights.forEach((item, i) => {
        item.id = i + 1;
      });
console.log(allFlights)

res.status(200).json({message:"Flight has been booked successfully"})
}

// Get all Flights
exports.fetchAllFlights = (req, res) => {
    // checks if the array has any element or not
    if(allFlights.length>0){
       return res.status(200).json(allFlights)
    }
    return res.status(400).json({message:'No available flights'})
}

// Get a single Flight
exports.getSingleFlight = (req, res) => {
    //  checks whether at least one element matches with the users input
   const found=allFlights.some(allFlight=>allFlight.id===parseInt(req.params.id))
 
    if(found){
        res.send(allFlights.filter(allFlight=>allFlight.id===parseInt(req.params.id)))
    }else{
            res.status(400).json({message:`No Flight with the id of ${req.params.id}`})
        } 
}

// Update/Edit Flight
exports.updateSingleFlight = (req, res) => {
  const found=allFlights.some(allFlight=>allFlight.id===parseInt(req.params.id))
 
    if(found){
        const updateFlight=req.body
        allFlights.forEach(allFlight=>{
            if(allFlight.id===parseInt(req.params.id)){
                allFlight.title=updateFlight.title ? updateFlight.title:allFlight.title;
                allFlight.time=new Date().toLocaleTimeString('en-US', { hour: 'numeric',minute: 'numeric'})
                allFlight.price=updateFlight.price ? updateFlight.price:allFlight.price;
                allFlight.date=moment().format('DD-MM-YYYY')

                res.json({message:`Flight with the id of ${req.params.id} has been updated successfully!`,allFlight})
            }
        })
    }else{
            res.status(400).json({message:`No Flight with the id of ${req.params.id}`})
        } 
}

// Delete Flight
exports.deleteFlight = (req, res) => {
    const found=allFlights.some(allFlight=>allFlight.id===parseInt(req.params.id))

    if(found){
        allFlights.splice(parseInt(req.params.id),1)
       res.json({message:`Flight has been deleted successfully`,allFlights})
    }else{
        res.status(400).json({message:`No Flight with the id of ${req.params.id}`})
    } 
 }