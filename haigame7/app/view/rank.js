'use strict';
/**
 * 排行
 * @return {[rank Component]}
 * @author aran.hu
 */
var Icon = require('react-native-vector-icons/Iconfont');
import RankService from '../network/rankservice';
import GlobalSetup from '../constants/globalsetup';

import React, {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    Component,
    ListView,
    TouchableOpacity,
    TouchableHighlight,
    } from 'react-native';

//引用样式文件
import commonstyle from '../styles/commonstyle';
import styles from '../styles/rankstyle';
//正在加载组件
import Loading from './common/loading';
//引用个人排行组件
import UserRankList from './rank/userranklist';
//引用团队排行组件
import TeamRankList from './rank/teamranklist';

var NAVBAR_DATA={first:"荣耀团队",second:"名人堂"};
var NAVSUBBAR_TEAM={first:"热度",second:"战斗力",third:"氦金"};
var NAVSUBBAR_USER={first:"大神系数",second:"战斗力",third:"氦金"};
//思路：1.分出两个组件：个人排行和团队排行

export default class extends Component{
  //初始化状态
  constructor(props) {
    super(props);
    this.state = {
      navbar: 0,
      data: {subnavbar:1},
      paraUser: {ranktype:'Asset',ranksort:'Desc',startpage:1,pagecount:10},
      paraTeam: {ranktype:'Asset',ranksort:'Desc',startpage:1,pagecount:10},
       dataUserSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2,}),
       dataTeamSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2,}),
       loaded: false,
      }
    }
    //加载完组件后操作
    componentDidMount() {
        this.fetchUserData();
        this.fetchTeamData();
      }
    updateContentData(content){
        this.setState({
          content: content
        });
    }
    //获取个人排行数据
    fetchUserData() {
      RankService.rankUser(this.state.paraUser,(response) => {
        if (response[0].MessageCode == '0') {
          let newData = response[1];
          this.setState({
            dataUserSource: this.state.dataUserSource.cloneWithRows(newData),
            db:newData,
          });
          this.setState({
            loaded: true
          });
        }
        else {
          console.log('请求错误' + response[0].MessageCode);
        }
      });
    }
    //获取团队排行数据
    fetchTeamData() {
      RankService.rankTeam(this.state.paraTeam,(response) => {
        if (response[0].MessageCode == '0') {
          let newData = response[1];
          this.setState({
            dataTeamSource: this.state.dataTeamSource.cloneWithRows(newData),
            db:newData,
          });
          this.setState({
            loaded: true
          });
        }
        else {
          console.log('请求错误' + response[0].MessageCode);
        }
      });
    }

    _switchNavbar(nav){
      this.setState({
        navbar:nav,
        data:{subnavbar:1},
      });
    }

    _switchSubNavbar(sub){
      this.setState({
        data:{subnavbar:sub},
      });
    }

    renderSubData(){
      if(this.state.navbar==0){
        //返回团队排行分类
        return(NAVSUBBAR_TEAM);
      }
      else{
        //返回个人排行分类
        return(NAVSUBBAR_USER);
      }
    }

    renderUserRankList(user){
        //返回个人组件
        return(<UserRankList user={user}/>);
    }

    renderTeamRankList(team){
        //返回团队组件
        return(<TeamRankList team={team}/>);
    }

    render() {
      let navdata=NAVBAR_DATA;
      let navsubdata=this.renderSubData();

      if(this.state.loaded==false){
        return (<Loading/>);
      }

      if(this.state.navbar==1){
        return(
          <View style={styles.container}>
            <View style={styles.nav}>
              <View style={styles.navtab}>
                <TouchableOpacity style={this.state.navbar==0?styles.navbtnactive:styles.navbtn} activeOpacity={0.8}  onPress = {() => this._switchNavbar(0)} >
                  <Text style={this.state.navbar==0?commonstyle.red:commonstyle.white}>{navdata.first}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={this.state.navbar==0?styles.navbtn:styles.navbtnactive} activeOpacity={0.8}  onPress = {() => this._switchNavbar(1)}>
                  <Text style={this.state.navbar==0?commonstyle.white:commonstyle.red}>{navdata.second}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.navsub}>
                <TouchableOpacity style={styles.navsubblock} activeOpacity={0.8}  onPress = {() => this._switchSubNavbar(1)}>
                  <Text style={[commonstyle.gray, commonstyle.fontsize12]}>{navsubdata.first}</Text>
                  <Icon name="angle-down" size={8}  style={[this.state.data.subnavbar==1?commonstyle.red:commonstyle.gray, styles.navsubicon]}/>
                </TouchableOpacity>

                <View style={styles.navsubline}></View>

                <TouchableOpacity style={styles.navsubblock} activeOpacity={0.8} onPress = {() => this._switchSubNavbar(2)}>
                  <Text style={[commonstyle.gray, commonstyle.fontsize12]}>{navsubdata.second}</Text>
                  <Icon name="angle-down" size={8}  style={[this.state.data.subnavbar==2?commonstyle.red:commonstyle.gray, styles.navsubicon]}/>
                </TouchableOpacity>

                <View style={styles.navsubline}></View>

                <TouchableOpacity style={styles.navsubblock} activeOpacity={0.8} onPress = {() => this._switchSubNavbar(3)}>
                  <Text style={[commonstyle.gray, commonstyle.fontsize12]}>{navsubdata.third}</Text>
                  <Icon name="angle-down" size={8}  style={[this.state.data.subnavbar==3?commonstyle.red:commonstyle.gray, styles.navsubicon]}/>
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView style={styles.scrollview}>
              <ListView
                dataSource={this.state.dataUserSource}
                renderRow={this.renderUserRankList}
              />
            </ScrollView>
          </View>);
      }
      return (
        <View style={styles.container}>
          <View style={styles.nav}>
            <View style={styles.navtab}>
              <TouchableOpacity style={this.state.navbar==0?styles.navbtnactive:styles.navbtn} activeOpacity={0.8}  onPress = {() => this._switchNavbar(0)} >
                <Text style={this.state.navbar==0?commonstyle.red:commonstyle.white}>{navdata.first}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={this.state.navbar==0?styles.navbtn:styles.navbtnactive} activeOpacity={0.8}  onPress = {() => this._switchNavbar(1)}>
                <Text style={this.state.navbar==0?commonstyle.white:commonstyle.red}>{navdata.second}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.navsub}>
              <TouchableOpacity style={styles.navsubblock} activeOpacity={0.8}  onPress = {() => this._switchSubNavbar(1)}>
                <Text style={[commonstyle.gray, commonstyle.fontsize12]}>{navsubdata.first}</Text>
                <Icon name="angle-down" size={8}  style={[this.state.data.subnavbar==1?commonstyle.red:commonstyle.gray, styles.navsubicon]}/>
              </TouchableOpacity>

              <View style={styles.navsubline}></View>

              <TouchableOpacity style={styles.navsubblock} activeOpacity={0.8} onPress = {() => this._switchSubNavbar(2)}>
                <Text style={[commonstyle.gray, commonstyle.fontsize12]}>{navsubdata.second}</Text>
                <Icon name="angle-down" size={8}  style={[this.state.data.subnavbar==2?commonstyle.red:commonstyle.gray, styles.navsubicon]}/>
              </TouchableOpacity>

              <View style={styles.navsubline}></View>

              <TouchableOpacity style={styles.navsubblock} activeOpacity={0.8} onPress = {() => this._switchSubNavbar(3)}>
                <Text style={[commonstyle.gray, commonstyle.fontsize12]}>{navsubdata.third}</Text>
                <Icon name="angle-down" size={8}  style={[this.state.data.subnavbar==3?commonstyle.red:commonstyle.gray, styles.navsubicon]}/>
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView style={styles.scrollview}>
          <ListView
            dataSource={this.state.dataTeamSource}
            renderRow={this.renderTeamRankList}
          />
          </ScrollView>
        </View>
      );
    }
}
