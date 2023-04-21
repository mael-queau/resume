const levelMap = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
  [0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0],
  [0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

const pellets = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
  [0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 0],
  [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
  [0, 2, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 2, 0],
  [0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

var currentPellets = JSON.parse(JSON.stringify(pellets));

var characters = [];

function refreshPellets() {}

var gameCycles = 0;
var remainingSuperPellet;
var resetLevel = false;

var ghostsEaten = 0;

function update() {
  if (window.pause) return;
  if (checkVictory()) {
    reset(false);
    return;
  }
  gameCycles++;
  remainingSuperPellet = Math.max(remainingSuperPellet - 1, 0);
  if (remainingSuperPellet == 0) {
    chase(false);
  }
  for (c of characters) {
    c.move();
    c.nextFrame();
    if (c != characters[0]
        && c.getX() >= characters[0].getX() - 1 && c.getX() <= characters[0].getX() + 1
        && c.getY() >= characters[0].getY() - 1 && c.getY() <= characters[0].getY() + 1
      ) {
      if (c.isPrey()) {
        c.gotEaten();
      } else death();
    }
  }
}

function draw() {
  //if (window.pause) return;
  refreshPellets();
  let y = 0;
  let x = 0;
  for (row of levelMap) {
    for (col of row) {
      for (c of characters) {
        if (c.getX() == x && c.getY() == y) {
          c.setSpriteX(x);
          c.setSpriteY(y);
        }
      }
      x++;
    }
    x = 0;
    y++;
  }
  document.querySelector("#highscore").innerHTML = localStorage.getItem("highscore");
  document.querySelector("#score").innerHTML = localStorage.getItem("score");
  document.querySelector("#lives").innerHTML = localStorage.getItem("lives");
  document.querySelector("#totaldeaths").innerHTML = localStorage.getItem("totaldeaths");
}

document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case "ArrowRight":
    characters[0].setNewDir(0);
    break;
    case "ArrowDown":
    characters[0].setNewDir(1);
    break;
    case "ArrowLeft":
    characters[0].setNewDir(2);
    break;
    case "ArrowUp":
    characters[0].setNewDir(3);
    break;
    default:
    break;
  }
});

function init() {
  refreshPellets();
  localStorage.setItem("lives", 3);
  localStorage.setItem("score", 0);
  if (localStorage.getItem("highscore") === null) {
    localStorage.setItem("highscore", 10000);
  }
  if (localStorage.getItem("totaldeaths") === null) {
    localStorage.setItem("totaldeaths", 0);
  }
  ghostsEaten = 0;
  characters = [
    new Player(14, 23),
    new Char("Inky", "inky", 12, 11, 2),
    new Char("Pinky", "pinky", 12, 14, 1),
    new Char("Blinky", "blinky", 15, 11, 3),
    new Char("Clyde", "clyde", 15, 14, 3),
  ];
}

function reset(b) {
  chase(false);
  if (b) {
    ghostsEaten = 0;
  } else {
    currentPellets = JSON.parse(JSON.stringify(pellets));
    refreshPellets();
  }
  characters = [
    new Player(14, 23),
    new Char("Inky", "inky", 12, 11, 2),
    new Char("Pinky", "pinky", 12, 14, 1),
    new Char("Blinky", "blinky", 15, 11, 3),
    new Char("Clyde", "clyde", 15, 14, 3),
  ];
}

function death() {
  localStorage.setItem("lives", Number(localStorage.getItem("lives")) - 1);
  localStorage.setItem("totaldeaths", Number(localStorage.getItem("totaldeaths")) + 1);
  reset(true);
  if (localStorage.getItem("lives") == 0) {
    alert("Game over!");
    location.reload();
  }
}

function refreshPellets() {
  let zone = document.querySelector("#game");
  let y = 0;
  currentPellets.forEach(i => {
    let x = 0;
    y++;
    i.forEach(j => {
      x++;
      let p = document.querySelector(`#pellet_${x}_${y}`);
      if (j != 0) {
        if (p === null) {
          p = document.createElement("div");
          p.id = `pellet_${x}_${y}`;
        }
        p.style.backgroundImage = `url('img/${(j == 2 ? "power_" : "")}pellet.png')`;
        p.style.backgroundPosition = "center center";
        p.style.backgroundSize = "10px 10px";
        p.style.backgroundRepeat = "no-repeat";
        p.style.gridColumn = x;
        p.style.gridRow = y;
        zone.appendChild(p);
      } else {
        if (p !== null) p.remove();
      }
    });
  });
}

function checkVictory() {
  let res = true;
  currentPellets.forEach((i) => {
    i.forEach((j) => {
      if (j == 1 || j == 2) res = false;
    });
  });
  return res;
}

function chase(b) {
  for (let i = 1; i < characters.length; i++) {
    characters[i].chase(b);
  }
}

class Char {
  posX = 0;
  posY = 0;
  dir = 0;
  newDir; // 0 = right, 1 = down, 2 = left, 3 = up
  name = undefined;
  spriteName = undefined;
  frame = 0;
  out = false;
  dom = undefined;
  prey = false;
  eaten = false;

  constructor(n, s, x = 0, y = 0, d = 0) {
    this.spriteName = s;
    this.posX = x;
    this.posY = y;
    this.dir = d;
    this.newDir = d;
    this.name = n;
    this.frame = 0; // to keep track of the current animation frame
    this.dom = document.querySelector("#" + s);
  }

  nextFrame() {
    this.frame++;
    if (this.prey) this.nextPreyFrame();
    else this.nextDirFrame();
  }

