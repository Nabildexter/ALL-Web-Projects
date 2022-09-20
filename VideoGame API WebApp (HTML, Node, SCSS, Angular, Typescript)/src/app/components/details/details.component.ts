import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  gameRating = 0;
  gameId !: string;
  game!: Game;

  routeSub!:Subscription;
  gameSub!:Subscription;



  constructor(
    private ActivatedRoute: ActivatedRoute,
    private httpService: HttpService
  ) {
      
   }



  ngOnInit(): void {
  
    this.routeSub = this.ActivatedRoute.params.subscribe((params: Params) => {
      this.gameId = params['id'];
      this.getGameDetails(this.gameId);
    });

  }

  getGameDetails(id: string): void {
    this.gameSub = this.httpService
    .getGameDetails(id)
    .subscribe((gameResp: Game) => {
        this.game = gameResp;
        setTimeout(()=>{
          this.gameRating = this.game.metacritic;
        }, 1000);
      });
  }

  //Passing widget number, return collor string
  getColor(value: number){

    if(value>75){
      return "Green";
    }
    else if(value > 55) {
      return "Orange";
    }
    else {
      return "Red";
    }

  }

  //Prevent memory leaks
  ngOnDestroy(): void {

    if(this.gameSub){
      this.gameSub.unsubscribe();
    }

  }
}
