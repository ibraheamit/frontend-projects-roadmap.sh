// Cookie utility functions
function setCookie(name, value, days) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name) {
  const nameEQ = name + "=";
  const cookies = document.cookie.split(";");

  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length);
    }
  }
  return null;
}

function deleteCookie(name) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
}

// Banner functionality
const banner = document.getElementById("cookieBanner");
const statusElement = document.getElementById("status");

function showBanner() {
  banner.classList.add("show");
  updateStatus("none");
}

function hideBanner() {
  banner.classList.remove("show");
}

function acceptCookies() {
  setCookie("cookieConsent", "accepted", 365);
  hideBanner();
  updateStatus("accepted");

  // You would typically initialize your analytics/tracking here
  console.log(
    "Cookies accepted - Analytics and tracking can now be initialized"
  );
}

function declineCookies() {
  setCookie("cookieConsent", "declined", 365);
  hideBanner();
  updateStatus("declined");

  // You would typically disable non-essential cookies here
  console.log("Cookies declined - Only essential cookies will be used");
}

function closeBanner() {
  hideBanner();
  // Don't save preference, banner will show again on next visit
}

function resetConsent() {
  deleteCookie("cookieConsent");
  showBanner();
  updateStatus("none");
  console.log("Cookie consent reset");
}

function updateStatus(status) {
  statusElement.className = `status ${status}`;

  switch (status) {
    case "accepted":
      statusElement.textContent = "✅ Cookies accepted - All features enabled";
      break;
    case "declined":
      statusElement.textContent = "❌ Cookies declined - Limited functionality";
      break;
    case "none":
    default:
      statusElement.textContent = "⏳ No consent given yet";
      break;
  }
}

// Initialize on page load
function initializeCookieBanner() {
  const consent = getCookie("cookieConsent");

  if (consent === "accepted") {
    updateStatus("accepted");
    // Initialize analytics/tracking here
    console.log("User has previously accepted cookies");
  } else if (consent === "declined") {
    updateStatus("declined");
    console.log("User has previously declined cookies");
  } else {
    // No consent found, show banner after a short delay for better UX
    setTimeout(() => {
      showBanner();
    }, 1000);
  }
}

// Add some interactive animations
function addInteractiveEffects() {
  const buttons = document.querySelectorAll(".cookie-btn");

  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initializeCookieBanner();
  addInteractiveEffects();
});

// Handle keyboard accessibility
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && banner.classList.contains("show")) {
    closeBanner();
  }
});
