window.onload = function(){
    const registerForm = document.getElementById('register-form');
    
    registerForm.addEventListener('submit', function (event) {
    event.preventDefault();
    
      // Get form data
    const formData = new FormData(registerForm);
    const email = formData.get('email');
    const password = formData.get('password');
    
    // django 퍼블릭 주소 연결 
    axios.post('http://13.125.17.136:8000/user/register/', {
        email: email,
        password: password,
    })
    .then(response => {
        console.log('회원가입 성공!');
        console.log(response);
        const token = localStorage.setItem('token', response.data.access)
        // 페이지전환
        location.href=`./login.html`
    })
    .catch(error => {
        console.error('Registration failed:', error);
        alert("회원가입 실패!",error)
    });
    });
}