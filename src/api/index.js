import auth from './methods/auth_discord';
import getoauthurl from './methods/getoauthurl';
import incomeUser from './methods/incomeUser';
import getGuilds from './methods/getguilds';
import getRoles from './methods/getroles';
import getChannels from './methods/getChannels';
import getTriggers from './methods/gettriggers';
import saveTrigger from './methods/saveTrigger';
import getPrefix from './methods/getPrefix';
import setPrefix from './methods/setPrefix';
import deleteTrigger from './methods/deleteTrigger';
import signin from './methods/signin';
import generateInvite from './methods/generateInvite';
import getGreets from './methods/getGreets';
import setGreets from './methods/setGreets';

export default { 
  auth,
  getoauthurl,
  incomeUser,
  getGuilds,
  getTriggers,
  getRoles,
  getChannels,
  getPrefix,
  setPrefix,
  getGreets,
  setGreets,
  saveTrigger,
  deleteTrigger,
  signin,
  generateInvite
}