const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer');
const ShoppingCart = require("../models/shoppingCart");


const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'omustour@overseasinternational.com',
    pass: 'Overseas814!',
  },

});

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.post("/checkout", (req, res, next) => {
  console.log("IT HAS ENTERED THE BACK END");

  

  const {
    clientFirstName,
    clientLastName,
    checkIn,
    checkOut,
    currentStep,
    email,
    fanClubNumber,
    fanPlay,
    hotelRooms,
    hotels,
    phoneNumber,
    questions,
    tickets,
    ticketOne,
    ticketTwo,
    ticketThree,
	transportation,
  } = req.body;

  let subject = " TESTING THE SUBJECT";
  let message = "THIS IS THE MESSAGE THAT WILL BE SHOWN TO COSTUMERS";


  // console.log('THIS IS THE DATA GIVENT TO THE BACKEND',req.body);

  // console.log(`THIS IS THE CARTS PROVIDED BY FRONT END ${cart}`);

  // cart.map(items => {
  //   console.log("this are the cart item totals");
  //   let totalPrice = Number(items.totalPrice);
  //   total += totalPrice;
  // });

  // console.log(`THIS IS THE TOTAL BEFORE SAVING INTO DATABASE ${total}`);

  const newCart = new ShoppingCart({
    clientFirstName,
    clientLastName,
    checkIn,
    checkOut,
    currentStep,
    email,
    fanClubNumber,
    fanPlay,
    hotelRooms,
    hotels,
    phoneNumber,
    questions,
    tickets,
    ticketOne,
    ticketTwo,
    ticketThree,
  });
  

  // console.log('this are the hotel rooms', hotels[0]);
  console.log('TICKET ONE ------', ticketOne);
  console.log('TICKET TWOOOO-------', ticketTwo);
  console.log('TICKET THREE ---------', ticketThree);
let hotelName = "";

  let hotelNameSelector = hotels.map(items => {
    // console.log(items);
    if(items.selected == true){
      hotelName =items.hotelName;
    }
    if(items.selected == false){
      console.log('not the selected hotel');
    }
  })


  newCart
    .save()
    .then(savedCart => {
      console.log("you have saved a new shopping cart");

      res.status(200).json(savedCart);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Something went wrong", err });
    });
	var ticketsHtml = '';
	  tickets.forEach((ticket) => {
		  if(ticket.qty > 0){
			  ticketsHtml += '<li><span>' + ticket.title + ', Qty: ' + ticket.qty + '</span></li>';
		  }
	  });
	  var hotelsHtml = '';
	  hotels.forEach((hotel) => {
		  if(hotel.selected){
			  hotelsHtml += '<li><span>' + hotel.hotelName + '</span></li>';
		  }
	  });
	  var htmlDetails = `<p><b>Email:</b> ${email}</p>
	   <p><b>Phone:</b> ${phoneNumber}</p>
	   <p><b>Tickets:</b></p>
	   <ul>
       ${ticketsHtml}
       </ul>
	   <p><b>Check-in:</b> ` + (checkIn ? checkIn : 'NOT SELECTED') + `</p>
	   <p><b>Check-out:</b> ` + (checkOut ? checkOut : 'NOT SELECTED') + `</p>
	   <p><b>Hotels:</b></p>
	   <ul>
       ${hotelsHtml}
       </ul>
	   <p><b>Hotel rooms qty:</b> ${hotelRooms}</p>
	   <p><b>Fan Club No.:</b> ` + (fanClubNumber ? fanClubNumber : '') + `</p>
	   <p><b>Fan play:</b>${fanPlay}</p>
	   <p><b>Need transportation for the trainings?:</b> ` + (transportation ? 'YES' : 'NO') + `</p>
	   <p><b>Additional Questions<b></p>
	   <p>` + (questions ? questions : '') + `</p>
       `;
	var customerEmail = `<p>Hello ${clientFirstName} ${clientLastName},
<br />
<br />
Thank you for submitting your request for the ultimate OM US tour experience! </p>
<p>
We have received your request. We will contact you within the next 24 hours with confirmation details for your purchase order and the final price to submit payment information. Your order is complete once we have received payment. 
<br />
<br />
<h3>Go OM Nation!</h3></p>
	<p>Your request details:</p>` + htmlDetails;
	var agentEmailHtml = `<p>Hello, you have a new request in OM US TOUR EXPERIENCE Website, here are the details: </p>
	<p><b>First name:</b> ${clientFirstName}</p>
	   <p><b>Last name:</b> ${clientLastName}</p>` + htmlDetails;
	

    transporter.sendMail({
      from: '"OM US TOUR EXPERIENCE WebSite" <omustour@overseasinternational.com>',
      to: 'omustour@overseasinternational.com',
      subject: 'New Request for OM US TOUR EXPERIENCE',
      text: 'Go to this link to confirm',
      html: agentEmailHtml
    })
    .then(info => console.log(`${info}YOU SENT AN EMAIL TO AGENT`))
    .catch(error => console.log(error));
	if(email){
		transporter.sendMail({
		  from: '"OM US TOUR EXPERIENCE Official WebSite" <omustour@overseasinternational.com>',
		  to: email,
		  subject: 'Your request has been received',
		  text: 'Go to this link to confirm',
		  html: customerEmail
		})
		.then(info => console.log(`${info}YOU SENT AN EMAIL TO CUSTOMER`))
		.catch(error => console.log(error));
	}
});
module.exports = router;
