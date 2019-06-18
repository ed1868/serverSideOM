const mongoose = require('mongoose');

const Schema   = mongoose.Schema;

const shoppingCartSchema = new Schema({
  clientFirstName:String,
  clientLastName:String,
  checkIn: String,
  checkOut: String,
  email:String,
  fanClubNumber:String,
  fanPlay:String,
  hotelRooms:String,
  hotels:Array,
  phoneNumber:String,
  questions:String,
  tickets:Array,
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

const ShoppingCart = mongoose.model('ShoppingCart', shoppingCartSchema);
module.exports = ShoppingCart;

