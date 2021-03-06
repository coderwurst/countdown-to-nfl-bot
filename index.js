const dotenv = require('dotenv');
const Twit = require('twit');

dotenv.config({ path: './config.env' });

const T = new Twit({
  consumer_key: process.env.APPLICATION_CONSUMER_KEY,
  consumer_secret: process.env.APPLICATION_CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

/*
 * Determine number of days until new NFL season
 */
function calculateCountdown() {
  const startDate = new Date('2021-09-09');
  const currentDate = new Date();
  const diffDays = Math.ceil(
    parseInt((currentDate - startDate) / (1000 * 60 * 60 * 24))
  );
  return `Only ${Math.abs(diffDays)} days until the start of the #NFL Season!`;
}

/*
 * Post tweet to @countdown2NFL Timeline
 */
function postTweet() {
  const countdownMsg = {
    status: calculateCountdown(),
  };

  T.post('statuses/update', countdownMsg, gotresult);

  function gotresult(err, data, response) {
    console.log('enteredgetResult');
    if (err) {
      console.log(`error: ${err} received on ${Date.now()}`);
      process.exit(1);
    }
    if (response) {
      console.log(`response: ${response} received on ${Date.now()}`);
      process.exit(0);
    }
  }
}

postTweet();
