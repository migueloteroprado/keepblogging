// appends an array of HTML elements to a parent
export const appendComponent = (parent, components) => {
	components.forEach((component) => {
		parent.appendChild(component);
	});
};

// create an element of a given type, with an optional id,
// and an optional array of classes to assign to it
export const createDomElement = (type, id, classes) => {
	if (!type) return null;
	const elem = document.createElement(type);
	if (id) elem.setAttribute('id', id);
	if (classes && classes.length > 0) {
		classes.map(cls => elem.classList.add(cls));
	}
	return elem;
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
