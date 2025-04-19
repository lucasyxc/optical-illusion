// 页面切换函数
function showIntroPage1() {
    document.getElementById('intro-page1').style.display = 'block';
    document.getElementById('intro-page2').style.display = 'none';
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('result').style.display = 'none';
}

function showIntroPage2() {
    document.getElementById('intro-page1').style.display = 'none';
    document.getElementById('intro-page2').style.display = 'block';
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('result').style.display = 'none';
}

function startQuiz() {
    document.getElementById('intro-page1').style.display = 'none';
    document.getElementById('intro-page2').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    document.getElementById('result').style.display = 'none';
    currentQuestion = 0;
    score = 0;
    answers = new Array(questions.length).fill(null);
    displayQuestion();
}

// 问题数据
const questions = [
    {
        image: '111.png',
        question: '3-4岁儿童的正常视力应达到0.8-1.0。',
        options: ['对', '错'],
        correct: 1
    },
    {
        image: '222.png',
        question: '4∼5岁的儿童生理屈光度为150∼200度远视，则有150∼200度的远视储备，如果此年龄段儿童的生理屈光度只有50度远视会发生什么？',
        options: ['没有关系', '提前近视'],
        correct: 1
    },
    {
        image: '333.png',
        question: '孩子反映看不清黑板上的字迹，或常常抱怨屋子里的光线太暗是近视的早起症状',
        options: ['错', '对'],
        correct: 1
    },
    {
        image: '444.png',
        question: '正常的远视储备是能够抵御近视的发生',
        options: ['错', '对'],
        correct: 1
    },
    {
        image: '555.png',
        question: '依据下面的表，来判断8岁的孩子应该有多少远视储备',
        options: ['+1.00—+1.50', '+1.00', '+0.88'],
        correct: 1
    },
    {
        image: '666.png',
        question: '近视有可能会导致视网膜脱落、视网膜裂孔、失明？',
        options: ['错，没有影响', '对，很有可能'],
        correct: 1
    },
    {
        image: '777.png',
        question: '户外活动能预防近视吗？',
        options: ['不能，没有用还费时间', '有用，还可以锻炼身体'],
        correct: 1
    },
    {
        image: '888.png',
        question: '上学期间孩子学习负担重，看书、写作业时间长，眼睛很容易疲劳。这种情况如果长期不改善，会影响视力，最终很可能发生近视或近视度数加深？',
        options: ['对，需要每30分钟休息5-10分钟', '不对，长时间不会有影响'],
        correct: 0
    },
    {
        image: '999.png',
        question: '最长应该多久检查一次眼睛？',
        options: ['6个月', '1年', '2年'],
        correct: 0
    }
];

let currentQuestion = 0;
let score = 0;
let answers = new Array(questions.length).fill(null);

function displayQuestion() {
    const form = document.getElementById('quizForm');
    form.innerHTML = '';
    
    const question = questions[currentQuestion];
    
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question';
    
    const img = document.createElement('img');
    img.src = question.image;
    img.alt = '视觉错觉图';
    
    const questionText = document.createElement('h3');
    questionText.textContent = `问题 ${currentQuestion + 1}: ${question.question}`;
    
    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'options';
    
    question.options.forEach((option, index) => {
        const label = document.createElement('label');
        label.className = 'option';
        
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'answer';
        radio.value = index;
        if (answers[currentQuestion] === index) {
            radio.checked = true;
        }
        
        label.appendChild(radio);
        label.appendChild(document.createTextNode(option));
        optionsDiv.appendChild(label);
    });
    
    const buttonGroup = document.createElement('div');
    buttonGroup.className = 'button-group';
    
    if (currentQuestion > 0) {
        const prevBtn = document.createElement('button');
        prevBtn.type = 'button';
        prevBtn.className = 'btn prev-btn';
        prevBtn.textContent = '上一题';
        prevBtn.onclick = () => {
            saveAnswer();
            currentQuestion--;
            displayQuestion();
        };
        buttonGroup.appendChild(prevBtn);
    }
    
    if (currentQuestion < questions.length - 1) {
        const nextBtn = document.createElement('button');
        nextBtn.type = 'button';
        nextBtn.className = 'btn next-btn';
        nextBtn.textContent = '下一题';
        nextBtn.onclick = () => {
            saveAnswer();
            currentQuestion++;
            displayQuestion();
        };
        buttonGroup.appendChild(nextBtn);
    } else {
        const submitBtn = document.createElement('button');
        submitBtn.type = 'button';
        submitBtn.className = 'btn submit-btn';
        submitBtn.textContent = '提交答案';
        submitBtn.onclick = () => {
            saveAnswer();
            showResults();
        };
        buttonGroup.appendChild(submitBtn);
    }
    
    questionDiv.appendChild(questionText);
    questionDiv.appendChild(img);
    questionDiv.appendChild(optionsDiv);
    questionDiv.appendChild(buttonGroup);
    
    form.appendChild(questionDiv);
    
    // 更新进度条
    const progress = document.getElementById('progress');
    progress.style.width = `${(currentQuestion / questions.length) * 100}%`;
}

