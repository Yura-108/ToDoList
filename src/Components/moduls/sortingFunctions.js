export const sortByTitle = (array) => {
	array.sort((a, b) => {
		if (a.title.toUpperCase() < b.title.toUpperCase())
			return -1;
		if (a.title.toUpperCase() > b.title.toUpperCase())
			return 1;
		return 0;
	});
	return array;
};
export const sortByDate = (array) => {
	array.sort((a, b) => {
		const dateA = a.date.split(":").reverse().join("");
		const dateB = b.date.split(":").reverse().join("");

		if (dateA < dateB) {
			return -1;
		}
		if (dateA > dateB) {
			return 1;
		}

		// Если date равны, сравниваем по полю time
		const timeA = a.time.split(":").join("");
		const timeB = b.time.split(":").join("");

		if (timeA < timeB) {
			return -1;
		}
		if (timeA > timeB) {
			return 1;
		}

		return 0; // date и time равны
	});
	return array;
}

export const sortByDeadline = (array) => {
	array.sort((a, b) => {

		const dateA = a.deadline.slice(0, 10).split(":").reverse().join("");
		const dateB = b.deadline.slice(0, 10).split(":").reverse().join("");

		if (dateA < dateB) {
			return -1;
		}
		if (dateA > dateB) {
			return 1;
		}

		// Если date равны, сравниваем по полю time
		const timeA = a.deadline.slice(13, 18).split(":").join("");
		const timeB = b.deadline.slice(13, 18).split(":").join("");

		if (timeA < timeB) {
			return -1;
		}
		if (timeA > timeB) {
			return 1;
		}

		return 0; // date и time равны
	});
	return array;
}

