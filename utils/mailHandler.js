
var fs = require('fs');
var path = require('path');
class mailHandler {
    customerEmail(data) {
        var ticketsHtml = '';
        if(data.tickets){
            data.tickets.forEach((ticket) => {
                if (ticket.qty > 0) {
                    ticketsHtml += '<li style="text-align: left;"><strong id="docs-internal-guid-1eb10456-7fff-6572-2675-a327939572ea">' + ticket.title + ', Qty: ' + ticket.qty + '</strong></li>';
                }
            });
        }
        var hotelsHtml = '';
        var hotelSelected = '';
        if(data.hotels){
            data.hotels.forEach((hotel) => {
                if (hotel.selected) {
                    hotelSelected = hotel.hotelName;
                }
            });
            hotelsHtml = `<ul>
        		<li style="text-align: left;"><strong id="docs-internal-guid-1eb10456-7fff-6572-2675-a327939572ea">Check-in: </strong>${data.checkIn}</li>
        		<li style="text-align: left;"><strong id="docs-internal-guid-1eb10456-7fff-6572-2675-a327939572ea">Check-out: </strong>${data.checkOut}</li>
        		<li style="text-align: left;"><strong>Rooms</strong>: ${data.hotelRooms}</li>
        		<li style="text-align: left;"><strong id="docs-internal-guid-1eb10456-7fff-6572-2675-a327939572ea">${hotelSelected}</strong></li>
        	</ul>`
        }
        let htmlContent = fs.readFileSync(path.resolve(__dirname, 'customerEmail.html'),'utf-8')
                            .replace('{FIRST_NAME}', data.clientFirstName)
							.replace('{LAST_NAME}', data.clientLastName)
							.replace('{EMAIL_DATA}', data.email)
							.replace('{PHONE_DATA}', data.phoneNumber)
							.replace('{TICKETS_DATA}', ticketsHtml)
							.replace('{HOTELS_DATA}', hotelsHtml)
                            .replace('{FAN_CLUB_DATA}', (data.fanClubNumber ? data.fanClubNumber : 'Not applied'))
							.replace('{FRIENDLY_GAME_DATA}', (data.fanPlay ? 'Yes' : 'No'))
							.replace('{TRANSPORTATION_DATA}', data.transportation[0].qty)
							.replace('{QUESTIONS_DATA}', data.questions);


        return htmlContent;
    }
}
const emailHandler = new mailHandler();
module.exports = emailHandler;
