webpackJsonp([4],{"0Mti":function(t,i,e){"use strict";e.d(i,"a",function(){return d}),i.b=function(t){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},e=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return new s.a(function(n,s){l.a.get(t,{params:i,showLoading:e}).then(function(t){n(t.data)}).catch(function(t){s(t)})})};var n=e("//Fk"),s=e.n(n),a=e("mvHQ"),o=e.n(a),r=e("mtWM"),l=e.n(r),c=e("Au9i"),d=(e.n(c),"http://localhost:8000");d="localhost"===document.domain?"http://localhost:8000":"http://101.132.138.74",l.a.defaults.timeout=2e4,l.a.defaults.baseURL="";var u=0;function p(){0===u&&c.Indicator.open(),u++}function h(){u<=0||0===--u&&c.Indicator.close()}l.a.interceptors.request.use(function(t){return t.data=o()(t.data),t.headers={"Content-Type":"application/x-www-form-urlencoded"},t.showLoading&&p(),t},function(t){return s.a.reject(t)}),l.a.interceptors.response.use(function(t){return t.config.showLoading&&h(),200!==t.data.status&&t.config.showLoading&&Object(c.Toast)("请求错误！"),t},function(t){return h(),t.config.showLoading&&Object(c.Toast)("请求错误！"),s.a.reject(t)})},"3BFk":function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n={name:"play",data:function(){return{id:this.common.getStorage("playId")||2526628,song:[],isPlay:!1,audio:"",incoludPlayList:[],songComment:[],lyric:[],tlyric:[],lyricIndex:0,lyricHeight:36}},activated:function(){this.isPlay=!1,this.lyricIndex=0,this.$route.query.id!==this.id?(this.id=this.$route.query.id||2526628,this.incoludPlayList=[],this.songComment=[],this.getSongDetails(),this.getSongComments(),this.getSimiPlaylist(),this.getLyric()):document.title=this.song[0].name+"-"+this.song[0].author},mounted:function(){var t=this;this.audio=document.querySelector("#audio"),this.getSongDetails(),this.getSongComments(),this.getSimiPlaylist(),this.getLyric();var i=this;this.audio.addEventListener("play",function(){console.log("播放"),t.isPlay=!0}),this.audio.addEventListener("pause",function(){console.log("暂停"),t.isPlay=!1}),this.audio.addEventListener("error",function(t){console.log("播放错误!可能是没有版权！！！",t),i.mint.Toast({message:"播放错误!可能是没有版权！！！"+t,position:"bottom"}),i.isPlay=!1}),this.audio.addEventListener("canplay",function(){console.log("加载完成！！！"),i.isPlay&&i.audio.play(),i.audio.addEventListener("timeupdate",function(){i.audio.currentTime>=i.audio.duration&&(i.isPlay=!1),i.getLyricText()})})},computed:{styleObj:function(){return{"animation-play-state":this.isPlay?"running":"paused"}},bgStyle:function(){var t="";return this.song[0]&&(t=this.song[0].al.pic_str||""),{backgroundImage:"url(https://music.163.com/api/img/blur/"+t+".jpg?param=600y600)"}}},methods:{playListDetail:function(t){var i=this;this.$parent.isShow=!1,setTimeout(function(){"playList"!==i.$route.name?i.$router.push("/playList?id="+t):i.$router.replace("/playList?id="+t)},800)},getLyricText:function(){var t=this.audio.currentTime,i=this.lyricIndex;if(0!==t){for(var e in this.lyric)parseInt(this.lyric[e].t)===parseInt(t)&&(i=e);this.lyricIndex=i}},play:function(){this.audio.error?this.mint.Toast({message:"播放错误!可能是没有版权！！！"}):(this.isPlay=!this.isPlay,this.isPlay?this.audio.play():this.audio.pause())},getSongDetails:function(){var t=this;this.id||(this.id=this.$route.query.id),this.common.setStorage("playId",this.id),this.$get(this.domin+"/api/song/detail?ids="+this.id,{}).then(function(i){t.song=i.body.songs;for(var e=i.body.songs[0],n="",s=1;s<e.ar.length;s++)n=n+"/"+e.ar[s].name;document.title=i.body.songs[0].name+"-"+e.ar[0].name+n,t.song[0].author=e.ar[0].name+n,console.log(t.song[0].author)})},getSongComments:function(){var t=this;this.id||(this.id=this.$route.query.id),this.$get(this.domin+"/api/song/comment?id="+this.id,{},!1).then(function(i){var e=i.body.total;i.body.total>999&&(e="999+"),i.body.total>1e4&&(e="1W+"),i.body.total>1e5&&(e="10W+"),t.songComment=i.body.hotComments,t.songComment.totalStr=e})},getLyric:function(){var t=this;this.id||(this.id=this.$route.query.id),this.$get(this.domin+"/api/lyric?id="+this.id,{},!1).then(function(i){var e=i.body.lrc.lyric.split("\n"),n=i.body.tlyric.lyric?i.body.tlyric.lyric.split("\n"):[],s=[],a=[];for(var o in e){var r=e[o].substring(e[o].indexOf("[")+1,e[o].indexOf("]"));s.push({t:(60*r.split(":")[0]+parseFloat(r.split(":")[1])).toFixed(3),c:e[o].substring(e[o].indexOf("]")+1,e[o].length)})}for(var l in n){var c=n[l].substring(n[l].indexOf("[")+1,n[l].indexOf("]"));a.push({t:(60*c.split(":")[0]+parseFloat(c.split(":")[1])).toFixed(3),c:n[l].substring(n[l].indexOf("]")+1,n[l].length)})}t.lyric=s,a.length>0&&(t.tlyric=a,t.lyricHeight=72)})},getSimiPlaylist:function(){var t=this;this.$get(this.domin+"/api/simi/playlist?id="+this.id,{}).then(function(i){t.incoludPlayList=i.body.playlists})}},watch:{id:function(t){var i=this;this.isPlay=!1,this.lyricIndex=0,this.id=t||2526628,this.audio.addEventListener("canplay",function(){i.audio.play()}),this.incoludPlayList=[],this.songComment=[],this.getSongDetails(),this.getSongComments(),this.getSimiPlaylist(),this.getLyric()},"$parent.isShow":function(t){console.log(t),t?setTimeout(function(){document.getElementById("rotate").style.transform="rotateX(0deg)"},550):document.getElementById("rotate").style.transform="rotateX(180deg)"}}},s={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"play"},[e("div",{staticClass:"play_bg",style:t.bgStyle}),t._v(" "),e("div",{staticClass:"play_content"},[e("audio",{staticStyle:{position:"absolute","z-index":"100"},attrs:{src:"http://music.163.com/song/media/outer/url?id="+t.id+".mp3",id:"audio",preload:"auto"}},[t._v("支持吗？")]),t._v(" "),e("div",{staticStyle:{position:"absolute",right:"0",padding:"20px","z-index":"14"},on:{click:function(i){t.$parent.isShow=!1}}},[e("i",{staticClass:"iconfont big-xia1",staticStyle:{"font-size":"30px",color:"#fff",display:"inline-block",transition:"all .3s"},attrs:{id:"rotate"}})]),t._v(" "),e("div",{staticClass:"play_body"},[e("div",{staticClass:"play_body_b"},[e("div",{staticClass:"play_body_img",on:{click:t.play}},[e("div",{staticClass:"play_body_img_rotate rotate",style:t.styleObj},[e("img",{staticStyle:{width:"100%",height:"100%"},attrs:{src:this.song[0]?t.song[0].al.picUrl+"?param=300y300":""}})]),t._v(" "),e("span",{directives:[{name:"show",rawName:"v-show",value:!t.isPlay,expression:"!isPlay"}],staticClass:"playIcon"})])])]),t._v(" "),t.song[0]?e("div",{staticClass:"play_songInfo ellips"},[t._v(t._s(t.song[0].name)+" - "+t._s(t.song[0].author))]):t._e(),t._v(" "),e("div",{staticClass:"play_lyric",style:{height:t.lyricHeight>36?"210px":""}},[e("div",{staticStyle:{position:"relative"},style:t.lyricIndex>0?"bottom:"+t.lyricHeight*(t.lyricIndex-1)+"px":"",attrs:{id:"lyric"}},t._l(t.lyric,function(i,n){return e("span",{key:n,class:t.lyricIndex==n?"fff":"",staticStyle:{"box-sizing":"border-box",transition:"color 300ms ease-in-out"},style:{height:t.lyricHeight+"px"}},[t._v("\n                "+t._s(i.c)),e("br"),t._v("\n                "+t._s(t.tlyric[n]?t.tlyric[n].c:"")+"\n              ")])}),0)]),t._v(" "),t.incoludPlayList.length>0?e("div",{staticStyle:{height:"20px","line-height":"20px",padding:"20px 0"}},[e("span",{staticStyle:{"border-left":"2px solid #C20C0C",padding:"2px 0 2px 10px","font-size":"16px","font-weight":"600",color:"#fff"}},[t._v("包含这首歌的歌单")])]):t._e(),t._v(" "),t.incoludPlayList.length>0?e("div",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],staticClass:"ream-ul"},t._l(t.incoludPlayList,function(i,n){return e("div",{key:n,staticClass:"ream-li",style:n%3==0?"margin-left:0;":"",on:{click:function(e){return t.playListDetail(i.id)}}},[e("div",[e("img",{attrs:{src:i.coverImgUrl+"?param=300y300",alt:""}}),t._v(" "),e("span",[e("i",{staticClass:"iconfont big-icon-test15"}),t._v(t._s(i.playCount/1e4>1e4?(i.playCount/1e8).toFixed(1)+"亿":(i.playCount/1e4).toFixed(1)+"万"))])]),t._v(" "),e("span",{staticClass:"remd_text ellips"},[t._v(t._s(i.name))]),t._v(" "),e("span",{staticClass:"remd_text ellips",staticStyle:{color:"hsla(0,0%,100%,.6)"}},[t._v("by "+t._s(i.creator.nickname))])])}),0):t._e(),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],staticStyle:{height:"20px","line-height":"20px",padding:"20px 0"}},[e("span",{staticStyle:{"border-left":"2px solid #C20C0C",padding:"2px 0 2px 10px","font-size":"16px","font-weight":"600",color:"#fff"}},[t._v("精彩评论")]),t._v(" "),e("span",{staticStyle:{"font-size":"16px",color:"#fff",float:"right","margin-right":"10px"}},[t._v(t._s(t.songComment.totalStr))])]),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],staticClass:"cmt"},t._l(t.songComment,function(i,n){return e("div",{key:n,staticClass:"cmt_item"},[e("div",{staticClass:"cmt_head"},[e("img",{attrs:{src:i.user.avatarUrl+"?param=100y100"}})]),t._v(" "),e("div",{staticClass:"cmt_wrap"},[e("div",{staticClass:"cmt_wrap_head"},[e("div",{staticStyle:{color:"hsla(0,0%,100%,.7)","font-size":"14px"}},[t._v(t._s(i.user.nickname)),0!==i.user.vipType?e("i",{staticClass:"icon-vip"}):t._e(),t._v(" "),e("span",{staticStyle:{float:"right","padding-right":"10px"},on:{click:function(t){!i.liked&&i.likedCount++,i.liked=!0}}},[t._v(t._s(i.likedCount>1e5?(i.likedCount/1e4).toFixed(1)+"万":i.likedCount)),e("i",{staticClass:"iconfont big-zan",staticStyle:{"margin-left":"4px",transition:"color 100ms linear"},style:i.liked?"color:red;":""})])]),t._v(" "),e("div",{staticStyle:{color:"hsla(0,0%,100%,.3)","font-size":"12px"}},[t._v(t._s(t.common.format(i.time)))])]),t._v(" "),e("div",{staticClass:"cmt_wrap_bd"},[i.beReplied[0]?e("span",[t._v("回复"),e("span",{staticStyle:{color:"#507daf"}},[t._v("@"+t._s(i.beReplied[0].user.nickname)+"：")])]):t._e(),t._v("\n                "+t._s(i.content)+"\n              ")]),t._v(" "),i.beReplied[0]?e("div",{staticClass:"cmt_wrap_bd cmt_wrap_re"},[t._v("\n                @"+t._s(i.beReplied[0].user.nickname)+"："+t._s(i.beReplied[0].content)+"\n              ")]):t._e()])])}),0)])])},staticRenderFns:[]};var a=e("VU/8")(n,s,!1,function(t){e("ZAUx")},"data-v-1b9e9412",null);i.default=a.exports},"5Ndz":function(t,i){},NHnr:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=e("7+uW"),s={name:"App",data:function(){return{transitionName:"slideleft",isShow:!1}},mounted:function(){},methods:{onSwipeLeft:function(){},onSwipeRight:function(){this.$router.goBack()},changePlayId:function(t){this.$refs.play.id=t}},watch:{isShow:function(t){t&&(document.title=this.$refs.play.song[0].name+"-"+this.$refs.play.song[0].author)},$route:function(){this.$router.isleft&&(this.transitionName="slideleft"),this.$router.isright&&(this.transitionName="slideright")}},components:{Play:e("3BFk").default}},a={render:function(){var t=this.$createElement,i=this._self._c||t;return i("div",{attrs:{id:"app"}},[i("keep-alive",{attrs:{include:"HelloWorld"}},[i("router-view",{staticClass:"Router"})],1),this._v(" "),i("transition",{attrs:{name:"slide-fade"}},[i("play",{directives:[{name:"show",rawName:"v-show",value:this.isShow,expression:"isShow"}],ref:"play",staticClass:"Router",staticStyle:{"z-index":"20",position:"fixed"},attrs:{id:"play"}})],1)],1)},staticRenderFns:[]};var o=e("VU/8")(s,a,!1,function(t){e("5Ndz")},null,null).exports,r=e("NYxO"),l=e("Au9i"),c=e.n(l),d=(e("d8/S"),e("bOdI")),u={state:{number:1},mutations:e.n(d)()({},"SET_NUM",function(t,i){t.number=i}),actions:{},getters:{number:function(t){return t.number}}},p=e("sax8"),h=e.n(p);n.default.use(r.a);var y=new r.a.Store({modules:{home:u},plugins:[h()()]}),m=e("/ocq");n.default.use(m.a),m.a.prototype.togo=function(t){this.isleft=!0,this.isright=!1,this.push(t)},m.a.prototype.goRight=function(t){this.isright=!0,this.isleft=!1,this.push(t)},m.a.prototype.goBack=function(){this.isright=!0,this.isleft=!1,this.go(-1)},m.a.prototype.togoback=function(){this.isright=!0,this.isleft=!1};var f=new m.a({routes:[{path:"/",name:"HelloWorld",component:function(t){return e.e(1).then(function(){var i=[e("gORT")];t.apply(null,i)}.bind(this)).catch(e.oe)}},{path:"/Home",name:"Home",component:function(t){return e.e(0).then(function(){var i=[e("HXef")];t.apply(null,i)}.bind(this)).catch(e.oe)}},{path:"/play",name:"play",component:function(t){return new Promise(function(t){t()}).then(function(){var i=[e("3BFk")];t.apply(null,i)}.bind(this)).catch(e.oe)}},{path:"/playList",name:"playList",component:function(t){return e.e(2).then(function(){var i=[e("TVp5")];t.apply(null,i)}.bind(this)).catch(e.oe)}}]}),g=(e("zzYx"),e("v5o6")),v=e.n(g),_=e("I0MY"),b=e.n(_),x=e("0Mti"),w={getStorage:t=>window.localStorage.getItem(t)||"",setStorage(t,i){window.localStorage.setItem(t,i)},formatSeconds(t){var i=parseInt(t),e=0,n=0;i>60&&(e=parseInt(i/60),i=parseInt(i%60),e>60&&(n=parseInt(e/60),e=parseInt(e%60)));var s=""+parseInt(i);return parseInt(i)<10&&(s="0"+s),e>=0&&(s=parseInt(e)+":"+s),n>0&&(s=parseInt(n)+":"+s),s},sleep(t){for(var i=new Date,e=i.getTime()+t;;)if((i=new Date).getTime()>e)return},format(t){t=parseInt(t);var i=new Date(t),e=i.getFullYear(),n=i.getMonth()+1,s=i.getDate();return n<10&&(n="0"+n),s<10&&(s="0"+s),e+"-"+n+"-"+s}};n.default.config.productionTip=!1,n.default.prototype.domin=x.a,n.default.prototype.$get=x.b,n.default.prototype.common=w,n.default.prototype.mint=c.a,n.default.use(r.a),n.default.use(c.a),n.default.prototype.mint=c.a,n.default.use(b.a,{name:"v-touch"}),b.a.config.swipe={threshold:100},v.a.attach(document.body),new n.default({el:"#app",router:f,store:y,components:{App:o},template:"<App/>"}),window.addEventListener("popstate",function(t){f.togoback()},!1)},ZAUx:function(t,i){},"d8/S":function(t,i){},zzYx:function(t,i){!function(t,i){var e=i.documentElement,n=t.devicePixelRatio||1;function s(){var t=e.clientWidth/10;e.style.fontSize=t+"px"}if(function t(){i.body?i.body.style.fontSize=12*n+"px":i.addEventListener("DOMContentLoaded",t)}(),s(),t.addEventListener("resize",s),t.addEventListener("pageshow",function(t){t.persisted&&s()}),n>=2){var a=i.createElement("body"),o=i.createElement("div");o.style.border=".5px solid transparent",a.appendChild(o),e.appendChild(a),1===o.offsetHeight&&e.classList.add("hairlines"),e.removeChild(a)}}(window,document)}},["NHnr"]);
//# sourceMappingURL=app.a83c4c475db517c0d672.js.map