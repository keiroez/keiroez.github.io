document.addEventListener('DOMContentLoaded', function() {
    const checkButton = document.getElementById('check-answer');
    const riddleInput = document.getElementById('riddle-answer');
    const feedback = document.getElementById('feedback');
    const hint = document.getElementById('hint');
    const hint2 = document.getElementById('hint2');
    
    // Respostas corretas (aceita variações)
    const correctAnswers = [
        'balao', 'balão', 'bexiga', 'baloes', 'balões', 'bexigas',
        'um balao', 'um balão', 'uma bexiga', 'os baloes', 'os balões'
    ];
    
    let attempts = 0;
    
    checkButton.addEventListener('click', function() {
        checkAnswer();
    });
    
    riddleInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    });
    
    function checkAnswer() {
        const userAnswer = riddleInput.value.toLowerCase().trim();
        
        if (correctAnswers.includes(userAnswer)) {
            feedback.textContent = "Perfeito! É um balão mesmo! 🎈 Elemento essencial de toda festa de aniversário!";
            feedback.className = "feedback correct";
            
            // Ativar botão para o próximo passo após um pequeno delay
            setTimeout(function() {
                window.location.href = "passo2.html";
            }, 2500);
            
        } else {
            attempts++;
            feedback.textContent = "Hmm, ainda não é isso. Pense melhor na charada!";
            feedback.className = "feedback incorrect";
            
            // Mostrar primeira dica após 2 tentativas
            if (attempts >= 2 && hint.classList.contains('hidden')) {
                hint.classList.remove('hidden');
            }
            
            // Mostrar segunda dica após 4 tentativas
            if (attempts >= 4 && hint2.classList.contains('hidden')) {
                hint2.classList.remove('hidden');
            }
        }
    }
});
