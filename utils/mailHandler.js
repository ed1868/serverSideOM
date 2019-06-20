
var fs = require('fs');
class mailHandler {
    async html(){
        let emailHtml = await fs.readFile('./customerEmail.html', (err, data) => {
            return data;
        });
        return emailHtml;
    }
}
const emailHandler = new mailHandler();
module.exports = emailHandler;
