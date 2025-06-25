document.addEventListener('DOMContentLoaded', function() {
    const optionButtons = document.querySelectorAll('.option-btn');
    const feedback = document.getElementById('puzzle-feedback');
    const hint = document.getElementById('puzzle-hint');
    
    // Resposta correta
    const correctOption = 'passo';
    
    let attempts = 0;
    
    optionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedOption = this.getAttribute('data-option');
            
            optionButtons.forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
            
            if (selectedOption === correctOption) {
                feedback.textContent = "Isso mesmo! Para chegar a seus objetivos, você precisa dar o primeiro PASSO!";
                feedback.className = "feedback correct";
                
                // Destacar o botão correto
                this.classList.add('correct');
                
                // Ir para o próximo passo após um pequeno delay
                setTimeout(function() {
                    window.location.href = "surpresa_final.html";
                }, 2000);
                
            } else {
                attempts++;
                feedback.textContent = "Hmmm, não é bem isso. Tente outra opção!";
                feedback.className = "feedback incorrect";
                this.classList.add('incorrect');
                
                // Mostrar dica após a primeira tentativa errada
                if (attempts >= 1 && hint.classList.contains('hidden')) {
                    hint.classList.remove('hidden');
                }
            }
        });
    });
});
