const TEMPO          = 1000; //////////////////////////////////////////////////////////// novo // min 700, tempo do som, senão buga quando toca o mesmo duas vezes seguidas
const INTERVALO      = 2000; //////////////////////////////////////////////////////////// novo
const TEMPO_INICIAR  = 3000;
const PASSOS_VITORIA = 0;

var FSM       = '';
var sequencia = [];
var passo     = 0;

/* Fonte: https://freesound.org/people/Jaz_the_MAN_2/packs/17749/?page=1#sound */
var audios = [];
audios['do']   = new Audio('audio/316898__jaz-the-man-2__do.wav');
audios['re']   = new Audio('audio/316908__jaz-the-man-2__re.wav');
audios['mi']   = new Audio('audio/316906__jaz-the-man-2__mi.wav');
audios['fa']   = new Audio('audio/316904__jaz-the-man-2__fa.wav');
audios['BGM']  = new Audio('audio/My-Fat-Cat.mp3');
audios['erro'] = new Audio('audio/02_-_Pitfall!_-_A26_-_Death_Fanfare.ogg');
audios['acerto'] = new Audio('audio/03_-_Pitfall!_-_A26_-_Treasure_Fanfare.ogg');