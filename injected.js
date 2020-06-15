// работа с url сайта
let url = document.URL;
url = url.split('//')[1].split('/');

// для редактирования страницы
const button_main_style = '.yt_button_script {background-color: #be2413; border: none; border-radius: 20px; margin-left: 10px; color: white; padding: 5px 10.5px; margin-top: 7.5px; text-align: center; text-decoration: none; display: inline-block; font-size: 18px; font-weight: bold;} .yt_button_script:hover {background-color: #df3c2a;} .yt_button_script:active {background-color: #d96154;}';
const bear_image_new_src = 'https://i.ibb.co/G089qYZ/bear-icon.png';
const hm_my_style = `hr {display: none} .exercise-item {background-color: #f7f6f6; padding: 15px; /*border: 0.5px solid #E6E6E6;*/ border-radius: 20px;}
    .float-right {float: none !important}
    .form-control[readonly] {border: 2px #43B15D solid}
    .form-control[style="background-color: #dc3545; color: #ffffff"] {border: 2px #b14b43 solid;}
    .form-control[style="background-color: rgb(220, 53, 69); color: rgb(255, 255, 255); --darkreader-inline-bgcolor:#86272e; --darkreader-inline-color:#ffffff;"] {border: 2px #b14b43 solid;} /*для тёмной темы Dark Reader*/`
const scroll_custom_style = '::-webkit-scrollbar-button { background-image:url(""); background-repeat:no-repeat; width:6px; height:0px } ::-webkit-scrollbar-thumb { webkit-border-radius: 5px; border-radius: 5px; background-color:#F19137; background-image:url("https://yraaa.ru/_pu/24/59610063.png"); background-position:center; background-repeat:no-repeat; } ::-webkit-resizer{ background-image:url(""); background-repeat:no-repeat; width:7px; height:0px } ::-webkit-scrollbar{ width: 11px; }';
const xp_levels = [0, 200, 700, 1500, 2350, 4350, 5200, 6050, 6900, 7750, 9750, 10600, 11450, 12300, 13150, 15150, 16000, 16850, 17700, 18550, 19400, 20250, 21550, 23050, 28050];
const settings_keys = {
    autoloading: 'umsc_settings_autoloading',
    experimental: 'umsc_settings_experimental',
    rem_toolbars: 'umsc_settings_remtoolbar',
};


// переключатель автозапуска
let autoloading = localStorage.getItem(settings_keys.autoloading);
autoloading = (autoloading === 'true') ? true : false;
// переключатель экспериментальных функций
let experiment = localStorage.getItem(settings_keys.experimental);
experiment = (experiment === 'true') ? true : false;
// переключатель убирания панели для полей ввода
let rem_toolbars = localStorage.getItem(settings_keys.rem_toolbars);
rem_toolbars = (rem_toolbars === 'true') ? true : false;

let src;
const timer = 1.5; // таймер для автозапуска

let styles = ''; // общая переменная для стилей


// блок кода для страницы веба
if ((url[1] === 'mastergroup' || url[1] === 'course') && url[2] === 'lessons' && (url[4] === '' || url[4] == '#')) {
    let elem = document.body.getElementsByClassName('preview-title')[0];
    if (!elem) elem = document.body.getElementsByClassName('date-container')[0];
    if (elem) {
        styles += button_main_style;
        elem.innerHTML += '<div><button class="yt_button_script">Открыть на YouTube</button><button class="yt_button_script" style="width: 40px !important"> + </button></div>';

        var button1 = document.body.getElementsByClassName('yt_button_script')[0];
        var buttonnew = document.body.getElementsByClassName('yt_button_script')[1];
    }

    if (autoloading) {
        setTimeout(yt_start, timer * 1000);
    }

    if (button1) {
        button1.onclick = () => yt_start();
    }
    if (buttonnew) {
        buttonnew.onclick = () => yt_start_new();
    }
}
else if (url[1] === 'core' && url[2] === 'profile' && url[3] === 'edit') // блок кода для страницы Профиля/Настроек
{
    let elem = document.body.getElementsByClassName('content')[0];
    if (elem) {
        var html = `<h3><b>Настройки Umschool script</b></h3>
<input class="settings_autoloading_toggler" type="checkbox"> Автозапуск вебинаров на ютубе<br>
<input class="settings_experimental_toggler" type="checkbox"> Экспериментальные функции<br>
<input class="settings_remtoolbar_toggler" type="checkbox"> Убрать панель у полей ввода<br>
<a href="https://vk.com/id227730745" target="_blank" style="color: #f19137">По всем багам и вопросам писать сюда.</a>`;

        if (experiment) {
            var html_ex = '';
        }

        elem.innerHTML += html;

        var autoloading_toggler = elem.getElementsByClassName('settings_autoloading_toggler')[0];
        autoloading_toggler.checked = autoloading;

        var experimental_toggler = elem.getElementsByClassName('settings_experimental_toggler')[0];
        experimental_toggler.checked = experiment;

        var remtoolbar_toggler = elem.getElementsByClassName('settings_remtoolbar_toggler')[0];
        remtoolbar_toggler.checked = rem_toolbars;
    }

    if (autoloading_toggler) {
        autoloading_toggler.onclick = () => autoloading_toggle();
    }

    if (experimental_toggler) {
        experimental_toggler.onclick = () => experimental_toggle();
    }

    if (remtoolbar_toggler) {
        remtoolbar_toggler.onclick = () => remtoolbar_toggle();
    }
}
else if ((((url[1] === 'mastergroup' || url[1] === 'course') && url[2] === 'lessons' && url[4] === 'homework') |
    (url[1] == 'homework' & url[2] == 'submissions')) & experiment) {
    styles += hm_my_style;
}

