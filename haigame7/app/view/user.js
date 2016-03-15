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


import styles from '../styles/userstyle';
import UserInfo from './user/userinfo';
import Setting from './user/setting';
import UserSign from './user/usersign';
import Login from './user/login';
import RegisterScreen from './user/registerscreen';
import ZHRB from '../../temp/zhrb';
import Gwdemo from '../../temp/gwdemo';
import MyMsg from './user/message_list_screen';
import ReSetPwd from './user/reset_pwd_screen';
import About from './user/about_screen';
import Share from './user/share_screen';
import Help from './user/help_screen';
import HintCreatTeamScreen from './user/hint_createteam_screen'
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
  _pressUserInfo() {
    // console.log(this.refs.login_btn.getDOMNode().value);
    // ToastAndroid.show('登陆喽', ToastAndroid.SHORT);
    const nav = this.state._navigator;
    if(nav) {
      nav.push({
        name: 'userinfo',
        component: UserInfo,
      })
    }else{
      console.log('_navigator_navigator_navigator_navigator');
    }
  },
  _pressZH() {
    const nav = this.state._navigator;
    if(nav) {
      nav.push({
        name: 'zhrb',
        component: ZHRB
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
  _pressSign() {
    const nav = this.state._navigator;
    if(nav) {
      nav.push({
        name: 'usersign',
        component: UserSign,
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
  render: function () {
    return (
      <View >
      <View style={styles.bgImageWrapper}>
      <View style={styles.centerbg}>
      </View>
      </View>
      <Header initObj={{title:'个人中心',message:'message',}}   navigator={this.props.navigator}></Header>
      <Image source={require('../images/loginbg.jpg')} style={styles.centerheadbg} resizeMode={"cover"} >
       <TouchableOpacity style={styles.centertitle} onPress={this._pressUserInfo.bind(null,this)}>
       <Image style={styles.centerimage} source={{uri:'http://images.haigame7.com/logo/20160216133928XXKqu4W0Z5j3PxEIK0zW6uUR3LY=.png'}} />
       </TouchableOpacity>
       <View style={styles.centertitle}>
        <Text style={styles.centername}>我的名字</Text>
         <TouchableOpacity onPress={this._pressSign.bind(null,this)}>
         <Text style={styles.centersign} >个性签名:生命不息电竞不止生命不息电竞不止生命不息电竞不止</Text>
         </TouchableOpacity>
       </View>
       <View style={styles.centertab}>
        <View>

          <Text style={styles.centertabname}>战斗力</Text>
          <Text style={[styles.centertabattr,{color:'#fff'}]}>000</Text>

        </View>
       <View style={styles.centersplitvertical} ></View>
        <View>
          <Text style={styles.centertabname}>氦金</Text>
          <Text style={styles.centertabattr}>000</Text>

        </View>
        <View style={styles.centersplitvertical} />
        <View>
          <Text style={styles.centertabname}>游戏</Text>
          <Text style={styles.centertabattr}>000</Text>

        </View>

       </View>
      </Image>

        <ScrollView style={styles.centerfootbg}>


          <TouchableOpacity style={styles.centerlicontent} onPress={this._myMsg.bind(null,this)}>
        <View style={[styles.centerliicon,{backgroundColor:'orange'}]} ></View>
        <Text style={styles.centerlitext}>我的信息</Text>
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
        <TouchableOpacity style={styles.centerlicontent} onPress={this._pressButton.bind(null,this)}>
          <Icon name="book" size={20} color={'#fff'} style={[styles.centerliicon,{backgroundColor:'orange'}]} />
          <Text style={styles.centerlitext}>我的战队</Text>
            <Icon name="angle-right" size={25} style={styles.centerangelright} />
          <View style={styles.centersplit}></View>

        </TouchableOpacity>
        <TouchableOpacity style={styles.centerlicontent} onPress={this._toRegister.bind(null,this)}>
          <Icon name="book" size={20} color={'#fff'} style={[styles.centerliicon,{backgroundColor:'rgb(115, 152, 200)'}]} />
          <Text style={styles.centerlitext}>我的赛事</Text>
            <Icon name="angle-right" size={25} style={styles.centerangelright} />
              <View style={styles.centersplit}></View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.centerlicontent} onPress={this._pressZH.bind(null,this)}>
          <Icon name="book" size={20} color={'#fff'} style={[styles.centerliicon,{backgroundColor:'rgb(221, 49, 116)'}]} />
          <Text style={styles.centerlitext}>我的约战</Text>
          <Icon name="angle-right" size={25} style={styles.centerangelright} />
            <View style={styles.centersplit}></View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.centerlicontent} onPress={this._pressSetting.bind(null,this)}>
          <Icon name="book" size={20} color={'#fff'} style={[styles.centerliicon,{backgroundColor:'rgb(86, 213, 226)'}]} />
          <Text style={styles.centerlitext}>我的竞猜</Text>
          <Icon name="angle-right" size={25} style={styles.centerangelright} />
            <View style={styles.centersplit}></View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.centerlicontent} onPress={this._pressSetting.bind(null,this)}>
          <Icon name="book" size={20} color={'#fff'} style={[styles.centerliicon,{backgroundColor:'rgb(185, 44, 193)'}]}  />
          <Text style={styles.centerlitext}>我的任务</Text>
          <Icon name="angle-right" size={25} style={styles.centerangelright} />
            <View style={styles.centersplit}></View>
        </TouchableOpacity>
        <View style={styles.centersplitblock}></View>
        <TouchableOpacity style={styles.centerlicontent} onPress={this._pressSetting.bind(null,this)}>
          <Icon name="book" size={20} color={'#fff'} style={[styles.centerliicon,{backgroundColor:'rgb(105, 61, 231)'}]} />
          <Text style={styles.centerlitext}>设置</Text>
          <View style={{marginLeft:28}}></View>
          <Icon name="angle-right" size={25} style={styles.centerangelright} />
            <View style={styles.centersplit}></View>
        </TouchableOpacity>

        </ScrollView>
    </View>
    );
  }
});

module.exports = User;
