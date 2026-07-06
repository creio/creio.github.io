(() => {
    const canvas = document.createElement('canvas');
    canvas.id = 'stars-canvas';
    // canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:1;pointer-events:none';
    canvas.style.cssText = 'top:0;left:0;width:100%;height:100%;';

    if (document.body.classList.contains('home')) {
        document.body.prepend(canvas);
    }

    const ctx = canvas.getContext('2d');
    let w, h;

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const layers = [
        { count: 200, sizeMin: 0.5, sizeMax: 1, speed: 0.3, opacity: 0.6 },
        { count: 80, sizeMin: 1, sizeMax: 1.5, speed: 0.16, opacity: 0.8 },
        { count: 30, sizeMin: 1.5, sizeMax: 2, speed: 0.08, opacity: 1 }
    ];

    const stars = [];
    for (const layer of layers) {
        for (let i = 0; i < layer.count; i++) {
            stars.push({
                x: Math.random() * 4000,
                y: Math.random() * 4000,
                size: layer.sizeMin + Math.random() * (layer.sizeMax - layer.sizeMin),
                speed: layer.speed,
                opacity: layer.opacity * (0.5 + Math.random() * 0.5)
            });
        }
    }

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function draw() {
        ctx.clearRect(0, 0, w, h);
        for (const s of stars) {
            if (!prefersReduced) {
                s.y -= s.speed;
                if (s.y < -10) s.y += 4010;
            }
            const sx = s.x % w;
            const sy = s.y % h;
            ctx.globalAlpha = s.opacity;
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(sx, sy, s.size, 0, Math.PI * 2);
            ctx.fill();
        }
        if (!prefersReduced) requestAnimationFrame(draw);
    }
    draw();
})();
