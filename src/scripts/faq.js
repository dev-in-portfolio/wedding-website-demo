/**
 * Accessible FAQ Accordion
 */
export function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (!questionBtn || !answer) return;

    questionBtn.addEventListener('click', () => {
      const isExpanded = questionBtn.getAttribute('aria-expanded') === 'true';

      // Toggle state
      if (isExpanded) {
        questionBtn.setAttribute('aria-expanded', 'false');
        answer.setAttribute('hidden', '');
        item.classList.remove('active');
      } else {
        questionBtn.setAttribute('aria-expanded', 'true');
        answer.removeAttribute('hidden');
        item.classList.add('active');
      }
    });
  });
}
