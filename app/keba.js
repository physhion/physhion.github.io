let QK_nv = ['犬も歩く','クラスで浮く','河童の皿が乾く','偏差値が上がる','時計が壊れる','しゃっくりが止まる','電車が混む','尻尾が生える','ムキムキになる'];
let QK_v = ['山椒魚を裂く','ご飯を炊く','北北西を向く'];
let default_nv = ['風が吹く','桶屋が儲かる','坂を転ぶ','2倍に増える','カーテンが上がる','4月になる','サイコロで3が出る',
    '雪が融ける','太陽が昇る','人口に膾炙する','寿命が伸びる','水仙の花に生まれ変わる','鳥の声が森に響く'
];
let default_v = ['息を吹く','黒たまごを食べる','プラナリアを切る','ポケットを叩く','プレゼントを渡す','弁当を温める','平和を目指す','病人を見舞う',
    '深淵を覗く','ドレスを着る','平穏な午後を過ごす','孤独の怖さを知る','時を戻す','南極に行く','石を焼く','嘘をつく','背筋を伸ばす','花火をする','星に祈る',
    '山を焼く','亀を助ける'
];
let yours = [];

let ooo = [['う','く','す','つ','ぬ','む','る','ぐ','ぶ','来る','する'],
    ['えば','けば','せば','てば','ねば','めば','れば','げば','べば','来れば','すれば'],
    ['わなければ','かなければ','さなければ','たなければ','ななければ','まなければ','らなければ','がなければ','ばなければ','来なければ','しなければ']];

let randnum_front;
let text_front = "風が吹く";
let randnum_back;
let text_back = "桶屋が儲かる";
let text_front_final = "風が吹けば";

let leftoptions;
let rightoptions;
let wordoptions;

let error_u = false;
let error_reload = false;

let text_front_legacy = "風が吹く";
let text_back_legacy = "桶屋が儲かる";

let frontdomains = document.getElementById('front');
let backdomains = document.getElementById('back');

document.getElementById('left_button').addEventListener('click', left);
document.getElementById('all_button').addEventListener('click', all);
document.getElementById('right_button').addEventListener('click', right);
document.getElementById('you_wrote').addEventListener('keydown', textbox_enter_act);
document.getElementById('you_button').addEventListener('click', you_f);

function textbox_enter_act(pressed){
    if(pressed.key == "Enter"){
        you_f();
    }
}

function you_f(){
    let you_wrote = document.getElementById('you_wrote');
    let you_value = you_wrote.value;
    let you_error = document.getElementById('you_error');

    you_value = you_value.replace(/\s+/g, "");
    you_wrote.value = you_value;

    if(you_value == ""){
        you_error.textContent = "エラー発生…　空白のままEnterキーを叩かないでね"; 
        return;
    }

    for(let i=0; i < yours.length; i++){
        if(you_value == yours[i]){
            you_error.textContent = "エラー発生…　同じ句がすでに登録されています"; 
            return;
        }
    }

    let you_gobi = you_value.substring(you_value.length-1);
    for(let i=0; i < 9; i++){
        if(you_gobi == ooo[0][i]){
            you_error.textContent = ""; 
            yours.push(you_value);
            let you_show = document.getElementById('you_show');
            you_show.textContent = yours;
            return;
        }
    }
    
    you_error.textContent = "エラー発生…　語末がウ段の音で終わらないようです"; 

}

function wordoptions_receive(){

    leftoptions = document.getElementsByName("options_l");
    for(let i=0; i < leftoptions.length; i++){
        if(leftoptions[i].checked){
            leftoptions = leftoptions[i].value;
            break;
        }
    }

    rightoptions = document.getElementsByName("options_r");
    for(let i=0; i < rightoptions.length; i++){
        if(rightoptions[i].checked){
            rightoptions = rightoptions[i].value;
            break;
        }
    }

    wordoptions = [document.getElementById("default_check").checked,
        document.getElementById("QK_check").checked,
        document.getElementById("your_check").checked,
        document.getElementById("k_only").checked,
        document.getElementById("deny").checked
    ];

    error_reload = false;

    if(wordoptions[0] == false && wordoptions[1] == false && (wordoptions[2] == false || yours.length == 0)){
        error_reload = true;
        return;
    }

}

