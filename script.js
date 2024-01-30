let health = 100;
let xp = 0;
let gold = 50;
let inventory = ["Stick"];
let currentWeapon = 0;
let monsterHealth;
let fighting;
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector(".monsterStats")
const monsterName = document.querySelector(".monsterName");
const text = document.querySelector(".text");
const monsterHealthText = document.querySelector(".monsterHealthText");
healthText.innerText = health;
xpText.innerText = xp;
goldText.innerText = gold;
//initialize buttons
button1.onclick = goSmithy;
button2.onclick = goCave;
button3.onclick = goPortal;
monsterStats.style.display = "none";
function startsWithVowel(str) {
    return /^[aeiou]/i.test(str);
  }
const weapons = [
   {
    name:"Stick",
    power:5,
   },
   {
    name:"Dagger",
    power:30
   },
   {
    name:"Short Sword",
    power:50
   },
   {
    name:"Excalibur",
    power:100
   }
]
const monsters = [
    {
        name:"Goblin",
        power:2,
        health:15
    },
    {
        name:"Steel Fanged Wolf",
        power:8,
        health:60
    },
    {
        name:"Black Dragon",
        power:20,
        health:300
    }
]
const locations = [
    {
        name:"town",
        btnTexts:["Smithy", "Cave", "Portal"],
        btnFunctions:[goSmithy, goCave, goPortal],
        text:"You make your way back to the town. It's as lively as ever."
    },
    {
        name:"smithy",
        btnTexts:["Buy Health(10g)", "Buy Weapon(30g)", "Town"],
        btnFunctions:[buyHealth, buyWeapon, goTown],
        text:"You enter the smithy. You feel a wave of hot air wash over you. Inside - a man short in stature, hammering away. As he wipes the sweat from his brow, you see the fire in his eyes. \n \"What'll it be, youngster!?\"",
    },
    {
        name: "cave",
        btnTexts: ["Fight Goblin", "Fight Wolf", "Town"],
        btnFunctions: [fightSlime, fightWolf, goTown],
        text:"You step inside the cold cave on the outskirts of town. You hear movement and faint echoes inside."
    },
    {
        name: "portal",
        btnTexts: ["FIGHT", "FIGHT", "FIGHT"],
        btnFunctions: [fightDragon, fightDragon, fightDragon],
        text:"You decide to enter the portal. Inside - a bloodbath. The dark room is illuminated by torches lit in blue flame. A wave of fear washes over you as you see the numerous corpses on the floor. The door slams shut behind you. In the middle of the room - a large Black Dragon. Numerous warriors struggle to fight this horrid beast, but it roars with vigour and knocks them all away."
    },
    {

        name: "fight",
        btnTexts: ["Attack", "Block", "Run"],
        btnFunctions: [attack, block, goTown],
        text:"You are in combat."

    }, 
    {
        name:"kill monster",
        btnTexts: ["Town", "Town", "Town"],
        btnFunctions: [goTown, goTown, goTown],
        text:"You have defeated the monster!"
    },
    {
        name:"lose",
        btnTexts: ["Replay?", "Replay?", "Replay?"],
        btnFunctions: [restart, restart, restart],
        text:"You have been defeated by the monster..\n\n GAME OVER."
    },
    {
        name:"win",
        btnTexts: ["Replay?", "Replay?", "Replay?"],
        btnFunctions: [restart, restart, restart],
        text:"You beat the legendary dragon. You are the hero of the kingdom.\n\nGAME WIN"
    }
];

function travel(location) {
    button1.innerText = location.btnTexts[0];
    button2.innerText = location.btnTexts[1];
    button3.innerText = location.btnTexts[2];
    button1.onclick = location.btnFunctions[0];
    button2.onclick = location.btnFunctions[1];
    button3.onclick = location.btnFunctions[2];
    text.innerText = location.text;
}

function goTown() {
    button1.style.color = "";
    button1.style["text-shadow"] = "";
    console.log("Going Town");
    travel(locations[0]);
    monsterStats.style.display = "none";
    button2.style.display = "";
    button3.style.display = "";
}

function goSmithy() {
    console.log("Going Smithy");
    travel(locations[1]);
    monsterStats.style.display = "none";
    button2.style.display = "";
    button3.style.display = "";
}

function goCave() {
    console.log("Going Cave");
    travel(locations[2]);
    monsterStats.style.display = "none";
    button2.style.display = "";
    button3.style.display = "";
}

