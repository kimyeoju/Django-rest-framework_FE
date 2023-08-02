const token = localStorage.getItem('token');
const $form = document.getElementById("chatbot_form");
const $input = document.getElementById("chat_msg");
const $chatList = document.querySelector(".user-chat");
const $chatContainer = document.getElementById("chat-container")



        // openAI API
        // django 퍼블릭 주소 연결 
        let url = 'http://13.125.17.136:8000/chatbot/';

        // 사용자의 질문
        let question;

        // 질문과 답변 저장
        let data = [
        {
            role: "system",
            content: "assistant는 유능한 일본 여행 전문가이다.",
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
                data = [{
                role: "user",
                content: question,
                }];
                questionData = [{
                role: "user",
                content: question,
                }];
            }
            };


        
        // 화면에 질문 그려주는 함수
        const printQuestion = () => {
            if (question) {
                let li = document.createElement("li");
                li.classList.add("question");
                
                const questionContainer = document.createElement("div");
                questionContainer.classList.add("question-container");
                
                const questionText = document.createElement("div");
                questionText.classList.add("chat_content");
                questionText.textContent = question;
                
                questionContainer.appendChild(questionText);
                li.appendChild(questionContainer);
                $chatList.appendChild(li);
            }
        };
        
        // 화면에 로딩 표시를 보여주는 함수
        const showLoadingIndicator = () => {
            const loadingIndicator = document.createElement("div");
            loadingIndicator.classList.add("loading-indicator");
            loadingIndicator.id = "loading-indicator";
            $chatContainer.parentNode.insertBefore(loadingIndicator, $chatContainer);
        };

        // 화면에 로딩 표시를 숨기는 함수
        const hideLoadingIndicator = () => {
            const loadingIndicator = document.getElementById("loading-indicator");
            if (loadingIndicator) {
            loadingIndicator.remove();
            }
        }


        // 화면에 답변 그려주는 함수
        const printAnswer = (answer) => {
            let li = document.createElement("li");
            li.classList.add("answer");
        
            const answerContainer = document.createElement("div");
            answerContainer.classList.add("answer-container");
        
            const chatbotImage = document.createElement("img");
            chatbotImage.classList.add("chatbot-image");
            chatbotImage.src = "./Orumi_Project/img/chat.png";
            chatbotImage.alt = "Chatbot";
        
            const answerText = document.createElement("div");
            answerText.classList.add("chat_content");
            answerText.textContent = answer;
        
            answerContainer.appendChild(chatbotImage);
            answerContainer.appendChild(answerText);
            li.appendChild(answerContainer);
            $chatList.appendChild(li);
            hideLoadingIndicator();
        };

        // 챗봇 인사말
        const chatbotHello = `무엇을 도와드릴까요 ?`;

        window.addEventListener("DOMContentLoaded", () => {
            printAnswer(chatbotHello);
        });

        // api 요청보내는 함수
        const apiPost = async () => {
            showLoadingIndicator();
            
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
                hideLoadingIndicator();
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

        // 대화 추가함수
        function addChat(text, isQuestion) {
            const chatList = document.getElementById("user-chat");
            const chatItem = document.createElement("li");
            chatItem.classList.add(isQuestion ? "question" : "answer");
            chatItem.textContent = text;
            chatList.appendChild(chatItem);
        }
