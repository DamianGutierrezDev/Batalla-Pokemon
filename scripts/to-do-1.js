
let team1 = {
    name:'Team 1',
    members: [],
    starter: false,
};

let team2 = {
    name:'Team 2',
    members: [],
    starter: false,
};

let equipo1 = [];
let equipo2 = [];



class Pokemon{

    constructor(name){
        this.name=name[0].toUpperCase()+name.slice(1);
        this.powerAttack=this.setPowerAttack();
        this.powerDefense=this.setPowerDefense();
        this.health= 100;
    }
   
    setPowerAttack(){
        return Math.ceil(Math.random()* 50 + 25 );
    }

    setPowerDefense(){
        return Math.ceil(Math.random()* 50 + 25 );
  
    }

    attack(){
        return this.powerAttack;
    };

    get isAlive(){

        return this.health > 0;
    }

    receiveDamage(damage){
        return this.health -= damage; 
    }

}

class Fight{

    constructor(team1, team2){

        this.team1 = team1;
        this.team2 = team2;
    }
  

    organizeTeams(){
        return [this.team1, this.team2].sort((a, b) => b.starter - a.starter);
    }


    set currentFight (position){
        this.numberFight= position;
    }


    f1vsf2(teamName){

        const attacker = [this.team1, this.team2].filter(
            team => team.name === teamName
        )[0];


        const defender = [this.team1, this.team2].filter(
            team => team.name !== teamName
        )[0];

        defender.members[this.numberFight].receiveDamage(
            attacker.members[this.numberFight].attack()
        );
    
    };
    
    
    areStillFighting(){
        return ( this.team1.members[this.numberFight].isAlive &&
                 this.team2.members[this.numberFight].isAlive    
               ); //Si ambos están vivos 
    };

    selectWinner(){
        const team1Alive= this.team1.members.filter(member => member.isAlive);
        const team2Alive= this.team2.members.filter(member => member.isAlive);

        return team1Alive.length > team2Alive.length ? this.team1.name : this.team2.name ;

    };
}


class UI{
    constructor(){
        this.container = document.querySelector('#body');
    }

    
    clearContainer = function(){
        [...this.container.children].forEach(child =>{
            this.container.removeChild(child);
        });
    };

    createElement(type, classes){
        const element = document.createElement(type);
        element.className = classes;

        return element;
    };

    showMessage(message, variant, team){

        const pClasses = {
            tittle: 'text-lg font-semibold text-pokemon-blue mb-3',
            subtitle: 'text-base font-normal text-pokemon-blue mb-3 w-full',
            'Team 1': 'text-left',
            'Team 2': 'text-right',
            result: 'text-lg font-semibold text-pokemon-red mt-5 text-center',
            final: 'text-4xl font-bold text-pokemon-yellow mt-5 mb-10',
        };

    const p = this.createElement('p', `${pClasses[variant]} ${pClasses[team]}`);

    p.innetText = message;

    this.container.appendChild(p);
    };

    showRestart(){
        const button = this.createElement(

            'button',
            'hover:bg-pokemon-blue text-pokemon-blue hover:text-white inline px-5 py-3 rounded-lg border border-pokemon-blue transition-all duration-125'   ///OJO ACA
        );

        button.innerText = 'Restart battle';
        button.onclick = resetTeams;

        this.container.appendChild(button);

    };

    restart = function(){

        this.clearContainer();

        document
            .querySelectorAll('img')
            .forEach(tag => (tag.src= './assets/pokeball.jpeg'));

        const button = this.createElement(

            'button',
            'hover:bg-pokemon-blue text-pokemon-blue hover:text-white inline px-5 py-3 rounded-lg border border-pokemon-blue transition-all duration-125'

        );

        button.innetText = 'Start Fight';
        button.onclick = startFight;
        this.container.appendChild(button);
    };


}




const UIclass = new UI();

const resetTeams = () =>{
    selects.forEach( select => ((select.disabled = false ), (select.value = '0')));

    [team1, team2].forEach(team => (team.starter = false));

    UIclass.restart();

};

const selectWinner = winner => {

    UIclass.showMessage(`${winner} won`, '', 'final');
    UIclass.showRestart();

};

const renderWinner = (winner, loser) => {
    UIclass.showMessage(`${winner} defeated ${loser}`, 'result');
};

const setMessage = (offense, offenseTeam, defense) => {
    UIclass.showMessage(
        `${offense.name} attacks with ${offense.powerAttack} power to ${defense.name}`,
        'subtitle',
        offenseTeam
    );
};


const startBattles = () => {
    const fight = new Fight(team1, team2);
    const [team1Organized, team2Organized] = fight.organizeTeams();

    team1Organized.members.forEach((member, position) => {
        const opponent = team2Organized.members[position];
        fight.currentFight=position;
    
    
    while ( true){

        if(!fight.areStillFighting){
            break;
        }

        fight.f1vsf2(team1Organized.name);
        setMessage(member, team1Organized.name, opponent);

        if(!fight.areStillFighting){
            break;
        }

        fight.f1vsf2(team2Organized.name);
        setMessage(opponent, team2Organized.name, member);
        
        if(!fight.areStillFighting){
            break;
        }
    }
    renderWinner(

        member.isAlive ? member.name : opponent.name,
        member.isAlive ? opponent.name: member.name
    );

});

    selectWinner(fight.selectWinner());
};

const startFight = () => {
    //cargaVector();
    const isReady = validateTeams();
    if(!isReady){
        return;
    }

    team1.members = team1.members.map(pokemon => new Pokemon(pokemon));
    team2.members = team2.members.map(pokemon => new Pokemon(pokemon));
    console.log(team1);

    const selectStarter = Math.round(Math.random());
    const starter = [team1, team2].filter(
        (_, index) => index === selectStarter
    )[0].name;
    [team1, team2][selectStarter].starter = true;
        console.log("dlasda")
    UIclass.clearContainer();
    UIclass.showMessage(`${starter} will star the fight!`, 'title' );

    startBattles();

};
/*
const cargaVector=()=>{


    for(let i = 1 ; i < 6 ; i++){
        var dato = document.getElementsByName(`team1-pokemon${i}`);
        console.log(dato.value);
        equipo1.push(dato[0].value);

    }
    for(let i = 1 ; i < 6 ; i++){
        var dato = document.getElementsByName(`team2-pokemon${i}`);
       // console.log(dato[0].value);
        equipo2.push(dato[0].value);

    }

    console.log(equipo1);

    console.log(equipo2);
}

*/