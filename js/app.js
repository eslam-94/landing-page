/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */
/*global document,window,clearTimeout,setTimeout*/
const navList = document.querySelector("#navbar__list");
const sections = document.querySelectorAll("section");
const navBar = document.querySelector("nav");
const buttonTop = document.querySelector("#buttonTop");
let timer;


/**
 * End Global Variables
 * Start Helper Functions
 *
 */
function addToList(element) {
  /*creating a function to make for each section anchor tag inside list-item*/
  let anchor = document.createElement("a"); /*creating anchor tag */
  anchor.textContent = element.dataset.nav; /*modifiying text of link*/
  // anchor.setAttribute("href", "#" + element.id);   /*setting attribute link to anchor tag as section id*/
  let li = document.createElement("li"); /*creating list-item*/
  li.addEventListener('click', function() {   /*when list item is clicked scroll to that section*/
    element.scrollIntoView({
      behavior: 'smooth'
    })
  })
  li.classList.add("menu__link", "navbar__menu"); /**modifiying list-item class*/
  li.appendChild(anchor); /*adding anchor element to list element*/
  navList.appendChild(li); /*final step adding lit-items to nav-bar-list*/
}
// scrolling to the top function
function goToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
// show buttonTop when reaching end of the page
function showTopButton() {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    buttonTop.style.display = "block"
  } else {
    buttonTop.style.display = "none"
  }
}

// hide navBar
function hideNavBar() {
  navBar.classList.add("hide");
}
// make navBar visable when scrolling then hid it when stop
function navNarOn() {
  navBar.classList.remove("hide");
  clearTimeout(timer);
  timer = setTimeout(hideNavBar, 2000)
}
// function to check the position of each section then add to it "your-active-class" and to the corresponding nav-item add "active"
function checkNearTop() {
  sections.forEach(function(section) {
    const sectionTitle = section.getAttribute("data-nav");
    const sectionTop = section.getBoundingClientRect().top;
    const links = document.querySelectorAll("a");
    if (sectionTop >= 0 && sectionTop <= 250) {
      /*when section is in range highlights section and link in nav-list*/
      section.classList.add("your-active-class");
      links.forEach(function(link) {
        if (link.textContent === sectionTitle) {
          link.classList.add("active")
        } else {
          link.classList.remove("active")
        }
      })
    } else {
      section.classList.remove("your-active-class")
    }
  })
}
/**
 * End Helper Functions
 * Begin Main Functions
 *
 */
// build the nav
sections.forEach(addToList);

/**
 * End Main Functions
 * Begin Events
 *
 */
// Add class 'active' to section when near top of viewport
window.addEventListener("scroll", checkNearTop)

//when scrolling nav-bar appears when stoped timer starts to hide nav bar
window.addEventListener('scroll', navNarOn);

//when scrolling to the end of the page a scroll-to-the-top-button button appears
window.addEventListener("scroll", showTopButton)

// Scroll to the top of the page using scrollTO
buttonTop.addEventListener("click", goToTop)
