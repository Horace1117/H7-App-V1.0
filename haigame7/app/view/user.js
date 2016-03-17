'use strict';
/**
 * APPs我的首页
 * @return {[SplashScreen Component]}
 * @author aran.hu
 */
var React = require('react-native');
var Header = require('./common/headernav'); // 主屏
var Icon = require('react-native-vector-icons/FontAwesome');
import Colors from '../components/common/colors';
var {
  View,
  Text,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Navigator,
  ScrollView
  } = React;


import commonstyle from '../styles/commonstyle';
import styles from '../styles/userstyle';
import UserHeader from './user/userheader_screen';
import Setting from './user/setting';
import Login from './user/login';
import RegisterScreen from './user/registerscreen';
import ZHRB from '../../temp/zhrb';
import Gwdemo from '../../temp/gwdemo';
import MyMsg from './user/message_list_screen';
import ReSetPwd from './user/reset_pwd_screen';
import About from './user/about_screen';
import Share from './user/share_screen';
import Help from './user/help_screen';
import HintCreatTeamScreen from './user/hint_createteam_screen';
import CreateTeam from './team/team_create_screen';
import ShowTeam from './team/team_show_screen';
import ShowTeamUser from './team/teamuser_show_screen';
import EditSlogan from './team/teamslogan_edit_screen';
import ManagerTeamUser from './team/teamuser_manager_screen';

