const CronJob = require('cron').CronJob;
const job = new CronJob('* * * * * *', function () {
  const d = new Date();
  console.log('You will see this message at', d);
}, null, true);
module.exports = job;
