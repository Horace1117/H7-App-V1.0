'use strict';
import React, {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  ToastAndroid,
  TouchableOpacity
} from 'react-native';

import commonstyle from '../../styles/commonstyle';
import styles from '../../styles/teamstyle';
import Icon from 'react-native-vector-icons/Iconfont';
import Header from '../common/headernav';

export default class extends React.Component {
  /**
   * @param role 队长 captain | 队员：teamuser | 非本队成员: user
   * @return {[type]} [description]
   */
  constructor() {
    super();
    this.state = {
      navigator: undefined,
      role: 'user',
      iconText: '添加战队',
      defaultTeamLogo: 'http://images.haigame7.com/logo/20160216133928XXKqu4W0Z5j3PxEIK0zW6uUR3LY=.png',
      isOpen: false,
      isDisabled: false,
    }
  }
  componentWillMount(){
      this.setState({
        navigator: this.props.navigator,
      });
      if (this.state.role != 'captain') {
        this.setState({
          iconText: undefined,
        });
      }
  }
  _callback() {
    ToastAndroid.show("回调方法",ToastAndroid.SHORT)
    this.state.navigator.pop()
  }
  _openModa() {
    this.setState({isOpen: true});
  }
  _closeModa() {
    console.log('******');
     this.setState({isOpen: false});
  }
  render() {
    let myHero = (
      <View>
        <View style={{flexDirection: 'row'}}>
          <Image style={{width:20,height:20}} source={{uri:'http://images.haigame7.com/logo/20160216133928XXKqu4W0Z5j3PxEIK0zW6uUR3LY=.png'}} />
          <Image style={{width:20,height:20}} source={{uri:'http://images.haigame7.com/logo/20160216133928XXKqu4W0Z5j3PxEIK0zW6uUR3LY=.png'}} />
          <Image style={{width:20,height:20}} source={{uri:'http://images.haigame7.com/logo/20160216133928XXKqu4W0Z5j3PxEIK0zW6uUR3LY=.png'}} />
          <Image style={{width:20,height:20}} source={{uri:'http://images.haigame7.com/logo/20160216133928XXKqu4W0Z5j3PxEIK0zW6uUR3LY=.png'}} />
          <Image style={{width:20,height:20}} source={{uri:'http://images.haigame7.com/logo/20160216133928XXKqu4W0Z5j3PxEIK0zW6uUR3LY=.png'}} />
        </View>
      </View>
      )
    let teamUser = (
      <View>
        <TouchableOpacity onPress={this._openModa.bind(this)}>
          <View>
            <Image style={{width:20,height:20}} source={{uri:this.state.defaultTeamLogo}} />
          </View>
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <Image style={{width:20,height:20}} source={{uri:this.state.defaultTeamLogo}} />
          <Image style={{width:20,height:20}} source={{uri:this.state.defaultTeamLogo}} />
          <Image style={{width:20,height:20}} source={{uri:this.state.defaultTeamLogo}} />
          <Image style={{width:20,height:20}} source={{uri:this.state.defaultTeamLogo}} />
          <Image style={{width:20,height:20}} source={{uri:this.state.defaultTeamLogo}} />
        </View>
      </View>
      )
    return(
      <View>
        <Header screenTitle='战队信息' isPop={true} iconText={this.state.iconText} callback={this._callback.bind(this)} navigator={this.props.navigator}/>
        <ScrollView style={commonstyle.bodyer}>
          <Image source={require('../../images/userbg.jpg')} style={styles.headbg} resizeMode={"cover"} >
            <View style={styles.blocktop}>
              <Image style={styles.headportrait} source={{uri:'http://images.haigame7.com/logo/20160216133928XXKqu4W0Z5j3PxEIK0zW6uUR3LY=.png'}} />
              <View style={styles.headportraitv}><Icon name="certified" size={15} color={'#484848'} /></View>
            </View>

            <View style={styles.blocktop}>
              <Text style={[styles.headname, commonstyle.white]}>我的名字</Text>
              <View style={[commonstyle.row, styles.headtextblock]}>
                <View style={styles.headtextleft}>
                  <Text style={[commonstyle.yellow, commonstyle.fontsize12]}>{'  战斗力  '}</Text>
                  <Text style={[commonstyle.red, commonstyle.fontsize12]}>{'  1234  '}</Text>
                </View>
                <View style={styles.headtextline}></View>
                <View style={styles.headtextright}>
                  <Text style={[commonstyle.yellow, commonstyle.fontsize12]}>{'  氦金  '}</Text>
                  <Text style={[commonstyle.red, commonstyle.fontsize12]}>{'  1234  '}</Text>
                </View>
              </View>
              <View style={styles.headtext}>
                <Text style={[commonstyle.cream, commonstyle.fontsize12, styles.headtextfont]}>战队宣言:生命不息电竞不止生命不息电竞不止生命不息电竞不止</Text>
              </View>
            </View>
          </Image>

          <View style={styles.listblock}>
            <View style={styles.listview}>
              <View style={styles.listviewleft}><Text style={commonstyle.gray}>战队战绩</Text></View>
              <View style={styles.listviewright}>
                <Text style={commonstyle.cream}>参赛场次  </Text>
                <Text style={commonstyle.yellow}>20场</Text>
                <Text style={commonstyle.cream}>  胜率  </Text>
                <Text style={commonstyle.red}>79%</Text>
              </View>
            </View>
            <View style={styles.listview}>
              <View style={styles.listviewleft}><Text style={commonstyle.gray}>成立日期</Text></View>
              <View style={styles.listviewright}><Text style={commonstyle.cream}>2016/02/15</Text></View>
            </View>
            <View style={styles.listview}>
              <View style={styles.listviewleft}><Text style={commonstyle.gray}>招募信息</Text></View>
              <View style={styles.listviewright}><Text style={commonstyle.cream}>本队需要辅助一名，擅长XX英雄，战队福利优厚，报名从速...</Text></View>
            </View>
            <View style={[styles.listview, styles.nobottom]}>
              <View style={styles.listviewleft}><Text style={commonstyle.gray}>战队成员</Text></View>
              <View style={styles.listviewright}>
                <TouchableOpacity style={styles.listviewteamedit} activeOpacity={0.8}><Icon name="edit" size={20} color={'#fff'} /></TouchableOpacity>
                <View style={styles.listviewteam}>
                  <TouchableOpacity style={styles.listviewteamlink} activeOpacity={0.8}><Image style={styles.listviewteamleader} source={{uri:'http://images.haigame7.com/logo/20160216133928XXKqu4W0Z5j3PxEIK0zW6uUR3LY=.png'}} /></TouchableOpacity>
                  <View style={styles.listviewteamblock}>
                    <TouchableOpacity style={styles.listviewteamlink} activeOpacity={0.8}><Image style={styles.listviewteamimg} source={{uri:'http://images.haigame7.com/logo/20160216133928XXKqu4W0Z5j3PxEIK0zW6uUR3LY=.png'}} /></TouchableOpacity>
                    <TouchableOpacity style={styles.listviewteamlink} activeOpacity={0.8}><Image style={styles.listviewteamimg} source={{uri:'http://images.haigame7.com/logo/20160216133928XXKqu4W0Z5j3PxEIK0zW6uUR3LY=.png'}} /></TouchableOpacity>
                    <TouchableOpacity style={styles.listviewteamlink} activeOpacity={0.8}><Image style={styles.listviewteamimg} source={{uri:'http://images.haigame7.com/logo/20160216133928XXKqu4W0Z5j3PxEIK0zW6uUR3LY=.png'}} /></TouchableOpacity>
                    <TouchableOpacity style={styles.listviewteamlink} activeOpacity={0.8}><Image style={styles.listviewteamimg} source={{uri:'http://images.haigame7.com/logo/20160216133928XXKqu4W0Z5j3PxEIK0zW6uUR3LY=.png'}} /></TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.listviewbtnblock}>
            <TouchableOpacity style = {[commonstyle.btncreamblack, styles.recruitbtn]} activeOpacity={0.8}>
              <Text style = {commonstyle.black}> {'招募队员'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {[commonstyle.btnredwhite, styles.recruitbtn]} activeOpacity={0.8}>
              <Text style = {commonstyle.white}> {'解散战队'}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}