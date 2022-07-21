import CreatMess from './creatMess';
import CreatOnlines from './creatMem';
import CreatePopup from './CreatPopup';

export default class App {
  constructor() {
    this.container = document.querySelector('.container');
    this.online = document.getElementById('ol');
    this.blockMessage = document.getElementById('sm');
    this.textMess = document.getElementById('ta');
    this.lclSt = localStorage.getItem('Nik');
    this.parsLcS = JSON.parse(this.lclSt);
    this.forExit = this.parsLcS ? JSON.stringify({ exit: this.parsLcS }) : 0;
    this.me = undefined;
    this.ws = new WebSocket('ws://localhost:7999/ws');

    window.addEventListener('unload', () => { this.ws.send(this.forExit); });

    this.init();
    this.textMess.addEventListener('keydown', (e) => {
      if (e.code === 'NumpadEnter') { this.hendlerMessage(); }
    });
    this.ws.addEventListener('message', this.gettingData.bind(this));
    this.ws.addEventListener('close', (e) => { console.log('socket close:', e); });
    this.ws.addEventListener('error', (e) => { console.log('error', e); });
  }

  init() {
    this.ws.addEventListener('open', (e) => {
      console.log('socket open:', e.type);
      this.ws.send('start');
      if (this.ws.readyState === WebSocket.OPEN) {
        if (this.lclSt) {
          this.ws.send(JSON.stringify({ entre: this.parsLcS }));
          this.me = this.parsLcS.nik;
          this.textMess.removeAttribute('disabled');
        } else {
          this.showPopup('start');
          this.me = 0;
        }
      } else { alert('WebSocket - close.'); }
    });
  }

  hendlerNik(e) {
    e.preventDefault();
    const nikname = document.querySelector('.nikName').value;
    if (!nikname) {
      document.querySelector('.popup').remove();
      this.showPopup('emty');
      return;
    }
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ registered: { nik: nikname, id: 0 } }));
      document.querySelector('.popup').remove();
    }
  }

  hendlerMessage() {
    if (this.textMess.value === '') {
      alert('Нельзя отправить пустое место. Наберите пожалуйста Ваше сообщение.');
      this.textMess.value = '';
    }
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ mess: { author: this.me, mess: this.textMess.value } }));
      this.textMess.value = '';
    }
  }

  showPopup(flag) {
    const popup = new CreatePopup(flag).creatP();
    popup.querySelector('.buttF').addEventListener('click', this.hendlerNik.bind(this));
    this.container.append(popup);
    popup.style.left = `${(this.container.offsetWidth - popup.offsetWidth) / 2}px`;
  }

  gettingData(e) {
    if (e.data === 'busy') {
      this.showPopup('busy');
    } else {
      let textDecod;
      const pars = JSON.parse(e.data);
      if (pars.type === 'Buffer') {
        const uint8Array = new Uint8Array(pars.data);
        textDecod = JSON.parse(new TextDecoder().decode(uint8Array));
      } else { textDecod = pars; }
      if (textDecod.registered) {
        localStorage.setItem('Nik', `${JSON.stringify(textDecod.registered)}`);
        this.textMess.removeAttribute('disabled');
      }
      if (textDecod.onlines) {
        textDecod.onlines.forEach((item) => {
          const member = new CreatOnlines(item.nik).creatOnlin();
          this.online.append(member);
        });
      }
      if (textDecod.onlin) {
        const member = new CreatOnlines(textDecod.onlin.nik).creatOnlin();
        this.online.append(member);
      }

      if (textDecod.messages) {
        const leftGap = 25;
        textDecod.messages.forEach((item) => {
          const messag = new CreatMess(item.author, item.mess, this.me).creatMessage();
          this.blockMessage.append(messag);
          if (messag.classList.contains(('right'))) {
            messag.style.marginLeft = `${this.blockMessage.offsetWidth - messag.offsetWidth - leftGap}px`;
          }
        });
      }
      if (textDecod.mess) {
        const leftGap = 29;
        const messag = new CreatMess(textDecod.mess.author, textDecod.mess.mess, this.me).creatMessage();
        this.blockMessage.prepend(messag);
        if (messag.classList.contains(('right'))) {
          messag.style.marginLeft = `${this.blockMessage.offsetWidth - messag.offsetWidth - leftGap}px`;
        }
      }
      if (textDecod.exit) {
        document.querySelectorAll('.tikN').forEach((item) => {
          if (item.lastChild.textContent === textDecod.exit.nik) { item.remove(); }
        });
      }
    }
  }
}
