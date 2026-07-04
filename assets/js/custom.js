document.querySelectorAll('.details-tags, .details-categories').forEach(element => {
  const dataId = element.getAttribute('data-id');
  if (!dataId) return;

  const stateKey = dataId + 'State'; // 'tagsState' or 'categoriesState'
  const attrName = 'data-global-' + dataId;
  const savedState = localStorage.getItem(stateKey);
  let shouldBeOpen = false;

  if (savedState !== null) {
    shouldBeOpen = savedState === 'open';
  } else {
    if (dataId === 'categories') {
      shouldBeOpen = true;
      localStorage.setItem(stateKey, 'open');
    } else {
      shouldBeOpen = false;
      localStorage.setItem(stateKey, 'closed');
    }
  }

  if (shouldBeOpen) {
    document.documentElement.setAttribute(attrName, '');
    element.setAttribute('open', '');
    element.classList.add('active');
  } else {
    document.documentElement.removeAttribute(attrName);
    element.removeAttribute('open');
    element.classList.remove('active');
  }

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


document.addEventListener('DOMContentLoaded', () => {
    const triggers = document.querySelectorAll('.lightbox-trigger');

    triggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault(); // Отменяем стандартный переход по ссылке

            const origSrc = this.getAttribute('href');
            const imgElement = this.querySelector('img');
            const altText = imgElement ? imgElement.getAttribute('alt') : '';

            // Создаем элемент оверлея
            const overlay = document.createElement('div');
            overlay.classList.add('lightbox-overlay');

            // Вставляем оригинальное изображение
            overlay.innerHTML = `<img src="${origSrc}" alt="${altText}">`;
            document.body.appendChild(overlay);

            // Запускаем анимацию появления (через requestAnimationFrame для плавности)
            requestAnimationFrame(() => {
                overlay.classList.add('active');
            });

            // Функция закрытия окна
            const closeLightbox = () => {
                overlay.classList.remove('active');
                setTimeout(() => {
                    overlay.remove();
                }, 300); // Время должно совпадать с transition в CSS
                document.removeEventListener('keydown', handleEsc);
            };

            // Закрытие по кнопке Esc
            const handleEsc = (event) => {
                if (event.key === 'Escape') closeLightbox();
            };

            // Вешаем события закрытия
            overlay.addEventListener('click', closeLightbox);
            document.addEventListener('keydown', handleEsc);
        });
    });
});
