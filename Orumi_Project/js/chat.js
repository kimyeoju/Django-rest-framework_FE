const token = localStorage.getItem('token');
const $form = document.getElementById("chatbot_form");
        const $input = document.getElementById("chat_msg");
        const $chatList = document.querySelector(".user-chat");

        // openAI API
        let url = 'http://127.0.0.1:8000/chatbot/';

        // 사용자의 질문
        let question;

        // 질문과 답변 저장
        let data = [
        {
            role: "system",
            content: "assistant는 일본 여행 전문가이다.",
        },
        ];

        // 화면에 뿌려줄 데이터, 질문들
        let questionData = [];

        // input에 입력된 질문 받아오는 함수
        $input.addEventListener("input", (e) => {
            question = e.target.value;
        });

        // 사용자의 질문을 객체를 만들어서 push
        const sendQuestion = (question) => {
        if (question) {
            data.push({
            role: "user",
            content: question,
            });
            questionData.push({
            role: "user",
            content: question,
            });
        }
        };

        // 화면에 질문 그려주는 함수
        const printQuestion = async () => {
        if (question) {
            let li = document.createElement("li");
            li.classList.add("question");
            questionData.map((el) => {
            li.innerText = el.content;
            });
            $chatList.appendChild(li);
            questionData = [];
            question = false;
        }
        };

        // 화면에 답변 그려주는 함수
        const printAnswer = (answer) => {
        let li = document.createElement("li");
        li.classList.add("answer");
        li.innerText = answer;
        $chatList.appendChild(li);
        };

        // api 요청보내는 함수
        console.log(data)
        const apiPost = async () => {
        const result = await fetch(url, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
            },
            body: JSON.stringify(data),
            redirect: "follow",
        })
            .then((res) => res.json())
            .then((res) => {
            printAnswer(res);
            })
            .catch((err) => {
            console.log(err);
            });
        };

        // submit
        $form.addEventListener("submit", (e) => {
            e.preventDefault();
            $input.value = null;
            sendQuestion(question);
            apiPost();
            printQuestion();
        });