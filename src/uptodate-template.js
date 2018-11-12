import { parseTopicContributor, getCitationID } from './helpers';

export class UpToDateCitation {
	constructor(title, authors, editor, url) {
		this.title = title;
		this.authors = authors.map(parseTopicContributor);
		this.editors = ['TW Post', editor].map(parseTopicContributor);
		this.url = url;

		this.id = getCitationID(this.authors[0].family, this.title);

		this.date = new Date();
	}

	toJSON() {
		return JSON.stringify({
			id: this.id,
			type: 'chapter',
			title: this.title,
			'container-title': 'UpToDate',
			publisher: 'UpToDate',
			'publisher-place': 'Waltham, MA',
			'event-place': 'Waltham, MA',
			URL: this.url,
			author: this.authors,
			editor: this.editors,
			issued: {
				'date-parts': [[this.date.getFullYear()]]
			},
			accessed: {
				'date-parts': [
					[this.date.getFullYear(), this.date.getMonth() + 1, this.date.getDate()]
				]
			}
		});
	}
}
