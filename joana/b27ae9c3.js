document.addEventListener('DOMContentLoaded', function() {
    const optionButtons = document.querySelectorAll('.option-btn');
    const feedback = document.getElementById('puzzle-feedback');
    const hint = document.getElementById('puzzle-hint');
    const hint2 = document.getElementById('puzzle-hint2');
    
    // Resposta correta: B) Bolo → Velas → Parabéns → Presente
    const correctOption = 'B';
    
    let attempts = 0;
    
    optionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedOption = this.getAttribute('data-option');
            
            optionButtons.forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
            
            if (selectedOption === correctOption) {
                feedback.textContent = "Isso mesmo! 🎂 Primeiro o bolo com velas, depois cantamos Parabéns, sopramos as velas e por fim o presente!";
                feedback.className = "feedback correct";
                
                // Destacar o botão correto
                this.classList.add('correct');
                
                // Ir para o próximo passo após um pequeno delay
                setTimeout(function() {
                    window.location.href = "d47c6e9a.html";
                }, 3000);
                
            } else {
                attempts++;
                
                // Feedback específico para cada resposta errada
                if (selectedOption === 'A') {
                    feedback.textContent = "Quase! Mas cantamos 'Parabéns' antes de soprar as velas, não depois.";
                } else if (selectedOption === 'C') {
                    feedback.textContent = "Não é isso! O presente geralmente vem no final da celebração.";
                } else if (selectedOption === 'D') {
                    feedback.textContent = "Errado! As velas não vêm antes do bolo, elas ficam no bolo!";
                }
                
                feedback.className = "feedback incorrect";
                this.classList.add('incorrect');
                
                // Mostrar primeira dica após a primeira tentativa errada
                if (attempts >= 1 && hint.classList.contains('hidden')) {
                    hint.classList.remove('hidden');
                }
                
                // Mostrar segunda dica após 2 tentativas erradas
                if (attempts >= 2 && hint2.classList.contains('hidden')) {
                    hint2.classList.remove('hidden');
                }
            }
        });
    });
});
