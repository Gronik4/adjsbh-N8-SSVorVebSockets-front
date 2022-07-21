export default class CreatePopup {
  constructor(flag) {
    this.fl = flag;
  }

  creatP() {
    const popup = document.createElement('div');
    popup.className = 'popup';
    const formP = document.createElement('form');
    const h4 = document.createElement('h4');
    h4.className = 'h4';
    switch (this.fl) {
      case 'start':
        h4.textContent = 'Выберите псевдоним';
        break;
      case 'busy':
        h4.textContent = 'Выбранный псевдоним занят. Пожалуйста укажите другой.';
        break;
      case 'emty':
        h4.textContent = 'Нельзя отсылать пустую строку. Пожалуйста выберите псевдоним';
        break;
      default:
        break;
    }
    formP.append(h4);
    const nikName = document.createElement('textarea');
    nikName.className = 'nikName';
    nikName.rows = 1;
    const p = document.createElement('p');
    const formB = document.createElement('button');
    formB.className = 'buttF';
    formB.textContent = 'Продолжить';
    p.append(formB);
    formP.append(nikName);
    formP.append(p);
    popup.append(formP);
    return popup;
  }
}
