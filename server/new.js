const crypto = require('crypto');

MONGO_URI="mongodb+srv://yosefdejene747:e3X0Ha6L0aXsiYCC@market.qo7ey.mongodb.net/?retryWrites=true&w=majority&appName=Market"
PORT = 5000
const secret = crypto.randomBytes(32).toString('hex');
JWT_SECRET = 'a48de14209e053fb9657065613e6d2730193d9b1c21080fb9b4ec0e76368d81c'
console.log(secret);