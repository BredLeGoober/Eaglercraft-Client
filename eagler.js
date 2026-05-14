const terminalOutput = document.querySelector('#terminalOutput');
const terminalForm = document.querySelector('#terminalForm');
const terminalCommand = document.querySelector('#terminalCommand');
const runBuild = document.querySelector('#runBuild');
const seedDb = document.querySelector('#seedDb');
const installPackage = document.querySelector('#installPackage');
const dbRows = document.querySelector('#dbRows');

const terminalResponses = {
    'npm test': ['✓ lint passed', '✓ unit tests passed', '✓ database smoke test passed'],
    'npm run build': ['vite v6.0.0 building for production...', '✓ 42 modules transformed', 'dist ready in 812ms'],
    'npm install': ['added 18 packages, and audited 243 packages in 2s', '0 vulnerabilities found'],
    'db:seed': ['Inserted 4 rows into users', 'Inserted 6 rows into projects', 'Seed complete'],
    'git status': ['On branch feature/browser-ide', 'nothing to commit, working tree clean'],
};

function appendTerminalLine(text, className = '') {
    const line = document.createElement('p');
    line.textContent = text;
    if (className) {
        line.className = className;
    }
    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function runCommand(command) {
    const normalized = command.trim();
    if (!normalized) {
        return;
    }

    const prompt = document.createElement('p');
    const promptSymbol = document.createElement('span');
    promptSymbol.textContent = '$';
    prompt.append(promptSymbol, ` ${normalized}`);
    terminalOutput.appendChild(prompt);

    const responses = terminalResponses[normalized] || [`Command queued in ArcticIDE: ${normalized}`];
    responses.forEach((response, index) => {
        window.setTimeout(() => appendTerminalLine(response, response.startsWith('✓') ? 'success' : ''), 120 * index);
    });
}

function addSeededRow() {
    const row = document.createElement('tr');
    row.innerHTML = '<td>4</td><td>Katherine</td><td>qa</td>';
    dbRows.appendChild(row);
}

terminalForm.addEventListener('submit', (event) => {
    event.preventDefault();
    runCommand(terminalCommand.value);
    terminalCommand.value = '';
});

runBuild.addEventListener('click', () => runCommand('npm run build'));
installPackage.addEventListener('click', () => runCommand('npm install'));
seedDb.addEventListener('click', () => {
    runCommand('db:seed');
    if (!Array.from(dbRows.querySelectorAll('td')).some((cell) => cell.textContent === 'Katherine')) {
        addSeededRow();
    }
});
