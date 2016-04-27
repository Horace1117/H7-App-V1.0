'use strict';

import React, {
  Component,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Image,
  Switch,
  TextInput,
  Navigator,
  AsyncStorage,
  Alert,
  Platform
} from 'react-native';

import commonstyle from '../../styles/commonstyle';
import styles from '../../styles/userstyle';
import Header from '../common/headernav';
import User from '../user.js';
import UserService from '../../network/userservice';
import GlobalSetup from '../../constants/globalsetup';
import GlobalVariable from '../../constants/globalvariable'

import Toast from '@remobile/react-native-toast';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        phoneNumber: this.props.data.phoneNumber,
        verifyCode:this.props.data.code,
        passWord: '',
        passWordd: '',
      },
      loading:false,
      notshow: true,
      reset:this.props.data.reset,
    }
  };

  componentDidMount() {
    // this.setState({reset:this.props.reset});
    //这里获取从FirstPageComponent传递过来的参数: id
  }

  onFocus(argument) {
    setTimeout(() => {
      // let scrollResponder = this.refs.registerFormC.getScrollResponder();
      //     scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
      //       React.findNodeHandle(this.refs[argument.ref]), 110, true
      //     );
    }, 50);
  }

  showPwd(notshow){
  if(notshow){
      this.setState({notshow: false});
   }else{
      this.setState({notshow: true});
   }
  return this.state.notshow;
  }
  /**
   * 用户注册
   * @return {[type]} [description]
   */
  register(isreset) {
    if (this.state.data.passWord !== this.state.data.passWordd) {
      Toast.show('两次密码输入不一致');
      return;
    }
    if(isreset){
      UserService.resetPassword(this.state.data,(response) => {
        if (response[0].MessageCode == '0') {
          //AsyncStorage.setItem(GlobalVariable.USER_INFO.USERSESSION,JSON.stringify(this.state.data));
          setTimeout(() => {
            var route =this.props.navigator.getCurrentRoutes()[this.props.navigator.getCurrentRoutes().length-3];
            this.props.navigator.jumpTo(route);
          }, 2000);
          Toast.show("重置成功!");
        }else if(response[0].MessageCode == '10001'){
          Toast.show("手机号不存在");
          return;
        }else if(response[0].MessageCode == '10005'){
          Toast.show("验证码错误");
          return;
        }else if(response[0].MessageCode == '10006'){
          Toast.show("验证码过期");
          return;
        } else {
          Toast.show(
              response[0].Message
          );
        }
     })
   }else{
      UserService.registerByInfo(this.state.data,(response) => {
        if (response[0].MessageCode == '0') {
          // AsyncStorage.setItem(GlobalVariable.USER_INFO.USERSESSION,JSON.stringify(this.state.data));
          setTimeout(() => {
            var route =this.props.navigator.getCurrentRoutes()[this.props.navigator.getCurrentRoutes().length-3];
            this.props.navigator.jumpTo(route);
          }, 2000);
          Toast.show('注册成功!')
        }else if(response[0].MessageCode == '10004'){
          Toast.show("手机号已存在");
          return;
        }else if(response[0].MessageCode == '10005'){
          Toast.show("验证码错误");
          return;
        }else if(response[0].MessageCode == '10006'){
          Toast.show("验证码过期");
          return;
        } else {
          Toast.show(
              response[0].Message
          );
        }
      })
    }
  }


  render() {
    let fields = [
      {ref: 'phone', placeholder: '手机号',placeholderTextColor: (Platform.OS === 'ios') ?'white':'block', keyboardType: 'default', maxLength: 11, secureTextEntry: false, message: '* 手机号必填', style: [styles.logininputfont]},
      {ref: 'password', placeholder: '请您设置密码',placeholderTextColor: (Platform.OS === 'ios') ?'white':'block', keyboardType: 'default', maxLength: 20, secureTextEntry: this.state.notshow, message: '* 密码必填', style: [styles.logininputfont]},
      {ref: 'passwordd', placeholder: '请再次确认密码',placeholderTextColor: (Platform.OS === 'ios') ?'white':'block', keyboardType: 'default', maxLength: 20, secureTextEntry: this.state.notshow, message: '* 密码必填', style: [styles.logininputfont]},
      {ref: 'securitycode', placeholder: '验证码',placeholderTextColor: (Platform.OS === 'ios') ?'white':'block', keyboardType: 'default', maxLength: 6, secureTextEntry: false, message: '* 验证码必填', style: [styles.logininputfont]}
    ]
    var headerset, headtext;
    var footerset;
    if(this.state.reset){
      headerset =  <View><Header screenTitle = '重置密码' navigator = { this.props.navigator } /><View activeOpacity={1} style={styles.titleContainer}></View></View>
      headtext = <View style={styles.loginblock}></View>
    }else{
        headerset =<View><Header screenTitle = '设置密码' navigator = { this.props.navigator } /><View activeOpacity={1} style={styles.titleContainer}></View></View>
        headtext = <View style={styles.loginblock}><Text style={commonstyle.cream}>{'设置氦7密码后，您可以用手机号和密码同时登陆氦7电脑版和手机版'}</Text></View>
    }
    return(
      <View style={{ flex: 1 }}>
          {headerset}
          <Image source = {require('../../images/loginbg.jpg')} style = {styles.loginbg} resizeMode = {"cover"}>
          {headtext}
          <View key={'password'} style={styles.logininput}>
              <TextInput {...fields[1]} onFocus={() => this.onFocus({...fields[1]})} onChangeText={(text) => this.state.data.passWord = text} />
          </View>
          <View key={'passwordd'} style={styles.logininput}>
              <TextInput {...fields[2]} onFocus={() => this.onFocus({...fields[2]})} onChangeText={(text) => this.state.data.passWordd = text} />
          </View>
          <View style={styles.switchblock}>
              <Text style={[commonstyle.cream, styles.switchtext]} >{'显示密码'}</Text>
              <Switch onValueChange={(value) =>this.showPwd(this.state.notshow)} style={styles.switchbar} value= {!this.state.notshow}/>
          </View>
          <TouchableHighlight style={this.state.loading ? styles.btndisable : styles.btn} underlayColor={'#FF0000'} onPress={() => this.register(this.state.reset)}>
              <Text style={styles.btnfont}>{'完成'}</Text>
          </TouchableHighlight>
          </Image>
      </View>

    );
  }
}
