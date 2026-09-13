/**
 * Main Application Orchestrator for Site 3: Wedding Website Demo
 */
import { initStyleManager } from './style-manager.js';
import { initNavigation } from './nav.js';
import { initFAQ } from './faq.js';
import { initRSVP } from './rsvp.js';

/**
 * Accessible Demo Modal Dialog
 */
export function openDemoModal({ title, message }) {
  const dialog = document.getElementById('demo-modal');
  if (!dialog) return;

  const titleEl = dialog.querySelector('.demo-dialog-title');
  const msgEl = dialog.querySelector('.demo-dialog-text');

  if (titleEl) titleEl.textContent = title;
  if (msgEl) msgEl.textContent = message;

  if (typeof dialog.showModal === 'function') {
    dialog.showModal();
  } else {
    dialog.setAttribute('open', '');
  }
}

export function closeDemoModal() {
  const dialog = document.getElementById('demo-modal');
  if (!dialog) return;

  if (typeof dialog.close === 'function') {
    dialog.close();
  } else {
    dialog.removeAttribute('open');
  }
}

function initDemoModals() {
  const dialog = document.getElementById('demo-modal');
  if (!dialog) return;

  const closeBtn = dialog.querySelector('.demo-dialog-close');
  const dismissBtn = dialog.querySelector('.demo-dialog-dismiss');

  if (closeBtn) closeBtn.addEventListener('click', closeDemoModal);
  if (dismissBtn) dismissBtn.addEventListener('click', closeDemoModal);

  // Click outside backdrop to close
  dialog.addEventListener('click', (e) => {
    const rect = dialog.getBoundingClientRect();
    const isInDialog = (
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width
    );
    if (!isInDialog) {
      closeDemoModal();
    }
  });

  // Venue map buttons
  const mapBtns = document.querySelectorAll('[data-action="venue-map"]');
  mapBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      openDemoModal({
        title: 'Venue Directions (Demonstration)',
        message: 'Interactive venue directions are included on live client sites. This location is fictional for the DSCG demonstration.'
      });
    });
  });

  // Hotel booking buttons
  const hotelBtns = document.querySelectorAll('[data-action="hotel-booking"]');
  hotelBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const hotelName = btn.getAttribute('data-hotel-name') || 'the selected property';
      openDemoModal({
        title: 'Room Block Booking (Demonstration)',
        message: `Direct room-block reservations and promotional discount codes for ${hotelName} are integrated on live client sites. This accommodation partner is fictional for the DSCG demonstration.`
      });
    });
  });

  // Registry contribution buttons
  const registryBtns = document.querySelectorAll('[data-action="registry-contribute"]');
  registryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const fundName = btn.getAttribute('data-fund-name') || 'this gift fund';
      openDemoModal({
        title: 'Registry Contribution (Demonstration)',
        message: `Direct contribution links and integrated registry checkouts (such as Honeyfund, Zola, or custom charitable gifts) for ${fundName} are enabled on live client sites. This is a fictional demonstration.`
      });
    });
  });

  // Contact wedding coordinator button
  const contactBtns = document.querySelectorAll('[data-action="contact-coordinator"]');
  contactBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      openDemoModal({
        title: 'Wedding Coordinator Contact',
        message: 'Contact functionality is disabled in this fictional demonstration.'
      });
    });
  });
}

/**
 * Smooth scrolling respecting prefers-reduced-motion
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        targetElement.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'start'
        });
        history.pushState(null, '', targetId);
      }
    });
  });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initStyleManager();
  initNavigation();
  initFAQ();
  initRSVP();
  initDemoModals();
  initSmoothScroll();
});
