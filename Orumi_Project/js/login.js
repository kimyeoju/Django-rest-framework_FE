window.onload = function(){

    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(loginForm);
    const email = formData.get('email');
    const password = formData.get('password');

    // django 퍼블릭 주소 연결 
    axios.post('http://13.125.17.136:8000/user/login/', {
        email: email,
        password: password,
    })
    .then(response => {
        console.log('로그인 성공!');
        console.log(response);
        const token = localStorage.setItem('token', response.data.access)

        location.href=`./index.html`
    })
    .catch(error => {
        console.error('Login failed:', error);
        alert("로그인 실패",error)
    });
    });
}