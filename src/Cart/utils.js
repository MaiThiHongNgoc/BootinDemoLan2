
// Hàm để hiển thị thông báo
export function showMessage(message, type = 'error', duration = 3000) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type} show`;
    messageElement.innerHTML = `
        <span class="icon">ℹ️</span> <!-- Optional icon -->
        ${message}
        <button class="close-btn" onclick="this.parentElement.style.display='none'">&times;</button>
    `;

    document.body.appendChild(messageElement);

    // Ẩn thông báo sau khoảng thời gian đã chỉ định
    setTimeout(() => {
        messageElement.classList.remove('show');
        setTimeout(() => {
            messageElement.remove(); // Xóa phần tử khỏi DOM sau khi hoàn tất fade-out
        }, 500); // Đợi chuyển tiếp fade-out hoàn tất
    }, duration);
}
