const settingsKeys = [
  'umsc_settings_autoloading',
  'umsc_settings_experimental',
  'umsc_settings_remtoolbar',
  'umsc_settings_darktheme',
];

document.addEventListener('DOMContentLoaded', async function () {
  // Загрузка данных из хранилища
  chrome.storage.local.get((data) => {
    data[settingsKeys[0]] = data[settingsKeys[0]] === true ? true : false;
    data[settingsKeys[1]] = data[settingsKeys[1]] === true ? true : false;
    data[settingsKeys[2]] = data[settingsKeys[2]] === true ? true : false;
    data[settingsKeys[3]] = data[settingsKeys[3]] === true ? true : false;

    // console.log(data[settings_keys[3]]);

    console.log(data);

    // Получение блоков с переключателями
    const a = document.getElementById('setting_autoloading');
    const b = document.getElementById('setting_remtoolbars');
    const c = document.getElementById('setting_experimental');
    const d = document.getElementById('setting_darktheme');

    // Получение самих переключателей
    const a_check = document.getElementById('setting_autoloading_check');
    const b_check = document.getElementById('setting_remtoolbars_check');
    const c_check = document.getElementById('setting_experimental_check');
    const d_check = document.getElementById('setting_darktheme_check');

    // Установка значений из хранилища на переключатели
    a_check.checked = data[settingsKeys[0]];
    b_check.checked = data[settingsKeys[2]];
    c_check.checked = data[settingsKeys[1]];
    d_check.checked = data[settingsKeys[3]];

    a.addEventListener('click', async () => {
      data[settingsKeys[0]] = !data[settingsKeys[0]];
      a_check.checked = data[settingsKeys[0]];
      await updateStorage(data);
    });

    b.addEventListener('click', async () => {
      data[settingsKeys[2]] = !data[settingsKeys[2]];
      b_check.checked = data[settingsKeys[2]];
      await updateStorage(data);
    });

    c.addEventListener('click', async () => {
      data[settingsKeys[1]] = !data[settingsKeys[1]];
      c_check.checked = data[settingsKeys[1]];
      await updateStorage(data);
    });

    d.addEventListener('click', async () => {
      data[settingsKeys[3]] = !data[settingsKeys[3]];
      d_check.checked = data[settingsKeys[3]];
      await updateStorage(data);
    });
  });
});

async function updateStorage(data) {
  console.log(data);
  chrome.storage.local.set(data);
}
