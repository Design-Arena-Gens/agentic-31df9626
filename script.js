document.addEventListener('DOMContentLoaded', () => {
    const desktop = document.getElementById('desktop');
    const timeElement = document.getElementById('time');
    const dock = document.getElementById('dock');

    function updateTime() {
        const now = new Date();
        const options = { weekday: 'short', hour: '2-digit', minute: '2-digit' };
        timeElement.textContent = now.toLocaleDateString('en-US', options);
    }

    setInterval(updateTime, 1000);
    updateTime();

    let zIndexCounter = 100;

    function createWindow(app) {
        const windowElement = document.createElement('div');
        windowElement.classList.add('window');
        windowElement.style.zIndex = zIndexCounter++;

        const header = document.createElement('div');
        header.classList.add('window-header');

        const buttons = document.createElement('div');
        buttons.classList.add('buttons');
        const closeButton = document.createElement('div');
        closeButton.classList.add('button', 'close');
        const minimizeButton = document.createElement('div');
        minimizeButton.classList.add('button', 'minimize');
        const maximizeButton = document.createElement('div');
        maximizeButton.classList.add('button', 'maximize');
        buttons.appendChild(closeButton);
        buttons.appendChild(minimizeButton);
        buttons.appendChild(maximizeButton);

        const title = document.createElement('div');
        title.classList.add('title');
        title.textContent = app.name;

        header.appendChild(buttons);
        header.appendChild(title);

        const content = document.createElement('div');
        content.classList.add('window-content');
        content.innerHTML = app.content;

        windowElement.appendChild(header);
        windowElement.appendChild(content);

        desktop.appendChild(windowElement);

        makeDraggable(windowElement);

        if (app.name === 'Calculator') {
            initializeCalculator(windowElement);
        } else if (app.name === 'Notepad') {
            initializeNotepad(windowElement);
        } else if (app.name === 'Terminal') {
            initializeTerminal(windowElement);
        }

        closeButton.addEventListener('click', () => {
            windowElement.remove();
        });
    }

    function makeDraggable(element) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        const header = element.querySelector('.window-header');

        header.onmousedown = dragMouseDown;

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
            element.style.zIndex = zIndexCounter++;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            element.style.top = (element.offsetTop - pos2) + "px";
            element.style.left = (element.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    const apps = {
        finder: {
            name: 'Finder',
            content: '<h1>Finder</h1><p>File system coming soon...</p>'
        },
        calculator: {
            name: 'Calculator',
            content: `<div class="calculator">
                        <div class="display">0</div>
                        <div class="buttons">
                            <button>C</button><button>±</button><button>%</button><button>÷</button>
                            <button>7</button><button>8</button><button>9</button><button>×</button>
                            <button>4</button><button>5</button><button>6</button><button>-</button>
                            <button>1</button><button>2</button><button>3</button><button>+</button>
                            <button class="zero">0</button><button>.</button><button>=</button>
                        </div>
                    </div>`
        },
        notepad: {
            name: 'Notepad',
            content: '<textarea style="width: 100%; height: 100%; border: none; resize: none;"></textarea>'
        },
        terminal: {
            name: 'Terminal',
            content: '<div class="terminal" style="background: #000; color: #0f0; height: 100%; padding: 5px; font-family: monospace;"></div>'
        }
    };

    dock.addEventListener('click', (e) => {
        const appName = e.target.closest('.dock-item').dataset.app;
        if (appName && apps[appName]) {
            createWindow(apps[appName]);
        }
    });
});
