const messages = [
  { speaker: 'Socrate', text: "Cher Aristote, tu as vu le sujet du baccalauréat de cette année ? « Le bonheur est-il affaire de raison ? »." },
  { speaker: 'Aristote', text: "Quel beau sujet ! Et qu'en penses-tu, à première vue ?" },
  { speaker: 'Socrate', text: "Pour moi, le bonheur réside dans la connaissance de soi et la recherche de la vérité. La raison, cher ami, est la clé de cette quête." },
  { speaker: 'Aristote', text: "Toujours attaché à la raison et à la connaissance… Tu te perds en abstractions ! Pour moi, le bonheur ne se résume pas à la contemplation intellectuelle. Il s'agit d'agir vertueusement et de mener une vie éthique en accord avec notre nature." },
  { speaker: 'Socrate', text: "Mon cher Aristote, agir vertueusement découle de la connaissance de ce qui est bon et juste. La raison est la boussole qui guide nos choix vers le bien." },
  { speaker: 'Aristote', text: "Socrate, tu parles de la connaissance comme si elle était la solution à tous les maux. Mais la pratique, l'expérience concrète de la vie, est tout aussi cruciale. Le bonheur est dans l'action vertueuse, pas seulement dans la contemplation." },
  { speaker: 'Socrate', text: "Certes, Aristote, mais l'action vertueuse découle de la connaissance du bien. La raison nous guide vers la vertu, et la vertu est la voie du bonheur." },
  { speaker: 'Aristote', text: "Socrate, tu sembles oublier que la vie pratique nous enseigne des leçons que la raison seule ne peut offrir. Le bonheur n'est-il pas plutôt dans l'équilibre entre la connaissance théorique et l'expérience pratique ?" },
  { speaker: 'Socrate', text: "Ah, Aristote, tu cherches toujours l'équilibre. Mais n'est-ce pas la raison qui nous permet de discerner cet équilibre? La raison est comme le gouvernail de notre navire vers le bonheur." },
  { speaker: 'Aristote', text: "Socrate, parfois tu es trop abstrait. Le bonheur, pour moi, n'est pas seulement dans la tête, mais dans le vécu quotidien. Il réside dans la réalisation concrète de notre potentiel humain." },
  { speaker: 'Socrate', text: "Cher Aristote, tu sous-estimes la puissance de l'esprit. La raison, la connaissance, voilà ce qui élève l'homme au-dessus de ses instincts." },
  { speaker: 'Aristote', text: "Et pourtant, Socrate, l'homme n'est pas seulement un esprit errant, mais aussi un être enraciné dans la réalité tangible. Le bonheur, selon moi, est dans la vie pleinement vécue." },
  { speaker: 'Socrate', text: "En somme, Aristote, tu dis que le bonheur est dans l'action vertueuse, mais moi, Socrate, je prétends que la vertu découle de la connaissance. Peut-être sommes-nous complémentaires, après tout." },
  { speaker: 'Aristote', text: "Socrate, tu es toujours en quête de complémentarités. Peut-être avons-nous chacun une pièce du puzzle du bonheur." },
  { speaker: 'Socrate', text: "Cher ami, tu pourrais avoir raison. Ensemble, peut-être pouvons-nous dévoiler les mystères du bonheur, unissant la raison et l'action dans une danse harmonieuse. Après tout, la véritable sagesse n'est-elle pas dans la quête commune de la vérité?" },
];

let messageIndex = 0;
let isConversationInProgress = false;

const messageContainer = document.getElementById('message-container');
const startBtn = document.getElementById('start-btn');

startBtn.addEventListener('click', startDiscussion);

function startDiscussion() {
  if (!isConversationInProgress) {
    isConversationInProgress = true;
    if (messageIndex === messages.length) {
      messageIndex = 0;
      messageContainer.innerHTML = '';
      startBtn.textContent = "Lancer la discussion";
    }

    displayMessage();
  }
}

function displayMessage() {
  if (messageIndex < messages.length) {
    const message = messages[messageIndex];
    const bulleClass = message.speaker === 'Socrate' ? 'socrate-bulle' : 'aristote-bulle';

    const bulle = document.createElement('div');
    bulle.classList.add('bulle', bulleClass);

    const avatarImg = document.createElement('div');
    avatarImg.classList.add('avatar');
    avatarImg.id = `${message.speaker.toLowerCase()}-avatar`;

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('content');

    const speakerName = document.createElement('span');
    speakerName.classList.add('speaker-name');
    speakerName.textContent = message.speaker;

    const messageText = document.createElement('span');
    messageText.classList.add('message-text');
    messageText.textContent = '';

    contentDiv.appendChild(speakerName);
    contentDiv.appendChild(messageText);

    const typingIndicator = document.createElement('span');
    typingIndicator.classList.add('typing-indicator');

    for (let i = 0; i < 3; i++) {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      typingIndicator.appendChild(dot);
    }

    bulle.appendChild(avatarImg);
    bulle.appendChild(contentDiv);
    bulle.appendChild(typingIndicator);
    messageContainer.appendChild(bulle);

    messageIndex++;

    const messageLength = message.text.length;
    const animationDuration = Math.max(1.5, Math.min(6, messageLength / 40)); // Ajustez ces valeurs selon vos préférences
    const waitTime = animationDuration * 1000;

    bulle.style.opacity = 0;
    bulle.style.transform = 'translateY(10px)';
    typingIndicator.style.opacity = 0;

    setTimeout(() => {
      bulle.style.opacity = 1;
      bulle.style.transform = 'translateY(0)';
      typingIndicator.style.opacity = 1;
    }, 0);

    messageContainer.scrollTop = messageContainer.scrollHeight;

    setTimeout(() => {
      typingIndicator.remove();
      messageText.textContent = message.text;

      messageContainer.scrollTop = messageContainer.scrollHeight;

      if (messageIndex === messages.length) {
        startBtn.textContent = "Relancer la discussion";
        isConversationInProgress = false;
      }
    }, waitTime);

    setTimeout(displayMessage, waitTime + 1000); // Ajout d'un délai supplémentaire
  }
}