var User = React.createClass({
  getInitialState() {
    console.log('UserScreen Init Data');
    return {
      _navigator: this.props.navigator
    };
  },
  componentDidMount() {
    // console.log(this.state._navigator);
  },

  _pressButton() {
    // console.log(this.refs.login_btn.getDOMNode().value);
    // ToastAndroid.show('登陆喽', ToastAndroid.SHORT);
    const nav = this.state._navigator;
    if(nav) {
      nav.push({
        name: 'SecondPageComponent',
        component: Login,
        params: {
         name: 'Login',
         id: 1
       }
      })
    }else{
      console.log('_navigator_navigator_navigator_navigator');
    }
  },
  _pressSetting() {
    const nav = this.state._navigator;
    if(nav) {
      nav.push({
        name: 'setting',
        component: Setting,
        sceneConfig:Navigator.SceneConfigs.FloatFromRight
      })
    }else{
      console.log('_navigator_navigator_navigator_navigator');
    }
  },
  _pressCertify() {
     const nav = this.state._navigator;
     if(nav) {
       nav.push({
         name: 'usercertify',
         component: UserCertify,
         sceneConfig:Navigator.SceneConfigs.FloatFromRight
       })
     }else{
       console.log('_navigator_navigator_navigator_navigator');
     }
   },


  _toRegister() {
    const nav = this.state._navigator;
    if(nav) {
      nav.push({
        name: '注册',
        component: RegisterScreen,
        sceneConfig:Navigator.SceneConfigs.FloatFromRight
      })
    }else{
      console.log('导航设置错误');
    }
  },
  _myMsg() {
    const nav = this.state._navigator;
    if(nav) {
      nav.push({
        name: '信息',
        component: MyMsg,
        sceneConfig:Navigator.SceneConfigs.FloatFromRight
      })
    }else{
      console.log('导航设置错误');
    }
  },

  _reSetPwd() {
    const nav = this.state._navigator;
    if(nav) {
      nav.push({
        name: '重置密码',
        component: ReSetPwd,
        sceneConfig:Navigator.SceneConfigs.FloatFromRight
      })
    }else{
      console.log('导航设置错误');
    }
  },

  _about() {
    const nav = this.state._navigator;
    if(nav) {
      nav.push({
        name: '关于H7',
        component: About,
        sceneConfig:Navigator.SceneConfigs.FloatFromRight
      })
    }else{
      console.log('导航设置错误');
    }
  },
  _share() {
    const nav = this.state._navigator;
    if(nav) {
      nav.push({
        name: '分享',
        component: Share,
        sceneConfig:Navigator.SceneConfigs.HorizontalSwipeJump
      })
    }else{
      console.log('导航设置错误');
    }
  },
  _help() {
    const nav = this.state._navigator;
    if(nav) {
      nav.push({
        name: '帮助与反馈',
        component: Help,
        sceneConfig:Navigator.SceneConfigs.FloatFromBottom
      })
    }else{
      console.log('导航设置错误');
    }
  },
  _hint() {
    const nav = this.state._navigator;
    if(nav) {
      nav.push({
        name: '提示创建战队',
        component: HintCreatTeamScreen,
        sceneConfig:Navigator.SceneConfigs.FloatFromBottom
      })
    }else{
      console.log('导航设置错误');
    }
  },
  _createTeam() {
    const nav = this.state._navigator;
    if(nav) {
      nav.push({
        name: '创建战队',
        component: CreateTeam,
        sceneConfig:Navigator.SceneConfigs.FloatFromBottom
      })
    }else{
      console.log('导航设置错误');
    }
  },
  _showTeam() {
    const nav = this.state._navigator;
    if(nav) {
      nav.push({
        name: '战队信息',
        component: ShowTeam,
        sceneConfig:Navigator.SceneConfigs.FloatFromBottom
      })
    }else{
      console.log('导航设置错误');
    }
  },
  _showTeamUser() {
    const nav = this.state._navigator;
    if(nav) {
      nav.push({
        name: '队员信息',
        component: ShowTeamUser,
        sceneConfig:Navigator.SceneConfigs.FloatFromBottom
      })
    }else{
      console.log('导航设置错误');
    }
  },
  _editTeamSlogan() {
    const nav = this.state._navigator;
    if(nav) {
      nav.push({
        name: '战队口号',
        component: EditSlogan,
        sceneConfig:Navigator.SceneConfigs.FloatFromBottom
      })
    }else{
      console.log('导航设置错误');
    }
  },
  _managerTeamUser() {
    const nav = this.state._navigator;
    if(nav) {
      nav.push({
        name: '队员管理',
        component: ManagerTeamUser,
        sceneConfig:Navigator.SceneConfigs.FloatFromBottom
      })
    }else{
      console.log('导航设置错误');
    }
  },
  render: function () {
    return (
      <View >
      <Header screenTitle='个人中心'  iconName='folder'   nextComponent={{name:'ZHRB',component:ZHRB}} navigator={this.props.navigator}/>
     <ScrollView style={commonstyle.bodyer}>
        <UserHeader navigator={this.state._navigator}/>
       <TouchableOpacity style={styles.centerlicontent} onPress={this._managerTeamUser.bind(null,this)}>
         <View style={[styles.centerliicon,{backgroundColor:'orange'}]} ></View>
         <Text style={styles.centerlitext}>队员管理</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.centerlicontent} onPress={this._editTeamSlogan.bind(null,this)}>
         <View style={[styles.centerliicon,{backgroundColor:'orange'}]} ></View>
         <Text style={styles.centerlitext}>战队口号</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.centerlicontent} onPress={this._showTeamUser.bind(null,this)}>
         <View style={[styles.centerliicon,{backgroundColor:'orange'}]} ></View>
         <Text style={styles.centerlitext}>队员信息</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.centerlicontent} onPress={this._showTeam.bind(null,this)}>
         <View style={[styles.centerliicon,{backgroundColor:'orange'}]} ></View>
         <Text style={styles.centerlitext}>战队信息</Text>
       </TouchableOpacity>
     <TouchableOpacity style={styles.centerlicontent} onPress={this._createTeam.bind(null,this)}>
       <View style={[styles.centerliicon,{backgroundColor:'orange'}]} ></View>
       <Text style={styles.centerlitext}>创建战队</Text>
     </TouchableOpacity>
     <TouchableOpacity style={styles.centerlicontent} onPress={this._myMsg.bind(null,this)}>
       <View style={[styles.centerliicon,{backgroundColor:'orange'}]} ></View>
       <Text style={styles.centerlitext}>我的消息</Text>
     </TouchableOpacity>
     <TouchableOpacity style={styles.centerlicontent} onPress={this._reSetPwd.bind(null,this)}>
       <View style={[styles.centerliicon,{backgroundColor:'orange'}]} ></View>
       <Text style={styles.centerlitext}>重置密码密码</Text>
     </TouchableOpacity>
     <TouchableOpacity style={styles.centerlicontent} onPress={this._about.bind(null,this)}>
       <View style={[styles.centerliicon,{backgroundColor:'orange'}]} ></View>
       <Text style={styles.centerlitext}>关于H7</Text>
     </TouchableOpacity>
     <TouchableOpacity style={styles.centerlicontent} onPress={this._share.bind(null,this)}>
       <View style={[styles.centerliicon,{backgroundColor:'orange'}]} ></View>
       <Text style={styles.centerlitext}>分享</Text>
     </TouchableOpacity>
     <TouchableOpacity style={styles.centerlicontent} onPress={this._help.bind(null,this)}>
       <View style={[styles.centerliicon,{backgroundColor:'orange'}]} ></View>
       <Text style={styles.centerlitext}>帮助与反馈</Text>
     </TouchableOpacity>
     <TouchableOpacity style={styles.centerlicontent} onPress={this._hint.bind(null,this)}>
       <View style={[styles.centerliicon,{backgroundColor:'orange'}]} ></View>
       <Text style={styles.centerlitext}>提示创建战队</Text>
     </TouchableOpacity>

       <TouchableOpacity style={styles.listview} activeOpacity={0.8} onPress={this._myMsg.bind(null,this)}>
         <View style={[styles.listviewiconleft,{backgroundColor:'#f39533'}]}>
           <Icon name="book" size={20} color={'#fff'} />
         </View>
         <Text style={styles.listviewtext}>我的消息</Text>
         <Icon name="angle-right" size={30} color={'#fff'} style={styles.listviewiconright} />
       </TouchableOpacity>
       <TouchableOpacity style={styles.listview} activeOpacity={0.8} onPress={this._reSetPwd.bind(null,this)}>
         <View style={[styles.listviewiconleft,{backgroundColor:'#f39533'}]}>
           <Icon name="book" size={20} color={'#fff'} />
         </View>
         <Text style={styles.listviewtext}>重置密码密码</Text>
         <Icon name="angle-right" size={30} color={'#fff'} style={styles.listviewiconright} />
       </TouchableOpacity>
       <TouchableOpacity style={styles.listview} activeOpacity={0.8} onPress={this._about.bind(null,this)}>
         <View style={[styles.listviewiconleft,{backgroundColor:'#f39533'}]}>
           <Icon name="book" size={20} color={'#fff'} />
         </View>
         <Text style={styles.listviewtext}>关于H7</Text>
         <Icon name="angle-right" size={30} color={'#fff'} style={styles.listviewiconright} />
       </TouchableOpacity>
       <TouchableOpacity style={styles.listview} activeOpacity={0.8} onPress={this._share.bind(null,this)}>
         <View style={[styles.listviewiconleft,{backgroundColor:'#f39533'}]}>
           <Icon name="book" size={20} color={'#fff'} />
         </View>
         <Text style={styles.listviewtext}>分享</Text>
         <Icon name="angle-right" size={30} color={'#fff'} style={styles.listviewiconright} />
       </TouchableOpacity>
       <TouchableOpacity style={styles.listview} activeOpacity={0.8} onPress={this._help.bind(null,this)}>
         <View style={[styles.listviewiconleft,{backgroundColor:'#f39533'}]}>
           <Icon name="book" size={20} color={'#fff'} />
         </View>
         <Text style={styles.listviewtext}>帮助与反馈</Text>
         <Icon name="angle-right" size={30} color={'#fff'} style={styles.listviewiconright} />
       </TouchableOpacity>
       <TouchableOpacity style={styles.listview} activeOpacity={0.8} onPress={this._hint.bind(null,this)}>
         <View style={[styles.listviewiconleft,{backgroundColor:'#f39533'}]}>
           <Icon name="book" size={20} color={'#fff'} />
         </View>
         <Text style={styles.listviewtext}>提示创建战队</Text>
         <Icon name="angle-right" size={30} color={'#fff'} style={styles.listviewiconright} />
       </TouchableOpacity>

       <View style={styles.listbox}></View>

       <TouchableOpacity style={styles.listview} activeOpacity={0.8} onPress={this._pressButton.bind(null,this)}>
         <View style={[styles.listviewiconleft,{backgroundColor:'#f39533'}]}>
           <Icon name="book" size={20} color={'#fff'} />
         </View>
         <Text style={styles.listviewtext}>我的战队</Text>
         <Icon name="angle-right" size={30} color={'#fff'} style={styles.listviewiconright} />
       </TouchableOpacity>
       <TouchableOpacity style={styles.listview} activeOpacity={0.8} onPress={this._toRegister.bind(null,this)}>
         <View style={[styles.listviewiconleft,{backgroundColor:'#00b4ff'}]}>
           <Icon name="book" size={20} color={'#fff'} />
         </View>
         <Text style={styles.listviewtext}>我的赛事</Text>
         <Icon name="angle-right" size={30} color={'#fff'} style={styles.listviewiconright} />
       </TouchableOpacity>
       <TouchableOpacity style={styles.listview} activeOpacity={0.8} onPress={this._pressCertify.bind(null,this)}>
         <View style={[styles.listviewiconleft,{backgroundColor:'#ff7062'}]}>
           <Icon name="book" size={20} color={'#fff'} />
         </View>
         <Text style={styles.listviewtext}>我的约战</Text>
         <Icon name="angle-right" size={30} color={'#fff'} style={styles.listviewiconright} />
       </TouchableOpacity>
       <TouchableOpacity style={styles.listview} activeOpacity={0.8} onPress={this._pressSetting.bind(null,this)}>
         <View style={[styles.listviewiconleft,{backgroundColor:'#30ccc2'}]}>
           <Icon name="book" size={20} color={'#fff'} />
         </View>
         <Text style={styles.listviewtext}>我的竞猜</Text>
         <Icon name="angle-right" size={30} color={'#fff'} style={styles.listviewiconright} />
       </TouchableOpacity>
       <TouchableOpacity style={styles.listview} activeOpacity={0.8} onPress={this._pressSetting.bind(null,this)}>
         <View style={[styles.listviewiconleft,{backgroundColor:'#c13380'}]}>
           <Icon name="book" size={20} color={'#fff'} />
         </View>
         <Text style={styles.listviewtext}>我的任务</Text>
         <Icon name="angle-right" size={30} color={'#fff'} style={styles.listviewiconright} />
       </TouchableOpacity>

       <View style={styles.listbox}></View>

       <TouchableOpacity style={styles.listview} activeOpacity={0.8} onPress={this._pressSetting.bind(null,this)}>
         <View style={[styles.listviewiconleft,{backgroundColor:'#3543e7'}]}>
           <Icon name="book" size={20} color={'#fff'} />
         </View>
         <Text style={styles.listviewtext}>设置</Text>
         <Icon name="angle-right" size={30} color={'#fff'} style={styles.listviewiconright} />
       </TouchableOpacity>

       <View style={styles.listbox}></View>
       <View style={styles.listbox}></View>
     </ScrollView>
    </View>
    );
  }
});

module.exports = User;
