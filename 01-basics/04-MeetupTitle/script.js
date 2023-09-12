// import { createApp } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

const meetups = [];
for( let i = 0; i < 5; i++) {

    fetchMeetupById(i+1)
    .then((res) => meetups.push(res))
  
}
console.log(meetups);

// Требуется создать Vue приложение
