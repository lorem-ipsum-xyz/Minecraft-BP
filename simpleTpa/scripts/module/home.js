import { world, system } from "@minecraft/server";

class Home{
  constructor(player){
    this.player = player;
    this.name = player.name;
    this.coordinates = player.location;
    this.dimension = player.dimension.id;
    this.home = this.player.getDynamicProperty(this.name);
  }
  #hasHome(){
    return this.home ? true:false
  }
  #chat(msg){
    this.player.sendMessage(msg);
  }
  tpHome(){
    if (!this.#hasHome()){
      return this.#chat(`§8[§6Greeg§8] §cYou dont have home yet.`)
    }
    
    const location = this.home;
    this.player.teleport(location,{
      dimension: world.getDimension("overworld")
    })
  }
  setHome(){
    // check kung may home ng naka set
    if (this.#hasHome()){
      return this.#chat(`§8[§6Greeg§8] §cYou can't set another home when you already have one.`);
    }
    // check the player's dimension
    if (this.dimension !== "minecraft:overworld"){
      return this.#chat(`§8[§6Greeg§8] §cYou cant set home here.`)
    }
    
    this.player.setDynamicProperty(this.name, this.coordinates)
    this.#chat(`§8[§6Greeg§8] §ahome has been created.`)
  }
  delHome(){
    // check kung mat homen naba ang bobong player
    if (!this.#hasHome()){
      return this.#chat(`§[§6Greeg§8] §cYou dont have home yet.`)
    }
    this.player.setDynamicProperty(this.name, undefined)
    this.#chat(`§8[§6Greeg§8] §ahome has been deleted.`)
  }
}

export function homeCommand(player, msg){
  const [cmd,sub,args] = msg;
  
  const home = new Home(player);
  if (sub) return player.sendMessage(`§[§6Greeg§8] §cThis command dont need parameter.`);
  if (cmd === '!sethome') return home.setHome();
  if (cmd === '!delhome') return home.delHome();
  if (cmd === '!home') return home.tpHome();
}
