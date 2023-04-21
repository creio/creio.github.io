let scrollpos = window.scrollY

const nav = document.getElementsByClassName("base-navigation__main")
const scrollChange = 50

const add_class_on_scroll = () => nav.classList.add("nav-fixed")
const remove_class_on_scroll = () => nav.classList.remove("nav-fixed")

window.addEventListener('scroll', function() {
  scrollpos = window.scrollY;

  if (scrollpos >= scrollChange) { add_class_on_scroll() }
  else { remove_class_on_scroll() }
})
