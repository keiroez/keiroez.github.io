document.addEventListener('DOMContentLoaded', function() {
    const checkButton = document.getElementById('check-answer');
    const riddleInput = document.getElementById('riddle-answer');
    const feedback = document.getElementById('feedback');
    const hint = document.getElementById('hint');
    
    // Respostas corretas (aceita variações)
    const correctAnswers = ['buraco', 'um buraco', 'o buraco', 'buracos'];
    
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
            feedback.textContent = "Correto! Você é muito esperta!";
            feedback.className = "feedback correct";
            
            // Ativar botão para o próximo passo após um pequeno delay
            setTimeout(function() {
                window.location.href = "passo2.html";
            }, 2000);
            
        } else {
            attempts++;
            feedback.textContent = "Hmm, essa não é a resposta correta. Tente novamente!";
            feedback.className = "feedback incorrect";
            
            // Mostrar dica após 2 tentativas
            if (attempts >= 2 && hint.classList.contains('hidden')) {
                hint.classList.remove('hidden');
            }
        }
    }
});