  nextDirFrame() {
    if (this.frame > 1) {
      this.frame = 0;
    }
    let path = `url(img/${this.spriteName}_`;
    if (this.dir == 0) path += "r";
    if (this.dir == 1) path += "d";
    if (this.dir == 2) path += "l";
    if (this.dir == 3) path += "u";
    path += this.frame + ".png)";
    this.dom.firstElementChild.style.backgroundImage = path;
  }

  nextPreyFrame() {
    if (this.frame > 3) {
      this.frame = 0;
    }
    let path = `url(img/prey_${this.frame}.png)`;
    this.dom.firstElementChild.style.backgroundImage = path;
  }

  chase(b) {
    this.prey = b;
    if (b) {
      this.dom.firstElementChild.style.backgroundImage = `url(img/prey_0.png)`;
    } else {
      this.dom.firstElementChild.style.backgroundImage = `url(img/${this.spriteName}_l0.png)`;
    }
  }

  gotEaten() {
    this.eaten = true;
    ghostsEaten++;
    switch (ghostsEaten) {
      case 1:
        addPoints(200);
        break;
      case 2:
        addPoints(400);
        break;
      case 3:
        addPoints(800);
        break;
      default:
        addPoints(1600);
        break;
    }
  }

  isPrey() {
    return this.prey;
  }

  getX() {
    return this.posX;
  }

  getY() {
    return this.posY;
  }

  setX(x) {
    this.posX = x;
  }

  setY(y) {
    this.posY = y;
  }

  getDir() {
    return this.dir;
  }

  setDir(d) {
    this.dir = d;
  }

  getName() {
    return this.name;
  }

  setSpriteX(_x) {
    this.dom.style.gridColumn = _x + 1;
  }

  setSpriteY(_y) {
    this.dom.style.gridRow = _y + 1;
  }

  getNewDir() {
    if (levelMap[this.posY][this.posX] != 1) return;
    let possible = [];
    if (levelMap[this.posY][((this.posX + 1 % 28) + 28) % 28]) possible.push(0);
    if (levelMap[(this.posY + 1) % 32][this.posX]) possible.push(1);
    if (levelMap[this.posY][((this.posX - 1 % 28) + 28) % 28]) possible.push(2);
    if (levelMap[(this.posY - 1) % 32][this.posX]) possible.push(3);
    if (Math.random() * 100 > 10) {
      possible = possible.filter(d => d != (this.dir + 2) % 4);
    }
    if (possible.indexOf(this.newDir) != -1) possible.push(this.newDir);
    if (characters[0].getX() > this.posX && possible.indexOf(0) != -1) {
      this.prey ? possible.filter(d => d != 0) : possible.push(0);
    }
    if (characters[0].getY() > this.posY && possible.indexOf(1) != -1) {
      this.prey ? possible.filter(d => d != 1) : possible.push(1);
    }
    if (characters[0].getX() < this.posX && possible.indexOf(2) != -1) {
      this.prey ? possible.filter(d => d != 2) : possible.push(2);
    }
    if (characters[0].getY() < this.posY && possible.indexOf(3) != -1) {
      this.prey ? possible.filter(d => d != 3) : possible.push(3);
    }
    this.newDir = possible[Math.floor(Math.random() * possible.length)];
    this.dir = this.newDir;
    possible = undefined;
  }

  move() {
    if (this.eaten) {
      this.goHome();
      return;
    }
    let possible = [];
    if (levelMap[this.posY][((this.posX + 1 % 28) + 28) % 28]) possible.push(0);
    if (levelMap[(this.posY + 1) % 32][this.posX]) possible.push(1);
    if (levelMap[this.posY][((this.posX - 1 % 28) + 28) % 28]) possible.push(2);
    if (levelMap[(this.posY - 1) % 32][this.posX]) possible.push(3);
    if (this.name != "Pac-Man" || possible.indexOf(this.newDir) != -1) this.getNewDir();
    if (possible.indexOf(this.dir) != -1) {
      switch (this.dir) {
        case 0:
          this.posX++;
          break;
        case 1:
          this.posY++;
          break;
        case 2:
          this.posX--;
          break;
        case 3:
          this.posY--;
          break;
        default:
          break;
      }
    } else if (this.name != "Pac-Man") this.depart();
    this.posX = ((this.posX % 28) + 28) % 28;
    this.posY = ((this.posY % 32) + 32) % 32;
  }

  goHome() {
    this.posX = 13;
    this.posY = 14;
    this.out = false;
    this.eaten = false;
    this.chase(false);
  }

  depart() {
    if (this.out) return;
    if (levelMap[this.posY][this.posX] == 1) {
      this.out = true;
    } else if (this.posX < 13) {
      this.dir = 0;
      this.posX++;
    } else if(this.posX > 14) {
      this.dir = 2;
      this.posX--;
    } else if (this.posY > 10 && this.posY < 18) {
      this.dir = 3;
      this.posY--;
    } else this.out = true;
  }
}

Char.out = {
  "inky": false,
  "pinky": false,
  "blinky": false,
  "clyde": false
};

class Player extends Char {
  constructor(x = 0, y = 0, d = 2) {
    super("Pac-Man", "pacman", x, y, d);
  }

  setNewDir(n) {
    this.newDir = n;
  }

  getNewDir() {
    this.dir = this.newDir;
  }

  move() {
    super.move();
    if (currentPellets[this.posY][this.posX] != 0) {
      if (currentPellets[this.posY][this.posX] == 2) {
        remainingSuperPellet = 35;
        chase(true);
        addPoints(50);
      } else {
        addPoints(10);
      }
      currentPellets[this.posY][this.posX] = 0;
    }
  }
}

function addPoints(n)  {
  localStorage.setItem("score", Number(localStorage.getItem("score")) + n);
  if (Number(localStorage.getItem("score")) > Number(localStorage.getItem("highscore"))) {
    localStorage.setItem("highscore", Number(localStorage.getItem("score")));
  }
}
