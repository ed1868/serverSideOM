const express = require("express");
const router = express.Router();
const bodyParser   = require('body-parser');

const ShoppingCart = require("../models/shoppingCart");

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.post("/checkout", (req, res, next) => {
  console.log('IT HAS ENTERED THE BACK END');


 let total = 0;

  const {
    cart,
    numberOfNights,
    checkIn,
    checkOut,
    numOfRooms,
    pricePerNight,
    fanClubNumber,
    gameType,
    gameTicketQuantity,
    clientFirstName,
    clientLastName,
    address,
    city,
    state,
    zipcode,
    nameOnCard,
    creditCardNumber,
    expirationDate,
    securityCode
  } = req.body;

console.log(req.body);

console.log(`THIS IS THE CARTS PROVIDED BY FRONT END ${cart}`);

cart.map(items => {
  console.log('this are the cart item totals');
  let totalPrice = Number(items.totalPrice);
  total += totalPrice;
})


console.log(`THIS IS THE TOTAL BEFORE SAVING INTO DATABASE ${total}`);


  const newCart = new ShoppingCart({
    cart,
    total,
    numberOfNights,
    checkIn,
    checkOut,
    numOfRooms,
    pricePerNight,
    fanClubNumber,
    gameType,
    gameTicketQuantity,
    clientFirstName,
    clientLastName,
    address,
    city,
    state,
    zipcode,
    nameOnCard,
    creditCardNumber,
    expirationDate,
    securityCode
  });



  newCart
    .save()
    .then((savedCart) => {
      console.log("you have saved a new shopping cart");

      res.status(200).json(savedCart);
  
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Something went wrong', err });
    });


});
module.exports = router;
