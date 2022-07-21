import circ from '../img/circ.png';

export default class CreatOnlines {
  constructor(name) {
    this.N = name;
  }

  creatOnlin() {
    const tiketN = document.createElement('div');
    tiketN.className = 'tikN';
    const img = document.createElement('img');
    img.className = 'circ';
    img.src = circ;
    tiketN.append(img);
    const h5 = document.createElement('h5');
    h5.className = 'h5';
    h5.textContent = this.N;
    tiketN.append(h5);
    return tiketN;
  }
}
