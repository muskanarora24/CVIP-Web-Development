document.addEventListener("DOMContentLoaded", function () {
    const codeArea = document.getElementById("code-area");
    const copyButton = document.getElementById("copy-button");
    const lockButton = document.getElementById("lock-button");
  
    codeArea.addEventListener("input", autoIndent);

    function autoIndent() {
        let code = codeArea.value;
        const cursorPosition = codeArea.selectionStart;
        const lines = code.split('\n');
        
        // Determine the current line and its leading whitespace
        const currentLineNumber = code.substr(0, cursorPosition).split('\n').length;
        const currentLineContent = lines[currentLineNumber - 1];
        const leadingWhitespace = currentLineContent.match(/^\s*/)[0];
    
        // Create an array of lines with proper indentation
        const indentedLines = lines.map((line, index) => {
          if (index === currentLineNumber - 1) {
            return leadingWhitespace + line.trim();
          } else {
            return line;
          }
        });
    
        code = indentedLines.join('\n');
        codeArea.value = code;
      }
    

    let isLocked = false;
  
    // Event listeners
    copyButton.addEventListener("click", () => {
      codeArea.select();
      document.execCommand("copy");
    });
  
    lockButton.addEventListener("click", () => {
      isLocked = !isLocked;
      lockButton.textContent = isLocked ? "Unlock" : "Lock";
      codeArea.disabled = isLocked;

      if (isLocked) {
        codeArea.style.backgroundColor = "#ccc"; // Change this to the desired gray color
      } else {
        // Reset the background color when unlocking (you can set it to the original color)
        codeArea.style.backgroundColor = "initial";
      }
    });

// Initialize CodeMirror on the textarea
const codeEditor = CodeMirror.fromTextArea(document.getElementById("code-area"), {
  mode: "htmlmixed", // Set the mode to the desired programming language
  lineNumbers: true,  // Display line numbers
  autoCloseBrackets: true, // Auto-close brackets
  autoCloseTags: true, // Auto-close HTML tags
  matchBrackets: true, // Highlight matching brackets
  indentUnit: 4, // Number of spaces for each level of indentation
  lineWrapping: false,
  viewportMargin: Infinity, // Ensure the editor takes up the entire container
});

const cmContainer = codeEditor.getWrapperElement();
cmContainer.style.width = "100%"; // Set the width as needed
cmContainer.style.height = "500px"; // Set the height as needed

// Set up auto-indentation on Enter key press
codeEditor.on("keypress", (editor, event) => {
  if (event.key === "Enter") {
    const cursor = editor.getCursor();
    const currentLine = editor.getLine(cursor.line);
    const currentIndentation = currentLine.match(/^\s*/)[0];
    const nextIndentation = currentIndentation + " ".repeat(editor.getOption("indentUnit"));
    editor.replaceRange(nextIndentation, cursor);
  }
});

  });
  