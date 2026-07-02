document.querySelectorAll('.details-tags, .details-categories').forEach(element => {
  const stateKey = element.getAttribute('data-id') + 'State'; // Получим 'tagsState' или 'categoriesState'
  const attrName = 'data-global-' + element.getAttribute('data-id'); // 'data-global-tags' или 'data-global-categories'

  // 1. Восстанавливаем состояние при загрузке
  const savedState = localStorage.getItem(stateKey);
  if (savedState === null || savedState === 'open') {
    localStorage.setItem(stateKey, 'open');
    document.documentElement.setAttribute(attrName, '');
    element.setAttribute('open', '');
    element.classList.add('active');
  } else {
    element.classList.remove('active');
    element.removeAttribute('open');
  }

  // 2. Отслеживаем изменение состояния (toggle срабатывает только при открытии/закрытии самого details)
  element.addEventListener('toggle', () => {
    if (element.open) {
      element.classList.add('active');
      document.documentElement.setAttribute(attrName, '');
      localStorage.setItem(stateKey, 'open');
    } else {
      element.classList.remove('active');
      document.documentElement.removeAttribute(attrName);
      localStorage.setItem(stateKey, 'closed');
    }
  });
});