// Для отображения в заголовке
if (url[1] === 'core' && url[2] === 'hw' && url[3] === 'my') {
    document.title = 'Домашние задания';
}
else if (url[1] === 'mastergroup') {
    if (url[2] === 'lessons') {
        if (url[4] === '' || url[4] == '#') {
            let elem = document.body.getElementsByClassName('text-container')[0].children[0];
            document.title = elem.innerHTML;
        }
        else if (url[4] === 'homework') {
            let elem = document.body.getElementsByClassName('text-container')[0].children[0];
            elem = elem.innerHTML.split(' (')[0];
            document.title = elem;
        }
    }
    else {
        document.title = 'Мастер-группы';
    }
}
else if (url[1] === 'teacher') {
    document.title = 'Преподаватели';
}
else if (url[1] === 'core') {
    if (url[2] === 'profile') {
        document.title = 'Главная страница';
    }
    else if (url[2] === 'loyalty') {
        document.title = 'Мои достижения';
    }
}
else if (url[1] === 'course') {
    document.title = 'Курсы';
}

try {
    // убирание бесполезной картинки слева
    if (experiment) {
        var useless_image = document.body.getElementsByClassName('if-mobile')[1];
        useless_image.innerHTML = '';

        styles += scroll_custom_style;
    }

    // замена медведя
    var bear_image = document.body.getElementsByClassName('bear-notifier-img')[0];
    if (bear_image) {
        bear_image.src = bear_image_new_src;
    }
} catch (error) {
    console.warn(error);
}

// убирание новых полей ввода
if (rem_toolbars) {
    setTimeout(() => {
        let fields_toolbars = document.body.getElementsByClassName('fr-toolbar');
        for (let i = 0; i < fields_toolbars.length; i++) {
            fields_toolbars[i].remove();
            i--;
        }
    }, timer * 500);
}

// изменение отображения уровней
if (experiment) {
    let xp_ind = document.body.getElementsByClassName('nav-level')[0];
    // let points = Number(xp_ind.innerHTML.slice(0, -2));
    let points = xp_ind.innerHTML.split('(')[1].slice(0, -3);
    let status = xp_ind.innerHTML.split('(')[0].slice(0, -1);
    if (points != 0) {
        let b = xp_levels[0];
        let i = 0;

        while (points > xp_levels[i]) {
            b = xp_levels[i + 1];
            i++;
        }
        xp_ind.innerHTML = `${status} (${points}XP) [${b - points}]`;
    }
}

// загрузка стилей на страницу
if (styles) document.head.innerHTML += '<style> ' + styles + ' </style>';


function autoloading_toggle() {
    localStorage.setItem(settings_keys.autoloading, autoloading_toggler.checked);
    location.reload();
}

function experimental_toggle() {
    localStorage.setItem(settings_keys.experimental, experimental_toggler.checked);
    location.reload();
}

function remtoolbar_toggle() {
    localStorage.setItem(settings_keys.rem_toolbars, remtoolbar_toggler.checked);
    location.reload();
}

function yt_start() {
    window.location = form_open_url();
}
function yt_start_new() {
    open(form_open_url());
}


function get_player() {
    return document.body.getElementsByClassName('plyr__video-wrapper')[0].children[0];
}

function form_open_url() {
    let src_original = get_player().src;
    return `https://youtu.be/${src_original.split('embed')[1].split('?')[0]}`;
}
