import {Gamestatus} from './gamestatus';

export class Gamelogic {
  gameField: Array<number> = [];
  currentTurn: any;
  gameStatus: Gamestatus;
  gameSituationOne: Array<Array<number>> = [
    [1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0],
    [0, 1, 0, 0, 1, 0, 0, 1, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 1],
    [0, 0, 1, 0, 1, 0, 1, 0, 0],
    [1, 0, 0, 0, 1, 0, 0, 0, 1],
  ];
  gameSituationTwo: Array<Array<number>> = [
    [2, 2, 2, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 2, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 2, 2, 2],
    [2, 0, 0, 2, 0, 0, 2, 0, 0],
    [0, 2, 0, 0, 2, 0, 0, 2, 0],
    [0, 0, 2, 0, 0, 2, 0, 0, 2],
    [0, 0, 2, 0, 2, 0, 2, 0, 0],
    [2, 0, 0, 0, 2, 0, 0, 0, 2],
  ];

  public constructor() {
    this.gameStatus = Gamestatus.STOP;
    this.gameField = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  }

  gameStart(): void {
    this.gameField = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.currentTurn = this.randomPlayerStart();
    this.gameStatus = Gamestatus.START;
  }

  randomPlayerStart(): number {
    return Math.floor(Math.random() * 2) + 1;
  }

  setField(position: any, value: number): void {
    this.gameField[position] = value;
    console.log(this.gameField);
  }

  getPlayerColorClass(): string {
    return (this.currentTurn === 2) ? 'player-two' : 'player-one';
  }

  changePlayer(): void {
    this.currentTurn = (this.currentTurn === 2) ? 1 : 2;
  }

  arrayEquals(a: Array<any>, b: Array<any>): boolean {
    return Array.isArray(a) && Array.isArray(b) && a.length === b.length &&
      a.every((value, index) => value === b[index]);
  }

  async checkGameEndWinner(): Promise<boolean> {
    let isWin = false;
    const checkArrayOfPlayer = (this.currentTurn === 1) ? this.gameSituationOne : this.gameSituationTwo;

    const currentArrayOfPlayer: number[] = [];

    this.gameField.forEach((subfield, index) => {
      if (subfield !== this.currentTurn) {
        currentArrayOfPlayer[index] = 0;
      } else {
        currentArrayOfPlayer[index] = subfield;
      }
    });
    checkArrayOfPlayer.forEach((checkField, checkIndex) => {
        if ( this.arrayEquals(checkField, currentArrayOfPlayer)){
          isWin = true;
        }
    });
    console.log(currentArrayOfPlayer);

    if (isWin) {
      this.gameEnd();
      return true;
    } else {
      return false;
    }
  }

  async checkGameEndFull(): Promise<boolean> {
    let isFull = true;
    // Let Game Field check here
    if (this.gameField.includes(0)) {
      isFull = false;
    }
    if (isFull) {
      console.log('The Field is Full');
      this.gameEnd();
      return true;
    } else {
      return false;
    }
  }

  gameEnd(): void {
    // Let game Stop here
    this.gameStatus = Gamestatus.STOP;
  }
}
