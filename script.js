// Function to get the system theme preference
function getSystemThemePreference() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

// Function to set theme
function setTheme(isDark) {
  document.body.classList.toggle("dark-mode", isDark);
  toggle?.classList.toggle("active", isDark);
  toggle?.setAttribute("aria-checked", isDark.toString());
}

// Function to save theme preference
function saveThemePreference(isDark) {
  try {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  } catch (error) {
    console.error("Error saving theme preference:", error);
  }
}

const toggle = document.getElementById("theme-toggle");

if (!toggle) {
  console.error("Theme toggle element not found!");
}

// Check for saved user preference or use system preference
try {
  const savedTheme = localStorage.getItem("theme");
  if (
    savedTheme === "dark" ||
    (!savedTheme && getSystemThemePreference() === "dark")
  ) {
    setTheme(true);
  }
} catch (error) {
  console.error("Error accessing localStorage:", error);
  // Fallback to system preference if localStorage is not accessible
  if (getSystemThemePreference() === "dark") {
    setTheme(true);
  }
}

// Toggle dark mode on click
toggle?.addEventListener("click", () => {
  try {
    const isDarkMode = !document.body.classList.contains("dark-mode");
    setTheme(isDarkMode);
    saveThemePreference(isDarkMode);
  } catch (error) {
    console.error("Error toggling theme:", error);
  }
});

// Listen for system theme changes
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (event) => {
    if (!localStorage.getItem("theme")) {
      setTheme(event.matches);
    }
  });
