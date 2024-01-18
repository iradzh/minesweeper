import { toggleDarkMode } from './darkMode';

export function settings() {
  const heading = document.createElement('h1');
  heading.textContent = 'minesweeper';
  document.body.append(heading);

  const burgerBox = document.createElement('div');
  burgerBox.classList.add('burger-container');
  burgerBox.innerText = '⚙️';
  document.body.append(burgerBox);

  burgerBox.addEventListener('click', () => {
    document.querySelector('.header').classList.toggle('header-active');
    document
      .querySelector('.level_container')
      .classList.toggle('level_container-active');
  });

  const header = document.createElement('header');
  header.classList.add('header');

  const darkModeContainer = document.createElement('div');
  const darkModeCheckbox = document.createElement('input');
  const levelContainer = document.createElement('div');

  darkModeCheckbox.type = 'checkbox';
  darkModeCheckbox.id = 'dark_mode';
  darkModeCheckbox.classList.add('dark_mode_checkbox');

  const darkModeLabel = document.createElement('label');
  darkModeLabel.htmlFor = 'dark_mode';
  darkModeLabel.classList.add('dark_mode_label');
  darkModeLabel.textContent = 'Dark Mode';

  darkModeContainer.appendChild(darkModeCheckbox);
  darkModeContainer.appendChild(darkModeLabel);
  header.appendChild(darkModeContainer);

  levelContainer.id = 'level-container';
  levelContainer.classList.add('level_container');

  const levels = [
    { id: 'easy', label: 'Easy', value: '10', checked: true },
    { id: 'medium', label: 'Medium', value: '15', checked: false },
    { id: 'hard', label: 'Hard', value: '25', checked: false }
  ];

  levels.forEach((level) => {
    const radioInput = document.createElement('input');
    radioInput.type = 'radio';
    radioInput.id = level.id;
    radioInput.name = 'level-group';
    radioInput.value = level.value;
    radioInput.checked = level.checked;

    const radioLabel = document.createElement('label');
    radioLabel.htmlFor = level.id;
    radioLabel.classList.add('level_label');
    radioLabel.textContent = level.label;

    levelContainer.appendChild(radioInput);
    levelContainer.appendChild(radioLabel);
  });

  header.appendChild(levelContainer);

  const bombCountContainer = document.createElement('div');
  bombCountContainer.classList.add('bombs-container');

  const bombCountLabel = document.createElement('label');
  bombCountLabel.htmlFor = 'bombCount';
  bombCountLabel.textContent = 'Mines (10-99):';

  const bombCountInput = document.createElement('input');
  bombCountInput.type = 'range';
  bombCountInput.id = 'bombCount';
  bombCountInput.name = 'bombCount';
  bombCountInput.min = '10';
  bombCountInput.max = '99';
  bombCountInput.value = '10';

  const selectedValue = document.createElement('span');
  selectedValue.id = 'selectedValue';
  selectedValue.textContent = '10';

  bombCountContainer.appendChild(bombCountLabel);
  bombCountContainer.appendChild(bombCountInput);
  bombCountContainer.appendChild(selectedValue);

  header.appendChild(bombCountContainer);

  const volumeElement = document.createElement('button');
  volumeElement.id = 'volumeButton';
  volumeElement.classList.add('volume-button');
  volumeElement.innerText = 'mute 🔈';

  header.appendChild(volumeElement);

  const boardHead = document.createElement('div');
  boardHead.classList.add('board__head');

  const clickBox = document.createElement('div');
  clickBox.classList.add('board__clicks__box');
  const clickBoxText = document.createElement('p');
  clickBoxText.innerText = '0';
  clickBoxText.classList.add('board__clicks');
  clickBox.appendChild(clickBoxText);
  boardHead.appendChild(clickBox);

  const buttonBox = document.createElement('div');
  buttonBox.classList.add('board__button');
  const buttonIcon = document.createElement('img');
  buttonIcon.src = 'assets/emoji/smile.png';
  buttonIcon.alt = 'board button';
  buttonIcon.classList.add('board__button__icon');

  buttonBox.appendChild(buttonIcon);
  boardHead.appendChild(buttonBox);

  const timerBox = document.createElement('div');
  timerBox.classList.add('board__timer__box');
  const timerText = document.createElement('p');
  timerText.innerText = '00:00';
  timerText.classList.add('board__timer');
  timerBox.appendChild(timerText);
  boardHead.appendChild(timerBox);

  document.body.appendChild(header);
  document.body.appendChild(boardHead);

  document
    .getElementById('dark_mode')
    .addEventListener('change', toggleDarkMode);
}
