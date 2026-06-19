require('dotenv').config({ path: './src/.env' });
const app = require('./app');

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('LittleInvestors running on port ' + port);
});
