/**
 * Utility module for DOM manipulation and local storage handling.
 * @module domUtils
 */
const domUtils = {
  /**
   * Retrieves a single DOM element by a CSS selector.
   * @param {string} selector - CSS selector to find the element.
   * @returns {Element|null} The first Element within the document that matches the specified selector, or null if no matches are found.
   */
  getElement(selector) {
      return document.querySelector(selector);
  },

  /**
   * Retrieves all DOM elements matching the CSS selector.
   * @param {string} selector - CSS selector to find the elements.
   * @returns {NodeList} A NodeList of all elements matching the specified selector.
   */
  getElements(selector) {
      return document.querySelectorAll(selector);
  },

  /**
   * Adds an event listener to the specified element.
   * @param {Element} element - The DOM element to which the event listener will be added.
   * @param {string} event - The event type to listen for.
   * @param {Function} handler - The function to be called when the event is triggered.
   */
  addListener(element, event, handler) {
      if (element) {
          element.addEventListener(event, handler);
      } else {
          console.warn('addListener: Attempted to attach an event to a null element.');
      }
  },

  /**
   * Sets a value in the localStorage.
   * @param {string} key - The key under which the value is stored.
   * @param {string} value - The value to be stored.
   */
  setLocalStorage(key, value) {
      try {
          localStorage.setItem(key, value);
      } catch (error) {
          console.error('Error setting value in localStorage:', error);
      }
  },

  /**
   * Retrieves a value from localStorage.
   * @param {string} key - The key for which to retrieve the value.
   * @returns {string|null} The value associated with the key, or null if the key does not exist.
   */
  getLocalStorage(key) {
      try {
          return localStorage.getItem(key);
      } catch (error) {
          console.error('Error retrieving value from localStorage:', error);
          return null;
      }
  },

  /**
   * Adds a class to an element.
   * @param {Element} element - The element to which the class will be added.
   * @param {string} className - The class name to add.
   */
  addClass(element, className) {
      if (element) {
          element.classList.add(className);
      } else {
          console.warn('addClass: Attempted to add a class to a null element.');
      }
  },

  /**
   * Removes a class from an element.
   * @param {Element} element - The element from which the class will be removed.
   * @param {string} className - The class name to remove.
   */
  removeClass(element, className) {
      if (element) {
          element.classList.remove(className);
      } else {
          console.warn('removeClass: Attempted to remove a class from a null element.');
      }
  }
};

export default domUtils;
