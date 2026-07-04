const mode = document.getElementById('mode');

if (mode !== null) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
        if (!localStorage.getItem('theme')) {
            if (event.matches) {
                document.documentElement.setAttribute('data-dark-mode', '');
            } else {
                document.documentElement.removeAttribute('data-dark-mode');
            }
        }
    });

    mode.addEventListener('click', () => {
        document.documentElement.toggleAttribute('data-dark-mode');
        const isDarkNow = document.documentElement.hasAttribute('data-dark-mode');
        localStorage.setItem('theme', isDarkNow ? 'dark' : 'light');
    });
}
