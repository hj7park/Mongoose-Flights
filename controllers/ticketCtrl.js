const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports ={
    create,
    form,
    deleteTicket
}

function form(req,res,next){
    res.render("ticketForm.ejs",{flightID: req.params.id});
}

function create(req,res,next){

    async function makeTicket(){
        try{
            
            let ticketObj = {seat:req.body.seat,price:req.body.price,flight:req.params.id};
            await Ticket.create(ticketObj);
            res.redirect(`/flights/${req.params.id}`);
        }
        catch(error){
            console.log("error happened:", error)
            res.render('error.ejs',{error})
        }
    }
    makeTicket();
}

function deleteTicket(req,res,next){
    async function deleteT(){
        try{
            await Ticket.remove({_id:req.params.did});
            res.redirect(`/flights/${req.params.id}`);
        }
        catch(error){
            console.log("error happened:", error)
            res.render('error.ejs',{error})
        }
    }
    deleteT();
}