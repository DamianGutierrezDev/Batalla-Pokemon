import pokemon from './to-do-1'


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


const UIclass = UI();
Object.freeze(UIclass);


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
    const fight_ = fight(team1, team2);
    const [team1Organized, team2Organized] = fight_.organizeTeams();

    team1Organized.members.forEach((member, position) => {
        const opponent = team2Organized.member[position];
        fight_.currentFight(position);
    
    
    while ( true){

        if(!fight_.areStillFighting()){
            break;
        }

        fight_.f1vsf2(team1Organized.name);
        setMessage(member, team1Organized.name, opponent);

        if(!fight_.areStillFighting()){
            break;
        }

        fight_.f1vsf2(team2Organized.name);
        setMessage(member, team2Organized.name, member);
        
        if(!fight_.areStillFighting()){
            break;
        }
    }
    renderWinner(

        member.isAlive() ? member.name : opponent.name,
        member.isAlive() ? opponent.name: member.name
    );

    });

    selectWinner(fight_.selectWinner());
};

const startFight = () => {
    const isReady = validateTeams();
    console.log("aca estoyañsdkñalds");
    if(!isReady){
        return;
    }

    team1.members = team1.members.map(pokemon => pokemon(pokemon));
    team2.members = team2.members.map(pokemon => pokemon(pokemon));

    const selectStarter = Math.round(Math.random());
    const starter = [team1, team2].filter(
        (_, index) => index === selectStarter
    )[0].name;
    [team1, team2][selectStarter].starter = true;

    UIclass.clearContainer();
    UIclass.showMessage(`${starter} will star the fight!`, 'title' );

    startBattles();

};



