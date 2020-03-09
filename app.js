"include strict"
const Client = require("@googlemaps/google-maps-services-js").Client;
const express = require("express");
const app = express();
const yelp = require("yelp-fusion");
const request = require("request");

app.set("view engine", "ejs");
const apiKey = 'bW8kVOe_WJy982_-ntTDgWssxtbTmCYHRglXX74YQub53e1zFMOh4BRqa0qbYiDXkUIjlyHFIq3xTN_DN5ubfklOoJDV9FvJ4llKbmfcTbQYqomSNqFahBem-mpVXnYx';
const client = yelp.client(apiKey);
var data = "request to yelp not sent yet";
var newdata = "request not made for new data yet";
const googleClient = new Client({});

app.use("/assets", express.static("assets"));

app.get("/test", function(req, res){
	var name = req.query.name;
	var location = req.query.location;
	var rating = req.query.rating;
	var price = req.query.price;
	var categories = req.query.categories;
	console.log(name + " " + location + " " + rating);
	const searchRequest = {
		term: name, 
		location: location,
	}
	client.search(searchRequest).then(response => {           
		  data = [
			  response.jsonBody.businesses[0],
			  response.jsonBody.businesses[1],
			  response.jsonBody.businesses[2],
			  response.jsonBody.businesses[3],
			  response.jsonBody.businesses[4]
		  ]
		  for(var i = 0; i < data.length; i++) {
			const prettyJson = JSON.stringify(data[i], null, 4); 
			console.log(data[i]);
		  }
	}).catch(e => {
		  console.log(e);
	});	
	res.render("test");
});

app.get("/results", function(req, res){
	res.render("results", {data:data});
});

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/search", function(req, res){
	res.render("search");
});

app.get("/test2", function(req, res){
	res.render("test2", {data:data});
});

app.get("*", function(req, res){
	res.redirect("landing");
});

app.listen(3000, function(req, res){
	console.log("Yelp Server has started....");
});