/**
 * Interactive Demo RSVP Management
 * Implements accessible inline validation, focus management,
 * conditional attendance/plus-one logic, and demo feedback.
 */
import { openDemoModal } from './main.js';

export function initRSVP() {
  const form = document.getElementById('rsvp-form');
  if (!form) return;

  const statusEl = document.getElementById('rsvp-status');
  const nameInput = document.getElementById('guest-name');
  const nameError = document.getElementById('guest-name-error');
  const emailInput = document.getElementById('guest-email');
  const emailError = document.getElementById('guest-email-error');
  const attendRadios = form.querySelectorAll('input[name="attending"]');
  const attendanceError = document.getElementById('attendance-error');
  const conditionalSection = document.getElementById('rsvp-attending-details');
  const mealSelect = document.getElementById('meal-preference');
  const mealError = document.getElementById('meal-preference-error');
  const plusOneCheckbox = document.getElementById('has-plus-one');
  const plusOneDetails = document.getElementById('plus-one-details');
  const plusOneNameInput = document.getElementById('plus-one-name');
  const plusOneNameError = document.getElementById('plus-one-name-error');
  const plusOneMealSelect = document.getElementById('plus-one-meal');
  const plusOneMealError = document.getElementById('plus-one-meal-error');

  function isValidEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(val).trim());
  }

  function showError(inputEl, errorEl, message) {
    if (inputEl) {
      inputEl.setAttribute('aria-invalid', 'true');
    }
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.removeAttribute('hidden');
    }
  }

  function clearError(inputEl, errorEl) {
    if (inputEl) {
      inputEl.removeAttribute('aria-invalid');
    }
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.setAttribute('hidden', '');
    }
  }

  // Attendance Radio Toggle
  attendRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (attendanceError) {
        attendanceError.textContent = '';
        attendanceError.setAttribute('hidden', '');
      }

      if (radio.value === 'yes' && radio.checked) {
        if (conditionalSection) {
          conditionalSection.removeAttribute('hidden');
          conditionalSection.style.display = 'flex';
        }
      } else if (radio.value === 'no' && radio.checked) {
        if (conditionalSection) {
          conditionalSection.setAttribute('hidden', '');
          conditionalSection.style.display = 'none';
        }
        // Clear attending-only validation errors when declining
        clearError(mealSelect, mealError);
        clearError(plusOneNameInput, plusOneNameError);
        clearError(plusOneMealSelect, plusOneMealError);
      }
    });
  });

  // Plus-One Checkbox Toggle
  if (plusOneCheckbox) {
    plusOneCheckbox.addEventListener('change', () => {
      if (plusOneCheckbox.checked) {
        if (plusOneDetails) {
          plusOneDetails.removeAttribute('hidden');
          plusOneDetails.style.display = 'flex';
        }
        if (plusOneNameInput) plusOneNameInput.setAttribute('aria-required', 'true');
        if (plusOneMealSelect) plusOneMealSelect.setAttribute('aria-required', 'true');
      } else {
        if (plusOneDetails) {
          plusOneDetails.setAttribute('hidden', '');
          plusOneDetails.style.display = 'none';
        }
        if (plusOneNameInput) plusOneNameInput.removeAttribute('aria-required');
        if (plusOneMealSelect) plusOneMealSelect.removeAttribute('aria-required');
        clearError(plusOneNameInput, plusOneNameError);
        clearError(plusOneMealSelect, plusOneMealError);
      }
    });
  }

  // Live Input Clearing
  if (nameInput) {
    nameInput.addEventListener('input', () => {
      if (nameInput.value.trim()) clearError(nameInput, nameError);
    });
  }

  if (emailInput) {
    emailInput.addEventListener('input', () => {
      if (isValidEmail(emailInput.value)) clearError(emailInput, emailError);
    });
  }

  if (mealSelect) {
    mealSelect.addEventListener('change', () => {
      if (mealSelect.value) clearError(mealSelect, mealError);
    });
  }

  if (plusOneNameInput) {
    plusOneNameInput.addEventListener('input', () => {
      if (plusOneNameInput.value.trim()) clearError(plusOneNameInput, plusOneNameError);
    });
  }

  if (plusOneMealSelect) {
    plusOneMealSelect.addEventListener('change', () => {
      if (plusOneMealSelect.value) clearError(plusOneMealSelect, plusOneMealError);
    });
  }

  // Form Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let errorCount = 0;
    let firstInvalidControl = null;

    // 1. Validate Full Name
    if (!nameInput || !nameInput.value.trim()) {
      showError(nameInput, nameError, 'Please enter your full name.');
      errorCount++;
      if (!firstInvalidControl) firstInvalidControl = nameInput;
    } else {
      clearError(nameInput, nameError);
    }

    // 2. Validate Email Address
    if (!emailInput || !emailInput.value.trim()) {
      showError(emailInput, emailError, 'Please enter your email address.');
      errorCount++;
      if (!firstInvalidControl) firstInvalidControl = emailInput;
    } else if (!isValidEmail(emailInput.value)) {
      showError(emailInput, emailError, 'Please enter a valid email address (e.g. name@domain.com).');
      errorCount++;
      if (!firstInvalidControl) firstInvalidControl = emailInput;
    } else {
      clearError(emailInput, emailError);
    }

    // 3. Validate Attendance
    const attendingSelected = form.querySelector('input[name="attending"]:checked');
    if (!attendingSelected) {
      if (attendanceError) {
        attendanceError.textContent = 'Please indicate whether you will be attending.';
        attendanceError.removeAttribute('hidden');
      }
      errorCount++;
      if (!firstInvalidControl) firstInvalidControl = attendRadios[0];
    } else {
      if (attendanceError) {
        attendanceError.textContent = '';
        attendanceError.setAttribute('hidden', '');
      }
    }

    // 4. Validate Attending-Only Fields
    const isAttending = attendingSelected && attendingSelected.value === 'yes';
    if (isAttending) {
      if (mealSelect && !mealSelect.value) {
        showError(mealSelect, mealError, 'Please select your entrée preference.');
        errorCount++;
        if (!firstInvalidControl) firstInvalidControl = mealSelect;
      } else {
        clearError(mealSelect, mealError);
      }

      if (plusOneCheckbox && plusOneCheckbox.checked) {
        if (plusOneNameInput && !plusOneNameInput.value.trim()) {
          showError(plusOneNameInput, plusOneNameError, "Please enter your plus-one's full name.");
          errorCount++;
          if (!firstInvalidControl) firstInvalidControl = plusOneNameInput;
        } else {
          clearError(plusOneNameInput, plusOneNameError);
        }

        if (plusOneMealSelect && !plusOneMealSelect.value) {
          showError(plusOneMealSelect, plusOneMealError, "Please select an entrée for your plus-one.");
          errorCount++;
          if (!firstInvalidControl) firstInvalidControl = plusOneMealSelect;
        } else {
          clearError(plusOneMealSelect, plusOneMealError);
        }
      } else {
        clearError(plusOneNameInput, plusOneNameError);
        clearError(plusOneMealSelect, plusOneMealError);
      }
    } else {
      // Clear attending-only errors when declining
      clearError(mealSelect, mealError);
      clearError(plusOneNameInput, plusOneNameError);
      clearError(plusOneMealSelect, plusOneMealError);
    }

    // Handle Errors
    if (errorCount > 0) {
      if (statusEl) {
        statusEl.textContent = `Please correct the ${errorCount} error${errorCount > 1 ? 's' : ''} highlighted below before submitting.`;
        statusEl.removeAttribute('hidden');
      }
      if (firstInvalidControl) {
        firstInvalidControl.focus();
      }
      return;
    }

    // Submission Success
    if (statusEl) {
      statusEl.textContent = '';
      statusEl.setAttribute('hidden', '');
    }

    const guestName = nameInput ? nameInput.value.trim() : 'Guest';
    openDemoModal({
      title: isAttending ? 'RSVP Confirmed (Demo)' : 'Response Received (Demo)',
      message: isAttending
        ? `Thank you, ${guestName}! Your RSVP demonstration for Sophia & Marcus's wedding celebration was submitted successfully. In a production client website, this response is routed securely to the couple's planner or coordinator database.`
        : `Thank you, ${guestName}. Your regrets demonstration has been recorded. In a production client website, this response is updated immediately in the wedding coordinator registry.`
    });

    // Reset Form completely to default state
    form.reset();
    if (statusEl) {
      statusEl.textContent = '';
      statusEl.setAttribute('hidden', '');
    }
    clearError(nameInput, nameError);
    clearError(emailInput, emailError);
    if (attendanceError) {
      attendanceError.textContent = '';
      attendanceError.setAttribute('hidden', '');
    }
    clearError(mealSelect, mealError);
    clearError(plusOneNameInput, plusOneNameError);
    clearError(plusOneMealSelect, plusOneMealError);

    // Reset plus-one state
    if (plusOneCheckbox) plusOneCheckbox.checked = false;
    if (plusOneDetails) {
      plusOneDetails.setAttribute('hidden', '');
      plusOneDetails.style.display = 'none';
    }

    // Default attendance is 'yes', so restore conditional section
    if (conditionalSection) {
      conditionalSection.removeAttribute('hidden');
      conditionalSection.style.display = 'flex';
    }
  });
}
