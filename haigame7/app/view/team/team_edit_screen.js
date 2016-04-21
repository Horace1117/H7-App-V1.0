'use strict';
/**
 * APP 编辑战队
 * @author Drex
 */
import React, {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from 'react-native';
import Header from '../common/headernav';
import commonstyle from '../../styles/commonstyle';
import styles from '../../styles/teamstyle';
import TeamService from '../../network/teamservice';
import Toast from '@remobile/react-native-toast';
var ImagePickerManager = require('NativeModules').ImagePickerManager;
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgnull: 0,
      value:'',
      jsonvalue:'',
      creater:0,
      TeamID: this.props.teamData.TeamID,
      TeamName:this.props.teamData.TeamName,
      TeamLogo: '',
      TeamDescription: this.props.teamData.TeamDescription,
      teamname:'',
      navigator: undefined,
      isUsed: false,
    }

  }
  selectPhotoTapped() {
    let options = {
      title: '选择照片',
      cancelButtonTitle: '取消',
      takePhotoButtonTitle: '拍照',
      chooseFromLibraryButtonTitle: '从相册选择',
      quality: 0.5,
      maxWidth: 300,
      maxHeight: 300,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePickerManager.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePickerManager Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        // You can display the image using either:
        let source = 'data:image/jpeg;base64,' + response.data;
        this.setState({
          value: source,
          jsonvalue:response.data,
          imgnull:1,
          TeamLogo: response.data,
        });
      }
    });
  }
  _callback(){
    if(this.state.TeamName==''){
      Toast.show('请填写战队名称');
      return;
    }else if(this.state.TeamDescription==''){
      Toast.show('请填写战队宣言');
      return;
    }else{
      TeamService.editTeam({'teamid':this.state.TeamID,'teamname':this.state.TeamName,'teamlogo':this.state.TeamLogo,'teamdescription':this.state.TeamDescription,},(response)=>{
        if(response[0].MessageCode == '0'){
          Toast.show('修改成功');
          this.timer = setTimeout(()=>{
            this.props._callback('TeamInfo');
            this.props.updateLoginState();
            if(this.props.navigator.getCurrentRoutes().length>3){
              var route =this.props.navigator.getCurrentRoutes()[this.props.navigator.getCurrentRoutes().length-2];
              this.props.navigator.jumpTo(route);
            }else{
              this.props.navigator.pop();
            }
          },1000);
        }else if(response[0].MessageCode=='20001'){
          Toast.show('已经存在同名的战队');
        }else{
          Toast.show('修改失败');
        }
      });
    }
  }
  componentDidMount(){
    this.setState({
      navigator: this.props.navigator,
      creater:this.props.userData.UserID,
    });
  }

  render() {
    return(
      <View>
        <Header screenTitle='编辑战队' isPop={true} iconText='完成' callback={this._callback.bind(this)} navigator={this.props.navigator}/>
        <View style={commonstyle.bodyer}>
          <View style={styles.teamcreate}>
            <View style={styles.teamcreateimg}>
              <TouchableOpacity style={commonstyle.viewcenter} activeOpacity={0.8} onPress={()=> this.selectPhotoTapped()}>
                <Image style={styles.teamcreateportrait} source={{uri:this.props.teamData.TeamLogo}} />
              </TouchableOpacity>
            </View>
            <View style={[commonstyle.btnborderred, styles.teamcreateinput]}>
            <TextInput placeholder={'请输入战队名称'} defaultValue={this.state.TeamName} placeholderTextColor={'#484848'} style={[commonstyle.cream, styles.teamcreateinputfont]} onChangeText={(text) => this.setState({TeamName: text})} />
            </View>
            <View style={[commonstyle.btnborderred, styles.teamcreateinput]}>
            <TextInput placeholder={'请输入战队宣言'} defaultValue={this.state.TeamDescription} placeholderTextColor={'#484848'} style={[commonstyle.cream, styles.teamcreateinputfont]} onChangeText={(text) => this.setState({TeamDescription: text})} />
            </View>
            <View style={commonstyle.viewleft}>
              <Text style={commonstyle.gray}>温馨提示：战队宣言请限制在16个字以内！</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}