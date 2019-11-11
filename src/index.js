import $ from 'jquery';
import get from 'lodash/fp/get';
import has from 'lodash/fp/has';
import popper from 'popper.js';
import bootstrap from 'bootstrap';
import util from 'bootstrap/js/dist/util';
import carousel from 'bootstrap/js/dist/carousel';

import './sass/style.scss';

import config from './js/config';

window.$ = $;
window.popper = popper;
window.bootstrap = bootstrap;
window.util = util;
window.carousel = carousel;

const rsvpForm = document.getElementById('rsvp-form');

function applyConfigForCode ({ n: number, c: hasChildren }) {
  rsvpForm.classList.remove('code-invalid');
  rsvpForm.classList.add('code-valid');

  console.log(number, hasChildren);

  if (number === 1) {
    document.querySelector('#oneAttendeeOption .precision').innerText = '';

    document.getElementById('twoAttendeesOption').style.display = 'none';

    document.querySelector('#noAttendeesOption label').innerText = 'Je ne pourrai pas être là.';

  } else if (number === 1.5) {
    document.querySelector('#oneAttendeeOption .precision').innerText = 'seul(e)';

    document.getElementById('twoAttendeesOption').style.display = 'block';
    document.querySelector('#twoAttendeesOption label').innerText = 'Je serai là !';
    document.querySelector('#twoAttendeesOption .precision').innerText = 'accompagné(e)';

    document.querySelector('#noAttendeesOption label').innerText = 'Je ne pourrai pas être là.';

  } else {
    document.querySelector('#oneAttendeeOption .precision').innerText = 'seul(e)';

    document.getElementById('twoAttendeesOption').style.display = 'block';
    document.querySelector('#twoAttendeesOption label').innerText = 'Nous serons là !';
    document.querySelector('#twoAttendeesOption .precision').innerText = '';

    document.querySelector('#noAttendeesOption label').innerText = 'Nous ne pourrons pas être là.';
  }

  document.getElementById('childrenOption').style.display = hasChildren ? 'block' : 'none';
}

function hideForm () {
  rsvpForm.classList.remove('code-valid');
  rsvpForm.classList.add('code-invalid');

  document.getElementById('twoAttendeesOption').style.display = 'none';
  document.getElementById('childrenOption').style.display = 'none';
}

const codeField = document.getElementById('code');

codeField.addEventListener('input', (event) => {
  const currentCode = event.target.value;
  const pathInConfig = currentCode.split('');
  const configForCode = get(pathInConfig, config);
  if (has('n', configForCode)) {
    applyConfigForCode(configForCode);
  } else {
    hideForm();
  }
});

