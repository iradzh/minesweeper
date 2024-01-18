export function toggleDarkMode() {
  const checkbox = document.getElementById('dark_mode');
  const stylesheet = document.getElementById('stylesheet');
  if (checkbox.checked) {
    stylesheet.href = './assets/dark.css';
    console.log('dark');
  } else {
    stylesheet.href = './assets/light.css';
    console.log('light');
  }
}
