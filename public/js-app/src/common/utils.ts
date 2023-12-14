/* eslint-disable @typescript-eslint/ban-ts-comment */

export function adjustHeight(contentHtml) {
  const getCodeDiv = document.querySelector<HTMLElement>('.get_code-box');
  const contentDiv = document.querySelector<HTMLElement>('.content');
  const contentTitleDiv = document.querySelector<HTMLElement>('.content > .entry-title');

  if (!getCodeDiv || !contentDiv) return

  getCodeDiv.classList.add('slide-down-fade-out')

  // Listen for the transitionend event
  getCodeDiv.addEventListener('transitionend', function () {
    if (contentDiv.classList.contains('injected-post')) return true
    if (!contentTitleDiv) return
    let nextSibling = contentTitleDiv.nextElementSibling;
    while (nextSibling) {
      // @ts-ignore
      contentTitleDiv.parentNode.removeChild(nextSibling);
      nextSibling = contentTitleDiv.nextElementSibling;
    }
    contentTitleDiv && contentTitleDiv.insertAdjacentHTML("afterend", contentHtml);
    contentDiv.classList.add('injected-post')
    // getCodeDiv.style.display = "none";
  });
}

/**
 * Scrolls element into view.
 */
export function scrollToElement(element: HTMLElement) {
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
    });
  }
}

/**
 * Checks if the returned status code is not an error code.
 */
export function isSuccessCode(statusCode: number) {
  if (!isNaN(statusCode)) {
    return statusCode < 400 && statusCode > 199;
  }
}