function saveAnswer() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer) {
        answers[currentQuestion] = parseInt(selectedAnswer.value);
    }
}

function generatePrizeCode() {
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2);
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `JC${year}${month}${day}${hours}${minutes}${seconds}`;
}

function showResults() {
    score = 0;
    answers.forEach((answer, index) => {
        if (answer !== null) {
            const correctAnswers = questions[index].correct;
            if (Array.isArray(correctAnswers)) {
                if (correctAnswers.includes(answer)) {
                    score++;
                }
            } else if (answer === correctAnswers) {
                score++;
            }
        }
    });
    
    document.getElementById('quizForm').style.display = 'none';
    const result = document.getElementById('result');
    result.style.display = 'block';
    
    document.getElementById('score').textContent = score;
    document.getElementById('percentage').textContent = (score / questions.length * 100).toFixed(1);
    
    const prizeInfo = document.getElementById('prizeInfo');
    let prizeCode = '';
    
    if (score >= 6) {
        prizeCode = generatePrizeCode();
        prizeInfo.innerHTML = `
            <div class="congrats">恭喜您答对了${score}道题！</div>
            <div class="prize-code">您的兑奖号码：${prizeCode}</div>
            <p>请保存此兑奖号码，到店出示即可领取奖品</p>
        `;
    } else {
        prizeInfo.innerHTML = `
            <div class="sorry">很遗憾，您答对了${score}道题，未达到兑奖标准</div>
            <p>不过没关系，您仍然可以扫描下方二维码联系我们，我们会为您解答疑问</p>
        `;
    }
    
    // 保存答题结果到本地存储
    const quizResult = {
        completed: true,
        score: score,
        percentage: (score / questions.length * 100).toFixed(1),
        prizeCode: prizeCode,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem('quizResult', JSON.stringify(quizResult));
    
    // 更新进度条到100%
    const progress = document.getElementById('progress');
    progress.style.width = '100%';
}

// 检查本地存储中的答题状态
function checkQuizStatus() {
    const savedResult = localStorage.getItem('quizResult');
    if (savedResult) {
        const result = JSON.parse(savedResult);
        if (result.completed) {
            // 直接显示结果页面
            document.getElementById('intro-page1').style.display = 'none';
            document.getElementById('intro-page2').style.display = 'none';
            document.getElementById('quiz').style.display = 'none';
            const resultDiv = document.getElementById('result');
            resultDiv.style.display = 'block';
            
            // 显示保存的结果
            document.getElementById('score').textContent = result.score;
            document.getElementById('percentage').textContent = result.percentage;
            
            const prizeInfo = document.getElementById('prizeInfo');
            if (result.score >= 6) {
                prizeInfo.innerHTML = `
                    <div class="congrats">恭喜您答对了${result.score}道题！</div>
                    <div class="prize-code">您的兑奖号码：${result.prizeCode}</div>
                    <p>请保存此兑奖号码，到店出示即可领取奖品</p>
                `;
            } else {
                prizeInfo.innerHTML = `
                    <div class="sorry">很遗憾，您答对了${result.score}道题，未达到兑奖标准</div>
                    <p>不过没关系，您仍然可以扫描下方二维码联系我们，我们会为您解答疑问</p>
                `;
            }
            
            // 显示答题时间
            const quizTime = new Date(result.timestamp).toLocaleString('zh-CN');
            prizeInfo.innerHTML += `<p style="color: #666; font-size: 0.9em; margin-top: 10px;">答题时间：${quizTime}</p>`;
            
            return true;
        }
    }
    return false;
}

// 页面加载时检查答题状态
window.onload = function() {
    if (!checkQuizStatus()) {
        showIntroPage1();
    }
};

// 添加重新答题功能
function restartQuiz() {
    // 清除本地存储
    localStorage.removeItem('quizResult');
    // 重新开始答题
    startQuiz();
}

// 初始化问卷
displayQuestion(); 
