const express= require("express");
const bodyParser=require("body-parser");

const app= express();

var items= ["Getting Up" , "Have Breakfast" , "Go to Work"]
var workItems=[];
var tripItems=[];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false}));

app.use(express.static("public"));

app.get("/" , function(req, res){

    var today = new Date();
    
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    var day = today.toLocaleDateString("en-US" , options);
    res.render("list", {ListTitle  : day , newListItems : items });

});

app.post("/" , function(req, res){
    var item=req.body.newItem;

    if(req.body.list==="HomeWork"){
        workItems.push(item);
        res.redirect("/study")
    }
    else if(req.body.list==="Trip"){
        tripItems.push(item);
        res.redirect("/trip")
    }
    else{
    items.push(item);
    res.redirect("/"); }
});

app.get("/study", function(req, res){
    res.render("list" , {ListTitle:"HomeWork" , newListItems:workItems});
});

app.get("/trip", function(req, res){
    res.render("list" , {ListTitle:"Trip" , newListItems:tripItems});
});

app.get("/about", function(req, res){
    res.render("about");
});


app.listen(3000 , function (){
    console.log("Server running on port 3000")
});