const mongoose = require('mongoose');

const Schema   = mongoose.Schema;

const shoppingCartSchema = new Schema({
  cart:Array,
  numOfRooms:String,
  checkIn: String,
  total:Number,
  checkOut: String,
  pricePerNight:String,
  fanClubNumber:String,
  gameType:String,
  gameTicketQuantity:String,
  clientFirstName:String,
  clientLastName:String,
  address:String,
  city:String,
  state:String,
  zipcode:String,
  nameOnCard:String,
  creditCardNumber:String,
  expirationDate:String,
  securityCode:String,
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

const ShoppingCart = mongoose.model('ShoppingCart', shoppingCartSchema);
module.exports = ShoppingCart;

