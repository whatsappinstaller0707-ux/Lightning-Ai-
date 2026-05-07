Lucide.createIcons();

const brandPill = document.getElementById('brandPill');
const suggestions = document.getElementById('suggestions');
const chatBox = document.getElementById('chatBox');
const navItems = document.getElementById('navItems');
const inputZone = document.getElementById('inputZone');
const menuToggle = document.getElementById('menuToggle');
const userPromptInput = document.getElementById('userPrompt');

function uiAction(type) {
    document.getElementById('historyPanel').classList.remove('open');
    document.getElementById('settingsSheet').classList.remove('open');

    if (type === 'close') return;

    if (type === 'main') {
        activateMainChat();
    }

    else if (type === 'all') {
        document.getElementById('historyPanel').classList.add('open');
    }

    else if (type === 'settings') {
        document.getElementById('settingsSheet').classList.add('open');
    }

    else if (type === 'temp') {

        const isTurningOff =
            document.body.classList.contains('temp-mode');

        document.body.classList.toggle('temp-mode');

        const span =
            document.querySelector('.brand-pill-center span');

        span.textContent =
            document.body.classList.contains('temp-mode')
            ? 'TEMP'
            : 'AI';

        if (isTurningOff) {

            const tempMessages =
                document.querySelectorAll('.temp-msg');

            tempMessages.forEach(msg => msg.remove());
        }
    }
}

function activateMainChat() {

    brandPill.classList.add('active');

    suggestions.classList.add('hidden');

    chatBox.style.display = 'flex';

    navItems.classList.add('collapsed');

    setTimeout(() => {

        navItems.classList.add('hidden');

        inputZone.classList.remove('hidden');

        menuToggle.classList.remove('hidden');

    }, 300);
}

function deactivateMainChat() {

    inputZone.classList.add('hidden');

    menuToggle.classList.add('hidden');

    navItems.classList.remove('hidden');

    setTimeout(() => {

        navItems.classList.remove('collapsed');

        brandPill.classList.remove('active');

        suggestions.classList.remove('hidden');

        chatBox.style.display = 'none';

    }, 10);
}

function startChat(text) {

    activateMainChat();

    userPromptInput.value = text;

    setTimeout(() => {
        userPromptInput.focus();
    }, 300);
}

document
    .getElementById('sendBtn')
    .addEventListener('click', handleUserMessage);

userPromptInput.addEventListener('keypress', (e) => {

    if (e.key === 'Enter') {
        handleUserMessage();
    }
});

async function handleUserMessage() {

    const messageText =
        userPromptInput.value.trim();

    if (messageText === '') return;

    appendMessage(messageText, 'user');

    userPromptInput.value = '';

    const thinkingId = 'think-' + Date.now();

    appendMessage('Thinking...', 'ai', thinkingId);

    chatBox.scrollTop = chatBox.scrollHeight;

    try {

        const response = await fetch('/api/chat', {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
                'x-temp-mode':
                    document.body.classList.contains('temp-mode')
            },

            body: JSON.stringify({
                messageText: messageText
            })
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }

        if (
            data.choices &&
            data.choices[0].message.content
        ) {

            const aiMsgElement =
                document.getElementById(thinkingId);

            const fullText =
                data.choices[0].message.content;

            aiMsgElement.textContent = '';

            let i = 0;

            function typeWriter() {

                if (i < fullText.length) {

                    aiMsgElement.innerHTML =
                        `<div class="ai-msg-content">${
                            marked.parse(
                                fullText.substring(0, i + 1)
                            )
                        }</div>`;

                    i++;

                    chatBox.scrollTop =
                        chatBox.scrollHeight;

                    setTimeout(typeWriter, 5);
                }
            }

            typeWriter();
        }

    } catch (error) {

        document.getElementById(thinkingId)
            .textContent =
            'Error: ' + error.message;
    }
}

function appendMessage(text, role, id = null) {

    const msg = document.createElement('div');

    if (id) {
        msg.id = id;
    }

    if (
        document.body.classList.contains('temp-mode')
    ) {
        msg.classList.add('temp-msg');
    }

    msg.style.padding = '12px 18px';

    msg.style.borderRadius = '20px';

    msg.style.marginBottom = '10px';

    msg.style.maxWidth = '80%';

    msg.style.fontSize = '16px';

    msg.style.lineHeight = '1.4';

    msg.style.wordWrap = 'break-word';

    if (role === 'user') {

        msg.style.alignSelf = 'flex-end';

        msg.style.background = 'var(--accent)';

        msg.style.color = '#000';

        msg.style.marginLeft = 'auto';

    } else {

        msg.style.alignSelf = 'flex-start';

        msg.style.background = 'var(--glass)';

        msg.style.color = 'var(--text)';

        msg.style.marginRight = 'auto';
    }

    msg.innerHTML =
        `<div class="ai-msg-content">${
            role === 'user'
            ? text
            : marked.parse(text)
        }</div>`;

    chatBox.appendChild(msg);

    requestAnimationFrame(() => {

        chatBox.scrollTop =
            chatBox.scrollHeight;
    });
}

const input = document.getElementById('userPrompt');

input.addEventListener('focus', () => {

    setTimeout(() => {

        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });

    }, 350);
});

window.addEventListener('resize', () => {

    setTimeout(() => {

        chatBox.scrollTop =
            chatBox.scrollHeight;

    }, 200);
});