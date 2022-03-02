const wrap = document.getElementById('wrap');
const start = document.getElementById('start');

//複数のテキストを格納する配列
const textLists = [
    'Hello World', 'This is my App', 'How are you?',
    'Today is sunny', 'I love JavaScript!', 'Good morning', 
    'I am Japanese', 'Let it be', 'Samurai', 'Typing Game', 
    'Information Technology', 'I want to be a programmer', 
    'What day is today?', 'I want to build a wev app', 
    'Nice to meet you', 'Chrome Firefox Edge Safari', 'machine learning',
    'Brendan Eich', 'John Resig', 'React Vue Angular', 
    'Netspace Communications', 'underfined null NaN',
    'Thank you very much', 'Google Apple Facebook Amazon',
    'ECMAScript', 'console.log', 'for while is switch', 'var let const',
    'Windows Mac Linux iOS Android', 'programming'
];  

// 表示されているspan配列を定義
let checkTexts = [];

//ランダムなテキストを画面に表示する
const createText = () => {
    const p = document.getElementById('text');
    const rnd = Math.floor(Math.random() * textLists.length);
    
    //現在のpの中身(textContent)を空にする 
    p.innerHTML = '';

    // テキストを1文字ずつに分解して並べて表示する
    checkTexts = textLists[rnd].split('').map(value => {
        const span = document.createElement('span'); //span要素を作る
        span.textContent = value; //span要素の内容をvalueにする
        p.appendChild(span); //p要素の子要素としてspan要素を追加する

        return span;
    })
    console.log(checkTexts[0].textContent);
}; 

let score = 0;

//キーイベント＆入力判定処理
const keyDown = e => {
    wrap.style.backdroundColor = '#666';

    if(e.key === checkTexts[0].textContent) {
        wrap.style.backgroundColor = '#666';
        checkTexts[0].className = 'add-color';
        checkTexts.shift();

        // 正しい入力の時だけスコアを加算する
        score++;

        //checkTexts.lengthが0だったらcreateTextを実行
        if(!checkTexts.length) {createText();} 

    } else if(e.key === 'Shift') {
        wrap.style.backgroundColor = '#666';
    } else {
        wrap.style.backgroundColor = 'red';
    }
}; 

//ランク判定とメッセージ生成処理
const rankCheck = score => {
    let text = '';
    if(score < 100) {
        text = `あなたのランクはCランクです。\nBランクまであと${100 - score}文字です。`;
    } else if(score < 200) {
        text = `あなたのランクはBランクです。\nAランクまであと${200 - score}文字です。`;
    } else if(score < 300) {
        text = `あなたのランクはAランクです。\nSランクまであと${300 - score}文字です。`;
    } else if(score >= 300) {
        text = `あなたのランクはSランクです。\nおめでとうございます`;
    }

    return `${score}文字打てました\n${text}\n[OK]リトライ/[キャンセル]終了`;
}; 

//ゲーム終了処理
const gameOver = id => {
    clearInterval(id);
    
    // 
    const result = confirm(rankCheck(score));

    // [OK]を押されたら画面をリロードする
    if(result) {window.location.reload();}
}; 

//タイマー処理
const timer = () => {
    let time = 60;

    const count = document.getElementById('count');
    const ID = setInterval(() => {
        count.textContent = time--;

        // timeが0以下になったらタイマーを停止する
        if(time < 0) {gameOver(ID);}
    }, 1000);
};

//ゲームスタート時の処理
start.addEventListener('click', () => {
    // テキスト表示を実行
    createText();
    // タイマー処理実行
    timer();
    // スタートボタンを非表示
    start.style.display = 'none';
    // キー入力のイベント処理
    document.addEventListener('keydown', keyDown);
}); 