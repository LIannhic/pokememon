export function startFireAnimation(canvasId, config) {
    // Crée une div conteneur + canvas
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100vw';
    container.style.height = '100vh';
    container.style.zIndex = '1'; // Derrière les autres éléments
    container.style.pointerEvents = 'none'; // Ne bloque pas les clics
    container.style.overflow = 'hidden';

    const canvas = document.createElement('canvas');
    canvas.id = canvasId;
    container.appendChild(canvas);
    document.body.appendChild(container);

    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let fireParticles = [];
    let animationFrame;
    let isAnimating = true;

    function createFire() {
        fireParticles = [];
        for (let i = 0; i < config.numberOfParticles; i++) {
            addFireParticle();
        }
    }

    function addFireParticle() {
        fireParticles.push({
            x: Math.random() * canvas.width,
            y: canvas.height,
            size: Math.random() * config.maxParticleSize,
            speedX: (Math.random() - 0.5) * config.particleSpeedX,
            speedY: Math.random() * -config.particleSpeedY,
            alpha: 1,
            life: Math.random() * config.particleLife,
            color: `rgb(${config.redValue},${Math.random() * config.greenValue},0)`
        });
    }

    function drawFire() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        fireParticles.forEach((particle, index) => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            particle.alpha -= config.particleAlphaDecay;
            particle.life -= config.particleLifeDecay;

            if (particle.life <= 0 || particle.alpha <= 0) {
                fireParticles.splice(index, 1);
                addFireParticle();
                return;
            }

            ctx.globalAlpha = particle.alpha;
            ctx.fillStyle = particle.color;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
        });

        if (fireParticles.length < config.minParticles) {
            createFire();
        }
    }

    function animate() {
        if (!isAnimating) return;

        drawFire();
        animationFrame = requestAnimationFrame(animate);
    }

    // Stop animation after 4 seconds
    setTimeout(() => {
        isAnimating = false;
        cancelAnimationFrame(animationFrame);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        container.remove(); // Supprime le canvas et la div
    }, 4000);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        createFire();
    });

    createFire();
    animate();
}
