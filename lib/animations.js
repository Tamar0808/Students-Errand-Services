/**
 * Animation utilities for UI components
 */

/**
 * Creates a button press animation effect
 * @param {HTMLElement} element - The button element to animate
 */
export const buttonPressAnimation = (element) => {
  if (!element) return;

  // Create a scale-down animation on click
  element.style.transform = 'scale(0.95)';
  element.style.transition = 'transform 0.1s ease-in-out';

  // Reset the animation after a short delay
  setTimeout(() => {
    element.style.transform = 'scale(1)';
  }, 100);
};