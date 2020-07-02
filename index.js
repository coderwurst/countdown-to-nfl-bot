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
  const startDate = new Date('2020-09-10');
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
  console.log(countdownMsg);

  function gotresult(err, data, response) {
    if (err) {
      console.log(`${err} received on ${Date.now()}response: ${response}`);
      process.exit(22);
    } else {
      console.log(`${data} sent on ${Date.now()}, response: ${response} `);
    }
  }

  process.exit(0);
}

postTweet();
