Lucide.createIcons();

const brandPill = document.getElementById('brandPill');
const suggestions = document.getElementById('suggestions');
const chatBox = document.getElementById('chatBox');
const navItems = document.getElementById('navItems');
const inputZone = document.getElementById('inputZone');
const menuToggle = document.getElementById('menuToggle');
const userPromptInput = document.getElementById('userPrompt');

function uiAction(type) {
    const history = document.getElementById('historyPanel');
    const settings = document.getElementById('settingsSheet');

    if (type === 'close') {
        history.classList.remove('open');
        settings.classList.remove('open');
        return;
    }

    if (type === 'main') {
        history.classList.remove('open');
        settings.classList.remove('open');
        activateMainChat();
    } else if (type === 'all') {
        history.classList.add('open');
        settings.classList.remove('open');
    } else if (type === 'settings') {
        settings.classList.add('open');
        history.classList.remove('open');
    } else if (type === 'temp') {
        document.body.classList.toggle('temp-mode');
        const span = document.querySelector('.brand-pill-center span');
        span.textContent = document.body.classList.contains('temp-mode') ? 'TEMP' : 'AI';
    }
}

function toggleTheme() {
    document.body.classList.toggle('light-mode');
    if (document.body.classList.contains('light-mode')) {
        document.body.style.setProperty('--bg', '#ffffff');
        document.body.style.setProperty('--text', '#000000');
    } else {
        document.body.style.setProperty('--bg', '#05070a');
        document.body.style.setProperty('--text', '#ffffff');
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

async function handleUserMessage() {
    const text = userPromptInput.value.trim();
    if (!text) return;
    appendMessage(text, 'user');
    userPromptInput.value = '';
    const thinkingId = 'think-' + Date.now();
    appendMessage('Thinking...', 'ai', thinkingId);

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messageText: text })
        });
        const data = await response.json();
        document.getElementById(thinkingId).innerHTML = marked.parse(data.choices[0].message.content);
    } catch (e) {
        document.getElementById(thinkingId).textContent = 'Error: Failed to connect.';
    }
}

function appendMessage(text, role, id = null) {
    const msg = document.createElement('div');
    if (id) msg.id = id;
    msg.style.padding = '12px 18px';
    msg.style.borderRadius = '20px';
    msg.style.marginBottom = '10px';
    msg.style.maxWidth = '85%';
    msg.style.alignSelf = role === 'user' ? 'flex-end' : 'flex-start';
    msg.style.background = role === 'user' ? 'var(--accent)' : 'var(--glass)';
    msg.style.color = role === 'user' ? '#000' : 'var(--text)';
    msg.innerHTML = role === 'user' ? text : marked.parse(text);
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

document.getElementById('sendBtn').addEventListener('click', handleUserMessage);
userPromptInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleUserMessage(); });
            
