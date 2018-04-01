import {game} from '../game.js';

export class gameObject{
  constructor(data,index){
      this.name=data.Name;
      this.index=index;
      this.description=data.Description;
      this.sprite=new PIXI.Sprite(PIXI.Texture.fromFrame(data.Texture));
      this.sprite.x=data.Position[0];
      this.sprite.y=data.Position[1];
      this.sprite.anchor.set(data.Anchor);
      this.sprite.scale.x=data.Size;
      this.sprite.scale.y=data.Size;
      this.sprite.anchor.set(0.5,1)
    //  this.sprite.parentGroup = game.sortGroup;//Z-order
    this.sprite.parentLayer = game.layer;
      if(data.Interactive){
        this.sprite.interactive=data.Interactive;
        this.sprite.buttonMode=true;
      //  this.sprite.on('pointerup', function(){console.log("Clicked!")});
      if(data.Door) this.sprite.on('pointerup', function(){game.goScene(data.Door)});
    //  if(data.Menu) this.sprite.on('pointerup', function(){game.goScene(data.Door)});
     }
     /*
      if(type[0]=="door") this.sprite.on('pointerup', function(){_goScene(type[1])});
      else if(type[0]=="menu"){
        let thisObject=this;
        this.sprite.on('pointerdown',function(){game.selectedObject=thisObject; _showMenu()});
      }*/
    };
};