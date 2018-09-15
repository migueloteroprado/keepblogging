const moment = require('moment');

const date = new Date(2018, 8, 12, 12, 12, 12).getTime();
const agora = Date.now();
console.log(agora, date);

const a = (agora - date);
console.log(a);
if (a < 24*60*60*1000) {
	const str = moment(date).format('YYYY-MM-DD hh:mm:ss')
	console.log(moment(str, 'YYYY-MM-DD hh:mm:ss').fromNow());
} else {
	console.log(moment(date).format('YYYY-MM-DD'));
};

// return moment(date, 'YYYY-MM-DD hh:mm:ss').fromNow();

const date2 = '2018-09-09 12:12:12';
const b = new Date(moment(date2, 'YYYY-MM-DD hh:mm:ss')).getTime();
console.log(b);
