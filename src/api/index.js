import auth from './methods/auth_discord';
import getoauthurl from './methods/getoauthurl';
import incomeUser from './methods/incomeUser';
import getGuilds from './methods/getguilds';
import getRoles from './methods/getroles';
import getChannels from './methods/getChannels';
import getTriggers from './methods/gettriggers';
import saveTrigger from './methods/saveTrigger';
import deleteTrigger from './methods/deleteTrigger';
import signin from './methods/signin';

export default { 
  auth,
  getoauthurl,
  incomeUser,
  getGuilds,
  getTriggers,
  getRoles,
  getChannels,
  saveTrigger,
  deleteTrigger,
  signin
}