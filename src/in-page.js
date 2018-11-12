import browser from 'webextension-polyfill';
import { extractTopicContributorsFromEl } from './helpers.js';
import { UpToDateCitation } from './uptodate-template';

const topicTitleEl = document.querySelector('#topicTitle');
const topicContributorsEl = document.querySelector('#topicContributors');

const topicTitle = topicTitleEl.innerText;
const { topicAuthors, topicEditor } = extractTopicContributorsFromEl(topicContributorsEl);
const topicURL = String(window.location.href);

const topic = new UpToDateCitation(topicTitle, topicAuthors, topicEditor, topicURL);

browser.runtime.sendMessage(topic.toJSON()).catch(error => console.error);
