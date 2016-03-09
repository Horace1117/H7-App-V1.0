import React, { Component, View, Text, ScrollView } from 'react-native';
import Tabbar, { Tab, RawContent, IconWithBar, glypyMapMaker } from 'react-native-tabbar';

var Header = require('./header'); // 主屏
var Match  = require('../match.js');
var Fight  = require('../fight.js');
var Team  = require('../team.js');
var Rank  = require('../rank.js');
var User  = require('../user.js');
const glypy = glypyMapMaker({
  MatchOn: 'e623',
  Match: 'e624',
  FightOn: 'e625',
  Fight: 'e626',
  TeamOn: 'e627',
  Team: 'e628',
  RankOn: 'e621',
  Rank: 'e622'
});

export default class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.toggle = false;
  }

  componentDidMount() {
    // let toggle = "tab2";
    // setInterval(() => {
    //   console.log(`goto ${toggle}`);
    //   this.refs['myTabbar'].gotoTab(toggle);
    //   toggle = toggle == "tab2"? "tab3" : "tab2";
    // }, 1000);
    //
    //
    //
    // let toggleShow = true;
    // setInterval(() => {
    //   toggleShow = !toggleShow;
    //   this.refs['myTabbar'].getBarRef().show(toggleShow);
    // }, 200);


    // setTimeout(() => {
    //   this.refs['myTabbar'].gotoTab('tab2');
    // }, 2000);
    //
    // setTimeout(() => {
    //   this.refs['myTabbar'].gotoTab("tab3");
    // }, 4000);
  }

  tabbarToggle() {
    this.refs['myTabbar'].getBarRef().show(this.toggle);
    this.toggle = !this.toggle;
  }

  render() {
    return (
      <Tabbar ref="myTabbar" barColor={'rgb(0, 0, 0)'}>
        <Tab name="赛事">
          <IconWithBar label="赛事" onInactiveColor={'white'} onActiveColor={'red'} type={glypy.Match} ontype={glypy.MatchOn} from={'tabbaricon'}/>
          <RawContent>
          <View>
          <Header initObj={{title:'赛事',}}
           navigator={this.props.navigator}></Header>
           <Match/>
          </View>
          </RawContent>
        </Tab>
        <Tab name="约战" >
          <IconWithBar label="约战" onInactiveColor={'white'} onActiveColor={'red'} type={glypy.Fight} ontype={glypy.FightOn} from={'tabbaricon'}/>
          <RawContent>
          <View>
          <Header initObj={{title:'约战',}}
           navigator={this.props.navigator}></Header>
           <Fight/>
          </View>
          </RawContent>
        </Tab>
        <Tab name="排行">
          <IconWithBar label="排行" onInactiveColor={'white'} onActiveColor={'red'} type={glypy.Rank} ontype={glypy.RankOn} from={'tabbaricon'}/>
          <RawContent>
          <View>
           <Header initObj={{title:'排行',}}
           navigator={this.props.navigator}></Header>
           <Rank/>
          </View>
          </RawContent>
        </Tab>
        <Tab name="组队">
          <IconWithBar label="组队" onInactiveColor={'white'} onActiveColor={'red'} type={glypy.Team} ontype={glypy.TeamOn} from={'tabbaricon'}/>
          <RawContent>
          <View>
           <Header initObj={{title:'组队',}}
            navigator={this.props.navigator}></Header>
           <Team/>
          </View>
          </RawContent>
        </Tab>
      </Tabbar>
    );
  }
}
