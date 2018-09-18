import moment from 'moment'; // library for dates

/**
 * appends an array of HTML elements to a parent
 */
export const appendComponent = (parent, components) => {
	components.forEach((component) => {
		parent.appendChild(component);
	});
};

/**
 * Returns difference between current time and a given date in format 'YYYY-MM-DD HH:mm:ss'.
 * If difference is less than 24h, it returns the relative date ("5 minutes ago", "3 hours ago")
 * Otherwise, returns date in format 'YYYY-MM-DD'
 */
export const getFormatedDateDiff = (stringDate) => {
	const milisecsInDay = 24 * 60 * 60 * 1000;
	const time = new Date(moment(stringDate, 'YYYY-MM-DD HH:mm:ss')).getTime();
	const diff = (Date.now() - time);
	// check if time difference is greater than 24h
	if (diff < milisecsInDay) {
		return moment(stringDate, 'YYYY-MM-DD HH:mm:ss').fromNow();
	}
	return moment(stringDate).format('YYYY-MM-DD');
};

/**
 * Converts a unix time in msec to a string date with format 'YYYY-MM-DD HH:mm:ss'
 */
export const getStringDate = (time) => {
	const result = moment(time).format('YYYY-MM-DD HH:mm:ss');
	return result;
};
