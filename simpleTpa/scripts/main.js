/*
Author: Christopher
Facebook: https://facebook.com/christopher.jr.01
Github: https://github.com/lorem-ipsum-xyz

- Planning to add more command soon :D
*/
import * as mc from "@minecraft/server";

import { homeCommand } from "./module/home.js";

const world = mc.world;
const system = mc.system;

function KUPAL(msg){
  const [main, $II] = msg.split(/ (.+)/);
  const [sub, args] = $II ? $II.split(/ (.+)/):['',''];
  return [main, sub, args];
}

world.beforeEvents.chatSend.subscribe(({ sender, message, cancel }) => {
  const $MSG = KUPAL(message);
  
  switch($MSG[0]){
    case '!home':
    case '!sethome':
    case '!delhome':
      system.run(() => homeCommand(sender, $MSG));
      cancel = true
      break;
  }
})