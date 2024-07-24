// Constantes représentant le choix du jeu

const Pierre = 0;
const Feuille = 1;
const Ciseau = 2;

let score = 0; // variable pour suivre le score
let rounds = 0; // Nombre total de manches

// Tableau pour convertir les choix numériques en chaînes de caractère
const choices = ["Pierre", "Feuille", "Ciseau"];

// fonction pour obtenir le choix de l'ordinateur de manière aléatoire
function getComputerChoice() {
    return Math.floor(Math.random()*3);
}

// Fonction pour déterminer le résultat d'une manche
function determineResult(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return "annule"; // égalité
    }else if((playerChoice===Pierre && computerChoice===Ciseau)||
            (playerChoice===Feuille && computerChoice===Pierre)||
            (playerChoice===Ciseau && computerChoice===Feuille)){
        return "bat"; // le joueur gagne 
    }else{
        return "est battu par"; // le joueur perd
    }
}

// Fonction pour jouer une manche
function playRound(playerChoice) {
    const computerChoice = getComputerChoice(); // Obtenir le choix de l'ordinateur
    const result = determineResult(playerChoice, computerChoice); // Déterminer le résultat

    // Construire le texte du résultat de la manche
    let resultText = `${choices[computerChoice]} ${result} ${choices[playerChoice]}`;

    // Mettre à jour le score et ajouter les points au texte du résultat
    if (result === "bat") {
        score++;
        resultText += ` : +1 point`;
    } else if (result === "est battu par") {
        score--;
        resultText += ` : -1 point`;
    } else {
        resultText += ` : 0 point`;
    }

    rounds++; // Incrémenter le nombre de manches jouées

    // Mettre à jour l'affichage du résultat et du score
    document.getElementById('result').innerText = resultText;
    document.getElementById('score').innerText = `Score: ${score}`;

    // Vérifier si les 5 manches ont été jouées
    if (rounds === 5) {
        let finalResult;
        // Déterminer le résultat final basé sur le score
        if (score > 0) {
            finalResult = "Gagné";
        } else if (score < 0) {
            finalResult = "Perdu";
        } else {
            finalResult = "Nul";
        }
        // Afficher une alerte avec le résultat final
        alert(`Jeu terminé ! Vous avez ${finalResult}`);
        // Réinitialiser le score et les manches pour recommencer le jeu
        score = 0;
        rounds = 0;
        // Mettre à jour l'affichage du score et effacer le résultat
        document.getElementById('score').innerText = `Score: ${score}`;
        document.getElementById('result').innerText = '';
    }
}

// Ajouter des écouteurs d'événements aux boutons pour chaque choix du joueur
document.getElementById('pierre').addEventListener('click', () => playRound(Pierre));
document.getElementById('feuille').addEventListener('click', () => playRound(Feuille));
document.getElementById('ciseaux').addEventListener('click', () => playRound(Ciseau));
