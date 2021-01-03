import moment from 'moment-timezone';
export default ((date, user) => {
  return moment.utc(date).utcOffset(user.tz);
});