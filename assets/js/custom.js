var element = document.querySelector('.details-tags');

if (element !== null) {
  if (localStorage.getItem('tagsState') === null || localStorage.getItem('tagsState') === 'open') {
    localStorage.setItem('tagsState', 'open');
    document.documentElement.setAttribute('data-global-tags', '');
    element.setAttribute('open', true);
    element.classList.add('active');
  }

  if (localStorage.getItem('tagsState') === 'closed') {
    element.classList.remove('active');
    element.removeAttribute('open');
  }

  element.addEventListener('click', () => {
    const isActive = element.classList.contains('active');
    document.documentElement.toggleAttribute('data-global-tags');

    if (event.target.closest('a')) {
      return; // Прерываем выполнение обработчика для вложенных ссылок
    }

    if (!isActive) {
      element.classList.add('active');
      localStorage.setItem('tagsState', 'open');
    } else {
      element.classList.remove('active');
      localStorage.setItem('tagsState', 'closed');
    }
  });
}