'use strict';
import React, {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  ListView,
  ToastAndroid,
  TouchableOpacity,
  Alert,
} from 'react-native';

import commonstyle from '../../styles/commonstyle';
import styles from '../../styles/teamstyle';
import Modal from 'react-native-modalbox';
import Icon from 'react-native-vector-icons/Iconfont';
import CreateTeam from './team_create_screen';
import TeamRecruit from './teamrecruit';
import TeamUserManager from './teamuser_manager_screen';
import TeamUser from './teamuser_show_screen';
import Header from '../common/headernav';
import TeamService from '../../network/teamservice';
import Toast from '@remobile/react-native-toast';
import GlobalSetup from '../../constants/globalsetup';
import GlobalVariable from '../../constants/globalvariable';
export default class extends React.Component {
  /**
   * @param role 队长 captain | 队员：teamuser | 非本队成员: user
   * @return {[type]} [description]
   */
  constructor() {
    super();
    var myTeamData  = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      navigator: undefined,
      userData:{},
      teamData:{},
      myTeamDataSource: myTeamData.cloneWithRows(['row1']),
      myTeams:[],
      navbar:0,
      role: 'user',
      iconText: '添加战队',
      defaultTeamLogo: 'http://images.haigame7.com/logo/20160216133928XXKqu4W0Z5j3PxEIK0zW6uUR3LY=.png',
      isOpen: false,
      isDisabled: false,
    }

  }
  componentWillMount(){
    this.initData(0);
  }
  initData(flag){
    let requestData = {'userID':this.props.userData.UserID};
    TeamService.getAllMyTeam(requestData,(response) => {
      if (response !== GlobalSetup.REQUEST_SUCCESS) {
         if(response[0].MessageCode == '40001'){
           Toast.show('服务器请求异常');
         }else if(response[0].MessageCode == '0'){
           let newData = response[1];

           this.setState({
             myTeamDataSource: this.state.myTeamDataSource.cloneWithRows(newData),
             myTeams:newData,
           });
         }
        }else{
            Toast.show('请求错误');
        }
      });
      if(flag==0){
        this.setState({
          navigator: this.props.navigator,
          teamData:this.props.teamData,
          userData:this.props.userData,
          navbar:this.props.teamData.TeamID,
        });
      }
      else{
        TeamService.getUserDefaultTeam(this.state.userData.UserID,(response) => {
          if (response[0].MessageCode == '0'||response[0].MessageCode == '20003') {
                this.setState({
                navigator: this.props.navigator,
                teamData: response[1],
                userData:this.props.userData,
                navbar:response[1].TeamID,
                });
          }else{
            console.log('请求错误' + response[0].Message);
          }
        });
      }

      if (this.state.role != 'captain') {
        this.setState({
          iconText: undefined,
        });
      }
  }

  _callback() {
    if(this.state.teamData.Role=='teamcreater'){
       this.setState({
         isOpen: false,
       });
        this._toNextScreen({"name":"创建战队","component":CreateTeam});
    }
  }
  _toNextScreen(params){
    let _this = this;
    this.props.navigator.push({
      name: params.name,
      component: params.component,
      sceneConfig:params.sceneConfig || undefined,
      params: {
        ...this.props,
        ...params,
        teamData:this.state.teamData,
        }
    })
  }
  _openModa() {
    this.setState({isOpen: true});
  }
  _closeModa() {
     this.setState({isOpen: false});
  }
  confirmDelTeam(){
    Alert.alert(
            '删除战队',
            '确认删除战队？',
            [
              {text: '取消', onPress: () => console.log('Cancel Pressed!')},
              {text: '确认', onPress: () => this._delTeam()},
            ]
          )
  }
 _delTeam(){
   let data={'creater':this.state.userData.UserID,'teamname':this.state.teamData.TeamName,'teamtype':this.state.teamData.TeamType,};
   TeamService.deleteTeam(data,(response)=>{
     if(response[0].MessageCode == '0'){
       Toast.show('解散成功');
       this.timer = setTimeout(()=>{
           this.props._callback('TeamInfo');
           this.props.navigator.pop();
         },1000);

     }else if(response[0].MessageCode=='20009'){
       Toast.show('您没有解散的权利');
     }
     else {
       Toast.show('解散失败');
     }
   });
 }
  parseCount(count){
    if(count==null){
      count = 0;
    }else{
      count = parseInt(count);
    }
    return count;
  }
  editTeamMember(){
    this.setState({
      isOpen: false,
    });
    this._toNextScreen({"name":"队员管理","component":TeamUserManager});
  }
  operateTeamUser(){
    if(this.state.teamData.Role=='teamcreater'){
       this.setState({
         isOpen: false,
       });
        this._toNextScreen({"name":"个人信息","component":TeamUser});
    }
  }
  sendRecruit(){
    this.setState({
      isOpen: false,
    });
  this._toNextScreen({"name":"发布招募","component":TeamRecruit})
  }
  initTeamOdd(wincount,losecount,followcount){
    wincount = this.parseCount(wincount);
    losecount = this.parseCount(losecount);
    followcount = this.parseCount(followcount);
    var totalcount  = wincount+losecount+followcount;
    var odd =0;
    if(totalcount!==0){
      odd = wincount*100/totalcount;
    }
    var odddata = {
      wincount:wincount,
      losecount:losecount,
      followcount:followcount,
      totalcount:totalcount,
      odd :odd,
    };
    return odddata;
  }
  _switchTeam(nav,teamname){
    let requestdata = {'userID':this.state.userData.UserID,'teamname':teamname};
    TeamService.setUserDefaultTeam(requestdata,(response) => {
      if (response !== GlobalSetup.REQUEST_SUCCESS) {
         if(response[0].MessageCode == '40001'){
           Toast.show('服务器请求异常');
         }else if(response[0].MessageCode == '0'){
           Toast.show('设置成功');
           setTimeout(()=>{
             this.initData(1);
             this.props.updateLoginState();
             this.setState({
               navbar:nav,
               isOpen:false,
             });
           },1000);
         }
        }else{
            Toast.show('请求错误');
        }
      });
    return;
  }
  _renderMyTeamRow(rowData){
    return(
      <View>

      <TouchableOpacity style={[commonstyle.viewcenter, styles.carousellist]} activeOpacity={0.8} onPress = {() => this._switchTeam(rowData.TeamID,rowData.TeamName)}>
        <Image style={rowData.TeamID==this.state.navbar?styles.carousellistimgactive:styles.carousellistimg} source={{uri:rowData.TeamLogo}} />
        <Text style={[commonstyle.cream, commonstyle.fontsize14]}>{rowData.TeamName}</Text>
      </TouchableOpacity>
      </View>
    );
  }
  _renderFooter(){}


  renderHeroImageItem(groups){
    let that = this;
    var items = Object.keys(groups).map(function(item,key) {
    if(item<4){
      return(
        <TouchableOpacity onPress={()=>that.operateTeamUser()} key={key} style={styles.listviewteamlink} activeOpacity={0.8}>
        <Image  style={styles.listviewteamimg} source={{uri:groups[item].UserPicture}} />
        </TouchableOpacity>
      );
     }
    });
    return(
      <View style={styles.listviewteamblock}>{items}</View>
    );
  }
  rendermodaldetail(){
    return(
      <Modal isOpen={this.state.isOpen}  swipeToClose={false}  style={[commonstyle.modal,commonstyle.modalbig]}   >
      <View style={commonstyle.modaltitle}>
        <Text style={[commonstyle.cream, commonstyle.fontsize14]}>默认战队选择</Text>
      </View>
      <ListView
        dataSource={this.state.myTeamDataSource}
        renderRow={this._renderMyTeamRow.bind(this)}
        renderFooter={this._renderFooter.bind(this)}
      />
      </Modal>
    );
  }
  render() {
    var items =this.renderHeroImageItem(this.state.teamData.TeamUserPicture);
    let myteammodal = this.rendermodaldetail();
    let odddata = this.initTeamOdd(this.state.teamData.WinCount,this.state.teamData.LoseCount,this.state.teamData.FollowCount);
    let createrOperate = this.state.teamData.Role=='teamcreater'?(
      <View style={styles.listviewbtnblock}>
        <TouchableOpacity style = {[commonstyle.btncreamblack, styles.recruitbtn]} onPress={()=>this.sendRecruit()} activeOpacity={0.8}>
        <Text style = {commonstyle.black}> {'招募队员'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {[commonstyle.btnredwhite, styles.recruitbtn]} onPress={()=>this.confirmDelTeam()} activeOpacity={0.8}>
        <Text style = {commonstyle.white}> {'解散战队'}</Text>
        </TouchableOpacity>
      </View>
    ):(<View></View>);
    let teamUser = (
      <View style={styles.listviewteam}>
        <TouchableOpacity style={styles.listviewteamlink} activeOpacity={0.8}><Image style={styles.listviewteamleader} source={{uri:this.state.teamData.CreaterPicture}} /></TouchableOpacity>
        {items}
      </View>
      )
    return(
      <View>
        <Header screenTitle='战队信息' isPop={true} iconText={this.state.teamData.Role=='teamcreater'?'添加战队':''} callback={this._callback.bind(this)} navigator={this.props.navigator}/>
        <ScrollView style={commonstyle.bodyer}>
          <Image source={require('../../images/userbg.jpg')} style={styles.headbg} resizeMode={"cover"} >
            <TouchableOpacity onPress={()=>this.state.teamData.Role=='teamcreater'?this._openModa():console.log('member')} style={styles.blocktop}>
              <Image style={styles.headportrait} source={{uri:this.state.teamData.TeamLogo}} />
              <TouchableOpacity  style={styles.headportraitv}><Icon name="certified" size={15} color={'#484848'} style={commonstyle.iconnobg}/></TouchableOpacity>
            </TouchableOpacity>

            <View style={styles.blocktop}>
              <Text style={[styles.headname, commonstyle.white]}>{this.state.teamData.TeamName}</Text>
              <View style={[commonstyle.row, styles.headtextblock]}>
                <View style={styles.headtextleft}>
                  <Text style={[commonstyle.yellow, commonstyle.fontsize12]}>{'  战斗力  '}</Text>
                  <Text style={[commonstyle.red, commonstyle.fontsize12]}>{'  '}{this.state.teamData.FightScore}{'  '}</Text>
                </View>
                <View style={styles.headtextline}></View>
                <View style={styles.headtextright}>
                  <Text style={[commonstyle.yellow, commonstyle.fontsize12]}>{'  氦金  '}</Text>
                  <Text style={[commonstyle.red, commonstyle.fontsize12]}>{'  '}{this.state.teamData.Asset}{'  '}</Text>
                </View>
              </View>
              <View style={styles.headtext}>
                <Text style={[commonstyle.cream, commonstyle.fontsize12, styles.headtextfont]}>战队宣言:{this.state.teamData.TeamDescription}</Text>
              </View>
            </View>
          </Image>
          <View style={styles.listblock}>
            <View style={styles.listview}>
              <View style={styles.listviewleft}><Text style={commonstyle.gray}>战队战绩</Text></View>
              <View style={styles.listviewright}>
                <Text style={commonstyle.cream}>参赛场次  </Text>
                <Text style={commonstyle.yellow}>{odddata.totalcount}场</Text>
                <Text style={commonstyle.cream}>  胜率  </Text>
                <Text style={commonstyle.red}>{odddata.odd}%</Text>
              </View>
            </View>
            <View style={styles.listview}>
              <View style={styles.listviewleft}><Text style={commonstyle.gray}>成立日期</Text></View>
              <View style={styles.listviewright}><Text style={commonstyle.cream}>{this.state.teamData.CreateTime}</Text></View>
            </View>
            <View style={styles.listview}>
              <View style={styles.listviewleft}><Text style={commonstyle.gray}>招募信息</Text></View>
              <View style={styles.listviewright}><Text style={commonstyle.cream}>{this.state.teamData.RecruitContent}</Text></View>
            </View>
            <View style={[styles.listview, styles.nobottom]}>
              <View style={styles.listviewleft}><Text style={commonstyle.gray}>战队成员</Text></View>
              <View style={styles.listviewright}>
                <TouchableOpacity style={styles.listviewteamedit} onPress={this.state.teamData.Role=='teamcreater'?()=>this.editTeamMember():console.log('teamuser')} activeOpacity={0.8}><Icon name="edit" size={20} color={this.state.teamData.Role=='teamcreater'?'#fff':'#000'} /></TouchableOpacity>
                {teamUser}
              </View>
            </View>
          </View>
            {createrOperate}
        </ScrollView>
        {myteammodal}
      </View>
    );
  }
}
