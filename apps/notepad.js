function initializeNotepad(windowElement) {
    const textarea = windowElement.querySelector('textarea');

    // Load saved text
    const savedText = localStorage.getItem('notepadContent');
    if (savedText) {
        textarea.value = savedText;
    }

    // Save text on input
    textarea.addEventListener('input', () => {
        localStorage.setItem('notepadContent', textarea.value);
    });
}