function goPortal() {
    button2.style.display = "none";
    button3.style.display = "none";
    button1.style.color = "red";
    button1.style["text-shadow"] = "0px 0px 10px red";
    console.log("Going portal");
    travel(locations[3]);
}
function winFightScreen() {
    button2.style.display = "none";
    button3.style.display = "none";
    monsterStats.style.display = "none";
    travel(locations[5]);
}
function winGameScreen() {
    button2.style.display = "none";
    button3.style.display = "none";
    monsterStats.style.display = "none";
    travel(locations[7]);
}
function loseFightScreen() {
    button2.style.display = "none";
    button3.style.display = "none";
    monsterStats.style.display = "none";
    travel(locations[6]);
}
function gofight() {
    button1.style.color = "";
    button1.style["text-shadow"] = "";
    button2.style.display = "";
    button3.style.display = "";
    monsterStats.style.display = "";
    console.log("Going to fight");
    travel(locations[4]);
    monsterHealth = monsters[fighting].health;
    monsterName.innerText = monsters[fighting].name;
    
}

function buyHealth() {
    if (gold >= 10) {
        gold -=10;
        health += 10;
        healthText.innerText = health;
        goldText.innerText = gold;
        text.innerText = "You bought 10 health!"
    } else {
        text.innerText = "You don't have enough gold for that, Youngster!!";
    }
}

function buyWeapon() {
    if (currentWeapon<weapons.length - 1) {
        if (gold >=30 ) {
            gold -= 30;
            goldText.innerText = gold;
            currentWeapon++;
            newWeapon = weapons[currentWeapon];
            inventory.push(newWeapon.name);
            if (startsWithVowel(newWeapon.name)) {
                text.innerText = "You have bought an "+newWeapon.name+"!";
            } else {
                text.innerText = "You have bought a "+newWeapon.name+"!";
            }
        } else {
            text.innerText = "Not enough gold for that, Youngster!!";
        }
    
    } else {
        text.innerText = "Not much I can do, Youngster! You bought out my whole shop!!";
        button2.innerText = "Sell Weapon(15g)"
        button2.onclick = sellWeapon;
    }   
text.innerText += "\n\nIn your inventory you have: "+inventory;
}

function sellWeapon() {
    if (inventory.length > 1) {
        gold += 15
        goldText.innerText = gold;
        let soldWeapon = inventory.shift();
        if (startsWithVowel(newWeapon.name)) {
            text.innerText = "You sold an "+soldWeapon+" for 15g!";
        } else {
            text.innerText = "You sold a "+soldWeapon+" for 15g!";
        }
    } else {
        text.innerText = "I can't take your only weapon, Youngster!!"
    }
    text.innerText += "\n\nIn your inventory you have: "+inventory;
}
function fightSlime () {
    fighting = 0;
    console.log("fighting slime");
    monsterName.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsters[fighting].health;
    gofight()
}

function fightWolf () {
    fighting = 1;
    console.log("fighting wolf");
    monsterName.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsters[fighting].health;
    gofight()
}

function fightDragon () {
    fighting = 2;
    console.log("fighting Dragon");
    monsterName.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsters[fighting].health;
    gofight()
}

function attack () {
    text.innerText = "The "+monsters[fighting].name+" attacks.";
    text.innerText += "You attack it with your "+weapons[currentWeapon].name+".";
    health -= getMonsterAttackValue(monsters[fighting].power);
    if (isMonsterHit) {
        monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
        if(Math.random() <= .1 && inventory.length !== 1) {
            text.innerText += "Your "+weapons[currentWeapon].name+" breaks.";
            inventory.pop();
            currentWeapon--;
        }
    } else {
        text.innerText =+ "You miss.";
    }
   
    monsterHealthText.innerText = monsterHealth;
    healthText.innerText = health;
    if (health <= 0) {
        lose();
    } else if (monsterHealth <= 0) {
        fighting === 2 ? winGame() : defeatMonster();
    }
}


function getMonsterAttackValue(power) {
    const hit = (power * 5) - (Math.floor(Math.random() * xp));
    return hit > 0 ? hit : 0;
}

function isMonsterHit() {
    return Math.random() > .2 || health < 20;
}

function block () {
    text.innerText = "You raise your guard and successfully block the "+monsters[fighting].name+"'s attack."
}

function defeatMonster() {
    gold += Math.floor(monsters[fighting].power * 6.7);
    xp += monsters[fighting].power;
    goldText.innerText = gold;
    xpText.innerText = xp;
    winFightScreen();
}

function lose() {
    loseFightScreen();
    
}

function winGame() {
    winGameScreen();
}

function restart() {
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["stick"];
    goldText.innerText = gold;
    xpText.innerText = xp;
    healthText.innerText = health;
    goTown();
}

