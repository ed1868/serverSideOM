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
        arrival,
        departure,
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
        address,
        city,
        country,
        nationality,
        state,
        zip,
        transportation
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
        transportation,
    });


    console.log(transportation);
    console.log('TICKET ONE ------', ticketOne);
    console.log('TICKET TWOOOO-------', ticketTwo);
    console.log('TICKET THREE ---------', ticketThree);
    let hotelName = "";

    let hotelNameSelector = hotels.map(items => {
        // console.log(items);
        if (items.selected == true) {
            hotelName = items.hotelName;
        }
        if (items.selected == false) {
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
            res.status(500).json({message: "Something went wrong", err});
        });
    var ticketsHtml = '';
    tickets.forEach((ticket) => {
        if (ticket.qty > 0) {
            ticketsHtml += '<li><span>' + ticket.title + ', Qty: ' + ticket.qty + '</span></li>';
        }
    });
    var hotelSelected = '';
    var hotelsHtml = '';
    hotels.forEach((hotel) => {
        if (hotel.selected) {
            hotelsHtml += '<li><span>' + hotel.hotelName + '</span></li>';
            hotelSelected = hotel.hotelName;
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
	   <p><b>Transportation:</b> <br/>
        <ul>
        
              <li>Training session 07/19 ${transportation[0].qty}</li>
              <li>Training session 07/23 ${transportation[1].qty}</li>
       </ul>
       </p>
	   <p><b>Additional Questions<b></p>
	   <p>` + (questions ? questions : '') + `</p>
       `;
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    var todayFormatted = mm + '/' + dd + '/' + yyyy;
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
    ` + htmlDetails + `
		<table width="850" style="width:850px;min-width:850px;">
		  <thead>
			<tr>
			  <th><b>First Name</b></th>
			  <th><b>Last Name</b></th>
			  <th><b>Email</b></th>
			  <th><b>Phone number</b></th>
              <th><b>Arrival date</b></th>
              <th><b>Departure date</b></th>
              <td><b>Address:</b></td>
              <td><b>City:</b></td>
              <td><b>State:</b></td>
              <td><b>Zip:</b></td>
              <td><b>Country:</b></td>
              <td><b>Nationality:</b></td>
			  <th><b>Game one</b></th>
			  <th><b>Game Two</b></th>
			  <th><b>Game Three</b></th>
			  <th><b>Check in</b></th>
			  <th><b>Check out</b></th>
			  <th><b>#of Nights</b></th>
			  <th><b>Hotel Selection</b></th>
			  <th><b># rooms</b></th>
			  <th><b>OM Fan Club #</b></th>
			  <th><b>Fan Game</b></th>
			  <th><b>Transportation #1</b></th>
              <th><b>Transportation #2</b></th>
			  <th><b>Notes</b></th>
			  <th><b>Date of Request</b></th>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
              <th><b>Status</b></th>
			</tr>
		  </thead>
		  <tbody>
			<tr>
			  <td>${clientFirstName}</td>
			  <td>${clientLastName}</td>
			  <td>${email}</td>
			  <td>${phoneNumber}</td>
              <td>${arrival}</td>
              <td>${departure}</td>
              <td>${address}</td>
              <td>${city}</td>
              <td>${state}</td>
              <td>${zip}</td>
              <td>${country}</td>
              <td>${nationality}</td>
			  <td>${tickets[0].qty}</td>
			  <td>${tickets[1].qty}</td>
			  <td>${tickets[2].qty}</td>
			  <td>` + (checkIn ? checkIn : 'NOT SELECTED') + `</td>
			  <td>` + (checkOut ? checkOut : 'NOT SELECTED') + `</td>
			  <td></td>
			  <td>${hotelSelected}</td>
			  <td>${hotelRooms}</td>
			  <td>` + (fanClubNumber ? fanClubNumber : '') + `</td>
			  <td>${fanPlay}</td>
              <td>${transportation[0].qty}</td>
              <td>${transportation[1].qty}</td>
			  <td>` + (questions ? questions : '') + `</td>
			  <td>${todayFormatted}</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>PENDING</td>
			</tr>
		  </tbody>
		</table>
        <h3>Customer Address Information</h3>
        <table width="650">
            <tbody>
            <tr>
                <td><b>Address:</b> ${address}</td>
                <td><b>City:</b> ${city}</td>
            </tr>
            <tr>
                <td><b>State:</b> ${state}</td>
                <td><b>Zip:</b> ${zip}</td>
            </tr>
            <tr>
                <td><b>Country:</b> ${country}</td>
                <td><b>Nationality:</b> ${nationality}</td>
            </tr>
            <tbody>
        </table>
		`;


    transporter.sendMail({
        from: '"OM US TOUR EXPERIENCE WebSite" <omustour@overseasinternational.com>',
        to: 'omustour@overseasinternational.com',
        subject: 'New Request for OM US TOUR EXPERIENCE',
        text: 'Go to this link to confirm',
        html: agentEmailHtml
    })
        .then(info => console.log(`${info}YOU SENT AN EMAIL TO AGENT`))
        .catch(error => console.log(error));
    if (email) {
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
