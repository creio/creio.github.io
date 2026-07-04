var pre = document.getElementsByTagName('pre');

for (var i = 0; i < pre.length; ++i) {
    var element = pre[i];
    var mermaid = element.getElementsByClassName('language-mermaid')[0];

    if (mermaid == null) {
        element.insertAdjacentHTML('afterbegin', '<button class="btn btn-copy" type="button"></button>');
    }
}

document.addEventListener('click', function (event) {
    var trigger = event.target.closest('.btn-copy');
    if (!trigger) return;

    var targetElement = trigger.nextElementSibling;
    if (!targetElement) return;

    var textToCopy = targetElement.innerText;

    navigator.clipboard
        .writeText(textToCopy)
        .then(function () {
            // Сюда можно добавить визуальный фидбек, (например, trigger.classList.add('copied'))
        })
        .catch(function (err) {
            console.error('Ошибка копирования:', err);
            console.error('Trigger:', trigger);
        });
});
