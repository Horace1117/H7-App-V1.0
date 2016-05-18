'use strict';
import React, {
  ScrollView,
  StyleSheet,
  View,
  Image,
  ListView,
  Text,
  Navigator,
  TouchableHighlight,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/Iconfont';
import commonstyle from '../../styles/commonstyle';
import styles from '../../styles/userstyle';
import ShowMsg from './message_show_screen';
import Header from '../common/headernav';
import UserService from '../../network/userservice';
import Toast from '@remobile/react-native-toast';

export default class extends React.Component {
  constructor(props){
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['row1']),
      data: [],
      pressTest: 0,
      loaded: false,
      userData: {},
      listdata:{
        userID: this.props.userData.UserID,
        startpage: 1,
        pagecount: 10,
      },
      updatePressed: false,
      isRefreshing: false,
      keykey: 0,
      pagecount: 0,
      footerMsg: "点击加载更多"
    }
  }
  componentWillMount() {
  }
  componentDidMount() {
    this.setState({loaded: true})
    setTimeout(()=>{
      this.getData(this.state.listdata);
    },400)
  }
  componentWillUnmount(){
    // console.log('componentWillUnmount');
  }
  getData(params) {
    UserService.getUserMessage(params,(response) =>{
      if (response[0].MessageCode == '0') {
        let newData = response[1];
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(newData),
          data:newData,
          pagecount: newData.length,
          loaded: false,
        });
      } else {
        Toast.show('数据加载错误' + response[0].Message);
      }
    })
  }
  // getDataCallback(){
  //   let params = {
  //     userID: this.props.userData.UserID,
  //     startpage: 1,
  //     pagecount: 20,
  //   }
  //   UserService.getUserMessage(params,(response) =>{
  //     if (response[0].MessageCode == '0') {
  //       let newData = response[1];
  //       this.setState({
  //         dataSource: this.state.dataSource.cloneWithRows(newData),
  //         data:newData,
  //         loaded: false,
  //       });
  //     } else {
  //       Toast.show('数据加载错误' + response[0].Message);
  //     }
  //   })
  // }
  gotoRoute(params) {
    // console.log(this.state.data.MessageID);
    // console.log(params);
    if (this.props.navigator) {
      this.props.navigator.push({
        component: ShowMsg,
        params:{
          'messagedata':params
        },
      });
      if(params.State !== '已读'){
        UserService.setMessageRead({'messageID':params.MessageID},(response) =>{
          if (response[0].MessageCode == '0') {
            console.log('设置成功' + response[0].Message);
          } else {
            Toast.show('请求错误' + response[0].Message);
          }
        })
        // let params = {
          // userID: this.props.userData.UserID,
          // startpage: 1,
          // pagecount: this.state.pagecount,
        // }
        setTimeout(()=>{
          this.getData({userID: this.props.userData.UserID,
          startpage: 1,
          pagecount: this.state.pagecount,})
          this.props.getUserMessage();
        },500)
        //如果量大的话不能这么搞
      }

    }
  }
  _onRefresh() {
    this.setState({
      isRefreshing: true
    });
    setTimeout(()=>{
      this.setState({
        isRefreshing: false
      });
    },1000);
  }
  _onLoadMore(param,data) {
    if (this.state.keykey > 0) {
      Toast.show(this.state.footerMsg)
      this.setState({
        footerMsg: "木有更多数据了..."
      });
    }else{
      let _ds = data;
      let _params = param;
      _params.startpage = _params.startpage+1;
      this.setState({
        footerMsg: "正在加载.....",
      });
      UserService.getUserMessage(_params,(response) => {
        if (response[0].MessageCode == '0') {
          let nextData = response[1];
          if(nextData.length<1){
            this.setState({
              keykey:1,
              footerMsg: "木有更多数据了...",
            });
            Toast.show(this.state.footerMsg)
          }else{
            for(var item in nextData){
              _ds.push(nextData[item])
            }
            setTimeout(()=>{
              this.setState({
                dataSource: this.state.dataSource.cloneWithRows(_ds),
                date:_ds,
                loaded: false,
                pagecount: _ds.length,
                footerMsg: "点击加载更多",
              });
            },1000);
          }
        } else {
          Toast.show('请求错误' + response[0].Message);
        }
      });
    }
  }

  _renderFooter() {
    return(
      <TouchableOpacity style={commonstyle.paginationview} underlayColor='#000000' activeOpacity={0.8} onPress={this._onLoadMore.bind(this,this.state.listdata,this.state.data)}>
        <Text style={[commonstyle.gray, commonstyle.fontsize14]}>{this.state.footerMsg}</Text>
      </TouchableOpacity>
    );
  }
  _renderRow(rowData, sectionID, rowID) {
    let point = 0;
    if(rowData.State == '未读'){
      point = 1;
    }
    return(
      <TouchableOpacity style={[commonstyle.row, styles.msglist]} activeOpacity={0.8} onPress={this.gotoRoute.bind(this,rowData)} underlayColor="#000000" id={rowID}>
        <View style={point == 1 ? styles.msgliststatus : styles.msgliststatusno}></View>
        <View style={commonstyle.col1}>
          <View style={commonstyle.row}>
            <View style={commonstyle.col1}><Text style={commonstyle.yellow}>发件人: </Text></View>
            <View style={styles.msglistdata}><Text style={[commonstyle.gray, commonstyle.fontsize12]}>{rowData.Time}</Text></View>
          </View>
          <View style={commonstyle.row}>
            <View style={commonstyle.col1}><Text style={commonstyle.cream}>{rowData.Title}</Text></View>
            <View style={styles.msglisticon}><Icon name="angle-right" size={15} color={'#484848'} /></View>
          </View>
          <Text style={[commonstyle.gray, commonstyle.fontsize12]}>内容：{rowData.Content}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  render() {
    return(
      <View style={styles.container}>
        <Header screenTitle='我的消息' isPop={true} navigator={this.props.navigator}/>
        <ListView style={commonstyle.bodyer}
          dataSource={this.state.dataSource}
          renderRow= {this._renderRow.bind(this)}
          renderFooter={this._renderFooter.bind(this)}
        />
        <Spinner visible={this.state.loaded} />
      </View>
    );
  }
}
