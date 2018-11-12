export function extractTopicContributorsFromEl(contributorsEl) {
	let topicAuthors = [];
	let topicEditor = '';
	let shouldExtractAuthors = false;
	let shouldExtractEditors = false;

	for (let i = 0; i < contributorsEl.children.length; ++i) {
		const contributorEl = contributorsEl.children[i];

		if (contributorEl.nodeName === 'DT') {
			if (contributorEl.innerText.match(/Authors?:/)) {
				shouldExtractAuthors = true;
			} else if (contributorEl.innerText.match(/Deputy Editors?:/)) {
				shouldExtractEditors = true;
			} else {
				shouldExtractAuthors = false;
				shouldExtractEditors = false;
			}
		} else if (contributorEl.nodeName === 'DD') {
			if (shouldExtractAuthors) {
				topicAuthors.push(contributorEl.innerText);
			} else if (shouldExtractEditors) {
				topicEditor = contributorEl.innerText;
			}
		}
	}

	return { topicAuthors, topicEditor };
}

export function parseTopicContributor(authorString) {
	const [name, ...suffixes] = authorString.split(',');
	const nameParts = name.trim().split(' ');
	const family = nameParts.slice(-1)[0];
	const given = nameParts.slice(0, -1);

	let givenWithSuffixes = `${given.map(el => el.trim()).join(' ')}`;

	if (suffixes.length > 0) {
		givenWithSuffixes += `, ${suffixes.map(el => el.trim()).join(', ')}`;
	}

	return { family, given: givenWithSuffixes };
}

export function getCitationID(authorFamily, topicTitle) {
	return `${authorFamily}-${topicTitle
		.match(/\w+/g)
		.map(el => el[0].toLowerCase())
		.join('')}`;
}
