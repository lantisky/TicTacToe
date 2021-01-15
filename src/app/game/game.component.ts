import {Component, Input, OnInit} from '@angular/core';
import {Gamelogic} from '../gamelogic';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers: [Gamelogic],
})
export class GameComponent implements OnInit {

  constructor(public game: Gamelogic) {
  }

  ngOnInit(): void {
  }

  startGame(): void {
    this.game.gameStart();
    const currentPlayer = 'Current turn: Player: ' + this.game.currentTurn;
    const statusInfo: any = document.querySelector('.current-status');
    statusInfo.innerHTML = currentPlayer;
  }

  async clickSubfield(subfield: any): Promise<void> {
    const statusInfo: any = document.querySelector('.current-status');
    const currentPlayer = 'Current turn: Player: ' + this.game.currentTurn;
    if (this.game.gameStatus === 1) {
      const position = subfield.currentTarget.getAttribute('position');
      console.log(position);

      this.game.setField(position, this.game.currentTurn);
      const color = this.game.getPlayerColorClass();
      subfield.currentTarget.classList.add(color);

      await this.game.checkGameEndWinner().then((end: boolean) => {
        if (this.game.gameStatus === 0 && end) {
          statusInfo.innerHTML = 'Someone Win, the Winner is ' + this.game.currentTurn;
        }
      });
      await this.game.checkGameEndFull().then((end: boolean) => {
        if (this.game.gameStatus === 0 && end) {
          statusInfo.innerHTML = 'No Winner, draw';
        }
      });
      this.game.changePlayer();

      if (this.game.gameStatus === 1) {
        statusInfo.innerHTML = currentPlayer;
        console.log(statusInfo);
      }
    }
  }
}
