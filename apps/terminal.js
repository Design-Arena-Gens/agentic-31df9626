function initializeTerminal(windowElement) {
    const terminal = windowElement.querySelector('.terminal');
    const commandLine = document.createElement('div');
    commandLine.innerHTML = '> <span contenteditable="true" class="input"></span>';
    terminal.appendChild(commandLine);

    const input = commandLine.querySelector('.input');

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const command = input.textContent.trim();
            const output = document.createElement('div');
            output.textContent = executeCommand(command);
            terminal.appendChild(output);
            input.textContent = '';
            terminal.appendChild(commandLine);
            input.focus();
        }
    });

    function executeCommand(command) {
        switch (command) {
            case 'help':
                return 'Available commands: help, date, clear';
            case 'date':
                return new Date().toString();
            case 'clear':
                terminal.innerHTML = '';
                return '';
            default:
                return `command not found: ${command}`;
        }
    }
}
