// 로그아웃
const logout = () => {

    const logout_button = document.getElementById('logout-form');

    logout_button.addEventListener('click', async function() {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        console.log('로그아웃 성공!')
        alert('로그아웃되었습니다.');
        location.href="./index.html";
    });

};