// lazy-load TAWK.TO
var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();

const loadTawkChat = () => {
    // Флаг, чтобы не загружать скрипт повторно
    if (window.TawkScriptLoaded) return;
    window.TawkScriptLoaded = true;

    const s1 = document.createElement('script');
    const s0 = document.getElementsByTagName('script')[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/647f954f94cf5d49dc5c312a/1h295ug1i';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
};

// Запускаем чат только при активности (скролл, движение мыши, клик, тач)
const activityEvents = ['mousedown', 'mousemove', 'pointermove', 'touchstart', 'scroll'];
activityEvents.forEach(event => {
    window.addEventListener(event, loadTawkChat, { once: true, passive: true });
});
