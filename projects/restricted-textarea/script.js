const textarea = document.getElementById("messageTextarea");
const characterCount = document.getElementById("characterCount");
const limitMessage = document.getElementById("limitMessage");
const maxLength = 250;

function updateCharacterCount() {
  const currentLength = textarea.value.length;
  characterCount.textContent = `${currentLength} / ${maxLength}`;

  // Check if limit is reached
  if (currentLength >= maxLength) {
    textarea.classList.add("limit-reached");
    characterCount.classList.add("limit-reached");
    limitMessage.classList.add("show");
  } else {
    textarea.classList.remove("limit-reached");
    characterCount.classList.remove("limit-reached");
    limitMessage.classList.remove("show");
  }
}

// Handle input events
textarea.addEventListener("input", updateCharacterCount);
textarea.addEventListener("keydown", function (e) {
  const currentLength = textarea.value.length;

  // Allow backspace, delete, arrow keys, and other control keys
  const allowedKeys = [
    "Backspace",
    "Delete",
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
    "Home",
    "End",
    "Tab",
    "Control",
    "Alt",
    "Shift",
    "Meta",
  ];

  // Allow Ctrl/Cmd combinations (copy, paste, select all, etc.)
  if (e.ctrlKey || e.metaKey) {
    return;
  }

  // If at max length and key is not allowed, prevent input
  if (currentLength >= maxLength && !allowedKeys.includes(e.key)) {
    e.preventDefault();
  }
});

// Handle paste events
textarea.addEventListener("paste", function (e) {
  const currentLength = textarea.value.length;
  const pastedData = (e.clipboardData || window.clipboardData).getData("text");
  const availableSpace = maxLength - currentLength;

  if (pastedData.length > availableSpace) {
    e.preventDefault();
    const truncatedText = pastedData.substring(0, availableSpace);
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    textarea.value =
      textarea.value.substring(0, start) +
      truncatedText +
      textarea.value.substring(end);
    textarea.selectionStart = textarea.selectionEnd =
      start + truncatedText.length;

    updateCharacterCount();
  }
});

// Initialize character count
updateCharacterCount();
