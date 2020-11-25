const buttonsForYT =
  '<div><button class="yt_button_script">Открыть на YouTube</button><button class="yt_button_script" style="width: 40px !important"> + </button>';
const button_main_style =
  '.yt_button_script {background-color: #be2413; border: none; border-radius: 20px; margin-left: 10px; color: white; padding: 5px 10.5px; margin-top: 7.5px; text-align: center; text-decoration: none; display: inline-block; font-size: 18px; font-weight: bold;} .yt_button_script:hover {background-color: #df3c2a;}';
const hmMyStyle = `hr {display: none} .exercise-item {background-color: #f7f6f6; padding: 15px; /*border: 0.5px solid #E6E6E6;*/ border-radius: 20px;}
  .float-right {float: none !important}
  .form-control[readonly] {border: 2px #43B15D solid}
  .form-control[style="background-color: #dc3545; color: #ffffff"] {border: 2px #b14b43 solid;}
  .form-control[style="background-color: rgb(220, 53, 69); color: rgb(255, 255, 255); --darkreader-inline-bgcolor:#86272e; --darkreader-inline-color:#ffffff;"] {border: 2px #b14b43 solid;} /*для тёмной темы Dark Reader*/`;
const bearImageNewSrc = 'https://i.ibb.co/G089qYZ/bear-icon.png';
const settingsKeys = [
  'umsc_settings_autoloading',
  'umsc_settings_experimental',
  'umsc_settings_remtoolbar',
  'umsc_settings_darktheme',
];

console.log('start');

// Получение массива аргументов ссылки
const urls = document.URL.split('/'),
  darkThemeUrl = chrome.extension.getURL('dark.css');
urls.splice(0, 3);
urls.splice(urls.length - 1, 1);

let styles = '',
  ytUrl;

chrome.storage.local.get(main);

function main(data) {
  console.log(data);
  if (data[settingsKeys[3]]) {
    document.head.innerHTML += `<link id="dark-theme-link" rel="stylesheet" href="${darkThemeUrl}" />`;
  }

  document.onreadystatechange = async () => {
    const state = document.readyState;
    console.log(state);
    if (state === 'complete') {
      if (urls[0] === 'lessons' || urls[1] === 'lessons') {
        ytUrl = createYTUrl();
        if (data['umsc_settings_autoloading']) {
          window.open(ytUrl);
        } else {
          let elem = document.body.getElementsByClassName('preview-title')[0];
          if (!elem)
            elem = document.body.getElementsByClassName('date-container')[0];

          if (elem) {
            styles += button_main_style;
            elem.innerHTML += buttonsForYT;

            const button1 = document.body.getElementsByClassName(
              'yt_button_script'
            )[0];
            const buttonnew = document.body.getElementsByClassName(
              'yt_button_script'
            )[1];

            if (button1) {
              button1.onclick = ytStart;
            }
            if (buttonnew) {
              buttonnew.onclick = ytStartNew;
            }
          }
        }
      } else if (
        (urls[1] === 'lessons' && urls[3] === 'homework') ||
        (urls[0] === 'homework' && urls[1] === 'submissions')
      ) {
        if (data[settingsKeys[1]]) {
          styles += hmMyStyle;
        }
        if (data[settingsKeys[2]]) {
          const fieldsToolbarElems = document.body.getElementsByClassName(
            'fr-toolbar'
          );
          for (let i = 0; i < fieldsToolbarElems.length; i++) {
            fieldsToolbarElems[i].remove();
            i--;
          }
        }
      }

      if (styles) document.head.innerHTML += '<style> ' + styles + ' </style>';
    }

    try {
      // Убирание бесполезной картинки слева
      if (experiment) {
        var uselessImageElement = document.body.getElementsByClassName(
          'if-mobile'
        )[1];
        uselessImageElement.innerHTML = '';

        styles += scroll_custom_style;
      }

      // Замена медведя
      var bearImageElem = document.body.getElementsByClassName(
        'bear-notifier-img'
      )[0];
      if (bearImageElem) {
        bearImageElem.src = bearImageNewSrc;
      }
    } catch (error) {}
  };
}

function ytStart() {
  window.location = ytUrl;
}
function ytStartNew() {
  open(ytUrl);
}

function getPlayer() {
  return document.body.getElementsByClassName('plyr__video-wrapper')[0]
    .children[0];
}

function createYTUrl() {
  let src_original = getPlayer().src;
  return `https://youtu.be/${src_original.split('embed')[1].split('?')[0]}`;
}
