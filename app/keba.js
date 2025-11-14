let QK_nv = ['犬も歩く','クラスで浮く','河童の皿が乾く','偏差値が上がる','時計が壊れる','しゃっくりが止まる','電車が混む','尻尾が生える','ムキムキになる'];
let QK_v = ['山椒魚を裂く','ご飯を炊く','北北西を向く'];
let default_nv = ['風が吹く','桶屋が儲かる','坂を転ぶ','2倍に増える','カーテンが上がる','4月になる','サイコロで3が出る',
    '雪が融ける','太陽が昇る','人口に膾炙する','寿命が伸びる','水仙の花に生まれ変わる','鳥の声が森に響く'
];
let default_v = ['息を吹く','黒たまごを食べる','プラナリアを切る','ポケットを叩く','プレゼントを渡す','弁当温める','平和を目指す','病人を見舞う',
    '深淵を覗く','ドレスを着る','平穏な午後を過ごす','孤独の怖さを知る','時を戻す','南極に行く','石を焼く','嘘をつく','背筋を伸ばす','花火をする','星に祈る',
    '山を焼く','亀を助ける'
];
let yours = [];

let ooo = [['えば','けば','せば','てば','ねば','めば','れば','げば','べば','来れば','すれば'],
['わなければ','かなければ','さなければ','たなければ','ななければ','まなければ','らなければ','がなければ','ばなければ','来なければ','しなければ']];


// 初期値「風が吹けば桶屋が儲かる」.    
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

let frontdomains = document.getElementById('front');
let backdomains = document.getElementById('back');

document.getElementById('left_button').addEventListener('click', left);
document.getElementById('all_button').addEventListener('click', all);
document.getElementById('right_button').addEventListener('click', right);


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
        frontdomains.innerText = "エラー発生！";
        backdomains.innerText = "左の句で語末がウ段でない言葉を読み込んだようです…";
    }else if(error_reload == true){
        frontdomains.innerText = "エラー発生！";
        backdomains.innerText = "読み込む句がありません…";
    }else{
        frontdomains.innerText = text_front_final;
        backdomains.innerText = text_back;
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
        rightcore();
        leftcore();
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

    do{
    randnum_front = Math.floor(Math.random()*leftbox.length);
    text_front = leftbox[randnum_front];
    }while(text_front == text_back);

    let skipcount = true;
    text_front_final = text_front;

    let gobi;
    if(wordoptions[3] == false){
        gobi = ooo[0];
    }else{
        gobi = ooo[1];
    }

    error_u = false;

    let gobi_keba_henkan = text_front_final.substring(text_front_final.length-2);
    switch (gobi_keba_henkan){
        case "来る":{
            text_front_final = text_front_final.slice(0,-2);
            text_front_final += gobi[9];
            break;
        }
        case "する":{
            text_front_final = text_front_final.slice(0,-2);
            text_front_final += gobi[10];
            break;
        }
        default:{
            skipcount = false;
        }
    }

    if(skipcount == false){

    gobi_keba_henkan = text_front_final.substring(text_front_final.length-1);

        switch (gobi_keba_henkan){
            case "う":{
                text_front_final = text_front_final.slice(0,-1);
                text_front_final += gobi[0];
                break;
            }
            case "く":{
                text_front_final = text_front_final.slice(0,-1);
                text_front_final += gobi[1];
                break;
            }
            case "す":{
                text_front_final = text_front_final.slice(0,-1);
                text_front_final += gobi[2];
                break;
            }
            case "つ":{
                text_front_final = text_front_final.slice(0,-1);
                text_front_final += gobi[3];
                break;
            }
            case "ぬ":{
                text_front_final = text_front_final.slice(0,-1);
                text_front_final += gobi[4];
                break;
            }
            case "む":{
                text_front_final = text_front_final.slice(0,-1);
                text_front_final += gobi[5];
                break;
            }
            case "る":{
                text_front_final = text_front_final.slice(0,-1);
                text_front_final += gobi[6];
                break;
            }
            case "ぐ":{
                text_front_final = text_front_final.slice(0,-1);
                text_front_final += gobi[7];
                break;
            }
            case "ぶ":{
                text_front_final = text_front_final.slice(0,-1);
                text_front_final += gobi[8];
                break;
            }
            default:{
                error_u = true;
                return;
            }
        }
    }

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

    do{
    randnum_back = Math.floor(Math.random()*rightbox.length);
    text_back = rightbox[randnum_back];
    }while(text_front == text_back);

}
