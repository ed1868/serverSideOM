const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer');
const ShoppingCart = require("../models/shoppingCart");


const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'omtesteroverseas@gmail.com',
    pass: 'russ!2345',
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


    transporter.sendMail({
      from: '"OVERSEAS WANTS YOU TO CONFIRM" <myawesome@project.com>',
      to: email,
      subject: 'Email Confirmation',
      text: 'Go to this link to confirm',
      html: `Hello and thank you for reaching us at over seas international here are the fields
       from the form <p>${clientFirstName}</p><p>${clientLastName}</p><p>${checkIn}</p><p>${checkOut}</p>
       <ul>
        <li>${fanClubNumber}</li>
        <li>${fanPlay}</li>
        <li>${hotelRooms}</li>
        <li>${hotels}</li>
       </ul>
       `
    })
    .then(info => console.log(`${info}YOU SENT AN EMAIL`))
    .catch(error => console.log(error));
});
module.exports = router;
