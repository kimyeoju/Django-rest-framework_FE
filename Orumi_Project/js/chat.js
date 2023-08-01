const baseUrl = 'http://127.0.0.1:8000/chatbot/';



document.getElementById('chatbot_form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
        chat_msg: formData.get('chat_msg'),                                                                                           
};

    try { 
        console.log(data)
        const response = await fetch(`${baseUrl}`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
    },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
    throw new Error('챗봇 전송 실패');
    }

    const result = await response.json();
    console.log('챗봇 전송 결과:', result);

    // 토큰을 쿠키로 저장
    setCookie('token', result.token, 1);
    window.location.href = './index.html'
} catch (error) {
    console.error('Error:', error);
}

});