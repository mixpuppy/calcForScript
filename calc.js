window.addEventListener("load", function() {
    var secCalc = document.querySelector("#sec-calc");
    var form = secCalc.querySelector(".form");
    var result = secCalc.querySelector(".result");

    var calculator = secCalc.querySelector(".calculator");

    var dialBtn = calculator.querySelector(".dial-btn");
    var dialBtns = dialBtn.querySelectorAll(".btn");
    var operator = calculator.querySelector(".operators");
    var operBtns = operator.querySelectorAll(".btn");

    var preNum = null;
    var postNum = null;
    var inputOper = null;
    var preInputOper = null;
    var checkExist = false;   // 숫자열 입력이 끝났는지 확인하는 boolean

    //다이얼(숫자) 버튼 이벤트
    dialBtns.forEach(function(btn) {
        btn.addEventListener("click", function() {
            var input = btn.getAttribute("value");
            if(checkExist) { // 연산자 입력으로 숫자입력 끝남 확인시
                result.value = "0";
                checkExist = false;
            }
            if(result.value == '0') {    // 초기값 0 삭제해주는 로직
                result.value = "";
            }
            switch (input) {
                case 'ce' :
                    if(form.value.includes("=")) {
                        form.value = "";
                        result.value = "0";
                        preNum = null;
                        postNum = null;
                    } else {
                        result.value = "0";
                    } return;
                case 'c' :
                    form.value = "";
                    result.value = "0";
                    preNum = null;
                    postNum = null;
                    return;
                default : 
                    result.value += input;
                    preInputOper = inputOper;
                    break;
            }
        });
    });
    // 연산자 버튼 이벤트
    operBtns.forEach(function(btn) {
        btn.addEventListener("click", function() {
            inputOper = btn.getAttribute("value");
            var num = result.value;
            checkExist = true;

            // 초기 음수 입력시 - 계산위함
            if(result.value == "" && inputOper == '-') {
                preNum = - parseInt(result.value);
                form.value = result.value + inputOper;
            }

            //이전 입력값을 숫자로 뽑아오는 과정
            if(!form.value.includes("=")) {  // = 이 아닐때 연산 이어가기 위한 조건생략
                var findPreNum = form.value.match(/-?\d+/);

                var findNum = findPreNum ? findPreNum[0] : null;
                if(findNum != null) {
                    preNum = findNum;
                    postNum = result.value;
                    findNum = null;
                }
            }

            //다음 연산자 표기
            form.value = num + inputOper;

            //2개의 수가 있을때 조건
            if(preNum != null && postNum != null) {

                console.log(preNum);
                console.log(preInputOper);
                console.log(postNum);
                console.log(inputOper);

                switch(preInputOper) {
                    case '+' :
                        result.value = parseInt(preNum) + parseInt(postNum);
                        form.value = result.value + inputOper;
                        break;
                    case '-' :
                        result.value = parseInt(preNum) - parseInt(postNum);
                        form.value = result.value + inputOper;
                        break;
                    case '*' :
                        result.value = parseInt(preNum) * parseInt(postNum);
                        form.value = result.value + inputOper;
                        break;
                    case '/' :
                        if(parseInt(postNum)==0) {
                            form.value = "Cannot divide zero...";
                            break;
                        }
                        result.value = parseInt(preNum) / parseInt(postNum);
                        form.value = result.value + inputOper;
                        break;
                }
                switch(inputOper) {
                    case '=' :
                        form.value = preNum + preInputOper + postNum + inputOper;

                        if (preInputOper === "+") {
                            result.value = parseInt(preNum) + parseInt(postNum);
                        } else if (preInputOper === "-") {
                            result.value = parseInt(preNum) - parseInt(postNum);
                        } else if (preInputOper === "*") {
                            result.value = parseInt(preNum) * parseInt(postNum);
                        } else if (preInputOper === "/") {
                            result.value = parseInt(preNum) / parseInt(postNum);
                        }
                        // inputOper = null;
                        preNum = result.value;
                        // preNum = result.value;
                        // postNum = null;
                        break;
                }
                
                if(inputOper === '=') {
                    return;
                } else {  // 연속 연산자 입력시 계산 지속 못되게 하기
                    preInputOper = null;
                }
            }      
        });
    });

    // hover 클래스 추가 (키누를시 호버애니메이션)
    function addHoverEffect(btn) {
        var hoverTimeout

        btn.classList.add("hover");
        hoverTimeout = setTimeout(function () {
            btn.classList.remove("hover");
        }, 100); // 0.1초 (100ms) 후에 hover 클래스 제거
    }
      
    // 키보드 입력 이벤트
    function handleKeyboardEvent(event) {
        var input = event.key;
        var numRegex = /[0-9]/;
        var operRegex = /[+\-*/=CE]/;

        function clickButton(selector) {
            var btn = calculator.querySelector(selector);
            if (btn) {
                btn.click();
                addHoverEffect(btn);
            }
        }
        if (numRegex.test(input)) {
            clickButton(`.dial-btn .btn[value='${input}']`);
        }
        if (operRegex.test(input)) {
            clickButton(`.operators .btn[value='${input}']`);
        }
        if (input === "Enter") {
            event.preventDefault();
            clickButton(".operators .btn[value='=']");
        }
        if (input === "Escape") {
            event.preventDefault();
            clickButton(".dial-btn .btn[value='c']");
        }
        if (input === "Backspace") {
            event.preventDefault();
            clickButton(".dial-btn .btn[value='ce']");
        }
    }

    // 키보드 입력 이벤트 리스너 등록
    window.addEventListener("keydown", handleKeyboardEvent);

});



// 음수 연산 문제 해결 필요 및 음수 표시 마이나스 뒤 문제 --> 태그 rlt 처리에서 css 처리로 바꾸고 해결
// 연산자 연속입력시 마지막 연산자로 연산되던 문제 preInputOper 스위치 대상문 변경으로 해결

// 추가 예외처리 
//(최대 수 over 시 별도 메세지 출력)
//(연산자 연속 입력시 이전 입력값 계속 적용되는 문제)  --> 계산이후 preInputOper 초기화
// = 연속입력시 이전계산 반복  --> 조건부 preInputOper 초기화
//로그기능 추가 및 로그 평소 숨김버튼