'use strict';

var React = require('react-native');
var Util = require('../view/common/util');

var {
    StyleSheet,
    Platform
} = React;

var FightStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    //Tab选择
    nav: {
        height: 30,
    },
    navtab: {
        flexDirection: 'row',
        height: 40,
        width: Util.size.width,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#232220',
    },
    navbtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#C3C3C3',
    },
    navbtnactive: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#D31B25',
    },
    navsub: {
        flexDirection: 'row',
        height: 30,
        paddingLeft: 10,
        paddingRight: 10,
    },
    navsubblock: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#484848',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    navsubline: {
        width: 1,
        height: 14,
        marginTop: 8,
        marginBottom: 8,
        backgroundColor: '#484848',
    },
    //滚动列表
    scrollview: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    teamlist: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#484848',
    },
    teamlistimg: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.6)',
        marginRight: 10,
    },
    teamlistcenter: {
        flex: 1,
    },
    teamlistright: {
        width: 80,
        alignItems: 'flex-end',
    },
    teamlistbtn: {
        marginTop: 10,
        width: 70,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    userlist: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#484848',
    },
    userlistimg: {
        width: 44,
        height: 44,
        borderRadius: 22,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.6)',
        marginRight: 10,
    },
    userlistteam: {
        flex: 1,
    },
    userlistteamname: {
        backgroundColor: '#484848',
        borderRadius: 5,
        padding: 10,
    },
    userlistteamicon: {
        position: 'absolute',
        top: 5,
        right: 10,
    },
    userlistteambox: {
        flexDirection: 'row',
        marginTop: 5,
    },
    userlistcenter: {
        flex: 1,
        width: 44,
        borderRadius: 22,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.6)',
        marginRight: 10,
    },
    userlisttexticon: {
        marginTop: 2,
        width: 16,
        height: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    userlisthero: {
        flexDirection: 'row',
    },
    userlistheroimg: {
        width: 40,
        height: 40,
        margin: 5,
        borderWidth: 1,
        borderColor: '#D31B25',
        borderRadius: 3,
    },
    userlistbtn: {
        marginTop: 10,
        width: 60,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    userlistprogress: {
        marginTop: 5,
        marginLeft: 10,
    },
    fightview: {
        alignItems: 'center',
        paddingTop: 10,
    },
    fightviewinput: {
        marginTop: 10,
        width: Util.size.width - 72,
        height: 30,
        marginLeft: 36,
        marginRight: 36,
        borderWidth: 1,
        borderColor: '#D31B25',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    fightviewinputfont: {
        height: 40,
        left: 5,
    },
    fightviewtextarea: {
        marginTop: 10,
        width: Util.size.width - 72,
        height: 120,
        marginLeft: 36,
        marginRight: 36,
        backgroundColor: '#484848',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    fightviewtextnum: {
        position: 'absolute',
        right: 5,
        bottom: 5,
    },
    fightviewinputicon: {
        position: 'absolute',
        top: 5,
        right: 5,
        width: 20,
        height: 20,
    },
    fightviewbtn: {
        marginTop: 10,
        width: Util.size.width - 72,
        height: 40,
        marginLeft: 36,
        marginRight: 36,
        backgroundColor: '#D31B25',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    //约战列表
    fightlist: {
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#484848',
    },
    fightlistimg: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.6)',
    },
    fightlistdate: {
        marginTop:10,
        marginBottom: 5,
    },
    fightlistbtn: {
        width: 70,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    textlist: {
        padding: 10,
        backgroundColor: '#000000',
        borderBottomWidth: 1,
        borderBottomColor: '#484848',
    },
    textlisticon: {
        marginTop: 3,
        marginRight: 10,
    },
    textlistfont: {
        marginRight: 10,
    },
    //约战详情
    fightdetail: {
        width: Util.size.width - 20,
        backgroundColor: '#232323',
        justifyContent:'center',
        alignItems:'center',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        paddingTop: 30,
    },
    fightdetailtext: {
        marginTop: 10,
    },
    detailbtnblock: {
        flexDirection: 'row',
        marginTop: 20,
        marginRight: 10,
        marginLeft: 10,
        width: Util.size.width - 20,
        height: 40,
        backgroundColor: '#484848',
        borderRadius: 5,
    },
    detailbtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
});

module.exports = FightStyle;
