import moment from 'moment';

export const appendComponent = (parent, components) => {
	components.forEach((component) => {
		parent.appendChild(component);
	});
};

export const sleep = time => new Promise(response => setTimeout(response, time));

export const getFormatedDate = (date) => {
	const milisecsInDay = 24 * 60 * 60 * 1000;
	const time = new Date(moment(date, 'YYYY-MM-DD hh:mm:ss')).getTime();
	const diff = (Date.now() - time);
	// check if time difference is greater than one day
	if (diff < milisecsInDay) {
		return moment(date, 'YYYY-MM-DD hh:mm:ss').fromNow();
	}
	return moment(date).format('YYYY-MM-DD');
};

export const reportValidity = (form) => {
	if (HTMLFormElement.prototype.reportValidity) {
		form.reportValidity();
	} else {
		HTMLFormElement.prototype.reportValidity = () => {
			if (form.checkValidity()) return true;
			const btn = document.createElement('button');
			form.appendChild(btn);
			btn.click();
			form.removeChild(btn);
			return false;
		};
	}
};

export const getFormData = (formInputs) => {
	const formData = {};
	for (let i = 0; i < formInputs.length; i += 1) {
		const input = formInputs[i];
		formData[input.name] = input.value;
	}
	return formData;
};

export default {
	appendComponent,
	getFormData
};
