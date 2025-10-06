// Get all tab buttons and content elements
const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");

// Function to switch tabs
function switchTab(targetTab) {
  // Remove active class from all buttons and content
  tabButtons.forEach((button) => button.classList.remove("active"));
  tabContents.forEach((content) => content.classList.remove("active"));

  // Add active class to clicked button and corresponding content
  const activeButton = document.querySelector(`[data-tab="${targetTab}"]`);
  const activeContent = document.getElementById(targetTab);

  if (activeButton && activeContent) {
    activeButton.classList.add("active");
    activeContent.classList.add("active");
  }
}

// Add click event listeners to all tab buttons
tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetTab = button.getAttribute("data-tab");
    switchTab(targetTab);
  });
});

// Optional: Keyboard navigation support
tabButtons.forEach((button, index) => {
  button.addEventListener("keydown", (e) => {
    let newIndex;

    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        newIndex = index > 0 ? index - 1 : tabButtons.length - 1;
        tabButtons[newIndex].focus();
        switchTab(tabButtons[newIndex].getAttribute("data-tab"));
        break;
      case "ArrowRight":
        e.preventDefault();
        newIndex = index < tabButtons.length - 1 ? index + 1 : 0;
        tabButtons[newIndex].focus();
        switchTab(tabButtons[newIndex].getAttribute("data-tab"));
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        switchTab(button.getAttribute("data-tab"));
        break;
    }
  });
});
