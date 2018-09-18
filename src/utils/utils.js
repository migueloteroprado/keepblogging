// appends an array of HTML elements to a parent
export const appendComponent = (parent, components) => {
	components.forEach((component) => {
		parent.appendChild(component);
	});
};

// pauses execution during given time (msecs)
export const sleep = time => new Promise(response => setTimeout(response, time));

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

// returns an object with form fields values
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
