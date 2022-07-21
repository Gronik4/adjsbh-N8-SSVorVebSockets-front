export default class CreatMess {
  constructor(name, mess, nik) {
    this.N = name === nik ? 'You' : name;
    this.M = mess;
  }

  creatMessage() {
    const messag = document.createElement('div');
    messag.className = 'messag';
    const mesHead = document.createElement('p');
    mesHead.className = 'mesHead';
    const timeMess = CreatMess.getTime();
    if (this.N === 'You') {
      messag.classList.add('right');
      mesHead.innerHTML = `<span class="colr_name">${this.N} ${timeMess}</span>`;
    } else {
      mesHead.innerHTML = `<span>${this.N} ${timeMess}</span>`;
    }
    messag.append(mesHead);
    const messText = document.createElement('h4');
    messText.classList = 'messText';
    messText.textContent = this.M;
    messag.append(messText);
    return messag;
  }

  static getTime() {
    const nd = new Date();
    const year = nd.getFullYear().toString().slice(2);
    const manth = nd.getMonth() < 10 ? `0 + ${(nd.getMonth() + 1)}` : nd.getMonth() + 1;
    const member = nd.getDate() < 10 ? `0 + ${nd.getDate()}` : nd.getDate();
    const hours = nd.getHours() < 10 ? `0 + ${nd.getDate()}` : nd.getHours();
    const minut = nd.getMinutes() < 10 ? `0 + ${nd.getDate()}` : nd.getMinutes();
    const timeStamp = `${member}.${manth}.${year} ${hours}:${minut}`;
    return timeStamp;
  }
}
