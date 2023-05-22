function textTyping(){
    console.log("타이핑효과 잘되네")
    // I'm a  < 한번만 타이핑 찍어줄 텍스트 효과
    const text = document.querySelector(".text");
    let mainText = "I'm a ";
    let mainIndex = 0; // mainText에 있는 글자 하나씩 가져오기 위한 증가할 순번값
    // 위에 고정텍스트 출력효과 끝나면 직업군 텍스트 나타나고 지워지는 자동실행 함수
    let backAutoTyping; // 변수생성 후 값을 할당하지 않았음
    // 앞에 있는 I'm a를 출력하기 위한 자동실행 함수
    let frontAutoTyping = setInterval(function(){
        text.innerText += mainText[mainIndex]; // 한글자 텍스트 출력하고
        mainIndex ++; // 순번값 1씩 증가
        // 글자 타이핑이 전부 끝났을 때 
        if(mainIndex >= mainText.length){
            // 자동실행 멈춤
            clearInterval(frontAutoTyping);

            // 뒤 글자 출력을 위한 태그 생성(자식요소) < 고정텍스트와 색상이 다르기 때문
            let child = document.createElement("span");
            child.setAttribute("class", "child"); // <span class="child"></span>
            text.append(child); // 부모태그에 span태그 추가
            // 앞글자 타이핑 종료 후 뒷글자 출력을 위한 자동실행 세팅
            backAutoTyping = setInterval(function(){
                // 함수 호출구간
                typing();
            }, 200);
        }
    }, 200);

    
    // 뒷글자 세팅
    let backTextList = ["Publisher", "Web Designer", "Front end", "Back end"];
    let subIndex = 0; // 배열에 있는 글자 데이터의 순번값 (단어 덩어리)
    let backIndex = 0; // 배열에 있는 글자 데이터를 한글자씩 가져오기 위한 순번값 (한글자)
    let maxIndex = 0; // 글자를 한글자씩 뒤에서부터 지우기 위한 변수값
    // 뒷글자 출력을 위한 실제 실행함수 선언구간
    function typing(){
        // 생성된 span 태그 안에 한글자씩 타이핑을 위한 기능 구현
        const subText = document.querySelector(".text .child");
        // 배열 안에 있는 하나의 단어를 한글자씩 "출력" 먼저 진행
        if(backIndex < backTextList[subIndex].length){
            // 배열 안에 있는 문자열의 한글자씩을 span 태그에 출력 후
            subText.innerText += backTextList[subIndex].charAt(backIndex);
            backIndex++; // 순번값이 1씩 증가
            // 배열 안에 있는 문자열(한문장) 출력이 끝났을 때 조건 설정
            if(backIndex >= backTextList[subIndex].length){
                // 한글자씩 지우기 위해 한문장의 글자갯수값을 변수가 옮겨놓는 작업
                maxIndex = backTextList[subIndex].length;
                // 텍스트 타이핑 작성/제거 끝나고 3초 뒤에 재실행 함수 호출
                stopAndStart()    
            }
        }

        // 배열 안에 있는 한 단어씩 "제거"해서 출력
        else if(maxIndex >= 0){
            // 누적해서 들어가는게 아니라 잘라낸 글자만 새로 대입해서 보여줘야하기 때문에 += 이 아니라 = 으로 작업해야 함
            // 배열 안에 있는 한 문장의 글자를 하나씩 제외하면서 화면에 출력 (Publisher > Publise > Publis > Publi > Publ > Pub ...)
            subText.innerText = backTextList[subIndex].substring(0, maxIndex);
            maxIndex--; // 1씩 감소
            // 한 문장의 글자제거가 전부 끝나면
            if(maxIndex < 0){
                backIndex = 0; // 다음 문장의 0번째 글자서부터 출력하기 위해 초기화
                // 다음 순번의 문자열을 출력하기 위해 subIndex 숫자값 1 증가
                if(subIndex === backTextList.length - 1){
                    subIndex = 0;
                }
                else {
                    subIndex++; // 0 > 1, 1 > 2, 2 > 3
                }
                // 텍스트 타이핑 작성/제거 끝나고 3초 뒤에 재실행 함수 호출
                stopAndStart()                    
            }
        }
    }
    // 텍스트 타이핑 작성/제거 끝나고 3초 뒤에 재실행 함수 선언
    function stopAndStart(){
        // 일정시간동안 잠깐 멈췄다가 텍스트를 거꾸로 한글자씩 지우는 기능 수행
        clearInterval(backAutoTyping);
        // 3초 뒤에 자동실행 다시 시작
        setTimeout(function(){                        
            backAutoTyping = setInterval(function(){
                typing(); // 0.2초마다 typing 함수 재 호출
            }, 200);
        }, 3000);
    }
}

