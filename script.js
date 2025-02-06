document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const contentFrame = document.getElementById('contentFrame');
  const lightSwitch = document.getElementById('lightSwitch');
  const backButton = document.querySelector('.nav-button.back');
  const forwardButton = document.querySelector('.nav-button.forward');
  const reloadButton = document.querySelector('.nav-button.reload');
  const tabTitle = document.querySelector('.tab-title');

  // Handle navigation
  function navigate(input) {
    let url = input.trim();
    
    if (!url.match(/^https?:\/\//i)) {
      url = `https://www.google.com/search?q=${encodeURIComponent(url)}`;
    }
    
    contentFrame.src = url;
    searchInput.value = url;
  }

  // Update tab title when frame loads
  contentFrame.addEventListener('load', () => {
    try {
      const title = contentFrame.contentDocument.title;
      tabTitle.textContent = title || 'New Tab';
    } catch (e) {
      // Handle cross-origin restrictions
      tabTitle.textContent = new URL(contentFrame.src).hostname;
    }
  });

  // Event listeners
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      navigate(searchInput.value);
    }
  });

  backButton.addEventListener('click', () => {
    window.history.back();
  });

  forwardButton.addEventListener('click', () => {
    window.history.forward();
  });

  reloadButton.addEventListener('click', () => {
    contentFrame.src = contentFrame.src;
  });

  // Light/Dark mode toggle
  lightSwitch.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
  });

  // Set initial state based on system preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    lightSwitch.checked = true;
    document.body.classList.add('dark-mode');
  }
});
