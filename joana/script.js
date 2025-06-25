document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('scratch-card');
    const ctx = canvas.getContext('2d');
    const prizeImage = document.getElementById('prize-image');
    
    // Presente de aniversário para Joana Kelly - Tênis Olympikus corre 4
    const presenteJoanaKelly = {
        mensagem: "Olympikus corre 4",
        imagemURL: "images/image.png"
    };
    
    // Variables to track scratch state
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let scratchedPercentage = 0;
    let pixelCount = 0;
    const scratchedPixels = new Set();
    
    // Function to initialize the scratch card
    function initScratchCard() {
        // Configurar presente da Joana Kelly
        const prizeValue = document.querySelector('.prize-value');
        prizeValue.textContent = presenteJoanaKelly.mensagem;
        
        // Configurar imagem - sempre o tênis Olympikus corre 4
        prizeImage.src = presenteJoanaKelly.imagemURL;
        prizeImage.onerror = function() {
            const backup = prizesBackup[Math.floor(Math.random() * prizesBackup.length)];
            prizeValue.textContent = backup.mensagem;
            prizeImage.src = backup.imagemURL;
            
            // Se ainda falhar, remover a imagem
            prizeImage.onerror = function() {
                prizeImage.style.display = 'none';
            };
        };
        
        // Fill canvas with gray scratch area
        ctx.fillStyle = '#AAAAAA';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add some texture to the scratch area
        for (let i = 0; i < 10000; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            ctx.fillStyle = i % 2 === 0 ? '#999999' : '#BBBBBB';
            ctx.fillRect(x, y, 2, 2);
        }
        
        // Reset scratch tracking
        scratchedPercentage = 0;
        pixelCount = canvas.width * canvas.height;
        scratchedPixels.clear();
    }
    
    // Function to handle scratch effect
    function scratch(e) {
        if (!isDrawing) return;
        
        e.preventDefault();
        
        let currentX, currentY;
        
        // Handle mouse or touch position
        if (e.type === 'mousemove') {
            currentX = e.offsetX;
            currentY = e.offsetY;
        } else {
            const rect = canvas.getBoundingClientRect();
            currentX = e.touches[0].clientX - rect.left;
            currentY = e.touches[0].clientY - rect.top;
        }
        
        // Draw scratch line
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = 50;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(currentX, currentY);
        ctx.stroke();
        
        // Track scratched pixels (approximate)
        const distance = Math.sqrt(Math.pow(currentX - lastX, 2) + Math.pow(currentY - lastY, 2));
        const angle = Math.atan2(currentY - lastY, currentX - lastX);
        const brushRadius = 20;
        
        for (let i = 0; i < distance; i += 5) {
            const x = Math.floor(lastX + Math.cos(angle) * i);
            const y = Math.floor(lastY + Math.sin(angle) * i);
            
            for (let j = -brushRadius; j <= brushRadius; j += 5) {
                for (let k = -brushRadius; k <= brushRadius; k += 5) {
                    if (j*j + k*k <= brushRadius*brushRadius) {
                        const pX = x + j;
                        const pY = y + k;
                        
                        if (pX >= 0 && pX < canvas.width && pY >= 0 && pY < canvas.height) {
                            const pixelKey = `${pX},${pY}`;
                            if (!scratchedPixels.has(pixelKey)) {
                                scratchedPixels.add(pixelKey);
                            }
                        }
                    }
                }
            }
        }
        
        // Update scratched percentage
        scratchedPercentage = (scratchedPixels.size / pixelCount) * 100;
        
        // If scratched more than 40%, reveal entire image
        if (scratchedPercentage > 40) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        
        lastX = currentX;
        lastY = currentY;
    }
    
    // Event listeners
    canvas.addEventListener('mousedown', function(e) {
        isDrawing = true;
        lastX = e.offsetX;
        lastY = e.offsetY;
    });
    
    canvas.addEventListener('touchstart', function(e) {
        isDrawing = true;
        const rect = canvas.getBoundingClientRect();
        lastX = e.touches[0].clientX - rect.left;
        lastY = e.touches[0].clientY - rect.top;
        e.preventDefault();
    });
    
    canvas.addEventListener('mousemove', scratch);
    canvas.addEventListener('touchmove', scratch);
    
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('touchend', () => isDrawing = false);
    canvas.addEventListener('mouseout', () => isDrawing = false);
    
    // Initialize on load
    initScratchCard();
});
