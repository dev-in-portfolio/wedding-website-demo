/**
 * Interactive Demo RSVP Management
 */
import { openDemoModal } from './main.js';

export function initRSVP() {
  const form = document.getElementById('rsvp-form');
  if (!form) return;

  const attendRadios = form.querySelectorAll('input[name="attending"]');
  const conditionalSection = document.getElementById('rsvp-attending-details');

  attendRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.value === 'yes' && radio.checked) {
        if (conditionalSection) {
          conditionalSection.removeAttribute('hidden');
          conditionalSection.style.display = 'block';
        }
      } else if (radio.value === 'no' && radio.checked) {
        if (conditionalSection) {
          conditionalSection.setAttribute('hidden', '');
          conditionalSection.style.display = 'none';
        }
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = form.querySelector('#guest-name');
    const attendingSelected = form.querySelector('input[name="attending"]:checked');

    if (!nameInput || !nameInput.value.trim()) {
      alert('Please enter your full name to proceed with the RSVP demo.');
      if (nameInput) nameInput.focus();
      return;
    }

    if (!attendingSelected) {
      alert('Please indicate whether you will be attending.');
      return;
    }

    const isAttending = attendingSelected.value === 'yes';

    // Show accessible demo modal confirmation
    openDemoModal({
      title: isAttending ? 'RSVP Confirmed (Demo)' : 'Response Received (Demo)',
      message: 'RSVP interaction demonstrated successfully. No information was submitted because this is a fictional DSCG sales demonstration.'
    });

    // Reset form safely
    form.reset();
    if (conditionalSection) {
      conditionalSection.removeAttribute('hidden');
      conditionalSection.style.display = 'block';
    }
  });
}
