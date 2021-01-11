const Flight = require("../models/flight");
const Ticket = require("../models/ticket");

module.exports ={
    index,
    form,
    create,
    show,
    addDestination,
    deleteDestination
}




function index(req,res,next){
    Flight.find({}).then(function(result){
        result.sort(function(a,b) { return a.departs - b.departs});
        res.render('flight.ejs', { title: 'Jay Air', flights:result});
        }
    )
}

function form(req,res,next){
    const newFlight = new Flight();
    const dt = newFlight.departs; 
    // Format the date for the value attribute of the input
    const departsDate = dt.toISOString().slice(0, 16);
    res.render("form.ejs", {departsDate});
}

function create(req,res,next){
    Flight.create(req.body).then(function(result){
        res.redirect("/flights");
    })
}

function show(req,res,next){
    async function callShow(){
        try{
            let flight = await Flight.findById(req.params.id);
            flight.destinations.sort(function(a,b) {return a.arrival - b.arrival});
            //gets the list of unused airport list
            let airportList = ["AUS","DFW","DEN","LAX","SAN"];
            let selected = [flight.airport];
            flight.destinations.forEach(function(destination){
                selected.push(destination.airport);
            });
            airportList = airportList.filter(function(el){
                return !selected.includes(el);
            })

            //Tickets
            let tickets = await Ticket.find({flight:flight._id});
            res.render("flightDetails.ejs", {flight, airportList, tickets});
        }
        catch(error){
            console.log("error happened:", error)
            res.render('error.ejs',{error})
        }
    }
    callShow()
}

function addDestination(req,res,next){
    Flight.findById(req.params.id).then(function(result){
        result.destinations.push(req.body);
        return result.save();
        //res.render("flightDetails.ejs", {flight:result});
    }).then(function(result){
        res.redirect(`/flights/${req.params.id}`);
    });
}

function deleteDestination(req,res,next){
    Flight.findById(req.params.id).then(function(result){
        let index = result.destinations.findIndex(destination => destination._id == req.params.did);
        result.destinations.splice(index,1);
        return result.save();
        //res.render("flightDetails.ejs", {flight:result});
    }).then(function(result){
        res.redirect(`/flights/${req.params.id}`);
    });
}

