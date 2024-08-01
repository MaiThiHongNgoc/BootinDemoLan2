export function showMessage(message, type = 'error', duration = 1500) {
  // Create notification container if it doesn't exist
  let container = document.querySelector('.notification-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'notification-container';
    document.body.appendChild(container);
  }

  // Check the number of notifications and remove the oldest if needed
  const existingMessages = container.querySelectorAll('.message');
  if (existingMessages.length >= 5) { // Limit the number of notifications
    existingMessages[0].remove(); // Remove the oldest notification
  }

  // Create new notification
  const messageElement = document.createElement('div');
  messageElement.className = `message ${type} show`;
  
  // Calculate end time
  const endTime = new Date().getTime() + duration;
  
  // Add HTML content for the notification
  messageElement.innerHTML = `
    <span class="icon"></span>
    ${message}
    <button class="close-btn" onclick="this.parentElement.style.display='none'">&times;</button>
    <div class="progress-bar">
      <div class="progress-bar-inner"></div>
      <div class="progress-bar-end"></div>
    </div>
  `;
  
  // Append notification to container
  container.appendChild(messageElement);
  
  const progressBarInner = messageElement.querySelector('.progress-bar-inner');
  const progressBarEnd = messageElement.querySelector('.progress-bar-end');
  
  // Update progress bar
  const interval = setInterval(() => {
    const timeLeft = endTime - new Date().getTime();
    if (timeLeft <= 0) {
      clearInterval(interval);
      messageElement.classList.remove('show');
      setTimeout(() => {
        messageElement.remove();
      }, 500);
    } else {
      const progress = ((duration - timeLeft) / duration) * 100;
      progressBarInner.style.width = `${progress}%`;
      progressBarEnd.style.width = `${progress}%`;
    }
  }, 100);
}
