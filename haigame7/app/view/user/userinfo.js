'use strict'

var React = require('react-native');
var Header = require('../common/headernav'); // 主屏
var Icon = require('react-native-vector-icons/FontAwesome');
var {
  View,
  Text,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Navigator,
  ScrollView,
  Modal,
  Dimensions,
  StyleSheet,
  Component,
  Alert
  } = React;

import commonstyle from '../../styles/commonstyle';
import styles from '../../styles/userstyle';
import EditScreen from './edituserinfo';
import Picker from 'react-native-picker';
import UserService from '../../network/userservice';
export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      modalVisible:false,
      UserWebNickName:'昵称',
      UserWebPicture: '头像',
      Sex: '性别',
      Address: '地区',
      Birthday: '生日',
      Hobby : '个性签名',
      PhoneNumber: '手机号',
      pickerData: [{
				'北京': {
					'北京': ['朝阳区']
				}
			}],
			selectedValue: ['北京', '北京', '朝阳区'],
      avatarSource:{uri:'http://images.haigame7.com/logo/20160216133928XXKqu4W0Z5j3PxEIK0zW6uUR3LY=.png'}
    }
  }
componentDidMount() {
  fetch('https://raw.githubusercontent.com/beefe/react-native-picker/master/demo/area.json').then(res => {
    // console.log(res);
    res.json().then(data => {
      console.log(data);
      this.setState({
        pickerData: this.createAreaData(data)
      });
    });
  }, err => {
    Alert.alert('err')
  });
}
  createAreaData(area){
  	let data = {};
  	let len = area.length;
  	for(let i=0;i<len;i++){
  		let city = area[i]['city'];
  		let cityLen = city.length;
  		let ProvinceName = area[i]['name'];
  		data[ProvinceName] = {};
  		for(let j=0;j<cityLen;j++){
  			let area = city[j]['area'];
  			let cityName = city[j]['name'];
  			data[ProvinceName][cityName] = area;
  		}
  	}
  	return data;
  }
  createDateData(){
  	let date = {};
  	for(let i=1950;i<2050;i++){
  		let month = {};
  		for(let j = 1;j<13;j++){
  			let day = [];
  			if(j === 2){
  				for(let k=1;k<29;k++){
  					day.push(k+'日');
  				}
  			}
  			else if(j in {1:1, 3:1, 5:1, 7:1, 8:1, 10:1, 12:1}){
  				for(let k=1;k<32;k++){
  					day.push(k+'日');
  				}
  			}
  			else{
  				for(let k=1;k<31;k++){
  					day.push(k+'日');
  				}
  			}
  			month[j+'月'] = day;
  		}
  		date[i+'年'] = month;
  	}
  	return date;
  }

  _callback() {
    console.log('整体保存吧,图片已这里直接村base64存上去');
  }

  _editInfo(property) {
    var _this = this;
    this.props.navigator.push({
      name: 'edituserinfo',
      component: EditScreen,
      params: {
        screenTitle: property,
        setProperty(key,pro){
          console.log('列表页设置相应属性:' + key);
          switch (key) {
            case '昵称':
               _this.setState({
                 UserWebNickName: pro
               })
               let requestData = {'PhoneNumber':'15101075739','UserWebNickName':'pro'};
               UserService.updateUserInfo(requestData,(response) => {
                 console.log(response);
               });
              break;
            case '个性签名':
              _this.setState({
                Hobby: pro
              })
              break;
            case '手机号':
              _this.setState({
                PhoneNumber: pro
              })
              break;
            case '头像':
              console.log(pro);
                _this.setState({
                  avatarSource: {uri:pro}
                })
               break;
            default:
             break;
          }
        }
      }
    });
  }
  _onPressHandle(){
   this.refs.sexPicker.toggle();
 }
 _onPressHandle_1(){
  this.refs.addresPicker.toggle();
}
_onPressHandle_2(){
 this.refs.datePicker.toggle();
}
 _sexDone(pickedValue){
   this.setState({
     Sex: pickedValue[0] == '男'? 1: 0
   })
 }
 _addrDone(pickedValue){
   let addr  = pickedValue[1] + '-' + pickedValue[2];
   this.setState({
     Address: addr
   })
 }
 _dateDone(pickedValue){
   console.log(pickedValue);
   let date = pickedValue[0] + '-' + pickedValue[1] + '-' + pickedValue[2];
   this.setState({
     Birthday: date
   })
 }
 render() {
   return(
     <View >
     <Header screenTitle='我的资料'  navigator={this.props.navigator} iconText='保存' callback={this._callback}/>
     <ScrollView style={commonstyle.bodyer}>
       <View style={[styles.listview, {height: 100,}]}>
         <Text style={[styles.listviewtextleft, {marginTop: 35,}]}>{this.state.UserWebPicture}</Text>
         <TouchableOpacity style={styles.listviewtextbox} activeOpacity={0.8} onPress={this._editInfo.bind(this,'头像')}>
           <Image style={styles.listviewtextimg} source={this.state.avatarSource} />
         </TouchableOpacity>
         <Icon name="angle-right" size={30} color={'#484848'} style={[styles.listviewiconright, {marginTop: 30,}]} />
       </View>

       <View style={styles.listview} >
         <Text  style={styles.listviewtextleft}>昵称</Text>
         <TouchableOpacity style={styles.listviewtextbox} activeOpacity={0.8} onPress={this._editInfo.bind(this,'昵称')}>
           <Text style={styles.listviewtextright}>{this.state.UserWebNickName}</Text>
         </TouchableOpacity>
         <Icon name="angle-right" size={30} color={'#484848'} style={styles.listviewiconright} />
       </View>

       <View style={styles.listview} >
         <Text  style={styles.listviewtextleft}>性别</Text>
         <TouchableOpacity style={styles.listviewtextbox} activeOpacity={0.8} onPress={this._onPressHandle.bind(this)} >
           <Text style={styles.listviewtextright}>{parseInt(this.state.Sex) ? '男' : '女'} </Text>
         </TouchableOpacity>
         <Icon name="angle-right" size={30} color={'#484848'} style={styles.listviewiconright} />
       </View>

       <View style={styles.listview} >
         <Text  style={styles.listviewtextleft}>地区</Text>
         <TouchableOpacity style={styles.listviewtextbox} activeOpacity={0.8} onPress={this._onPressHandle_1.bind(this)}>
           <Text style={styles.listviewtextright}>{this.state.Address}</Text>
         </TouchableOpacity>
         <Icon name="angle-right" size={30} color={'#484848'} style={styles.listviewiconright} />
       </View>

       <View style={styles.listview} >
         <Text  style={styles.listviewtextleft}>生日</Text>
         <TouchableOpacity style={styles.listviewtextbox} activeOpacity={0.8} onPress={this._onPressHandle_2.bind(this)} >
           <Text style={styles.listviewtextright}>{this.state.Birthday}</Text>
         </TouchableOpacity>
         <Icon name="angle-right" size={30} color={'#484848'} style={styles.listviewiconright} />
       </View>

       <View style={styles.listview} >
         <Text  style={styles.listviewtextleft}>手机号</Text>
         <TouchableOpacity style={styles.listviewtextbox} activeOpacity={0.8} onPress={this._editInfo.bind(this,'手机号')}>
         <Text style={styles.listviewtextright}>{this.state.PhoneNumber}</Text>
         </TouchableOpacity>
         <Icon name="angle-right" size={30} color={'#484848'} style={styles.listviewiconright} />
       </View>

       <View style={styles.listview} >
         <Text  style={styles.listviewtextleft}>个性签名</Text>
         <TouchableOpacity style={styles.listviewtextbox} activeOpacity={0.8} onPress={this._editInfo.bind(this,'个性签名')}>
           <Text style={styles.listviewtextright}>{this.state.Hobby}</Text>
         </TouchableOpacity>
         <Icon name="angle-right" size={30} color={'#484848'} style={styles.listviewiconright} />
       </View>
       </ScrollView>

       <Picker
           ref={'sexPicker'}
           style={{
               height: 200
           }}
           pickerBtnText='确定'
           pickerCancelBtnText='取消'
           showDuration={100}
           showMask={true}
           pickerData={['男','女']}
           selectedValue={'男'}
           onPickerDone={this._sexDone.bind(this)}
       />
       <Picker
           ref={'addresPicker'}
           style={{
               height: 200
           }}
           pickerBtnText='确定'
           pickerCancelBtnText='取消'
           showDuration={100}
           showMask={true}
           pickerData={this.state.pickerData}
           selectedValue={this.state.selectedValue}
           onPickerDone={this._addrDone.bind(this)}
       />
       <Picker
           ref={'datePicker'}
           style={{
               height: 200
           }}
           pickerBtnText='确定'
           pickerCancelBtnText='取消'
           showDuration={100}
           showMask={true}
           pickerData={this.createDateData()}
           selectedValue={['2016年', '4月', '1日']}
           onPickerDone={this._dateDone.bind(this)}
       />
   </View>

   );
 }
}