function text_act(){

    if(error_u == true){
        frontdomains.textContent = "エラー発生！";
        backdomains.textContent = "左の句で語末がウ段でない言葉を読み込んだようです…";
    }else if(error_reload == true){
        frontdomains.textContent = "エラー発生！";
        backdomains.textContent = "読み込む句がありません…";
    }else{
        frontdomains.textContent = text_front_final;
        backdomains.textContent = text_back;
        text_front_legacy = text_front;
        text_back_legacy = text_back;
    }

}

function left(){

    wordoptions_receive();
    if(error_reload == false){
        leftcore();
    }
    text_act();

}

function right(){

    wordoptions_receive();
    if(error_reload == false){
        rightcore();
    }
    text_act();

}

function all(){

    wordoptions_receive();
    if(error_reload == false){
        leftcore();
    }
    if(error_reload == false){
        rightcore();

    }
    text_act();

}

function leftcore(){

    let leftbox = [];

    if(wordoptions[0] == true){

        if(leftoptions == "left_nv"){
            leftbox = leftbox.concat(default_nv);
        }else if(leftoptions == "left_v"){
            leftbox = leftbox.concat(default_v);
        }else if(leftoptions == "left_all"){
            leftbox = leftbox.concat(default_nv,default_v);
        }

    }

    if(wordoptions[1] == true){

        if(leftoptions == "left_nv"){
            leftbox = leftbox.concat(QK_nv);
        }else if(leftoptions == "left_v"){
            leftbox = leftbox.concat(QK_v);
        }else if(leftoptions == "left_all"){
            leftbox = leftbox.concat(QK_nv,QK_v);
        }
        
    }

    if(wordoptions[2] == true){
        leftbox = leftbox.concat(yours);
    }

    for(let i=0; i<leftbox.length; i++){
        if(leftbox[i] == text_front_legacy || leftbox[i] == text_back){
            delete leftbox[i];
        }
    }    

    if(wordoptions[3] == true){
        for(let i=0; i<leftbox.length; i++){
            let henkan = leftbox[i];
            let gobi_ku_check = henkan.substring(henkan.length-1);
            if(gobi_ku_check !="く"){
                delete leftbox[i];
            }
        }
    }

    leftbox = leftbox.filter( ()=>true );

    if(leftbox.length == 0){
        error_reload = true;
        return;
    }
    
    randnum_front = Math.floor(Math.random()*leftbox.length);
    text_front = leftbox[randnum_front];

    text_front_final = text_front;

    let gobi;
    if(wordoptions[4] == false){
        gobi = 1;
    }else{
        gobi = 2;
    }

    error_u = false;

    let gobi_keba_henkan = text_front_final.substring(text_front_final.length-2);

    for (let i = 0; i<2; i++){
        if (gobi_keba_henkan == ooo[0][9+i]){
            text_front_final = text_front_final.slice(0,-2);
            text_front_final += ooo[gobi][9+i];
            return;
        }
    }

    gobi_keba_henkan = text_front_final.substring(text_front_final.length-1);

    for (let i = 0; i<9; i++){
        if(gobi_keba_henkan == ooo[0][i]){
            text_front_final = text_front_final.slice(0,-1);
            text_front_final += ooo[gobi][i];
            return;
        }

    }
    
    error_u = true;

}


function rightcore(){
        
    let rightbox = [];

    if(wordoptions[0] == true){

        if(rightoptions == "right_nv"){
            rightbox = rightbox.concat(default_nv);
        }else if(rightoptions == "right_v"){
            rightbox = rightbox.concat(default_v);
        }else if(rightoptions == "right_all"){
            rightbox = rightbox.concat(default_nv,default_v);
        }

    }

    if(wordoptions[1] == true){

        if(rightoptions == "right_nv"){
            rightbox = rightbox.concat(QK_nv);
        }else if(rightoptions == "right_v"){
            rightbox = rightbox.concat(QK_v);
        }else if(rightoptions == "right_all"){
            rightbox = rightbox.concat(QK_nv,QK_v);
        }

    }

    if(wordoptions[2] == true){
        rightbox = rightbox.concat(yours);
    }

    for(let i=0; i<rightbox.length; i++){
        if(rightbox[i] == text_front || rightbox[i] == text_back_legacy){
            delete rightbox[i];
        }
    }

    rightbox = rightbox.filter( ()=>true );

    if(rightbox.length == 0){
        error_reload = true;
        return;
    }

    randnum_back = Math.floor(Math.random()*rightbox.length);
    text_back = rightbox[randnum_back];

}
