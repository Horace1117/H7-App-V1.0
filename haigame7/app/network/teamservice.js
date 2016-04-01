'use strict';

import FecthService from './fetchservice';
import {ToastAndroid} from 'react-native';
import ApiConfig from '../constants/apiconfig';
export default{

  /* 获取我的战队 */
  getUserDefaultTeam(phone,callback) {
    /**
     * @param  {[type]}   ApiConfig.USER_API.GETVERIFYCODE1 [api path]
     * @param  {[type]}   {'PhoneNumber':phone}             [params]
     * @param  {Function} callback
     * @return response content {MessageCode: 0, Message: ""}                       [回调方法]
     */
      FecthService.postFecth(
        ApiConfig.TEAM_API.GETUSERDEFAULTTEAM,
        {
          'Creater':phone,
        },
        callback
      );
  },
  /*获取约战列表*/
  getTeamList(data,callback){
    /**
     * @param  {[type]}   ApiConfig.USER_API.GETVERIFYCODE1 [api path]
     * @param  {[type]}   {'PhoneNumber':phone}             [params]
     * @param  {Function} callback
     * @return response content {MessageCode: 0, Message: ""}                       [回调方法]
     */
      FecthService.postFecth(
        ApiConfig.TEAM_API.GETTEAMLIST,
        {
          'createUserID':data.createUserID,
          'Type':data.type,
          'Sort':data.sort,
          'StartPage':data.startpage,
          'PageCount':data.pagecount,
        },
        callback
      );
},
/*获取我的申请列表*/
myApplyTeamList(data,callback){
  /**
   * @param  {[type]}   ApiConfig.USER_API.GETVERIFYCODE1 [api path]
   * @param  {[type]}   {'PhoneNumber':phone}             [params]
   * @param  {Function} callback
   * @return response content {MessageCode: 0, Message: ""}                       [回调方法]
   */
    FecthService.postFecth(
      ApiConfig.TEAM_API.MYAPPLYTEAMLIST,
      {
        'UserID':data.userID,
        'StartPage':data.startpage,
        'PageCount':data.pagecount,
      },
      callback
    );
},
/*获取加入战队*/
applyTeam(data,callback){
  /**
   * @param  {[type]}   ApiConfig.USER_API.GETVERIFYCODE1 [api path]
   * @param  {[type]}   {'PhoneNumber':phone}             [params]
   * @param  {Function} callback
   * @return response content {MessageCode: 0, Message: ""}                       [回调方法]
   */
    FecthService.postFecth(
      ApiConfig.TEAM_API.APPLYTEAM,
      {
        'UserID':data.userID,
        'TeamID':data.teamID,
        'StartPage':data.startpage,
        'PageCount':data.pagecount,
      },
      callback
    );
},

/*获取受邀列表*/
myInvitedTeamList(data,callback){
  /**
   * @param  {[type]}   ApiConfig.USER_API.GETVERIFYCODE1 [api path]
   * @param  {[type]}   {'PhoneNumber':phone}             [params]
   * @param  {Function} callback
   * @return response content {MessageCode: 0, Message: ""}                       [回调方法]
   */
    FecthService.postFecth(
      ApiConfig.TEAM_API.MYINVITEDTEAMLIST,
      {
        'UserID':data.userID,
        'StartPage':data.startpage,
        'PageCount':data.pagecount,
      },
      callback
    );
},
/*获取招募信息列表*/
getRecruitList(data,callback){
  /**
   * @param  {[type]}   ApiConfig.USER_API.GETVERIFYCODE1 [api path]
   * @param  {[type]}   {'PhoneNumber':phone}             [params]
   * @param  {Function} callback
   * @return response content {MessageCode: 0, Message: ""}                       [回调方法]
   */
    FecthService.postFecth(
      ApiConfig.TEAM_API.GETRECRUITLIST,
      {
        'UserID':data.userID,
        'StartPage':data.startpage,
        'PageCount':data.pagecount,
      },
      callback
    );
},
/*获取邀请队员列表*/
getInviteUserList(data,callback){
  /**
   * @param  {[type]}   ApiConfig.USER_API.GETVERIFYCODE1 [api path]
   * @param  {[type]}   {'PhoneNumber':phone}             [params]
   * @param  {Function} callback
   * @return response content {MessageCode: 0, Message: ""}                       [回调方法]
   */
    FecthService.postFecth(
      ApiConfig.USER_API.NOTEAMUSERLIST,
      {
        'StartPage':data.startpage,
        'PageCount':data.pagecount,
      },
      callback
    );
},


}
