import {game} from '../game.js';
import {gameObject} from './objects.js';
var Walkable=require('walkable');
//import * as PolyK from 'polyk';

export class gameScene{
  constructor(data,index){
    this.name=data.Name;
    this.index=index;
    this.music=data.Music;
    this.player=false;
    this.inventory=data.Inventory;
    this.container=new PIXI.Container();
    this.container.visible=false;
    this.background=new PIXI.Sprite(PIXI.Texture.fromFrame(data.Background));
    this.background.width=game.app.screen.width;
    this.background.height=game.app.screen.height;
    this.background.parentLayer = game.layer;//Z-order

    if(data.Player!=undefined){
      this.player=true;
      game.player.sprite.x=game.scenesJSON[index].Player[0];
      game.player.sprite.y=game.scenesJSON[index].Player[1];
      this.background.interactive=true;
      this.background.buttonMode=true;
      this.background.on('pointerup',gotoXY);

      this.walkable=new Walkable(game.app.screen.width,game.app.screen.height);
      if(game.scenesJSON[index].WalkArea!=undefined){
        this.walkArea=game.scenesJSON[index].WalkArea;
        //this.walkable.addPolygon(PolyK.Reverse(this.walkArea));
        this.walkable.addPolygon(this.walkArea);
      }

      if(game.scenesJSON[index].Obstacles!=undefined){
        this.obstacles=game.scenesJSON[index].Obstacles;
        for(let i=0;i<this.obstacles.length;i++){
          this.walkable.addPolygon(this.obstacles[i]);
        }
      }
    }


    if(data.Inventory!=undefined){
      this.inventory=data.Inventory;
    }
    this.container.addChild(this.background);

    let sceneObjects=game.scenesJSON[index].Objects;
    for(let i=0;i<sceneObjects.length;i++){
      let objectIndex=game.searchObject(sceneObjects[i]);
      if(objectIndex!=undefined){
        this.container.addChild(game.objects[objectIndex]);
      }
    }

  }

  getPath(fromX,fromY,toX,toY){
    return this.walkable.findPath(fromX, fromY, toX, toY, 1);
  }
};

function gotoXY(event){
  if(!game.player.lock){
    game.player.move(event);
    game.selectedObject=null;
  }
}
