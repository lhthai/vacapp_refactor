import moment from 'moment';

// Format time ex: 20 Jun 2021
const formatDateTime = datetime => {
  if (moment.utc(datetime).local().format('DD-MMM-YYYY') === '01-Jan-1900') {
    return '';
  } else {
    return moment.utc(datetime).local().format('DD-MMM-YYYY');
  }
};

export default formatDateTime;
