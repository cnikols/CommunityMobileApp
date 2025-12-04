import moment from 'moment';
import { IMLocalized } from '../localization/IMLocalization';

const monthNames = [
  IMLocalized('Ιαν'),
  IMLocalized('Φεβ'),
  IMLocalized('Μαρ'),
  IMLocalized('Απρ'),
  IMLocalized('Μαι'),
  IMLocalized('Ιούν'),
  IMLocalized('Ιούλ'),
  IMLocalized('Αυγ'),
  IMLocalized('Σεπ'),
  IMLocalized('Οκτ'),
  IMLocalized('Νοε'),
  IMLocalized('Δεκ'),
];

const TNDateFormattedTimestamp = (timestamp) => {
  if (timestamp) {
    let time = moment(timestamp.toDate());
    if (moment().diff(time, 'μέρες') == 0) {
      return time.format('H:mm');
    } else if (moment().diff(time, 'week') == 0) {
      return time.fromNow();
    } else {
      return `${monthNames[timestamp.toDate().getMonth()]} ${time.format('D, Y')}`;
    }
  }
  return '';
};

export default TNDateFormattedTimestamp;
