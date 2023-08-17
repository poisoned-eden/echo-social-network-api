const dayjs = require('dayjs');
const advancedFormat = require('dayjs/plugin/advancedFormat');
dayjs.extend(advancedFormat);

function formatDate(timestamp) {
	let formatted = `${dayjs(timestamp).format('MMM Do, YYYY')} at ${dayjs(timestamp).format('hh:mm a')}`;
	return formatted;
}
module.exports = formatDate;
