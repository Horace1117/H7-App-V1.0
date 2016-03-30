'use strict';

var userInfo = {
  'USERSESSION':'@haigame7:session',
}
var fightInfo={
  'FightSend':'Send',
  'FightReceive':'Receive',
}
var matchInfo={
  'Starting': 1,
  'NoStart': 0,
}
var guessInfo={
  'NoStart':'未开赛',
  'Starting':'进行中',
}
var pageInfo = {
  'StartPage':1,
  'PageCount':5,
}

module.exports = {
  USER_INFO: userInfo,
  PAGE_INFO: pageInfo,
  FIGHT_INFO: fightInfo,
  MATCH_INFO: matchInfo,
  GUESS_INFO:guessInfo,
}
