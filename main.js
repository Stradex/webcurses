

// The Module object: Our interface to the outside world. We import
// and export values on it. There are various ways Module can be used:
// 1. Not defined. We create it here
// 2. A function parameter, function(Module) { ..generated code.. }
// 3. pre-run appended it, var Module = {}; ..generated code..
// 4. External script tag defines var Module.
// We need to check if Module already exists (e.g. case 3 above).
// Substitution will be replaced with actual code on later stage of the build,
// this way Closure Compiler will not mangle it (e.g. case 4. above).
// Note that if you want to run closure, and also to use Module
// after the generated code, you will need to define   var Module = {};
// before the code. Then that object will be used in the code, and you
// can continue to use Module afterwards as well.
var Module = typeof Module != 'undefined' ? Module : {};

// See https://caniuse.com/mdn-javascript_builtins_object_assign

// --pre-jses are emitted after the Module integration code, so that they can
// refer to Module (if they choose; they can also define Module)
/*
  termlib.js - JS-WebTerminal Object v1.66 (source compacted using jsmin.php)

  (c) Norbert Landsteiner 2003-2015
  mass:werk - media environments
  <http://www.masswerk.at/termlib/>

  Creates [multiple] Terminal instances.

  Synopsis:

  myTerminal = new Terminal(<config object>);
  myTerminal.open();

  See file "readme.txt" for documentation and usage.

  License:
  This JavaScript-library is free.
  Include a visible backlink to <http://www.masswerk.at/termlib/> in the
  embedding web page or application.
  The library should always be accompanied by the 'readme.txt' and the
  sample HTML-documents.
  
  Any changes should be commented and must be reflected in `Terminal.version'
  in the format: "Version.Subversion (compatibility)".

  Disclaimer:
  This software is distributed AS IS and in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. The entire risk as to
  the quality and performance of the product is borne by the user. No use of
  the product is authorized hereunder except under this disclaimer.
*/
var Terminal=function(conf){if(typeof conf!='object')conf=new Object();for(var i in this.Defaults){if(typeof conf[i]=='undefined')conf[i]=this.Defaults[i];}
if(typeof conf.handler!='function')conf.handler=Terminal.prototype.defaultHandler;this.conf=conf;this.setInitValues();}
Terminal.prototype={version:'1.66 (original)',Defaults:{cols:80,rows:24,x:100,y:100,termDiv:'termDiv',bgColor:'#181818',frameColor:'#555555',frameWidth:1,rowHeight:15,blinkDelay:500,fontClass:'term',crsrBlinkMode:false,crsrBlockMode:true,DELisBS:false,printTab:true,printEuro:true,catchCtrlH:true,closeOnESC:true,historyUnique:false,id:0,ps:'>',greeting:'%+r Terminal ready. %-r',handler:null,ctrlHandler:null,initHandler:null,exitHandler:null,wrapping:false,mapANSI:false,ANSItrueBlack:false,textBlur:0,textColor:''},setInitValues:function(){this.isSafari=(navigator.userAgent.indexOf('Safari')>=0||navigator.userAgent.indexOf('WebKit')>=0)?true:false;this.isOpera=(window.opera&&navigator.userAgent.indexOf('Opera')>=0)?true:false;this.isChrome=(navigator.userAgent.indexOf('Chrome/')>=0&&navigator.userAgent.indexOf('WebKit')>=0)?true:false;this.domAPI=(document&&document.createElement)?true:false;this.isMac=(navigator.userAgent.indexOf('Mac')>=0)?true:false;this.id=this.conf.id;this.maxLines=this.conf.rows;this.maxCols=this.conf.cols;this.termDiv=this.conf.termDiv;this.crsrBlinkMode=this.conf.crsrBlinkMode;this.crsrBlockMode=this.conf.crsrBlockMode;this.blinkDelay=this.conf.blinkDelay;this.DELisBS=this.conf.DELisBS;this.printTab=this.conf.printTab;this.printEuro=this.conf.printEuro;this.catchCtrlH=this.conf.catchCtrlH;this.closeOnESC=this.conf.closeOnESC;this.historyUnique=this.conf.historyUnique;this.ps=this.conf.ps;this.closed=false;this.r;this.c;this.charBuf=new Array();this.styleBuf=new Array();this.scrollBuf=null;this.blinkBuffer=0;this.blinkTimer;this.cursoractive=false;this.lock=true;this.insert=false;this.charMode=false;this.rawMode=false;this.lineBuffer='';this.inputChar=0;this.lastLine='';this.guiCounter=0;this.history=new Array();this.histPtr=0;this.env=new Object();this.buckupBuffer=null;this.handler=this.conf.handler;this.wrapping=this.conf.wrapping;this.mapANSI=this.conf.mapANSI;this.ANSItrueBlack=this.conf.ANSItrueBlack;this.ctrlHandler=this.conf.ctrlHandler;this.initHandler=this.conf.initHandler;this.exitHandler=this.conf.exitHandler;this.fieldMode=false;this.fieldStart=this.fieldEnd=this.fieldC=0;if(typeof this.conf.textBlur==='object'&&this.conf.textBlur.length){var a=[];for(var i=0;i<this.conf.textBlur.length;i++){var b=Number(this.conf.textBlur[i]);if(!isNaN(b)&&b>0)a.push(b);}
this.textBlur=(a.length)?a:0;}
else{this.textBlur=Number(this.conf.textBlur);if(isNaN(this.textBlur)||this.textBlur<0||this.textBlur>40)this.textBlur=0;}
this.textColor=this.conf.textColor||'';},defaultHandler:function(){this.newLine();if(this.lineBuffer!=''){this.type('You typed: '+this.lineBuffer);this.newLine();}
this.prompt();},open:function(){if(this.termDivReady()){if(!this.closed)this._makeTerm();this.init();return true;}
else{return false;}},close:function(){this.lock=true;this.cursorOff();if(this.exitHandler)this.exitHandler();this.globals.setVisible(this.termDiv,0);this.closed=true;},init:function(){if(this.guiReady()){this.guiCounter=0;if(this.closed){this.setInitValues();}
this.clear();this.globals.setVisible(this.termDiv,1);this.globals.enableKeyboard(this);if(this.initHandler){this.initHandler();}
else{this.write(this.conf.greeting);this.newLine();this.prompt();}}
else{this.guiCounter++;if(this.guiCounter>18000){if(confirm('Terminal:\nYour browser hasn\'t responded for more than 2 minutes.\nRetry?')){this.guiCounter=0;}
else{return;}};this.globals.termToInitialze=this;window.setTimeout('Terminal.prototype.globals.termToInitialze.init()',200);}},getRowArray:function(l,v){var a=new Array();for(var i=0;i<l;i++)a[i]=v;return a;},wrapOn:function(){this.wrapping=true;},wrapOff:function(){this.wrapping=false;},setTextBlur:function(v){var rerender=false;if(typeof v==='object'&&v.length){var a=[];for(var i=0;i<v.length;i++){var b=Number(v[i]);if(!isNaN(b)&&b>0)a.push(b);}
this.textBlur=(a.length)?a:0;rerender=true;}
else{v=Number(v);if(isNaN(v)||v<0||v>40)v=0;if(v!=this.textBlur){this.textBlur=v;rerender=true;}}
if(rerender){for(var r=0,l=this.conf.rows;r<l;r++)this.redraw(r);}},setTextColor:function(v){if(!v)v='';if(v!=this.textColor){this.textColor=v;for(var r=0,l=this.conf.rows;r<l;r++){this.redraw(r);}}},type:function(text,style){for(var i=0;i<text.length;i++){var ch=text.charCodeAt(i);if(!this.isPrintable(ch))ch=94;this.charBuf[this.r][this.c]=ch;this.styleBuf[this.r][this.c]=(style)?style:0;var last_r=this.r;this._incCol();if(this.r!=last_r)this.redraw(last_r);}
this.redraw(this.r)},write:function(text,usemore){if(typeof text!='object'){if(typeof text!='string')text=''+text;if(text.indexOf('\n')>=0){var ta=text.split('\n');text=ta.join('%n');}}
else{if(text.join){text=text.join('%n');}
else{text=''+text;}
if(text.indexOf('\n')>=0){var ta=text.split('\n');text=ta.join('%n');}}
if(this.mapANSI)text=this.globals.ANSI_map(text,this.ANSItrueBlack);this._sbInit(usemore);var chunks=text.split('%');var esc=(text.charAt(0)!='%');var style=0;var styleMarkUp=this.globals.termStyleMarkup;for(var i=0;i<chunks.length;i++){if(esc){if(chunks[i].length>0){this._sbType(chunks[i],style);}
else if(i>0){this._sbType('%',style);}
esc=false;}
else{var func=chunks[i].charAt(0);if(chunks[i].length==0&&i>0){this._sbType("%",style);esc=true;}
else if(func=='n'){this._sbNewLine(true);if(chunks[i].length>1)this._sbType(chunks[i].substring(1),style);}
else if(func=='+'){var opt=chunks[i].charAt(1);opt=opt.toLowerCase();if(opt=='p'){style=0;}
else if(styleMarkUp[opt]){style|=styleMarkUp[opt];}
if(chunks[i].length>2)this._sbType(chunks[i].substring(2),style);}
else if(func=='-'){var opt=chunks[i].charAt(1);opt=opt.toLowerCase();if(opt=='p'){style=0;}
else if(styleMarkUp[opt]){style&=~styleMarkUp[opt];}
if(chunks[i].length>2)this._sbType(chunks[i].substring(2),style);}
else if(chunks[i].length>1&&func=='c'){var cinfo=this._parseColor(chunks[i].substring(1));style=(style&(~0xfffff0))|cinfo.style;if(cinfo.rest)this._sbType(cinfo.rest,style);}
else if(chunks[i].length>1&&chunks[i].charAt(0)=='C'&&chunks[i].charAt(1)=='S'){this.clear();this._sbInit();if(chunks[i].length>2)this._sbType(chunks[i].substring(2),style);}
else{if(chunks[i].length>0)this._sbType(chunks[i],style);}}}
this._sbOut();},_parseColor:function(chunk){var rest='';var style=0;if(chunk.length){if(chunk.charAt(0)=='('){var clabel='';for(var i=1;i<chunk.length;i++){var c=chunk.charAt(i);if(c==')'){if(chunk.length>i)rest=chunk.substring(i+1);break;}
clabel+=c;}
if(clabel){if(clabel.charAt(0)=='@'){var sc=this.globals.nsColors[clabel.substring(1).toLowerCase()];if(sc)style=(16+sc)*0x100;}
else if(clabel.charAt(0)=='#'){var cl=clabel.substring(1).toLowerCase();var sc=this.globals.webColors[cl];if(sc){style=sc*0x10000;}
else{cl=this.globals.webifyColor(cl);if(cl)style=this.globals.webColors[cl]*0x10000;}}
else if(clabel.length&&clabel.length<=2){var isHex=false;for(var i=0;i<clabel.length;i++){if(this.globals.isHexOnlyChar(clabel.charAt(i))){isHex=true;break;}}
var cl=(isHex)?parseInt(clabel,16):parseInt(clabel,10);if(!isNaN(cl)||cl<=15){style=cl*0x100;}}
else{style=this.globals.getColorCode(clabel)*0x100;}}}
else{var c=chunk.charAt(0);if(this.globals.isHexChar(c)){style=this.globals.hexToNum[c]*0x100;rest=chunk.substring(1);}
else{rest=chunk;}}}
return{rest:rest,style:style};},_sbInit:function(usemore){var sb=this.scrollBuf=new Object();var sbl=sb.lines=new Array();var sbs=sb.styles=new Array();sb.more=usemore;sb.line=0;sb.status=0;sb.r=0;sb.c=this.c;sbl[0]=this.getRowArray(this.conf.cols,0);sbs[0]=this.getRowArray(this.conf.cols,0);for(var i=0;i<this.c;i++){sbl[0][i]=this.charBuf[this.r][i];sbs[0][i]=this.styleBuf[this.r][i];}},_sbType:function(text,style){var sb=this.scrollBuf;for(var i=0;i<text.length;i++){var ch=text.charCodeAt(i);if(!this.isPrintable(ch))ch=94;sb.lines[sb.r][sb.c]=ch;sb.styles[sb.r][sb.c++]=(style)?style:0;if(sb.c>=this.maxCols)this._sbNewLine();}},_sbNewLine:function(forced){var sb=this.scrollBuf;if(this.wrapping&&forced){sb.lines[sb.r][sb.c]=10;sb.lines[sb.r].length=sb.c+1;}
sb.r++;sb.c=0;sb.lines[sb.r]=this.getRowArray(this.conf.cols,0);sb.styles[sb.r]=this.getRowArray(this.conf.cols,0);},_sbWrap:function(){var wb=new Object();wb.lines=new Array();wb.styles=new Array();wb.lines[0]=this.getRowArray(this.conf.cols,0);wb.styles[0]=this.getRowArray(this.conf.cols,0);wb.r=0;wb.c=0;var sb=this.scrollBuf;var sbl=sb.lines;var sbs=sb.styles;var ch,st,wrap,lc,ls;var l=this.c;var lastR=0;var lastC=0;wb.cBreak=false;for(var r=0;r<sbl.length;r++){lc=sbl[r];ls=sbs[r];for(var c=0;c<lc.length;c++){ch=lc[c];st=ls[c];if(ch){var wrap=this.globals.wrapChars[ch];if(ch==10)wrap=1;if(wrap){if(wrap==2){l++;}
else if(wrap==4){l++;lc[c]=45;}
this._wbOut(wb,lastR,lastC,l);if(ch==10){this._wbIncLine(wb);}
else if(wrap==1&&wb.c<this.maxCols){wb.lines[wb.r][wb.c]=ch;wb.styles[wb.r][wb.c++]=st;if(wb.c>=this.maxCols)this._wbIncLine(wb);}
if(wrap==3){lastR=r;lastC=c;l=1;}
else{l=0;lastR=r;lastC=c+1;if(lastC==lc.length){lastR++;lastC=0;}
if(wrap==4)wb.cBreak=true;}}
else{l++;}}
else{continue;}}}
if(l){if(wb.cBreak&&wb.c!=0)wb.c--;this._wbOut(wb,lastR,lastC,l);}
sb.lines=wb.lines;sb.styles=wb.styles;sb.r=wb.r;sb.c=wb.c;},_wbOut:function(wb,br,bc,l){var sb=this.scrollBuf;var sbl=sb.lines;var sbs=sb.styles;var ofs=0;var lc,ls;if(l+wb.c>this.maxCols){if(l<this.maxCols){this._wbIncLine(wb);}
else{var i0=0;ofs=this.maxCols-wb.c;lc=sbl[br];ls=sbs[br];while(true){for(var i=i0;i<ofs;i++){wb.lines[wb.r][wb.c]=lc[bc];wb.styles[wb.r][wb.c++]=ls[bc++];if(bc==sbl[br].length){bc=0;br++;lc=sbl[br];ls=sbs[br];}}
this._wbIncLine(wb);if(l-ofs<this.maxCols)break;i0=ofs;ofs+=this.maxCols;}}}
else if(wb.cBreak){wb.c--;}
lc=sbl[br];ls=sbs[br];for(var i=ofs;i<l;i++){wb.lines[wb.r][wb.c]=lc[bc];wb.styles[wb.r][wb.c++]=ls[bc++];if(bc==sbl[br].length){bc=0;br++;lc=sbl[br];ls=sbs[br];}}
wb.cBreak=false;},_wbIncLine:function(wb){wb.r++;wb.c=0;wb.lines[wb.r]=this.getRowArray(this.conf.cols,0);wb.styles[wb.r]=this.getRowArray(this.conf.cols,0);},_sbOut:function(){var sb=this.scrollBuf;if(this.wrapping&&!sb.status)this._sbWrap();var sbl=sb.lines;var sbs=sb.styles;var tcb=this.charBuf;var tsb=this.styleBuf;var ml=this.maxLines;var buflen=sbl.length;if(sb.more){if(sb.status){if(this.inputChar==this.globals.lcMoreKeyAbort){this.r=ml-1;this.c=0;tcb[this.r]=this.getRowArray(this.conf.cols,0);tsb[this.r]=this.getRowArray(this.conf.cols,0);this.redraw(this.r);this.handler=sb.handler;this.charMode=false;this.inputChar=0;this.scrollBuf=null;this.prompt();return;}
else if(this.inputChar==this.globals.lcMoreKeyContinue){this.clear();}
else{return;}}
else{if(this.r>=ml-1)this.clear();}}
if(this.r+buflen-sb.line<=ml){for(var i=sb.line;i<buflen;i++){var r=this.r+i-sb.line;tcb[r]=sbl[i];tsb[r]=sbs[i];this.redraw(r);}
this.r+=sb.r-sb.line;this.c=sb.c;if(sb.more){if(sb.status)this.handler=sb.handler;this.charMode=false;this.inputChar=0;this.scrollBuf=null;this.prompt();return;}}
else if(sb.more){ml--;if(sb.status==0){sb.handler=this.handler;this.handler=this._sbOut;this.charMode=true;sb.status=1;}
if(this.r){var ofs=ml-this.r;for(var i=sb.line;i<ofs;i++){var r=this.r+i-sb.line;tcb[r]=sbl[i];tsb[r]=sbs[i];this.redraw(r);}}
else{var ofs=sb.line+ml;for(var i=sb.line;i<ofs;i++){var r=this.r+i-sb.line;tcb[r]=sbl[i];tsb[r]=sbs[i];this.redraw(r);}}
sb.line=ofs;this.r=ml;this.c=0;this.type(this.globals.lcMorePrompt1,this.globals.lcMorePromtp1Style);this.type(this.globals.lcMorePrompt2,this.globals.lcMorePrompt2Style);this.lock=false;return;}
else if(buflen>=ml){var ofs=buflen-ml;for(var i=0;i<ml;i++){var r=ofs+i;tcb[i]=sbl[r];tsb[i]=sbs[r];this.redraw(i);}
this.r=ml-1;this.c=sb.c;}
else{var dr=ml-buflen;var ofs=this.r-dr;for(var i=0;i<dr;i++){var r=ofs+i;for(var c=0;c<this.maxCols;c++){tcb[i][c]=tcb[r][c];tsb[i][c]=tsb[r][c];}
this.redraw(i);}
for(var i=0;i<buflen;i++){var r=dr+i;tcb[r]=sbl[i];tsb[r]=sbs[i];this.redraw(r);}
this.r=ml-1;this.c=sb.c;}
this.scrollBuf=null;},typeAt:function(r,c,text,style){var tr1=this.r;var tc1=this.c;this.cursorSet(r,c);for(var i=0;i<text.length;i++){var ch=text.charCodeAt(i);if(!this.isPrintable(ch))ch=94;this.charBuf[this.r][this.c]=ch;this.styleBuf[this.r][this.c]=(style)?style:0;var last_r=this.r;this._incCol();if(this.r!=last_r)this.redraw(last_r);}
this.redraw(this.r);this.r=tr1;this.c=tc1;},statusLine:function(text,style,offset){var ch,r;style=(style&&!isNaN(style))?parseInt(style)&15:0;if(offset&&offset>0){r=this.conf.rows-offset;}
else{r=this.conf.rows-1;}
for(var i=0;i<this.conf.cols;i++){if(i<text.length){ch=text.charCodeAt(i);if(!this.isPrintable(ch))ch=94;}
else{ch=0;}
this.charBuf[r][i]=ch;this.styleBuf[r][i]=style;}
this.redraw(r);},printRowFromString:function(r,text,style){var ch;style=(style&&!isNaN(style))?parseInt(style)&15:0;if(r>=0&&r<this.maxLines){if(typeof text!='string')text=''+text;for(var i=0;i<this.conf.cols;i++){if(i<text.length){ch=text.charCodeAt(i);if(!this.isPrintable(ch))ch=94;}
else{ch=0;}
this.charBuf[r][i]=ch;this.styleBuf[r][i]=style;}
this.redraw(r);}},setChar:function(ch,r,c,style){this.charBuf[r][c]=ch;this.styleBuf[r][c]=(style)?style:0;this.redraw(r);},newLine:function(){this.c=0;this._incRow();},_charOut:function(ch,style){this.charBuf[this.r][this.c]=ch;this.styleBuf[this.r][this.c]=(style)?style:0;this.redraw(this.r);this._incCol();},_incCol:function(){this.c++;if(this.c>=this.maxCols){this.c=0;this._incRow();}},_incRow:function(){this.r++;if(this.r>=this.maxLines){this._scrollLines(0,this.maxLines);this.r=this.maxLines-1;}},_scrollLines:function(start,end){window.status='Scrolling lines ...';start++;for(var ri=start;ri<end;ri++){var rt=ri-1;this.charBuf[rt]=this.charBuf[ri];this.styleBuf[rt]=this.styleBuf[ri];}
var rt=end-1;this.charBuf[rt]=this.getRowArray(this.conf.cols,0);this.styleBuf[rt]=this.getRowArray(this.conf.cols,0);this.redraw(rt);for(var r=end-1;r>=start;r--)this.redraw(r-1);window.status='';},clear:function(){window.status='Clearing display ...';this.cursorOff();this.insert=false;for(var ri=0;ri<this.maxLines;ri++){this.charBuf[ri]=this.getRowArray(this.conf.cols,0);this.styleBuf[ri]=this.getRowArray(this.conf.cols,0);this.redraw(ri);}
this.r=0;this.c=0;window.status='';},reset:function(){if(this.lock)return;this.lock=true;this.rawMode=false;this.charMode=false;this.maxLines=this.conf.rows;this.maxCols=this.conf.cols;this.lastLine='';this.lineBuffer='';this.inputChar=0;this.clear();},prompt:function(){this.lock=true;if(this.c>0)this.newLine();this.type(this.ps);this._charOut(1);this.lock=false;this.cursorOn();},isPrintable:function(ch,unicodePage1only){if(this.wrapping&&this.globals.wrapChars[ch]==4)return true;if(unicodePage1only&&ch>255){return(ch==this.termKey.EURO&&this.printEuro)?true:false;}
return((ch>=32&&ch!=this.termKey.DEL)||(this.printTab&&ch==this.termKey.TAB));},cursorSet:function(r,c){var crsron=this.cursoractive;if(crsron)this.cursorOff();this.r=r%this.maxLines;this.c=c%this.maxCols;this._cursorReset(crsron);},cursorOn:function(){if(this.blinkTimer)clearTimeout(this.blinkTimer);this.blinkBuffer=this.styleBuf[this.r][this.c];this._cursorBlink();this.cursoractive=true;},cursorOff:function(){if(this.blinkTimer)clearTimeout(this.blinkTimer);if(this.cursoractive){this.styleBuf[this.r][this.c]=this.blinkBuffer;this.redraw(this.r);this.cursoractive=false;}},cursorLeft:function(){var crsron=this.cursoractive;if(crsron)this.cursorOff();var r=this.r;var c=this.c;if(c>0){c--;}
else if(r>0){c=this.maxCols-1;r--;}
if(this.isPrintable(this.charBuf[r][c])){this.r=r;this.c=c;}
this.insert=true;this._cursorReset(crsron);},cursorRight:function(){var crsron=this.cursoractive;if(crsron)this.cursorOff();var r=this.r;var c=this.c;if(c<this.maxCols-1){c++;}
else if(r<this.maxLines-1){c=0;r++;}
if(!this.isPrintable(this.charBuf[r][c])){this.insert=false;}
if(this.isPrintable(this.charBuf[this.r][this.c])){this.r=r;this.c=c;}
this._cursorReset(crsron);},backspace:function(){var crsron=this.cursoractive;if(crsron)this.cursorOff();var r=this.r;var c=this.c;if(c>0)c--
else if(r>0){c=this.maxCols-1;r--;};if(this.isPrintable(this.charBuf[r][c])){this._scrollLeft(r,c);this.r=r;this.c=c;};this._cursorReset(crsron);},fwdDelete:function(){var crsron=this.cursoractive;if(crsron)this.cursorOff();if(this.isPrintable(this.charBuf[this.r][this.c])){this._scrollLeft(this.r,this.c);if(!this.isPrintable(this.charBuf[this.r][this.c]))this.insert=false;}
this._cursorReset(crsron);},_cursorReset:function(crsron){if(crsron){this.cursorOn();}
else{this.blinkBuffer=this.styleBuf[this.r][this.c];}},_cursorBlink:function(){if(this.blinkTimer)clearTimeout(this.blinkTimer);if(this==this.globals.activeTerm){if(this.crsrBlockMode){this.styleBuf[this.r][this.c]=(this.styleBuf[this.r][this.c]&1)?this.styleBuf[this.r][this.c]&0xfffffe:this.styleBuf[this.r][this.c]|1;}
else{this.styleBuf[this.r][this.c]=(this.styleBuf[this.r][this.c]&2)?this.styleBuf[this.r][this.c]&0xffffd:this.styleBuf[this.r][this.c]|2;}
this.redraw(this.r);}
if(this.crsrBlinkMode)this.blinkTimer=setTimeout('Terminal.prototype.globals.activeTerm._cursorBlink()',this.blinkDelay);},_scrollLeft:function(r,c){var rows=new Array();rows[0]=r;while(this.isPrintable(this.charBuf[r][c])){var ri=r;var ci=c+1;if(ci==this.maxCols){if(ri<this.maxLines-1){ci=0;ri++;rows[rows.length]=ri;}
else{break;}}
this.charBuf[r][c]=this.charBuf[ri][ci];this.styleBuf[r][c]=this.styleBuf[ri][ci];c=ci;r=ri;}
if(this.charBuf[r][c]!=0)this.charBuf[r][c]=0;for(var i=0;i<rows.length;i++)this.redraw(rows[i]);},_scrollRight:function(r,c){var rows=new Array();var end=this._getLineEnd(r,c);var ri=end[0];var ci=end[1];if(ci==this.maxCols-1&&ri==this.maxLines-1){if(r==0)return;this._scrollLines(0,this.maxLines);this.r--;r--;ri--;}
rows[r]=1;while(this.isPrintable(this.charBuf[ri][ci])){var rt=ri;var ct=ci+1;if(ct==this.maxCols){ct=0;rt++;rows[rt]=1;}
this.charBuf[rt][ct]=this.charBuf[ri][ci];this.styleBuf[rt][ct]=this.styleBuf[ri][ci];if(ri==r&&ci==c)break;ci--;if(ci<0){ci=this.maxCols-1;ri--;rows[ri]=1;}}
for(var i=r;i<this.maxLines;i++){if(rows[i])this.redraw(i);}},_getLineEnd:function(r,c){if(!this.isPrintable(this.charBuf[r][c])){c--;if(c<0){if(r>0){r--;c=this.maxCols-1;}
else{c=0;}}}
if(this.isPrintable(this.charBuf[r][c])){while(true){var ri=r;var ci=c+1;if(ci==this.maxCols){if(ri<this.maxLines-1){ri++;ci=0;}
else{break;}}
if(!this.isPrintable(this.charBuf[ri][ci]))break;c=ci;r=ri;}}
return[r,c];},_getLineStart:function(r,c){var ci,ri;if(!this.isPrintable(this.charBuf[r][c])){ci=c-1;ri=r;if(ci<0){if(ri==0)return[0,0];ci=this.maxCols-1;ri--;}
if(!this.isPrintable(this.charBuf[ri][ci])){return[r,c];}
else{r=ri;c=ci;}}
while(true){var ri=r;var ci=c-1;if(ci<0){if(ri==0)break;ci=this.maxCols-1;ri--;}
if(!this.isPrintable(this.charBuf[ri][ci]))break;;r=ri;c=ci;}
return[r,c];},_getLine:function(adjustCrsrPos){var end=this._getLineEnd(this.r,this.c);var r=end[0];var c=end[1];if(adjustCrsrPos&&(this.r!=r||this.c!=c+1)){this.r=r;this.c=c+1;if(this.c>=this.maxCols)this.c=this.maxCols-1;}
var line=new Array();while(this.isPrintable(this.charBuf[r][c])){line[line.length]=String.fromCharCode(this.charBuf[r][c]);if(c>0){c--;}
else if(r>0){c=this.maxCols-1;r--;}
else{break;}}
line.reverse();return line.join('');},_clearLine:function(){var end=this._getLineEnd(this.r,this.c);var r=end[0];var c=end[1];var line='';while(this.isPrintable(this.charBuf[r][c])){this.charBuf[r][c]=0;if(c>0){c--;}
else if(r>0){this.redraw(r);c=this.maxCols-1;r--;}
else{break;}}
if(r!=end[0])this.redraw(r);c++;this.cursorSet(r,c);this.insert=false;},backupScreen:function(){var backup=this.backupBuffer=new Object();var rl=this.conf.rows;var cl=this.conf.cols;backup.cbuf=new Array(rl);backup.sbuf=new Array(rl);backup.maxCols=this.maxCols;backup.maxLines=this.maxLines;backup.r=this.r;backup.c=this.c;backup.charMode=this.charMode;backup.rawMode=this.rawMode;backup.handler=this.handler;backup.ctrlHandler=this.ctrlHandler;backup.cursoractive=this.cursoractive;backup.crsrBlinkMode=this.crsrBlinkMode;backup.crsrBlockMode=this.crsrBlockMode;backup.blinkDelay=this.blinkDelay;backup.DELisBS=this.DELisBS;backup.printTab=this.printTab;backup.printEuro=this.printEuro;backup.catchCtrlH=this.catchCtrlH;backup.closeOnESC=this.closeOnESC;backup.historyUnique=this.historyUnique;backup.ps=this.ps;backup.lineBuffer=this.lineBuffer;backup.inputChar=this.inputChar;backup.lastLine=this.lastLine;backup.historyLength=this.history.length;backup.histPtr=this.histPtr;backup.wrapping=this.wrapping;backup.mapANSI=this.mapANSI;backup.ANSItrueBlack=this.ANSItrueBlack;if(this.cursoractive)this.cursorOff();for(var r=0;r<rl;r++){var cbr=this.charBuf[r];var sbr=this.styleBuf[r];var tcbr=backup.cbuf[r]=new Array(cl);var tsbr=backup.sbuf[r]=new Array(cl);for(var c=0;c<cl;c++){tcbr[c]=cbr[c];tsbr[c]=sbr[c];}}},restoreScreen:function(){var backup=this.backupBuffer;if(!backup)return;var rl=this.conf.rows;for(var r=0;r<rl;r++){this.charBuf[r]=backup.cbuf[r];this.styleBuf[r]=backup.sbuf[r];this.redraw(r);}
this.maxCols=backup.maxCols;this.maxLines=backup.maxLines;this.r=backup.r;this.c=backup.c;this.charMode=backup.charMode;this.rawMode=backup.rawMode;this.handler=backup.handler;this.ctrlHandler=backup.ctrlHandler;this.cursoractive=backup.cursoractive;this.crsrBlinkMode=backup.crsrBlinkMode;this.crsrBlockMode=backup.crsrBlockMode;this.blinkDelay=backup.blinkDelay;this.DELisBS=backup.DELisBS;this.printTab=backup.printTab;this.printEuro=backup.printEuro;this.catchCtrlH=backup.catchCtrlH;this.closeOnESC=backup.closeOnESC;this.historyUnique=backup.historyUnique;this.ps=backup.ps;this.lineBuffer=backup.lineBuffer;this.inputChar=backup.inputChar;this.lastLine=backup.lastLine;if(this.history.length>backup.historyLength){this.history.length=backup.historyLength;this.histPtr=backup.histPtr;}
this.wrapping=backup.wrapping;this.mapANSI=backup.mapANSI;this.ANSItrueBlack=backup.ANSItrueBlack;if(this.cursoractive)this.cursorOn();this.backupBuffer=null;},swapBackup:function(){var backup=this.backupBuffer;this.backupScreen;if(backup){var backup2=this.backupBuffer;this.backupBuffer=backup;this.restoreScreen();this.backupBuffer=backup2;}},escapeMarkup:function(t){return t.replace(/%/g,'%%');},enterFieldMode:function(start,end,style){this.cursorOff();if(start===undefined||start<0)start=this.c;if(end===undefined||end<start||end>this.maxCols)end=this.maxCols;if(!style)style=0;this.fieldStart=start;this.fieldEnd=end;this.fieldStyle=style;this.fieldC=0;this.lastLine='';this.fieldMode=true;this.rawMode=this.charMode=false;if(style&1){this._crsrWasBlockMode=this.crsrBlockMode;this._crsrWasBlinkMode=this.crsrBlinkMode;this.crsrBlockMode=false;this.crsrBlinkMode=true;}
this.drawField();this.lock=false;},exitFieldMode:function(){this.drawField(true);this.fieldMode=false;this.c=this.fieldEnd;if(this.c==this.maxLine)this.newLine();this.lock=true;},drawField:function(isfinal){this.cursorOff();if(isfinal)this.fieldC=0;var fl=this.fieldEnd-this.fieldStart;if(this.fieldC==this.lastLine.length)fl--;var ofs=this.fieldC-fl;if(ofs<0)ofs=0;var line=(ofs)?this.lastLine.substring(ofs):this.lastLine;var sb=this.styleBuf[this.r];var cb=this.charBuf[this.r];var max=line.length;for(var i=this.fieldStart,k=0;i<this.fieldEnd;i++,k++){sb[i]=this.fieldStyle;cb[i]=(k<max)?line.charCodeAt(k):0;}
this.redraw(this.r);if(isfinal){if(this.fieldStyle&1){this.crsrBlockMode=this._crsrWasBlockMode;this.crsrBlinkMode=this._crsrWasBlinkMode;delete this._crsrWasBlockMode;delete this._crsrWasBlinkMode;}}
else{this.c=this.fieldStart+this.fieldC-ofs;this.cursorOn();}},focus:function(){this.globals.setFocus(this);},termKey:null,_makeTerm:function(rebuild){window.status='Building terminal ...';var divPrefix=this.termDiv+'_r';if(this.domAPI){this.globals.hasSubDivs=false;var td,row,table,tbody,table2,tbody2,tr,td,node;table=document.createElement('table');table.setAttribute('border',0);table.setAttribute('cellSpacing',0);table.setAttribute('cellPadding',this.conf.frameWidth);tbody=document.createElement('tbody');table.appendChild(tbody);row=document.createElement('tr');tbody.appendChild(row);ptd=document.createElement('td');ptd.style.backgroundColor=this.conf.frameColor;row.appendChild(ptd);table2=document.createElement('table');table2.setAttribute('border',0);table2.setAttribute('cellSpacing',0);table2.setAttribute('cellPadding',2);tbody2=document.createElement('tbody');table2.appendChild(tbody2);tr=document.createElement('tr');tbody2.appendChild(tr);td=document.createElement('td');td.style.backgroundColor=this.conf.bgColor;tr.appendChild(td);ptd.appendChild(table2);ptd=td;table2=document.createElement('table');table2.setAttribute('border',0);table2.setAttribute('cellSpacing',0);table2.setAttribute('cellPadding',0);tbody2=document.createElement('tbody');table2.appendChild(tbody2);var rstr='';for(var c=0;c<this.conf.cols;c++)rstr+='&nbsp;';for(var r=0;r<this.conf.rows;r++){tr=document.createElement('tr');td=document.createElement('td');td.id=divPrefix+r;td.style.height=td.style.minHeight=td.style.maxHeight=this.conf.rowHeight;td.style.whiteSpace='nowrap';td.className=this.conf.fontClass;td.innerHTML=rstr;tr.appendChild(td);tbody2.appendChild(tr);}
ptd.appendChild(table2);node=document.getElementById(this.termDiv);while(node.hasChildNodes())node.removeChild(node.firstChild);node.appendChild(table);}
else{this.globals.hasSubDivs=(navigator.userAgent.indexOf('Gecko')<0);var s='',bgColorAttribute=(this.conf.bgColor&&(this.conf.bgColor!=='none'||this.conf.bgColor!='transparent'))?' bgcolor="'+this.conf.bgColor+'"':'',frameColorAttribute=(this.conf.frameColor&&(this.conf.frameColor!=='none'||this.conf.frameColor!='transparent'))?' bgcolor="'+this.conf.frameColor+'"':'';s+='<table border="0" cellspacing="0" cellpadding="'+this.conf.frameWidth+'">\n';s+='<tr><td'+frameColorAttribute+'><table border="0" cellspacing="0" cellpadding="2"><tr><td'+bgColorAttribute+'><table border="0" cellspacing="0" cellpadding="0">\n';var rstr='';for(var c=0;c<this.conf.cols;c++)rstr+='&nbsp;';for(var r=0;r<this.conf.rows;r++){var termid=(this.globals.hasSubDivs)?'':' id="'+divPrefix+r+'"';s+='<tr><td nowrap height="'+this.conf.rowHeight+'"'+termid+' class="'+this.conf.fontClass+'">'+rstr+'<\/td><\/tr>\n';}
s+='<\/table><\/td><\/tr>\n';s+='<\/table><\/td><\/tr>\n';s+='<\/table>\n';var termOffset=2+this.conf.frameWidth;if(this.globals.hasSubDivs){for(var r=0;r<this.conf.rows;r++){s+='<div id="'+divPrefix+r+'" style="position:absolute; top:'+(termOffset+r*this.conf.rowHeight)+'px; left: '+termOffset+'px;" class="'+this.conf.fontClass+'"><\/div>\n';}
this.globals.termStringStart='<table border="0" cellspacing="0" cellpadding="0"><tr><td nowrap height="'+this.conf.rowHeight+'" class="'+this.conf.fontClass+'">';this.globals.termStringEnd='<\/td><\/tr><\/table>';}
this.globals.writeElement(this.termDiv,s);}
if(!rebuild){this.globals.setElementXY(this.termDiv,this.conf.x,this.conf.y);this.globals.setVisible(this.termDiv,1);}
window.status='';},rebuild:function(){var rl=this.conf.rows;var cl=this.conf.cols;for(var r=0;r<rl;r++){var cbr=this.charBuf[r];if(!cbr){this.charBuf[r]=this.getRowArray(cl,0);this.styleBuf[r]=this.getRowArray(cl,0);}
else if(cbr.length<cl){for(var c=cbr.length;c<cl;c++){this.charBuf[r][c]=0;this.styleBuf[r][c]=0;}}}
var resetcrsr=false;if(this.r>=rl){r=rl-1;resetcrsr=true;}
if(this.c>=cl){c=cl-1;resetcrsr=true;}
if(resetcrsr&&this.cursoractive)this.cursorOn();this._makeTerm(true);for(var r=0;r<rl;r++){this.redraw(r);}
this.backupBuffer=null;},moveTo:function(x,y){this.globals.setElementXY(this.termDiv,x,y);},resizeTo:function(x,y){if(this.termDivReady()){x=parseInt(x,10);y=parseInt(y,10);if(isNaN(x)||isNaN(y)||x<4||y<2)return false;this.maxCols=this.conf.cols=x;this.maxLines=this.conf.rows=y;this._makeTerm();this.clear();return true;}
else{return false;}},redraw:function(r){var s=this.globals.termStringStart;var curStyle=0;var tstls=this.globals.termStyles;var tscls=this.globals.termStyleClose;var tsopn=this.globals.termStyleOpen;var tspcl=this.globals.termSpecials;var tclrs=this.globals.colorCodes;var tnclrs=this.globals.nsColorCodes;var twclrs=this.globals.webColorCodes;var t_cb=this.charBuf;var t_sb=this.styleBuf;var blur=this.textBlur;var clr='';var textColor=this.textColor||'';for(var i=0;i<this.conf.cols;i++){var c=t_cb[r][i];var cs=t_sb[r][i];if(cs!=curStyle||(i==0&&textColor)){if(curStyle){if(curStyle&0xffff00)s+='</span>';for(var k=tstls.length-1;k>=0;k--){var st=tstls[k];if(curStyle&st)s+=tscls[st];}}
curStyle=cs;for(var k=0;k<tstls.length;k++){var st=tstls[k];if(curStyle&st)s+=tsopn[st];}
clr=textColor;if(curStyle&0xff00){var cc=(curStyle&0xff00)>>>8;clr=(cc<16)?tclrs[cc]:'#'+tnclrs[cc-16];}
else if(curStyle&0xff0000){clr='#'+twclrs[(curStyle&0xff0000)>>>16];}
if(clr){if(curStyle&1){s+='<span style="background-color:'+clr+' !important;">';}
else if(typeof blur==='object'){s+='<span style="color:'+clr+' !important; text-shadow: 0 0 '+blur.join('px '+clr+', 0 0 ')+'px '+clr+';">';}
else if(blur){s+='<span style="color:'+clr+' !important; text-shadow: 0 0 '+blur+'px '+clr+';">';}
else{s+='<span style="color:'+clr+' !important;">';}}}
s+=(tspcl[c])?tspcl[c]:String.fromCharCode(c);}
if(curStyle>0){if(curStyle&0xffff00)s+='</span>';for(var k=tstls.length-1;k>=0;k--){var st=tstls[k];if(curStyle&st)s+=tscls[st];}}
s+=this.globals.termStringEnd;this.globals.writeElement(this.termDiv+'_r'+r,s);},guiReady:function(){var ready=true;if(this.globals.guiElementsReady(this.termDiv)){for(var r=0;r<this.conf.rows;r++){if(this.globals.guiElementsReady(this.termDiv+'_r'+r)==false){ready=false;break;}}}
else{ready=false;}
return ready;},termDivReady:function(){if(document.getElementById){return(document.getElementById(this.termDiv))?true:false;}
else if(document.all){return(document.all[this.termDiv])?true:false;}
else{return false;}},getDimensions:function(){var w=0;var h=0;var d=this.termDiv;if(document.getElementById){var obj=document.getElementById(d);if(obj&&obj.firstChild){w=parseInt(obj.firstChild.offsetWidth,10);h=parseInt(obj.firstChild.offsetHeight,10);}
else if(obj&&obj.children&&obj.children[0]){w=parseInt(obj.children[0].offsetWidth,10);h=parseInt(obj.children[0].offsetHeight,10);}}
else if(document.all){var obj=document.all[d];if(obj&&obj.children&&obj.children[0]){w=parseInt(obj.children[0].offsetWidth,10);h=parseInt(obj.children[0].offsetHeight,10);}}
return{width:w,height:h};},globals:{termToInitialze:null,activeTerm:null,kbdEnabled:false,keylock:false,keyRepeatDelay1:450,keyRepeatDelay2:100,keyRepeatTimer:null,lcMorePrompt1:' -- MORE -- ',lcMorePromtp1Style:1,lcMorePrompt2:' (Type: space to continue, \'q\' to quit)',lcMorePrompt2Style:0,lcMoreKeyAbort:113,lcMoreKeyContinue:32,_initGlobals:function(){var tg=Terminal.prototype.globals;tg._extendMissingStringMethods();tg._initWebColors();tg._initDomKeyRef();Terminal.prototype.termKey=tg.termKey;},getHexChar:function(c){var tg=Terminal.prototype.globals;if(tg.isHexChar(c))return tg.hexToNum[c];return-1;},isHexChar:function(c){return((c>='0'&&c<='9')||(c>='a'&&c<='f')||(c>='A'&&c<='F'))?true:false;},isHexOnlyChar:function(c){return((c>='a'&&c<='f')||(c>='A'&&c<='F'))?true:false;},hexToNum:{'0':0,'1':1,'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'a':10,'b':11,'c':12,'d':13,'e':14,'f':15,'A':10,'B':11,'C':12,'D':13,'E':14,'F':15},webColors:[],webColorCodes:[''],colors:{black:1,red:2,green:3,yellow:4,blue:5,magenta:6,cyan:7,white:8,grey:9,red2:10,green2:11,yellow2:12,blue2:13,magenta2:14,cyan2:15,red1:2,green1:3,yellow1:4,blue1:5,magenta1:6,cyan1:7,gray:9,darkred:10,darkgreen:11,darkyellow:12,darkblue:13,darkmagenta:14,darkcyan:15,'default':0,clear:0},colorCodes:['','#000000','#ff0000','#00ff00','#ffff00','#0066ff','#ff00ff','#00ffff','#ffffff','#808080','#990000','#009900','#999900','#003399','#990099','#009999'],nsColors:{'aliceblue':1,'antiquewhite':2,'aqua':3,'aquamarine':4,'azure':5,'beige':6,'black':7,'blue':8,'blueviolet':9,'brown':10,'burlywood':11,'cadetblue':12,'chartreuse':13,'chocolate':14,'coral':15,'cornflowerblue':16,'cornsilk':17,'crimson':18,'darkblue':19,'darkcyan':20,'darkgoldenrod':21,'darkgray':22,'darkgreen':23,'darkkhaki':24,'darkmagenta':25,'darkolivegreen':26,'darkorange':27,'darkorchid':28,'darkred':29,'darksalmon':30,'darkseagreen':31,'darkslateblue':32,'darkslategray':33,'darkturquoise':34,'darkviolet':35,'deeppink':36,'deepskyblue':37,'dimgray':38,'dodgerblue':39,'firebrick':40,'floralwhite':41,'forestgreen':42,'fuchsia':43,'gainsboro':44,'ghostwhite':45,'gold':46,'goldenrod':47,'gray':48,'green':49,'greenyellow':50,'honeydew':51,'hotpink':52,'indianred':53,'indigo':54,'ivory':55,'khaki':56,'lavender':57,'lavenderblush':58,'lawngreen':59,'lemonchiffon':60,'lightblue':61,'lightcoral':62,'lightcyan':63,'lightgoldenrodyellow':64,'lightgreen':65,'lightgrey':66,'lightpink':67,'lightsalmon':68,'lightseagreen':69,'lightskyblue':70,'lightslategray':71,'lightsteelblue':72,'lightyellow':73,'lime':74,'limegreen':75,'linen':76,'maroon':77,'mediumaquamarine':78,'mediumblue':79,'mediumorchid':80,'mediumpurple':81,'mediumseagreen':82,'mediumslateblue':83,'mediumspringgreen':84,'mediumturquoise':85,'mediumvioletred':86,'midnightblue':87,'mintcream':88,'mistyrose':89,'moccasin':90,'navajowhite':91,'navy':92,'oldlace':93,'olive':94,'olivedrab':95,'orange':96,'orangered':97,'orchid':98,'palegoldenrod':99,'palegreen':100,'paleturquoise':101,'palevioletred':102,'papayawhip':103,'peachpuff':104,'peru':105,'pink':106,'plum':107,'powderblue':108,'purple':109,'red':110,'rosybrown':111,'royalblue':112,'saddlebrown':113,'salmon':114,'sandybrown':115,'seagreen':116,'seashell':117,'sienna':118,'silver':119,'skyblue':120,'slateblue':121,'slategray':122,'snow':123,'springgreen':124,'steelblue':125,'tan':126,'teal':127,'thistle':128,'tomato':129,'turquoise':130,'violet':131,'wheat':132,'white':133,'whitesmoke':134,'yellow':135,'yellowgreen':136},nsColorCodes:['','f0f8ff','faebd7','00ffff','7fffd4','f0ffff','f5f5dc','000000','0000ff','8a2be2','a52a2a','deb887','5f9ea0','7fff00','d2691e','ff7f50','6495ed','fff8dc','dc143c','00008b','008b8b','b8860b','a9a9a9','006400','bdb76b','8b008b','556b2f','ff8c00','9932cc','8b0000','e9967a','8fbc8f','483d8b','2f4f4f','00ced1','9400d3','ff1493','00bfff','696969','1e90ff','b22222','fffaf0','228b22','ff00ff','dcdcdc','f8f8ff','ffd700','daa520','808080','008000','adff2f','f0fff0','ff69b4','cd5c5c','4b0082','fffff0','f0e68c','e6e6fa','fff0f5','7cfc00','fffacd','add8e6','f08080','e0ffff','fafad2','90ee90','d3d3d3','ffb6c1','ffa07a','20b2aa','87cefa','778899','b0c4de','ffffe0','00ff00','32cd32','faf0e6','800000','66cdaa','0000cd','ba55d3','9370db','3cb371','7b68ee','00fa9a','48d1cc','c71585','191970','f5fffa','ffe4e1','ffe4b5','ffdead','000080','fdf5e6','808000','6b8e23','ffa500','ff4500','da70d6','eee8aa','98fb98','afeeee','db7093','ffefd5','ffdab9','cd853f','ffc0cb','dda0dd','b0e0e6','800080','ff0000','bc8f8f','4169e1','8b4513','fa8072','f4a460','2e8b57','fff5ee','a0522d','c0c0c0','87ceeb','6a5acd','708090','fffafa','00ff7f','4682b4','d2b48c','008080','d8bfd8','ff6347','40e0d0','ee82ee','f5deb3','ffffff','f5f5f5','ffff00','9acd32'],_webSwatchChars:['0','3','6','9','c','f'],_initWebColors:function(){var tg=Terminal.prototype.globals;var ws=tg._webColorSwatch;var wn=tg.webColors;var cc=tg.webColorCodes;var n=1;var a,b,c,al,bl,bs,cl;for(var i=0;i<6;i++){a=tg._webSwatchChars[i];al=a+a;for(var j=0;j<6;j++){b=tg._webSwatchChars[j];bl=al+b+b;bs=a+b;for(var k=0;k<6;k++){c=tg._webSwatchChars[k];cl=bl+c+c;wn[bs+c]=wn[cl]=n;cc[n]=cl;n++;}}}},webifyColor:function(s){var tg=Terminal.prototype.globals;if(s.length==6){var c='';for(var i=0;i<6;i+=2){var a=s.charAt(i);var b=s.charAt(i+1);if(tg.isHexChar(a)&&tg.isHexChar(b)){c+=tg._webSwatchChars[Math.round(parseInt(a+b,16)/255*5)];}
else{return'';}}
return c;}
else if(s.length==3){var c='';for(var i=0;i<3;i++){var a=s.charAt(i);if(tg.isHexChar(a)){c+=tg._webSwatchChars[Math.round(parseInt(a,16)/15*5)];}
else{return'';}}
return c;}
else{return'';}},setColor:function(label,value){var tg=Terminal.prototype.globals;if(typeof label=='number'&&label>=1&&label<=15){tg.colorCodes[label]=value;}
else if(typeof label=='string'){label=label.toLowerCase();if(label.length==1&&tg.isHexChar(label)){var n=tg.hexToNum[label];if(n)tg.colorCodes[n]=value;}
else if(typeof tg.colors[label]!='undefined'){var n=tg.colors[label];if(n)tg.colorCodes[n]=value;}}},getColorString:function(label){var tg=Terminal.prototype.globals;if(typeof label=='number'&&label>=0&&label<=15){return tg.colorCodes[label];}
else if(typeof label=='string'){label=label.toLowerCase();if(label.length==1&&tg.isHexChar(label)){return tg.colorCodes[tg.hexToNum[label]];}
else if(typeof tg.colors[label]!='undefined'){return tg.colorCodes[tg.colors[label]];}}
return'';},getColorCode:function(label){var tg=Terminal.prototype.globals;if(typeof label=='number'&&label>=0&&label<=15){return label;}
else if(typeof label=='string'){label=label.toLowerCase();if(label.length==1&&tg.isHexChar(label)){return parseInt(label,16);}
else if(typeof tg.colors[label]!='undefined'){return tg.colors[label];}}
return 0;},insertText:function(text){var tg=Terminal.prototype.globals;var termRef=tg.activeTerm;if(!termRef||termRef.closed||tg.keylock||termRef.lock||termRef.charMode||termRef.fieldMode)return false;for(var i=0;i<text.length;i++){tg.keyHandler({which:text.charCodeAt(i),_remapped:true});}
return true;},importEachLine:function(text){var tg=Terminal.prototype.globals;var termRef=tg.activeTerm;if(!termRef||termRef.closed||tg.keylock||termRef.lock||termRef.charMode||termRef.fieldMode)return false;termRef.cursorOff();termRef._clearLine();text=text.replace(/\r\n?/g,'\n');var t=text.split('\n');for(var i=0;i<t.length;i++){for(var k=0;k<t[i].length;k++){tg.keyHandler({which:t[i].charCodeAt(k),_remapped:true});}
tg.keyHandler({which:term.termKey.CR,_remapped:true});}
return true;},importMultiLine:function(text){var tg=Terminal.prototype.globals;var termRef=tg.activeTerm;if(!termRef||termRef.closed||tg.keylock||termRef.lock||termRef.charMode||termRef.fieldMode)return false;termRef.lock=true;termRef.cursorOff();termRef._clearLine();text=text.replace(/\r\n?/g,'\n');var lines=text.split('\n');for(var i=0;i<lines.length;i++){termRef.type(lines[i]);if(i<lines.length-1)termRef.newLine();}
termRef.lineBuffer=text;termRef.lastLine='';termRef.inputChar=0;termRef.handler();return true;},normalize:function(n,m){var s=''+n;while(s.length<m)s='0'+s;return s;},fillLeft:function(t,n){if(typeof t!='string')t=''+t;while(t.length<n)t=' '+t;return t;},center:function(t,l){var s='';for(var i=t.length;i<l;i+=2)s+=' ';return s+t;},stringReplace:function(s1,s2,t){var l1=s1.length;var l2=s2.length;var ofs=t.indexOf(s1);while(ofs>=0){t=t.substring(0,ofs)+s2+t.substring(ofs+l1);ofs=t.indexOf(s1,ofs+l2);}
return t;},wrapChars:{9:1,10:1,12:4,13:1,32:1,40:3,45:2,61:2,91:3,94:3,123:3},setFocus:function(termref){Terminal.prototype.globals.activeTerm=termref;Terminal.prototype.globals.clearRepeatTimer();},termKey:{'NUL':0x00,'SOH':0x01,'STX':0x02,'ETX':0x03,'EOT':0x04,'ENQ':0x05,'ACK':0x06,'BEL':0x07,'BS':0x08,'BACKSPACE':0x08,'HT':0x09,'TAB':0x09,'LF':0x0A,'VT':0x0B,'FF':0x0C,'CR':0x0D,'SO':0x0E,'SI':0x0F,'DLE':0x10,'DC1':0x11,'DC2':0x12,'DC3':0x13,'DC4':0x14,'NAK':0x15,'SYN':0x16,'ETB':0x17,'CAN':0x18,'EM':0x19,'SUB':0x1A,'ESC':0x1B,'IS4':0x1C,'IS3':0x1D,'IS2':0x1E,'IS1':0x1F,'DEL':0x7F,'EURO':0x20AC,'LEFT':0x1C,'RIGHT':0x1D,'UP':0x1E,'DOWN':0x1F},termDomKeyRef:{},_domKeyMappingData:{'LEFT':'LEFT','RIGHT':'RIGHT','UP':'UP','DOWN':'DOWN','BACK_SPACE':'BS','RETURN':'CR','ENTER':'CR','ESCAPE':'ESC','DELETE':'DEL','TAB':'TAB'},_initDomKeyRef:function(){var tg=Terminal.prototype.globals;var m=tg._domKeyMappingData;var r=tg.termDomKeyRef;var k=tg.termKey;for(var i in m)r['DOM_VK_'+i]=k[m[i]];},registerEvent:function(obj,eventType,handler,capture){if(obj.addEventListener){obj.addEventListener(eventType.toLowerCase(),handler,capture);}
else{var et=eventType.toUpperCase();if(window.Event&&window.Event[et]&&obj.captureEvents)obj.captureEvents(Event[et]);obj['on'+eventType.toLowerCase()]=handler;}},releaseEvent:function(obj,eventType,handler,capture){if(obj.removeEventListener){obj.removeEventListener(eventType.toLowerCase(),handler,capture);}
else{var et=eventType.toUpperCase();if(window.Event&&window.Event[et]&&obj.releaseEvents)obj.releaseEvents(Event[et]);et='on'+eventType.toLowerCase();if(obj[et]&&obj[et]==handler)obj.et=null;}},enableKeyboard:function(term){var tg=Terminal.prototype.globals;if(!tg.kbdEnabled){tg.registerEvent(document,'keypress',tg.keyHandler,true);tg.registerEvent(document,'keydown',tg.keyFix,true);tg.registerEvent(document,'keyup',tg.clearRepeatTimer,true);tg.kbdEnabled=true;}
tg.activeTerm=term;},disableKeyboard:function(term){var tg=Terminal.prototype.globals;if(tg.kbdEnabled){tg.releaseEvent(document,'keypress',tg.keyHandler,true);tg.releaseEvent(document,'keydown',tg.keyFix,true);tg.releaseEvent(document,'keyup',tg.clearRepeatTimer,true);tg.kbdEnabled=false;}
tg.activeTerm=null;},keyFix:function(e){var tg=Terminal.prototype.globals;var term=tg.activeTerm;var ch;if(tg.keylock||term.lock)return true;if(window.event){if(!e)e=window.event;ch=e.keyCode;if(e.DOM_VK_UP){for(var i in tg.termDomKeyRef){if(e[i]&&ch==e[i]){tg.keyHandler({which:tg.termDomKeyRef[i],_remapped:true,_repeat:(ch==0x1B)?true:false});if(e.preventDefault)e.preventDefault();if(e.stopPropagation)e.stopPropagation();e.cancelBubble=true;return false;}}
e.cancelBubble=false;return true;}
else{var termKey=term.termKey;var keyHandler=tg.keyHandler;if(ch==8&&!term.isOpera){keyHandler({which:termKey.BS,_remapped:true,_repeat:true});}
else if(ch==9){keyHandler({which:termKey.TAB,_remapped:true,_repeat:(term.printTab)?false:true});}
else if(ch==27){keyHandler({which:termKey.ESC,_remapped:true,_repeat:(term.printTab)?false:true});}
else if(ch==37){keyHandler({which:termKey.LEFT,_remapped:true,_repeat:true});}
else if(ch==39){keyHandler({which:termKey.RIGHT,_remapped:true,_repeat:true});}
else if(ch==38){keyHandler({which:termKey.UP,_remapped:true,_repeat:true});}
else if(ch==40){keyHandler({which:termKey.DOWN,_remapped:true,_repeat:true});}
else if(ch==127||ch==46){keyHandler({which:termKey.DEL,_remapped:true,_repeat:true});}
else if(ch>=57373&&ch<=57376){if(ch==57373){keyHandler({which:termKey.UP,_remapped:true,_repeat:true});}
else if(ch==57374){keyHandler({which:termKey.DOWN,_remapped:true,_repeat:true});}
else if(ch==57375){keyHandler({which:termKey.LEFT,_remapped:true,_repeat:true});}
else if(ch==57376){keyHandler({which:termKey.RIGHT,_remapped:true,_repeat:true});}}
else{e.cancelBubble=false;return true;}
if(e.preventDefault)e.preventDefault();if(e.stopPropagation)e.stopPropagation();e.cancelBubble=true;return false;}}},clearRepeatTimer:function(e){var tg=Terminal.prototype.globals;if(tg.keyRepeatTimer){clearTimeout(tg.keyRepeatTimer);tg.keyRepeatTimer=null;}},doKeyRepeat:function(ch){Terminal.prototype.globals.keyHandler({which:ch,_remapped:true,_repeated:true})},keyHandler:function(e){var tg=Terminal.prototype.globals;var term=tg.activeTerm;if(tg.keylock||term.lock||term.isMac&&e&&e.metaKey)return true;if(window.event){if(window.event.preventDefault)window.event.preventDefault();if(window.event.stopPropagation)window.event.stopPropagation();}
else if(e){if(e.preventDefault)e.preventDefault();if(e.stopPropagation)e.stopPropagation();}
var ch;var ctrl=false;var shft=false;var remapped=false;var termKey=term.termKey;var keyRepeat=0;if(e){ch=e.which;ctrl=((e.ctrlKey&&!e.altKey)||e.modifiers==2);shft=(e.shiftKey||e.modifiers==4);if(e._remapped){remapped=true;if(window.event){ctrl=(ctrl||(window.event.ctrlKey&&!window.event.altKey));shft=(shft||window.event.shiftKey);}}
if(e._repeated){keyRepeat=2;}
else if(e._repeat){keyRepeat=1;}}
else if(window.event){ch=window.event.keyCode;ctrl=(window.event.ctrlKey&&!window.event.altKey);shft=(window.event.shiftKey);if(window.event._repeated){keyRepeat=2;}
else if(window.event._repeat){keyRepeat=1;}}
else{return true;}
if(ch==''&&remapped==false){if(e==null)e=window.event;if(e.charCode==0&&e.keyCode){if(e.DOM_VK_UP){var dkr=tg.termDomKeyRef;for(var i in dkr){if(e[i]&&e.keyCode==e[i]){ch=dkr[i];break;}}}
else{if(e.keyCode==28){ch=termKey.LEFT;}
else if(e.keyCode==29){ch=termKey.RIGHT;}
else if(e.keyCode==30){ch=termKey.UP;}
else if(e.keyCode==31){ch=termKey.DOWN;}
else if(e.keyCode==37){ch=termKey.LEFT;}
else if(e.keyCode==39){ch=termKey.RIGHT;}
else if(e.keyCode==38){ch=termKey.UP;}
else if(e.keyCode==40){ch=termKey.DOWN;}
else if(e.keyCode==9){ch=termKey.TAB;}}}}
if((ch>=0xE000)&&(ch<=0xF8FF))return;if(keyRepeat){tg.clearRepeatTimer();tg.keyRepeatTimer=window.setTimeout('Terminal.prototype.globals.doKeyRepeat('+ch+')',(keyRepeat==1)?tg.keyRepeatDelay1:tg.keyRepeatDelay2);}
if(term.charMode){term.insert=false;term.inputChar=ch;term.lineBuffer='';term.handler();if(ch<=32&&window.event)window.event.cancelBubble=true;return false;}
if(!ctrl){if(ch==termKey.CR){term.lock=true;term.cursorOff();term.insert=false;if(term.rawMode){term.lineBuffer=term.lastLine;}
else if(term.fieldMode){term.lineBuffer=term.lastLine;term.exitFieldMode();}
else{term.lineBuffer=term._getLine(true);if(term.lineBuffer!=''&&(!term.historyUnique||term.history.length==0||term.lineBuffer!=term.history[term.history.length-1])){term.history[term.history.length]=term.lineBuffer;}
term.histPtr=term.history.length;}
term.lastLine='';term.inputChar=0;term.handler();if(window.event)window.event.cancelBubble=true;return false;}
else if(term.fieldMode){if(ch==termKey.ESC){term.lineBuffer=term.lastLine='';term.exitFieldMode();term.lastLine='';term.inputChar=0;term.handler();if(window.event)window.event.cancelBubble=true;return false;}
else if(ch==termKey.LEFT){if(term.fieldC>0)term.fieldC--;}
else if(ch==termKey.RIGHT){if(term.fieldC<term.lastLine.length)term.fieldC++;}
else if(ch==termKey.BS){if(term.fieldC>0){term.lastLine=term.lastLine.substring(0,term.fieldC-1)+term.lastLine.substring(term.fieldC);term.fieldC--;}}
else if(ch==termKey.DEL){if(term.fieldC<term.lastLine.length){term.lastLine=term.lastLine.substring(0,term.fieldC)+term.lastLine.substring(term.fieldC+1);}}
else if(ch>=32){term.lastLine=term.lastLine.substring(0,term.fieldC)+String.fromCharCode(ch)+term.lastLine.substring(term.fieldC);term.fieldC++;}
term.drawField();return false;}
else if(ch==termKey.ESC&&term.conf.closeOnESC){term.close();if(window.event)window.event.cancelBubble=true;return false;}
if(ch<32&&term.rawMode){if(window.event)window.event.cancelBubble=true;return false;}
else{if(ch==termKey.LEFT){term.cursorLeft();if(window.event)window.event.cancelBubble=true;return false;}
else if(ch==termKey.RIGHT){term.cursorRight();if(window.event)window.event.cancelBubble=true;return false;}
else if(ch==termKey.UP){term.cursorOff();if(term.histPtr==term.history.length)term.lastLine=term._getLine();term._clearLine();if(term.history.length&&term.histPtr>=0){if(term.histPtr>0)term.histPtr--;term.type(term.history[term.histPtr]);}
else if(term.lastLine){term.type(term.lastLine);}
term.cursorOn();if(window.event)window.event.cancelBubble=true;return false;}
else if(ch==termKey.DOWN){term.cursorOff();if(term.histPtr==term.history.length)term.lastLine=term._getLine();term._clearLine();if(term.history.length&&term.histPtr<=term.history.length){if(term.histPtr<term.history.length)term.histPtr++;if(term.histPtr<term.history.length){term.type(term.history[term.histPtr]);}
else if(term.lastLine){term.type(term.lastLine);}}
else if(term.lastLine){term.type(term.lastLine);}
term.cursorOn();if(window.event)window.event.cancelBubble=true;return false;}
else if(ch==termKey.BS){term.backspace();if(window.event)window.event.cancelBubble=true;return false;}
else if(ch==termKey.DEL){if(term.DELisBS){term.backspace();}
else{term.fwdDelete();}
if(window.event)window.event.cancelBubble=true;return false;}}}
if(term.rawMode){if(term.isPrintable(ch)){term.lastLine+=String.fromCharCode(ch);}
if(ch==32&&window.event){window.event.cancelBubble=true;}
else if(window.opera&&window.event){window.event.cancelBubble=true;}
return false;}
else{if(term.conf.catchCtrlH&&(ch==termKey.BS||(ctrl&&ch==72))){term.backspace();if(window.event)window.event.cancelBubble=true;return false;}
else if(term.ctrlHandler&&(ch<32||(ctrl&&term.isPrintable(ch,true)))){if((ch>=65&&ch<=96)||ch==63){if(ch==63){ch=31;}
else{ch-=64;}}
term.inputChar=ch;term.ctrlHandler();if(window.event)window.event.cancelBubble=true;return false;}
else if(ctrl||!term.isPrintable(ch,true)){if(window.event)window.event.cancelBubble=true;return false;}
else if(term.isPrintable(ch,true)){if(term.blinkTimer)clearTimeout(term.blinkTimer);if(term.insert){term.cursorOff();term._scrollRight(term.r,term.c);}
term._charOut(ch);term.cursorOn();if(ch==32&&window.event){window.event.cancelBubble=true;}
else if(window.opera&&window.event){window.event.cancelBubble=true;}
return false;}}
return true;},hasSubDivs:false,termStringStart:'',termStringEnd:'',termSpecials:{0:'&nbsp;',1:'&nbsp;',9:'&nbsp;',32:'&nbsp;',34:'&quot;',38:'&amp;',60:'&lt;',62:'&gt;',127:'&loz;',0x20AC:'&euro;'},termStyles:[1,2,4,8,16],termStyleMarkup:{'r':1,'u':2,'i':4,'s':8,'b':16},termStyleOpen:{1:'<span class="termReverse">',2:'<u>',4:'<i>',8:'<strike>',16:'<i>'},termStyleClose:{1:'<\/span>',2:'<\/u>',4:'<\/i>',8:'<\/strike>',16:'</i>'},assignStyle:function(styleCode,markup,htmlOpen,htmlClose){var tg=Terminal.prototype.globals;if(!styleCode||isNaN(styleCode)){if(styleCode>=256){alert('termlib.js:\nCould not assign style.\n'+s+' is not a valid power of 2 between 0 and 256.');return;}}
var s=styleCode&0xff;var matched=false;for(var i=0;i<8;i++){if((s>>>i)&1){if(matched){alert('termlib.js:\nCould not assign style code.\n'+s+' is not a power of 2!');return;}
matched=true;}}
if(!matched){alert('termlib.js:\nCould not assign style code.\n'+s+' is not a valid power of 2 between 0 and 256.');return;}
markup=String(markup).toLowerCase();if(markup=='c'||markup=='p'){alert('termlib.js:\nCould not assign mark up.\n"'+markup+'" is a reserved code.');return;}
if(markup.length>1){alert('termlib.js:\nCould not assign mark up.\n"'+markup+'" is not a single letter code.');return;}
var exists=false;for(var i=0;i<tg.termStyles.length;i++){if(tg.termStyles[i]==s){exists=true;break;}}
if(exists){var m=tg.termStyleMarkup[markup];if(m&&m!=s){alert('termlib.js:\nCould not assign mark up.\n"'+markup+'" is already in use.');return;}}
else{if(tg.termStyleMarkup[markup]){alert('termlib.js:\nCould not assign mark up.\n"'+markup+'" is already in use.');return;}
tg.termStyles[tg.termStyles.length]=s;}
tg.termStyleMarkup[markup]=s;tg.termStyleOpen[s]=htmlOpen;tg.termStyleClose[s]=htmlClose;},ANSI_regexp:/(\x1b\[|x9b)([0-9;]+?)([a-zA-Z])/g,ANIS_SGR_codes:{'0':'%+p','1':'%+b','3':'%+i','4':'%+u','7':'%+r','9':'%+s','21':'%+u','22':'%-b','23':'%-i','24':'%-u','27':'%-r','29':'%-s','30':'%c(0)','31':'%c(a)','32':'%c(b)','33':'%c(c)','34':'%c(d)','35':'%c(e)','36':'%c(f)','37':'%c(#999)','39':'%c(0)','90':'%c(9)','91':'%c(2)','92':'%c(3)','93':'%c(4)','94':'%c(5)','95':'%c(6)','96':'%c(7)','97':'%c(8)','99':'%c(0)','trueBlack':'%c(1)'},ANSI_map:function(t,trueBlack){var tg=Terminal.prototype.globals;tg.ANSI_regexp.lastIndex=0;return t.replace(tg.ANSI_regexp,function(str,p1,p2,p3,offset,s){return tg.ANSI_replace(p2,p3,trueBlack);});},ANSI_replace:function(p,cmd,trueBlack){var tg=Terminal.prototype.globals;if(cmd=='m'){if(p==''){return tg.ANIS_SGR_codes[0];}
else if(trueBlack&&p=='30'){return tg.ANIS_SGR_codes.trueBlack;}
else if(tg.ANIS_SGR_codes[p]){return tg.ANIS_SGR_codes[p];}}
return'';},writeElement:function(e,t){if(document.getElementById){var obj=document.getElementById(e);obj.innerHTML=t;}
else if(document.all){document.all[e].innerHTML=t;}},setElementXY:function(d,x,y){if(document.getElementById){var obj=document.getElementById(d);obj.style.left=x+'px';obj.style.top=y+'px';}
else if(document.all){document.all[d].style.left=x+'px';document.all[d].style.top=y+'px';}},setVisible:function(d,v){if(document.getElementById){var obj=document.getElementById(d);obj.style.visibility=(v)?'visible':'hidden';}
else if(document.all){document.all[d].style.visibility=(v)?'visible':'hidden';}},setDisplay:function(d,v){if(document.getElementById){var obj=document.getElementById(d);obj.style.display=v;}
else if(document.all){document.all[d].style.display=v;}},guiElementsReady:function(e){if(document.getElementById){return(document.getElementById(e))?true:false;}
else if(document.all){return(document.all[e])?true:false;}
else{return false;}},_termString_makeKeyref:function(){var tg=Terminal.prototype.globals;var termString_keyref=tg.termString_keyref=new Array();var termString_keycoderef=tg.termString_keycoderef=new Array();var hex=new Array('A','B','C','D','E','F');for(var i=0;i<=15;i++){var high=(i<10)?i:hex[i-10];for(var k=0;k<=15;k++){var low=(k<10)?k:hex[k-10];var cc=i*16+k;if(cc>=32){var cs=unescape("%"+high+low);termString_keyref[cc]=cs;termString_keycoderef[cs]=cc;}}}},_extendMissingStringMethods:function(){if(!String.fromCharCode||!String.prototype.charCodeAt){Terminal.prototype.globals._termString_makeKeyref();}
if(!String.fromCharCode){String.fromCharCode=function(cc){return(cc!=null)?Terminal.prototype.globals.termString_keyref[cc]:'';};}
if(!String.prototype.charCodeAt){String.prototype.charCodeAt=function(n){cs=this.charAt(n);return(Terminal.prototype.globals.termString_keycoderef[cs])?Terminal.prototype.globals.termString_keycoderef[cs]:0;};}}}}
Terminal.prototype.globals._initGlobals();var TerminalDefaults=Terminal.prototype.Defaults;var termDefaultHandler=Terminal.prototype.defaultHandler;var TermGlobals=Terminal.prototype.globals;var termKey=Terminal.prototype.globals.termKey;var termDomKeyRef=Terminal.prototype.globals.termDomKeyRef;Terminal.prototype._HttpSocket=function(){var req=null;if(window.XMLHttpRequest){try{req=new XMLHttpRequest();}
catch(e){}}
else if(window.ActiveXObject){var prtcls=this._msXMLHttpObjects;for(var i=0;i<prtcls.length;i++){try{req=new ActiveXObject(prtcls[i]);if(req){if(prtcls.length>1)this.prototype._msXMLHttpObjects=[prtcls[i]];break;}}
catch(e){}}}
this.request=req;this.url;this.data=null;this.query='';this.timeoutTimer=null;this.localMode=Boolean(window.location.href.search(/^file:/i)==0);this.error=0;}
Terminal.prototype._HttpSocket.prototype={version:'1.02',useXMLEncoding:false,defaulTimeout:10000,defaultMethod:'GET',forceNewline:true,errno:{OK:0,NOTIMPLEMENTED:1,FATALERROR:2,TIMEOUT:3,NETWORKERROR:4,LOCALFILEERROR:5},errstring:['','XMLHttpRequest not implemented.','Could not open XMLHttpRequest.','The connection timed out.','Network error.','The requested local document was not found.'],_msXMLHttpObjects:['Msxml2.XMLHTTP','Microsoft.XMLHTTP','Msxml2.XMLHTTP.5.0','Msxml2.XMLHTTP.4.0','Msxml2.XMLHTTP.3.0'],serializeData:function(){this.query=this.serialize(this.data);},serialize:function(data){var v='';if(data!=null){switch(typeof data){case'object':var d=[];if(data instanceof Array){for(var i=0;i<data.length;i++){d.push(this.serialize(data[i]));}
v=d.join(',');break;}
for(var i in data){switch(typeof data[i]){case'object':d.push(encodeURIComponent(i)+'='+this.serialize(data[i]));break;default:d.push(encodeURIComponent(i)+'='+encodeURIComponent(data[i]));break;}}
v=(this.useXMLEncoding)?d.join(';'):d.join('&');break;case'number':v=String(data);break;case'string':v=encodeURIComponent(data);break;case'boolean':v=(data)?'1':'0';break;}}
return v;},toCamelCase:function(s){if(typeof s!='string')s=String(s);var a=s.toLowerCase().split('-');var cc=a[0];for(var i=1;i<a.length;i++){p=a[i];if(p.length)cc+=p.charAt(0).toUpperCase()+p.substring(1);}
return cc;},callbackHandler:function(){if(this.termRef.closed)return;var r=this.request;if(this.error==0&&r.readyState!=4)return;if(this.timeoutTimer){clearTimeout(this.timeoutTimer);this.timeoutTimer=null;}
var success=false;var failed=true;var response={headers:{},ErrorCodes:this.errno};if(this.localMode){if(this.error&&this.error<this.errno.NETWORKERROR){response.status=0;response.statusText='Connection Error';response.responseText='';response.responseXML=null;}
else if(this.error||r.responseText==null){failed=false;response.status=404;response.statusText='Not Found';response.responseText='The document '+this.url+' was not found on this file system.';response.responseXML=null;this.error=this.errno.LOCALFILEERROR;}
else{success=true;failed=false;response.status=200;response.statusText='OK';response.responseText=r.responseText;response.responseXML=r.responseXML;}}
else{try{if(!this.error){if(typeof r=='object'&&r.status!=undefined){failed=false;if(r.status>=200&&r.status<300){success=true;}
else if(r.status>=12000){failed=true;this.error=this.errno.NETWORKERROR;}}}}
catch(e){}
if(!failed){response.status=r.status;response.statusText=(r.status==404)?'Not Found':r.statusText;response.responseText=r.responseText;response.responseXML=r.responseXML;if(this.getHeaders){if(this.getHeaders instanceof Array){for(var i=0;i<this.getHeaders.length;i++){var h=this.getHeaders[i];try{response.headers[this.toCamelCase(h)]=r.getResponseHeader(h);}
catch(e){}}}
else{for(var h in this.getHeaders){try{response.headers[this.toCamelCase(h)]=r.getResponseHeader(h);}
catch(e){}}}}}
else{response.status=0;response.statusText='Connection Error';response.responseText='';response.responseXML=null;}}
if(this.forceNewline)response.responseText=response.responseText.replace(/\r\n?/g,'\n');response.url=this.url;response.data=this.data;response.query=this.query;response.method=this.method;response.success=success;response.errno=this.error;response.errstring=this.errstring[this.error];var term=this.termRef;term.socket=response;if(this.callback){if(typeof this.callback=='function'){this.callback.apply(term);}
else if(window[this.callback]&&typeof window[this.callback]=='function'){window[this.callback].apply(term);}
else{term._defaultServerCallback();}}
else{term._defaultServerCallback();}
delete term.socket;this.request=null;this.callback=null;},timeoutHandler:function(){this.error=this.errno.TIMEOUT;try{this.request.abort();}
catch(e){}
if(!this.localMode)this.callbackHandler();}}
Terminal.prototype.send=function(opts){var soc=new this._HttpSocket();if(opts){if(typeof opts.method=='string'){switch(opts.method.toLowerCase()){case'post':soc.method='POST';break;case'get':soc.method='GET';break;default:soc.method=soc.defaultMethod.toUpperCase();}}
else{soc.method=soc.defaultMethod;}
if(opts.postbody!=undefined){soc.method='POST';soc.query=opts.postbody;soc.data=opts.data;}
else if(opts.data!=undefined){soc.data=opts.data;soc.serializeData();}
if(opts.url)soc.url=opts.url;if(opts.getHeaders&&typeof opts.getHeaders=='object'){soc.getHeaders=opts.getHeaders;}}
else{opts={}
soc.method=soc.defaultMethod;}
var uri=soc.url;if(soc.method=='GET'){if(soc.query){uri+=(uri.indexOf('?')<0)?'?'+soc.query:(soc.useXMLEncoding)?';'+soc.query:'&'+soc.query;}
if(!soc.localMode){var uniqueparam='_termlib_reqid='+new Date().getTime()+'_'+Math.floor(Math.random()*100000);uri+=(uri.indexOf('?')<0)?'?'+uniqueparam:(soc.useXMLEncoding)?';'+uniqueparam:'&'+uniqueparam;}}
soc.callback=opts.callback;soc.termRef=this;if(!soc.request){soc.error=soc.errno.NOTIMPLEMENTED;soc.callbackHandler();return;}
else{try{if(opts.userid!=undefined){if(opts.password!=undefined){soc.request.open(soc.method,uri,true,opts.userid,opts.password);}
else{soc.request.open(soc.method,uri,true,opts.userid);}}
else{soc.request.open(soc.method,uri,true);}}
catch(e){soc.error=soc.errno.FATALERROR;soc.callbackHandler();return;}
var body=null;if(soc.method=='POST'){try{soc.request.setRequestHeader('Content-Type','application/x-www-form-urlencoded');}
catch(e){}
body=soc.query;}
if(opts.headers&&typeof opts.headers=='objects'){for(var i in opts.headers){try{soc.request.setRequestHeader(i,opts.headers[i]);}
catch(e){}}}
if(opts.mimetype&&soc.request.overrideMimeType){try{soc.request.overrideMimeType(opts.mimetype);soc.request.setRequestHeader('Connection','close');}
catch(e){}}
var timeoutDelay=(opts.timeout&&typeof opts.timeout=='number')?opts.tiomeout:soc.defaulTimeout;soc.request.onreadystatechange=function(){soc.callbackHandler();};try{soc.request.send(body);}
catch(e){if(soc.localMode){soc.request.onreadystatechange=null;soc.request.abort();soc.error=soc.errno.LOCALFILEERROR;}
else{soc.request.onreadystatechange=null;try{soc.request.abort();}
catch(e2){}
soc.error=soc.errno.NETWORKERROR;}
soc.callbackHandler();return true;}
soc.timeoutTimer=setTimeout(function(){soc.timeoutHandler()},timeoutDelay);}}
Terminal.prototype._defaultServerCallback=function(){if(this.socket.success){this.write('Server Response:%n'+this.socket.responseText,true);}
else{var s='Request failed: '+this.socket.status+' '+this.socket.statusText;if(this.socket.errno)s+='%n'+this.socket.errstring;this.write(s);this.prompt();}}

// Sometimes an existing Module object exists with properties
// meant to overwrite the default module functionality. Here
// we collect those properties and reapply _after_ we configure
// the current environment's defaults to avoid having to be so
// defensive during initialization.
var moduleOverrides = Object.assign({}, Module);

var arguments_ = [];
var thisProgram = './this.program';
var quit_ = (status, toThrow) => {
  throw toThrow;
};

// Determine the runtime environment we are in. You can customize this by
// setting the ENVIRONMENT setting at compile time (see settings.js).

// Attempt to auto-detect the environment
var ENVIRONMENT_IS_WEB = typeof window == 'object';
var ENVIRONMENT_IS_WORKER = typeof importScripts == 'function';
// N.b. Electron.js environment is simultaneously a NODE-environment, but
// also a web environment.
var ENVIRONMENT_IS_NODE = typeof process == 'object' && typeof process.versions == 'object' && typeof process.versions.node == 'string';
var ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;

if (Module['ENVIRONMENT']) {
  throw new Error('Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -s ENVIRONMENT=web or -s ENVIRONMENT=node)');
}

// `/` should be present at the end if `scriptDirectory` is not empty
var scriptDirectory = '';
function locateFile(path) {
  if (Module['locateFile']) {
    return Module['locateFile'](path, scriptDirectory);
  }
  return scriptDirectory + path;
}

// Hooks that are implemented differently in different runtime environments.
var read_,
    readAsync,
    readBinary,
    setWindowTitle;

// Normally we don't log exceptions but instead let them bubble out the top
// level where the embedding environment (e.g. the browser) can handle
// them.
// However under v8 and node we sometimes exit the process direcly in which case
// its up to use us to log the exception before exiting.
// If we fix https://github.com/emscripten-core/emscripten/issues/15080
// this may no longer be needed under node.
function logExceptionOnExit(e) {
  if (e instanceof ExitStatus) return;
  let toLog = e;
  if (e && typeof e == 'object' && e.stack) {
    toLog = [e, e.stack];
  }
  err('exiting due to exception: ' + toLog);
}

var fs;
var nodePath;
var requireNodeFS;

if (ENVIRONMENT_IS_NODE) {
  if (!(typeof process == 'object' && typeof require == 'function')) throw new Error('not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)');
  if (ENVIRONMENT_IS_WORKER) {
    scriptDirectory = require('path').dirname(scriptDirectory) + '/';
  } else {
    scriptDirectory = __dirname + '/';
  }

// include: node_shell_read.js


requireNodeFS = () => {
  // Use nodePath as the indicator for these not being initialized,
  // since in some environments a global fs may have already been
  // created.
  if (!nodePath) {
    fs = require('fs');
    nodePath = require('path');
  }
};

read_ = function shell_read(filename, binary) {
  var ret = tryParseAsDataURI(filename);
  if (ret) {
    return binary ? ret : ret.toString();
  }
  requireNodeFS();
  filename = nodePath['normalize'](filename);
  return fs.readFileSync(filename, binary ? undefined : 'utf8');
};

readBinary = (filename) => {
  var ret = read_(filename, true);
  if (!ret.buffer) {
    ret = new Uint8Array(ret);
  }
  assert(ret.buffer);
  return ret;
};

readAsync = (filename, onload, onerror) => {
  var ret = tryParseAsDataURI(filename);
  if (ret) {
    onload(ret);
  }
  requireNodeFS();
  filename = nodePath['normalize'](filename);
  fs.readFile(filename, function(err, data) {
    if (err) onerror(err);
    else onload(data.buffer);
  });
};

// end include: node_shell_read.js
  if (process['argv'].length > 1) {
    thisProgram = process['argv'][1].replace(/\\/g, '/');
  }

  arguments_ = process['argv'].slice(2);

  if (typeof module != 'undefined') {
    module['exports'] = Module;
  }

  process['on']('uncaughtException', function(ex) {
    // suppress ExitStatus exceptions from showing an error
    if (!(ex instanceof ExitStatus)) {
      throw ex;
    }
  });

  // Without this older versions of node (< v15) will log unhandled rejections
  // but return 0, which is not normally the desired behaviour.  This is
  // not be needed with node v15 and about because it is now the default
  // behaviour:
  // See https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode
  process['on']('unhandledRejection', function(reason) { throw reason; });

  quit_ = (status, toThrow) => {
    if (keepRuntimeAlive()) {
      process['exitCode'] = status;
      throw toThrow;
    }
    logExceptionOnExit(toThrow);
    process['exit'](status);
  };

  Module['inspect'] = function () { return '[Emscripten Module object]'; };

} else
if (ENVIRONMENT_IS_SHELL) {

  if ((typeof process == 'object' && typeof require === 'function') || typeof window == 'object' || typeof importScripts == 'function') throw new Error('not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)');

  if (typeof read != 'undefined') {
    read_ = function shell_read(f) {
      const data = tryParseAsDataURI(f);
      if (data) {
        return intArrayToString(data);
      }
      return read(f);
    };
  }

  readBinary = function readBinary(f) {
    let data;
    data = tryParseAsDataURI(f);
    if (data) {
      return data;
    }
    if (typeof readbuffer == 'function') {
      return new Uint8Array(readbuffer(f));
    }
    data = read(f, 'binary');
    assert(typeof data == 'object');
    return data;
  };

  readAsync = function readAsync(f, onload, onerror) {
    setTimeout(() => onload(readBinary(f)), 0);
  };

  if (typeof scriptArgs != 'undefined') {
    arguments_ = scriptArgs;
  } else if (typeof arguments != 'undefined') {
    arguments_ = arguments;
  }

  if (typeof quit == 'function') {
    quit_ = (status, toThrow) => {
      // Unlike node which has process.exitCode, d8 has no such mechanism. So we
      // have no way to set the exit code and then let the program exit with
      // that code when it naturally stops running (say, when all setTimeouts
      // have completed). For that reason we must call `quit` - the only way to
      // set the exit code - but quit also halts immediately, so we need to be
      // careful of whether the runtime is alive or not, which is why this code
      // path looks different than node. It also has the downside that it will
      // halt the entire program when no code remains to run, which means this
      // is not friendly for bundling this code into a larger codebase, and for
      // that reason the "shell" environment is mainly useful for testing whole
      // programs by themselves, basically.
      if (runtimeKeepaliveCounter) {
        throw toThrow;
      }
      logExceptionOnExit(toThrow);
      quit(status);
    };
  }

  if (typeof print != 'undefined') {
    // Prefer to use print/printErr where they exist, as they usually work better.
    if (typeof console == 'undefined') console = /** @type{!Console} */({});
    console.log = /** @type{!function(this:Console, ...*): undefined} */ (print);
    console.warn = console.error = /** @type{!function(this:Console, ...*): undefined} */ (typeof printErr != 'undefined' ? printErr : print);
  }

} else

// Note that this includes Node.js workers when relevant (pthreads is enabled).
// Node.js workers are detected as a combination of ENVIRONMENT_IS_WORKER and
// ENVIRONMENT_IS_NODE.
if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
  if (ENVIRONMENT_IS_WORKER) { // Check worker, not web, since window could be polyfilled
    scriptDirectory = self.location.href;
  } else if (typeof document != 'undefined' && document.currentScript) { // web
    scriptDirectory = document.currentScript.src;
  }
  // blob urls look like blob:http://site.com/etc/etc and we cannot infer anything from them.
  // otherwise, slice off the final part of the url to find the script directory.
  // if scriptDirectory does not contain a slash, lastIndexOf will return -1,
  // and scriptDirectory will correctly be replaced with an empty string.
  // If scriptDirectory contains a query (starting with ?) or a fragment (starting with #),
  // they are removed because they could contain a slash.
  if (scriptDirectory.indexOf('blob:') !== 0) {
    scriptDirectory = scriptDirectory.substr(0, scriptDirectory.replace(/[?#].*/, "").lastIndexOf('/')+1);
  } else {
    scriptDirectory = '';
  }

  if (!(typeof window == 'object' || typeof importScripts == 'function')) throw new Error('not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)');

  // Differentiate the Web Worker from the Node Worker case, as reading must
  // be done differently.
  {
// include: web_or_worker_shell_read.js


  read_ = (url) => {
    try {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, false);
      xhr.send(null);
      return xhr.responseText;
    } catch (err) {
      var data = tryParseAsDataURI(url);
      if (data) {
        return intArrayToString(data);
      }
      throw err;
    }
  }

  if (ENVIRONMENT_IS_WORKER) {
    readBinary = (url) => {
      try {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.responseType = 'arraybuffer';
        xhr.send(null);
        return new Uint8Array(/** @type{!ArrayBuffer} */(xhr.response));
      } catch (err) {
        var data = tryParseAsDataURI(url);
        if (data) {
          return data;
        }
        throw err;
      }
    };
  }

  readAsync = (url, onload, onerror) => {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = () => {
      if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
        onload(xhr.response);
        return;
      }
      var data = tryParseAsDataURI(url);
      if (data) {
        onload(data.buffer);
        return;
      }
      onerror();
    };
    xhr.onerror = onerror;
    xhr.send(null);
  }

// end include: web_or_worker_shell_read.js
  }

  setWindowTitle = (title) => document.title = title;
} else
{
  throw new Error('environment detection error');
}

var out = Module['print'] || console.log.bind(console);
var err = Module['printErr'] || console.warn.bind(console);

// Merge back in the overrides
Object.assign(Module, moduleOverrides);
// Free the object hierarchy contained in the overrides, this lets the GC
// reclaim data used e.g. in memoryInitializerRequest, which is a large typed array.
moduleOverrides = null;
checkIncomingModuleAPI();

// Emit code to handle expected values on the Module object. This applies Module.x
// to the proper local x. This has two benefits: first, we only emit it if it is
// expected to arrive, and second, by using a local everywhere else that can be
// minified.

if (Module['arguments']) arguments_ = Module['arguments'];legacyModuleProp('arguments', 'arguments_');

if (Module['thisProgram']) thisProgram = Module['thisProgram'];legacyModuleProp('thisProgram', 'thisProgram');

if (Module['quit']) quit_ = Module['quit'];legacyModuleProp('quit', 'quit_');

// perform assertions in shell.js after we set up out() and err(), as otherwise if an assertion fails it cannot print the message
// Assertions on removed incoming Module JS APIs.
assert(typeof Module['memoryInitializerPrefixURL'] == 'undefined', 'Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['pthreadMainPrefixURL'] == 'undefined', 'Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['cdInitializerPrefixURL'] == 'undefined', 'Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['filePackagePrefixURL'] == 'undefined', 'Module.filePackagePrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['read'] == 'undefined', 'Module.read option was removed (modify read_ in JS)');
assert(typeof Module['readAsync'] == 'undefined', 'Module.readAsync option was removed (modify readAsync in JS)');
assert(typeof Module['readBinary'] == 'undefined', 'Module.readBinary option was removed (modify readBinary in JS)');
assert(typeof Module['setWindowTitle'] == 'undefined', 'Module.setWindowTitle option was removed (modify setWindowTitle in JS)');
assert(typeof Module['TOTAL_MEMORY'] == 'undefined', 'Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY');
legacyModuleProp('read', 'read_');
legacyModuleProp('readAsync', 'readAsync');
legacyModuleProp('readBinary', 'readBinary');
legacyModuleProp('setWindowTitle', 'setWindowTitle');
var IDBFS = 'IDBFS is no longer included by default; build with -lidbfs.js';
var PROXYFS = 'PROXYFS is no longer included by default; build with -lproxyfs.js';
var WORKERFS = 'WORKERFS is no longer included by default; build with -lworkerfs.js';
var NODEFS = 'NODEFS is no longer included by default; build with -lnodefs.js';
function alignMemory() { abort('`alignMemory` is now a library function and not included by default; add it to your library.js __deps or to DEFAULT_LIBRARY_FUNCS_TO_INCLUDE on the command line'); }

assert(!ENVIRONMENT_IS_SHELL, "shell environment detected but not enabled at build time.  Add 'shell' to `-s ENVIRONMENT` to enable.");




var STACK_ALIGN = 16;
var POINTER_SIZE = 4;

function getNativeTypeSize(type) {
  switch (type) {
    case 'i1': case 'i8': return 1;
    case 'i16': return 2;
    case 'i32': return 4;
    case 'i64': return 8;
    case 'float': return 4;
    case 'double': return 8;
    default: {
      if (type[type.length - 1] === '*') {
        return POINTER_SIZE;
      } else if (type[0] === 'i') {
        const bits = Number(type.substr(1));
        assert(bits % 8 === 0, 'getNativeTypeSize invalid bits ' + bits + ', type ' + type);
        return bits / 8;
      } else {
        return 0;
      }
    }
  }
}

function warnOnce(text) {
  if (!warnOnce.shown) warnOnce.shown = {};
  if (!warnOnce.shown[text]) {
    warnOnce.shown[text] = 1;
    err(text);
  }
}

// include: runtime_functions.js


// Wraps a JS function as a wasm function with a given signature.
function convertJsFunctionToWasm(func, sig) {

  // If the type reflection proposal is available, use the new
  // "WebAssembly.Function" constructor.
  // Otherwise, construct a minimal wasm module importing the JS function and
  // re-exporting it.
  if (typeof WebAssembly.Function == "function") {
    var typeNames = {
      'i': 'i32',
      'j': 'i64',
      'f': 'f32',
      'd': 'f64'
    };
    var type = {
      parameters: [],
      results: sig[0] == 'v' ? [] : [typeNames[sig[0]]]
    };
    for (var i = 1; i < sig.length; ++i) {
      type.parameters.push(typeNames[sig[i]]);
    }
    return new WebAssembly.Function(type, func);
  }

  // The module is static, with the exception of the type section, which is
  // generated based on the signature passed in.
  var typeSection = [
    0x01, // id: section,
    0x00, // length: 0 (placeholder)
    0x01, // count: 1
    0x60, // form: func
  ];
  var sigRet = sig.slice(0, 1);
  var sigParam = sig.slice(1);
  var typeCodes = {
    'i': 0x7f, // i32
    'j': 0x7e, // i64
    'f': 0x7d, // f32
    'd': 0x7c, // f64
  };

  // Parameters, length + signatures
  typeSection.push(sigParam.length);
  for (var i = 0; i < sigParam.length; ++i) {
    typeSection.push(typeCodes[sigParam[i]]);
  }

  // Return values, length + signatures
  // With no multi-return in MVP, either 0 (void) or 1 (anything else)
  if (sigRet == 'v') {
    typeSection.push(0x00);
  } else {
    typeSection = typeSection.concat([0x01, typeCodes[sigRet]]);
  }

  // Write the overall length of the type section back into the section header
  // (excepting the 2 bytes for the section id and length)
  typeSection[1] = typeSection.length - 2;

  // Rest of the module is static
  var bytes = new Uint8Array([
    0x00, 0x61, 0x73, 0x6d, // magic ("\0asm")
    0x01, 0x00, 0x00, 0x00, // version: 1
  ].concat(typeSection, [
    0x02, 0x07, // import section
      // (import "e" "f" (func 0 (type 0)))
      0x01, 0x01, 0x65, 0x01, 0x66, 0x00, 0x00,
    0x07, 0x05, // export section
      // (export "f" (func 0 (type 0)))
      0x01, 0x01, 0x66, 0x00, 0x00,
  ]));

   // We can compile this wasm module synchronously because it is very small.
  // This accepts an import (at "e.f"), that it reroutes to an export (at "f")
  var module = new WebAssembly.Module(bytes);
  var instance = new WebAssembly.Instance(module, {
    'e': {
      'f': func
    }
  });
  var wrappedFunc = instance.exports['f'];
  return wrappedFunc;
}

var freeTableIndexes = [];

// Weak map of functions in the table to their indexes, created on first use.
var functionsInTableMap;

function getEmptyTableSlot() {
  // Reuse a free index if there is one, otherwise grow.
  if (freeTableIndexes.length) {
    return freeTableIndexes.pop();
  }
  // Grow the table
  try {
    wasmTable.grow(1);
  } catch (err) {
    if (!(err instanceof RangeError)) {
      throw err;
    }
    throw 'Unable to grow wasm table. Set ALLOW_TABLE_GROWTH.';
  }
  return wasmTable.length - 1;
}

function updateTableMap(offset, count) {
  for (var i = offset; i < offset + count; i++) {
    var item = getWasmTableEntry(i);
    // Ignore null values.
    if (item) {
      functionsInTableMap.set(item, i);
    }
  }
}

/**
 * Add a function to the table.
 * 'sig' parameter is required if the function being added is a JS function.
 * @param {string=} sig
 */
function addFunction(func, sig) {
  assert(typeof func != 'undefined');

  // Check if the function is already in the table, to ensure each function
  // gets a unique index. First, create the map if this is the first use.
  if (!functionsInTableMap) {
    functionsInTableMap = new WeakMap();
    updateTableMap(0, wasmTable.length);
  }
  if (functionsInTableMap.has(func)) {
    return functionsInTableMap.get(func);
  }

  // It's not in the table, add it now.

  var ret = getEmptyTableSlot();

  // Set the new value.
  try {
    // Attempting to call this with JS function will cause of table.set() to fail
    setWasmTableEntry(ret, func);
  } catch (err) {
    if (!(err instanceof TypeError)) {
      throw err;
    }
    assert(typeof sig != 'undefined', 'Missing signature argument to addFunction: ' + func);
    var wrapped = convertJsFunctionToWasm(func, sig);
    setWasmTableEntry(ret, wrapped);
  }

  functionsInTableMap.set(func, ret);

  return ret;
}

function removeFunction(index) {
  functionsInTableMap.delete(getWasmTableEntry(index));
  freeTableIndexes.push(index);
}

// end include: runtime_functions.js
// include: runtime_debug.js


function legacyModuleProp(prop, newName) {
  if (!Object.getOwnPropertyDescriptor(Module, prop)) {
    Object.defineProperty(Module, prop, {
      configurable: true,
      get: function() {
        abort('Module.' + prop + ' has been replaced with plain ' + newName + ' (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)');
      }
    });
  }
}

function ignoredModuleProp(prop) {
  if (Object.getOwnPropertyDescriptor(Module, prop)) {
    abort('`Module.' + prop + '` was supplied but `' + prop + '` not included in INCOMING_MODULE_JS_API');
  }
}

function unexportedMessage(sym, isFSSybol) {
  var msg = "'" + sym + "' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)";
  if (isFSSybol) {
    msg += '. Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you';
  }
  return msg;
}

function unexportedRuntimeSymbol(sym, isFSSybol) {
  if (!Object.getOwnPropertyDescriptor(Module, sym)) {
    Object.defineProperty(Module, sym, {
      configurable: true,
      get: function() {
        abort(unexportedMessage(sym, isFSSybol));
      }
    });
  }
}

function unexportedRuntimeFunction(sym, isFSSybol) {
  if (!Object.getOwnPropertyDescriptor(Module, sym)) {
    Module[sym] = () => abort(unexportedMessage(sym, isFSSybol));
  }
}

// end include: runtime_debug.js
var tempRet0 = 0;
var setTempRet0 = (value) => { tempRet0 = value; };
var getTempRet0 = () => tempRet0;



// === Preamble library stuff ===

// Documentation for the public APIs defined in this file must be updated in:
//    site/source/docs/api_reference/preamble.js.rst
// A prebuilt local version of the documentation is available at:
//    site/build/text/docs/api_reference/preamble.js.txt
// You can also build docs locally as HTML or other formats in site/
// An online HTML version (which may be of a different version of Emscripten)
//    is up at http://kripken.github.io/emscripten-site/docs/api_reference/preamble.js.html

var wasmBinary;
if (Module['wasmBinary']) wasmBinary = Module['wasmBinary'];legacyModuleProp('wasmBinary', 'wasmBinary');
var noExitRuntime = Module['noExitRuntime'] || true;legacyModuleProp('noExitRuntime', 'noExitRuntime');

if (typeof WebAssembly != 'object') {
  abort('no native wasm support detected');
}

// include: runtime_safe_heap.js


// In MINIMAL_RUNTIME, setValue() and getValue() are only available when building with safe heap enabled, for heap safety checking.
// In traditional runtime, setValue() and getValue() are always available (although their use is highly discouraged due to perf penalties)

/** @param {number} ptr
    @param {number} value
    @param {string} type
    @param {number|boolean=} noSafe */
function setValue(ptr, value, type = 'i8', noSafe) {
  if (type.charAt(type.length-1) === '*') type = 'i32';
    switch (type) {
      case 'i1': HEAP8[((ptr)>>0)] = value; break;
      case 'i8': HEAP8[((ptr)>>0)] = value; break;
      case 'i16': HEAP16[((ptr)>>1)] = value; break;
      case 'i32': HEAP32[((ptr)>>2)] = value; break;
      case 'i64': (tempI64 = [value>>>0,(tempDouble=value,(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math.min((+(Math.floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],HEAP32[((ptr)>>2)] = tempI64[0],HEAP32[(((ptr)+(4))>>2)] = tempI64[1]); break;
      case 'float': HEAPF32[((ptr)>>2)] = value; break;
      case 'double': HEAPF64[((ptr)>>3)] = value; break;
      default: abort('invalid type for setValue: ' + type);
    }
}

/** @param {number} ptr
    @param {string} type
    @param {number|boolean=} noSafe */
function getValue(ptr, type = 'i8', noSafe) {
  if (type.charAt(type.length-1) === '*') type = 'i32';
    switch (type) {
      case 'i1': return HEAP8[((ptr)>>0)];
      case 'i8': return HEAP8[((ptr)>>0)];
      case 'i16': return HEAP16[((ptr)>>1)];
      case 'i32': return HEAP32[((ptr)>>2)];
      case 'i64': return HEAP32[((ptr)>>2)];
      case 'float': return HEAPF32[((ptr)>>2)];
      case 'double': return Number(HEAPF64[((ptr)>>3)]);
      default: abort('invalid type for getValue: ' + type);
    }
  return null;
}

// end include: runtime_safe_heap.js
// Wasm globals

var wasmMemory;

//========================================
// Runtime essentials
//========================================

// whether we are quitting the application. no code should run after this.
// set in exit() and abort()
var ABORT = false;

// set by exit() and abort().  Passed to 'onExit' handler.
// NOTE: This is also used as the process return code code in shell environments
// but only when noExitRuntime is false.
var EXITSTATUS;

/** @type {function(*, string=)} */
function assert(condition, text) {
  if (!condition) {
    abort('Assertion failed' + (text ? ': ' + text : ''));
  }
}

// Returns the C function with a specified identifier (for C++, you need to do manual name mangling)
function getCFunc(ident) {
  var func = Module['_' + ident]; // closure exported function
  assert(func, 'Cannot call unknown function ' + ident + ', make sure it is exported');
  return func;
}

// C calling interface.
/** @param {string|null=} returnType
    @param {Array=} argTypes
    @param {Arguments|Array=} args
    @param {Object=} opts */
function ccall(ident, returnType, argTypes, args, opts) {
  // For fast lookup of conversion functions
  var toC = {
    'string': function(str) {
      var ret = 0;
      if (str !== null && str !== undefined && str !== 0) { // null string
        // at most 4 bytes per UTF-8 code point, +1 for the trailing '\0'
        var len = (str.length << 2) + 1;
        ret = stackAlloc(len);
        stringToUTF8(str, ret, len);
      }
      return ret;
    },
    'array': function(arr) {
      var ret = stackAlloc(arr.length);
      writeArrayToMemory(arr, ret);
      return ret;
    }
  };

  function convertReturnValue(ret) {
    if (returnType === 'string') return UTF8ToString(ret);
    if (returnType === 'boolean') return Boolean(ret);
    return ret;
  }

  var func = getCFunc(ident);
  var cArgs = [];
  var stack = 0;
  assert(returnType !== 'array', 'Return type should not be "array".');
  if (args) {
    for (var i = 0; i < args.length; i++) {
      var converter = toC[argTypes[i]];
      if (converter) {
        if (stack === 0) stack = stackSave();
        cArgs[i] = converter(args[i]);
      } else {
        cArgs[i] = args[i];
      }
    }
  }
  var ret = func.apply(null, cArgs);
  function onDone(ret) {
    if (stack !== 0) stackRestore(stack);
    return convertReturnValue(ret);
  }

  ret = onDone(ret);
  return ret;
}

/** @param {string=} returnType
    @param {Array=} argTypes
    @param {Object=} opts */
function cwrap(ident, returnType, argTypes, opts) {
  return function() {
    return ccall(ident, returnType, argTypes, arguments, opts);
  }
}

// We used to include malloc/free by default in the past. Show a helpful error in
// builds with assertions.
function _malloc() {
  abort("malloc() called but not included in the build - add '_malloc' to EXPORTED_FUNCTIONS");
}
function _free() {
  // Show a helpful error since we used to include free by default in the past.
  abort("free() called but not included in the build - add '_free' to EXPORTED_FUNCTIONS");
}

// include: runtime_legacy.js


var ALLOC_NORMAL = 0; // Tries to use _malloc()
var ALLOC_STACK = 1; // Lives for the duration of the current function call

/**
 * allocate(): This function is no longer used by emscripten but is kept around to avoid
 *             breaking external users.
 *             You should normally not use allocate(), and instead allocate
 *             memory using _malloc()/stackAlloc(), initialize it with
 *             setValue(), and so forth.
 * @param {(Uint8Array|Array<number>)} slab: An array of data.
 * @param {number=} allocator : How to allocate memory, see ALLOC_*
 */
function allocate(slab, allocator) {
  var ret;
  assert(typeof allocator == 'number', 'allocate no longer takes a type argument')
  assert(typeof slab != 'number', 'allocate no longer takes a number as arg0')

  if (allocator == ALLOC_STACK) {
    ret = stackAlloc(slab.length);
  } else {
    ret = abort('malloc was not included, but is needed in allocate. Adding "_malloc" to EXPORTED_FUNCTIONS should fix that. This may be a bug in the compiler, please file an issue.');;
  }

  if (!slab.subarray && !slab.slice) {
    slab = new Uint8Array(slab);
  }
  HEAPU8.set(slab, ret);
  return ret;
}

// end include: runtime_legacy.js
// include: runtime_strings.js


// runtime_strings.js: Strings related runtime functions that are part of both MINIMAL_RUNTIME and regular runtime.

// Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the given array that contains uint8 values, returns
// a copy of that string as a Javascript String object.

var UTF8Decoder = typeof TextDecoder != 'undefined' ? new TextDecoder('utf8') : undefined;

/**
 * @param {number} idx
 * @param {number=} maxBytesToRead
 * @return {string}
 */
function UTF8ArrayToString(heap, idx, maxBytesToRead) {
  var endIdx = idx + maxBytesToRead;
  var endPtr = idx;
  // TextDecoder needs to know the byte length in advance, it doesn't stop on null terminator by itself.
  // Also, use the length info to avoid running tiny strings through TextDecoder, since .subarray() allocates garbage.
  // (As a tiny code save trick, compare endPtr against endIdx using a negation, so that undefined means Infinity)
  while (heap[endPtr] && !(endPtr >= endIdx)) ++endPtr;

  if (endPtr - idx > 16 && heap.subarray && UTF8Decoder) {
    return UTF8Decoder.decode(heap.subarray(idx, endPtr));
  } else {
    var str = '';
    // If building with TextDecoder, we have already computed the string length above, so test loop end condition against that
    while (idx < endPtr) {
      // For UTF8 byte structure, see:
      // http://en.wikipedia.org/wiki/UTF-8#Description
      // https://www.ietf.org/rfc/rfc2279.txt
      // https://tools.ietf.org/html/rfc3629
      var u0 = heap[idx++];
      if (!(u0 & 0x80)) { str += String.fromCharCode(u0); continue; }
      var u1 = heap[idx++] & 63;
      if ((u0 & 0xE0) == 0xC0) { str += String.fromCharCode(((u0 & 31) << 6) | u1); continue; }
      var u2 = heap[idx++] & 63;
      if ((u0 & 0xF0) == 0xE0) {
        u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
      } else {
        if ((u0 & 0xF8) != 0xF0) warnOnce('Invalid UTF-8 leading byte 0x' + u0.toString(16) + ' encountered when deserializing a UTF-8 string in wasm memory to a JS string!');
        u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (heap[idx++] & 63);
      }

      if (u0 < 0x10000) {
        str += String.fromCharCode(u0);
      } else {
        var ch = u0 - 0x10000;
        str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
      }
    }
  }
  return str;
}

// Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the emscripten HEAP, returns a
// copy of that string as a Javascript String object.
// maxBytesToRead: an optional length that specifies the maximum number of bytes to read. You can omit
//                 this parameter to scan the string until the first \0 byte. If maxBytesToRead is
//                 passed, and the string at [ptr, ptr+maxBytesToReadr[ contains a null byte in the
//                 middle, then the string will cut short at that byte index (i.e. maxBytesToRead will
//                 not produce a string of exact length [ptr, ptr+maxBytesToRead[)
//                 N.B. mixing frequent uses of UTF8ToString() with and without maxBytesToRead may
//                 throw JS JIT optimizations off, so it is worth to consider consistently using one
//                 style or the other.
/**
 * @param {number} ptr
 * @param {number=} maxBytesToRead
 * @return {string}
 */
function UTF8ToString(ptr, maxBytesToRead) {
  ;
  return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : '';
}

// Copies the given Javascript String object 'str' to the given byte array at address 'outIdx',
// encoded in UTF8 form and null-terminated. The copy will require at most str.length*4+1 bytes of space in the HEAP.
// Use the function lengthBytesUTF8 to compute the exact number of bytes (excluding null terminator) that this function will write.
// Parameters:
//   str: the Javascript string to copy.
//   heap: the array to copy to. Each index in this array is assumed to be one 8-byte element.
//   outIdx: The starting offset in the array to begin the copying.
//   maxBytesToWrite: The maximum number of bytes this function can write to the array.
//                    This count should include the null terminator,
//                    i.e. if maxBytesToWrite=1, only the null terminator will be written and nothing else.
//                    maxBytesToWrite=0 does not write any bytes to the output, not even the null terminator.
// Returns the number of bytes written, EXCLUDING the null terminator.

function stringToUTF8Array(str, heap, outIdx, maxBytesToWrite) {
  if (!(maxBytesToWrite > 0)) // Parameter maxBytesToWrite is not optional. Negative values, 0, null, undefined and false each don't write out any bytes.
    return 0;

  var startIdx = outIdx;
  var endIdx = outIdx + maxBytesToWrite - 1; // -1 for string null terminator.
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! So decode UTF16->UTF32->UTF8.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    // For UTF8 byte structure, see http://en.wikipedia.org/wiki/UTF-8#Description and https://www.ietf.org/rfc/rfc2279.txt and https://tools.ietf.org/html/rfc3629
    var u = str.charCodeAt(i); // possibly a lead surrogate
    if (u >= 0xD800 && u <= 0xDFFF) {
      var u1 = str.charCodeAt(++i);
      u = 0x10000 + ((u & 0x3FF) << 10) | (u1 & 0x3FF);
    }
    if (u <= 0x7F) {
      if (outIdx >= endIdx) break;
      heap[outIdx++] = u;
    } else if (u <= 0x7FF) {
      if (outIdx + 1 >= endIdx) break;
      heap[outIdx++] = 0xC0 | (u >> 6);
      heap[outIdx++] = 0x80 | (u & 63);
    } else if (u <= 0xFFFF) {
      if (outIdx + 2 >= endIdx) break;
      heap[outIdx++] = 0xE0 | (u >> 12);
      heap[outIdx++] = 0x80 | ((u >> 6) & 63);
      heap[outIdx++] = 0x80 | (u & 63);
    } else {
      if (outIdx + 3 >= endIdx) break;
      if (u > 0x10FFFF) warnOnce('Invalid Unicode code point 0x' + u.toString(16) + ' encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF).');
      heap[outIdx++] = 0xF0 | (u >> 18);
      heap[outIdx++] = 0x80 | ((u >> 12) & 63);
      heap[outIdx++] = 0x80 | ((u >> 6) & 63);
      heap[outIdx++] = 0x80 | (u & 63);
    }
  }
  // Null-terminate the pointer to the buffer.
  heap[outIdx] = 0;
  return outIdx - startIdx;
}

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF8 form. The copy will require at most str.length*4+1 bytes of space in the HEAP.
// Use the function lengthBytesUTF8 to compute the exact number of bytes (excluding null terminator) that this function will write.
// Returns the number of bytes written, EXCLUDING the null terminator.

function stringToUTF8(str, outPtr, maxBytesToWrite) {
  assert(typeof maxBytesToWrite == 'number', 'stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
  return stringToUTF8Array(str, HEAPU8,outPtr, maxBytesToWrite);
}

// Returns the number of bytes the given Javascript string takes if encoded as a UTF8 byte array, EXCLUDING the null terminator byte.
function lengthBytesUTF8(str) {
  var len = 0;
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! So decode UTF16->UTF32->UTF8.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    var u = str.charCodeAt(i); // possibly a lead surrogate
    if (u >= 0xD800 && u <= 0xDFFF) u = 0x10000 + ((u & 0x3FF) << 10) | (str.charCodeAt(++i) & 0x3FF);
    if (u <= 0x7F) ++len;
    else if (u <= 0x7FF) len += 2;
    else if (u <= 0xFFFF) len += 3;
    else len += 4;
  }
  return len;
}

// end include: runtime_strings.js
// include: runtime_strings_extra.js


// runtime_strings_extra.js: Strings related runtime functions that are available only in regular runtime.

// Given a pointer 'ptr' to a null-terminated ASCII-encoded string in the emscripten HEAP, returns
// a copy of that string as a Javascript String object.

function AsciiToString(ptr) {
  var str = '';
  while (1) {
    var ch = HEAPU8[((ptr++)>>0)];
    if (!ch) return str;
    str += String.fromCharCode(ch);
  }
}

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in ASCII form. The copy will require at most str.length+1 bytes of space in the HEAP.

function stringToAscii(str, outPtr) {
  return writeAsciiToMemory(str, outPtr, false);
}

// Given a pointer 'ptr' to a null-terminated UTF16LE-encoded string in the emscripten HEAP, returns
// a copy of that string as a Javascript String object.

var UTF16Decoder = typeof TextDecoder != 'undefined' ? new TextDecoder('utf-16le') : undefined;

function UTF16ToString(ptr, maxBytesToRead) {
  assert(ptr % 2 == 0, 'Pointer passed to UTF16ToString must be aligned to two bytes!');
  var endPtr = ptr;
  // TextDecoder needs to know the byte length in advance, it doesn't stop on null terminator by itself.
  // Also, use the length info to avoid running tiny strings through TextDecoder, since .subarray() allocates garbage.
  var idx = endPtr >> 1;
  var maxIdx = idx + maxBytesToRead / 2;
  // If maxBytesToRead is not passed explicitly, it will be undefined, and this
  // will always evaluate to true. This saves on code size.
  while (!(idx >= maxIdx) && HEAPU16[idx]) ++idx;
  endPtr = idx << 1;

  if (endPtr - ptr > 32 && UTF16Decoder) {
    return UTF16Decoder.decode(HEAPU8.subarray(ptr, endPtr));
  } else {
    var str = '';

    // If maxBytesToRead is not passed explicitly, it will be undefined, and the for-loop's condition
    // will always evaluate to true. The loop is then terminated on the first null char.
    for (var i = 0; !(i >= maxBytesToRead / 2); ++i) {
      var codeUnit = HEAP16[(((ptr)+(i*2))>>1)];
      if (codeUnit == 0) break;
      // fromCharCode constructs a character from a UTF-16 code unit, so we can pass the UTF16 string right through.
      str += String.fromCharCode(codeUnit);
    }

    return str;
  }
}

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF16 form. The copy will require at most str.length*4+2 bytes of space in the HEAP.
// Use the function lengthBytesUTF16() to compute the exact number of bytes (excluding null terminator) that this function will write.
// Parameters:
//   str: the Javascript string to copy.
//   outPtr: Byte address in Emscripten HEAP where to write the string to.
//   maxBytesToWrite: The maximum number of bytes this function can write to the array. This count should include the null
//                    terminator, i.e. if maxBytesToWrite=2, only the null terminator will be written and nothing else.
//                    maxBytesToWrite<2 does not write any bytes to the output, not even the null terminator.
// Returns the number of bytes written, EXCLUDING the null terminator.

function stringToUTF16(str, outPtr, maxBytesToWrite) {
  assert(outPtr % 2 == 0, 'Pointer passed to stringToUTF16 must be aligned to two bytes!');
  assert(typeof maxBytesToWrite == 'number', 'stringToUTF16(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
  // Backwards compatibility: if max bytes is not specified, assume unsafe unbounded write is allowed.
  if (maxBytesToWrite === undefined) {
    maxBytesToWrite = 0x7FFFFFFF;
  }
  if (maxBytesToWrite < 2) return 0;
  maxBytesToWrite -= 2; // Null terminator.
  var startPtr = outPtr;
  var numCharsToWrite = (maxBytesToWrite < str.length*2) ? (maxBytesToWrite / 2) : str.length;
  for (var i = 0; i < numCharsToWrite; ++i) {
    // charCodeAt returns a UTF-16 encoded code unit, so it can be directly written to the HEAP.
    var codeUnit = str.charCodeAt(i); // possibly a lead surrogate
    HEAP16[((outPtr)>>1)] = codeUnit;
    outPtr += 2;
  }
  // Null-terminate the pointer to the HEAP.
  HEAP16[((outPtr)>>1)] = 0;
  return outPtr - startPtr;
}

// Returns the number of bytes the given Javascript string takes if encoded as a UTF16 byte array, EXCLUDING the null terminator byte.

function lengthBytesUTF16(str) {
  return str.length*2;
}

function UTF32ToString(ptr, maxBytesToRead) {
  assert(ptr % 4 == 0, 'Pointer passed to UTF32ToString must be aligned to four bytes!');
  var i = 0;

  var str = '';
  // If maxBytesToRead is not passed explicitly, it will be undefined, and this
  // will always evaluate to true. This saves on code size.
  while (!(i >= maxBytesToRead / 4)) {
    var utf32 = HEAP32[(((ptr)+(i*4))>>2)];
    if (utf32 == 0) break;
    ++i;
    // Gotcha: fromCharCode constructs a character from a UTF-16 encoded code (pair), not from a Unicode code point! So encode the code point to UTF-16 for constructing.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    if (utf32 >= 0x10000) {
      var ch = utf32 - 0x10000;
      str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
    } else {
      str += String.fromCharCode(utf32);
    }
  }
  return str;
}

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF32 form. The copy will require at most str.length*4+4 bytes of space in the HEAP.
// Use the function lengthBytesUTF32() to compute the exact number of bytes (excluding null terminator) that this function will write.
// Parameters:
//   str: the Javascript string to copy.
//   outPtr: Byte address in Emscripten HEAP where to write the string to.
//   maxBytesToWrite: The maximum number of bytes this function can write to the array. This count should include the null
//                    terminator, i.e. if maxBytesToWrite=4, only the null terminator will be written and nothing else.
//                    maxBytesToWrite<4 does not write any bytes to the output, not even the null terminator.
// Returns the number of bytes written, EXCLUDING the null terminator.

function stringToUTF32(str, outPtr, maxBytesToWrite) {
  assert(outPtr % 4 == 0, 'Pointer passed to stringToUTF32 must be aligned to four bytes!');
  assert(typeof maxBytesToWrite == 'number', 'stringToUTF32(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
  // Backwards compatibility: if max bytes is not specified, assume unsafe unbounded write is allowed.
  if (maxBytesToWrite === undefined) {
    maxBytesToWrite = 0x7FFFFFFF;
  }
  if (maxBytesToWrite < 4) return 0;
  var startPtr = outPtr;
  var endPtr = startPtr + maxBytesToWrite - 4;
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! We must decode the string to UTF-32 to the heap.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    var codeUnit = str.charCodeAt(i); // possibly a lead surrogate
    if (codeUnit >= 0xD800 && codeUnit <= 0xDFFF) {
      var trailSurrogate = str.charCodeAt(++i);
      codeUnit = 0x10000 + ((codeUnit & 0x3FF) << 10) | (trailSurrogate & 0x3FF);
    }
    HEAP32[((outPtr)>>2)] = codeUnit;
    outPtr += 4;
    if (outPtr + 4 > endPtr) break;
  }
  // Null-terminate the pointer to the HEAP.
  HEAP32[((outPtr)>>2)] = 0;
  return outPtr - startPtr;
}

// Returns the number of bytes the given Javascript string takes if encoded as a UTF16 byte array, EXCLUDING the null terminator byte.

function lengthBytesUTF32(str) {
  var len = 0;
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! We must decode the string to UTF-32 to the heap.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    var codeUnit = str.charCodeAt(i);
    if (codeUnit >= 0xD800 && codeUnit <= 0xDFFF) ++i; // possibly a lead surrogate, so skip over the tail surrogate.
    len += 4;
  }

  return len;
}

// Allocate heap space for a JS string, and write it there.
// It is the responsibility of the caller to free() that memory.
function allocateUTF8(str) {
  var size = lengthBytesUTF8(str) + 1;
  var ret = abort('malloc was not included, but is needed in allocateUTF8. Adding "_malloc" to EXPORTED_FUNCTIONS should fix that. This may be a bug in the compiler, please file an issue.');;
  if (ret) stringToUTF8Array(str, HEAP8, ret, size);
  return ret;
}

// Allocate stack space for a JS string, and write it there.
function allocateUTF8OnStack(str) {
  var size = lengthBytesUTF8(str) + 1;
  var ret = stackAlloc(size);
  stringToUTF8Array(str, HEAP8, ret, size);
  return ret;
}

// Deprecated: This function should not be called because it is unsafe and does not provide
// a maximum length limit of how many bytes it is allowed to write. Prefer calling the
// function stringToUTF8Array() instead, which takes in a maximum length that can be used
// to be secure from out of bounds writes.
/** @deprecated
    @param {boolean=} dontAddNull */
function writeStringToMemory(string, buffer, dontAddNull) {
  warnOnce('writeStringToMemory is deprecated and should not be called! Use stringToUTF8() instead!');

  var /** @type {number} */ lastChar, /** @type {number} */ end;
  if (dontAddNull) {
    // stringToUTF8Array always appends null. If we don't want to do that, remember the
    // character that existed at the location where the null will be placed, and restore
    // that after the write (below).
    end = buffer + lengthBytesUTF8(string);
    lastChar = HEAP8[end];
  }
  stringToUTF8(string, buffer, Infinity);
  if (dontAddNull) HEAP8[end] = lastChar; // Restore the value under the null character.
}

function writeArrayToMemory(array, buffer) {
  assert(array.length >= 0, 'writeArrayToMemory array must have a length (should be an array or typed array)')
  HEAP8.set(array, buffer);
}

/** @param {boolean=} dontAddNull */
function writeAsciiToMemory(str, buffer, dontAddNull) {
  for (var i = 0; i < str.length; ++i) {
    assert(str.charCodeAt(i) === (str.charCodeAt(i) & 0xff));
    HEAP8[((buffer++)>>0)] = str.charCodeAt(i);
  }
  // Null-terminate the pointer to the HEAP.
  if (!dontAddNull) HEAP8[((buffer)>>0)] = 0;
}

// end include: runtime_strings_extra.js
// Memory management

var HEAP,
/** @type {!ArrayBuffer} */
  buffer,
/** @type {!Int8Array} */
  HEAP8,
/** @type {!Uint8Array} */
  HEAPU8,
/** @type {!Int16Array} */
  HEAP16,
/** @type {!Uint16Array} */
  HEAPU16,
/** @type {!Int32Array} */
  HEAP32,
/** @type {!Uint32Array} */
  HEAPU32,
/** @type {!Float32Array} */
  HEAPF32,
/** @type {!Float64Array} */
  HEAPF64;

function updateGlobalBufferAndViews(buf) {
  buffer = buf;
  Module['HEAP8'] = HEAP8 = new Int8Array(buf);
  Module['HEAP16'] = HEAP16 = new Int16Array(buf);
  Module['HEAP32'] = HEAP32 = new Int32Array(buf);
  Module['HEAPU8'] = HEAPU8 = new Uint8Array(buf);
  Module['HEAPU16'] = HEAPU16 = new Uint16Array(buf);
  Module['HEAPU32'] = HEAPU32 = new Uint32Array(buf);
  Module['HEAPF32'] = HEAPF32 = new Float32Array(buf);
  Module['HEAPF64'] = HEAPF64 = new Float64Array(buf);
}

var TOTAL_STACK = 5242880;
if (Module['TOTAL_STACK']) assert(TOTAL_STACK === Module['TOTAL_STACK'], 'the stack size can no longer be determined at runtime')

var INITIAL_MEMORY = Module['INITIAL_MEMORY'] || 16777216;legacyModuleProp('INITIAL_MEMORY', 'INITIAL_MEMORY');

assert(INITIAL_MEMORY >= TOTAL_STACK, 'INITIAL_MEMORY should be larger than TOTAL_STACK, was ' + INITIAL_MEMORY + '! (TOTAL_STACK=' + TOTAL_STACK + ')');

// check for full engine support (use string 'subarray' to avoid closure compiler confusion)
assert(typeof Int32Array != 'undefined' && typeof Float64Array !== 'undefined' && Int32Array.prototype.subarray != undefined && Int32Array.prototype.set != undefined,
       'JS engine does not provide full typed array support');

// If memory is defined in wasm, the user can't provide it.
assert(!Module['wasmMemory'], 'Use of `wasmMemory` detected.  Use -s IMPORTED_MEMORY to define wasmMemory externally');
assert(INITIAL_MEMORY == 16777216, 'Detected runtime INITIAL_MEMORY setting.  Use -s IMPORTED_MEMORY to define wasmMemory dynamically');

// include: runtime_init_table.js
// In regular non-RELOCATABLE mode the table is exported
// from the wasm module and this will be assigned once
// the exports are available.
var wasmTable;

// end include: runtime_init_table.js
// include: runtime_stack_check.js


// Initializes the stack cookie. Called at the startup of main and at the startup of each thread in pthreads mode.
function writeStackCookie() {
  var max = _emscripten_stack_get_end();
  assert((max & 3) == 0);
  // The stack grows downwards
  HEAP32[((max + 4)>>2)] = 0x2135467;
  HEAP32[((max + 8)>>2)] = 0x89BACDFE;
  // Also test the global address 0 for integrity.
  HEAP32[0] = 0x63736d65; /* 'emsc' */
}

function checkStackCookie() {
  if (ABORT) return;
  var max = _emscripten_stack_get_end();
  var cookie1 = HEAPU32[((max + 4)>>2)];
  var cookie2 = HEAPU32[((max + 8)>>2)];
  if (cookie1 != 0x2135467 || cookie2 != 0x89BACDFE) {
    abort('Stack overflow! Stack cookie has been overwritten, expected hex dwords 0x89BACDFE and 0x2135467, but received 0x' + cookie2.toString(16) + ' 0x' + cookie1.toString(16));
  }
  // Also test the global address 0 for integrity.
  if (HEAP32[0] !== 0x63736d65 /* 'emsc' */) abort('Runtime error: The application has corrupted its heap memory area (address zero)!');
}

// end include: runtime_stack_check.js
// include: runtime_assertions.js


// Endianness check
(function() {
  var h16 = new Int16Array(1);
  var h8 = new Int8Array(h16.buffer);
  h16[0] = 0x6373;
  if (h8[0] !== 0x73 || h8[1] !== 0x63) throw 'Runtime error: expected the system to be little-endian! (Run with -s SUPPORT_BIG_ENDIAN=1 to bypass)';
})();

// end include: runtime_assertions.js
var __ATPRERUN__  = []; // functions called before the runtime is initialized
var __ATINIT__    = []; // functions called during startup
var __ATMAIN__    = []; // functions called when main() is to be run
var __ATEXIT__    = []; // functions called during shutdown
var __ATPOSTRUN__ = []; // functions called after the main() is called

var runtimeInitialized = false;
var runtimeExited = false;
var runtimeKeepaliveCounter = 0;

function keepRuntimeAlive() {
  return noExitRuntime || runtimeKeepaliveCounter > 0;
}

function preRun() {

  if (Module['preRun']) {
    if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']];
    while (Module['preRun'].length) {
      addOnPreRun(Module['preRun'].shift());
    }
  }

  callRuntimeCallbacks(__ATPRERUN__);
}

function initRuntime() {
  checkStackCookie();
  assert(!runtimeInitialized);
  runtimeInitialized = true;

  
  callRuntimeCallbacks(__ATINIT__);
}

function preMain() {
  checkStackCookie();
  
  callRuntimeCallbacks(__ATMAIN__);
}

function exitRuntime() {
  checkStackCookie();
  runtimeExited = true;
}

function postRun() {
  checkStackCookie();

  if (Module['postRun']) {
    if (typeof Module['postRun'] == 'function') Module['postRun'] = [Module['postRun']];
    while (Module['postRun'].length) {
      addOnPostRun(Module['postRun'].shift());
    }
  }

  callRuntimeCallbacks(__ATPOSTRUN__);
}

function addOnPreRun(cb) {
  __ATPRERUN__.unshift(cb);
}

function addOnInit(cb) {
  __ATINIT__.unshift(cb);
}

function addOnPreMain(cb) {
  __ATMAIN__.unshift(cb);
}

function addOnExit(cb) {
}

function addOnPostRun(cb) {
  __ATPOSTRUN__.unshift(cb);
}

// include: runtime_math.js


// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/imul

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/fround

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/clz32

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc

assert(Math.imul, 'This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
assert(Math.fround, 'This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
assert(Math.clz32, 'This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
assert(Math.trunc, 'This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');

// end include: runtime_math.js
// A counter of dependencies for calling run(). If we need to
// do asynchronous work before running, increment this and
// decrement it. Incrementing must happen in a place like
// Module.preRun (used by emcc to add file preloading).
// Note that you can add dependencies in preRun, even though
// it happens right before run - run will be postponed until
// the dependencies are met.
var runDependencies = 0;
var runDependencyWatcher = null;
var dependenciesFulfilled = null; // overridden to take different actions when all run dependencies are fulfilled
var runDependencyTracking = {};

function getUniqueRunDependency(id) {
  var orig = id;
  while (1) {
    if (!runDependencyTracking[id]) return id;
    id = orig + Math.random();
  }
}

function addRunDependency(id) {
  runDependencies++;

  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }

  if (id) {
    assert(!runDependencyTracking[id]);
    runDependencyTracking[id] = 1;
    if (runDependencyWatcher === null && typeof setInterval != 'undefined') {
      // Check for missing dependencies every few seconds
      runDependencyWatcher = setInterval(function() {
        if (ABORT) {
          clearInterval(runDependencyWatcher);
          runDependencyWatcher = null;
          return;
        }
        var shown = false;
        for (var dep in runDependencyTracking) {
          if (!shown) {
            shown = true;
            err('still waiting on run dependencies:');
          }
          err('dependency: ' + dep);
        }
        if (shown) {
          err('(end of list)');
        }
      }, 10000);
    }
  } else {
    err('warning: run dependency added without ID');
  }
}

function removeRunDependency(id) {
  runDependencies--;

  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }

  if (id) {
    assert(runDependencyTracking[id]);
    delete runDependencyTracking[id];
  } else {
    err('warning: run dependency removed without ID');
  }
  if (runDependencies == 0) {
    if (runDependencyWatcher !== null) {
      clearInterval(runDependencyWatcher);
      runDependencyWatcher = null;
    }
    if (dependenciesFulfilled) {
      var callback = dependenciesFulfilled;
      dependenciesFulfilled = null;
      callback(); // can add another dependenciesFulfilled
    }
  }
}

Module["preloadedImages"] = {}; // maps url to image data
Module["preloadedAudios"] = {}; // maps url to audio data

/** @param {string|number=} what */
function abort(what) {
  {
    if (Module['onAbort']) {
      Module['onAbort'](what);
    }
  }

  what = 'Aborted(' + what + ')';
  // TODO(sbc): Should we remove printing and leave it up to whoever
  // catches the exception?
  err(what);

  ABORT = true;
  EXITSTATUS = 1;

  // Use a wasm runtime error, because a JS error might be seen as a foreign
  // exception, which means we'd run destructors on it. We need the error to
  // simply make the program stop.

  // Suppress closure compiler warning here. Closure compiler's builtin extern
  // defintion for WebAssembly.RuntimeError claims it takes no arguments even
  // though it can.
  // TODO(https://github.com/google/closure-compiler/pull/3913): Remove if/when upstream closure gets fixed.

  /** @suppress {checkTypes} */
  var e = new WebAssembly.RuntimeError(what);

  // Throw the error whether or not MODULARIZE is set because abort is used
  // in code paths apart from instantiation where an exception is expected
  // to be thrown when abort is called.
  throw e;
}

// {{MEM_INITIALIZER}}

// include: memoryprofiler.js


// end include: memoryprofiler.js
// show errors on likely calls to FS when it was not included
var FS = {
  error: function() {
    abort('Filesystem support (FS) was not included. The problem is that you are using files from JS, but files were not used from C/C++, so filesystem support was not auto-included. You can force-include filesystem support with  -s FORCE_FILESYSTEM=1');
  },
  init: function() { FS.error() },
  createDataFile: function() { FS.error() },
  createPreloadedFile: function() { FS.error() },
  createLazyFile: function() { FS.error() },
  open: function() { FS.error() },
  mkdev: function() { FS.error() },
  registerDevice: function() { FS.error() },
  analyzePath: function() { FS.error() },
  loadFilesFromDB: function() { FS.error() },

  ErrnoError: function ErrnoError() { FS.error() },
};
Module['FS_createDataFile'] = FS.createDataFile;
Module['FS_createPreloadedFile'] = FS.createPreloadedFile;

// include: URIUtils.js


// Prefix of data URIs emitted by SINGLE_FILE and related options.
var dataURIPrefix = 'data:application/octet-stream;base64,';

// Indicates whether filename is a base64 data URI.
function isDataURI(filename) {
  // Prefix of data URIs emitted by SINGLE_FILE and related options.
  return filename.startsWith(dataURIPrefix);
}

// Indicates whether filename is delivered via file protocol (as opposed to http/https)
function isFileURI(filename) {
  return filename.startsWith('file://');
}

// end include: URIUtils.js
/** @param {boolean=} fixedasm */
function createExportWrapper(name, fixedasm) {
  return function() {
    var displayName = name;
    var asm = fixedasm;
    if (!fixedasm) {
      asm = Module['asm'];
    }
    assert(runtimeInitialized, 'native function `' + displayName + '` called before runtime initialization');
    assert(!runtimeExited, 'native function `' + displayName + '` called after runtime exit (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
    if (!asm[name]) {
      assert(asm[name], 'exported native function `' + displayName + '` not found');
    }
    return asm[name].apply(null, arguments);
  };
}

var wasmBinaryFile;
  wasmBinaryFile = 'data:application/octet-stream;base64,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QoCAgICAgIDwP4S/IQALIAALjwQBA38CQCACQYAESQ0AIAAgASACEAIaIAAPCyAAIAJqIQMCQAJAIAEgAHNBA3ENAAJAAkAgAEEDcQ0AIAAhAgwBCwJAIAINACAAIQIMAQsgACECA0AgAiABLQAAOgAAIAFBAWohASACQQFqIgJBA3FFDQEgAiADSQ0ACwsCQCADQXxxIgRBwABJDQAgAiAEQUBqIgVLDQADQCACIAEoAgA2AgAgAiABKAIENgIEIAIgASgCCDYCCCACIAEoAgw2AgwgAiABKAIQNgIQIAIgASgCFDYCFCACIAEoAhg2AhggAiABKAIcNgIcIAIgASgCIDYCICACIAEoAiQ2AiQgAiABKAIoNgIoIAIgASgCLDYCLCACIAEoAjA2AjAgAiABKAI0NgI0IAIgASgCODYCOCACIAEoAjw2AjwgAUHAAGohASACQcAAaiICIAVNDQALCyACIARPDQEDQCACIAEoAgA2AgAgAUEEaiEBIAJBBGoiAiAESQ0ADAILAAsCQCADQQRPDQAgACECDAELAkAgA0F8aiIEIABPDQAgACECDAELIAAhAgNAIAIgAS0AADoAACACIAEtAAE6AAEgAiABLQACOgACIAIgAS0AAzoAAyABQQRqIQEgAkEEaiICIARNDQALCwJAIAIgA08NAANAIAIgAS0AADoAACABQQFqIQEgAkEBaiICIANHDQALCyAAC8wBAQN/AkACQCACKAIQIgMNAEEAIQQgAhAWDQEgAigCECEDCwJAIAMgAigCFCIFayABTw0AIAIgACABIAIoAiQRAAAPCwJAAkAgAigCUEEATg0AQQAhAwwBCyABIQQDQAJAIAQiAw0AQQAhAwwCCyAAIANBf2oiBGotAABBCkcNAAsgAiAAIAMgAigCJBEAACIEIANJDQEgACADaiEAIAEgA2shASACKAIUIQULIAUgACABEBwaIAIgAigCFCABajYCFCADIAFqIQQLIAQL9QIBBH8jAEHQAWsiBSQAIAUgAjYCzAFBACEGIAVBoAFqQQBBKBAPGiAFIAUoAswBNgLIAQJAAkBBACABIAVByAFqIAVB0ABqIAVBoAFqIAMgBBAfQQBODQBBfyEEDAELAkAgACgCTEEASA0AIAAQECEGCyAAKAIAIQcCQCAAKAJIQQBKDQAgACAHQV9xNgIACwJA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KAIAIQJBfyEDAkAgAUHMmbPmAEsNAEF/IAIsAABBUGoiAyABQQpsIgFqIAMgAUH/////B3NKGyEDCyAAIAJBAWo2AgAgAyEBIAIsAAEQFw0ACyADC7YEAAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAIAFBd2oOEgABAgUDBAYHCAkKCwwNDg8QERILIAIgAigCACIBQQRqNgIAIAAgASgCADYCAA8LIAIgAigCACIBQQRqNgIAIAAgATQCADcDAA8LIAIgAigCACIBQQRqNgIAIAAgATUCADcDAA8LIAIgAigCACIBQQRqNgIAIAAgATQCADcDAA8LIAIgAigCACIBQQRqNgIAIAAgATUCADcDAA8LIAIgAigCAEEHakF4cSIBQQhqNgIAIAAgASkDADcDAA8LIAIgAigCACIBQQRqNgIAIAAgATIBADcDAA8LIAIgAigCACIBQQRqNgIAIAAgATMBADcDAA8LIAIgAigCACIBQQRqNgIAIAAgATAAADcDAA8LIAIgAigCACIBQQRqNgIAIAAgATEAADcDAA8LIAIgAigCAEEHakF4cSIBQQhqNgIAIAAgASkDADcDAA8LIAIgAigCACIBQQRqNgIAIAAgATUCADcDAA8LIAIgAigCAEEHakF4cSIBQQhqNgIAIAAgASkDADcDAA8LIAIgAigCAEEHakF4cSIBQQhqNgIAIAAgASkDADcDAA8LIAIgAigCACIBQQRqNgIAIAAgATQCADcDAA8LIAIgAigCACIBQQRqNgIAIAAgATUCADcDAA8LIAIgAigCAEEHakF4cSIBQQhqNgIAIAAgASsDADkDAA8LIAAgAiADEQkACws9AQF/AkAgAFANAANAIAFBf2oiASAAp0EPcUGQDGotAAAgAnI6AAAgAEIPViEDIABCBIghACADDQALCyABCzYBAX8CQCAAUA0AA0AgAUF/aiIBIACnQQdxQTByOgAAIABCB1YhAiAAQgOIIQAgAg0ACwsgAQuIAQIBfgN/AkACQCAAQoCAgIAQWg0AIAAhAgwBCwNAIAFBf2oiASAAIABCCoAiAkIKfn2nQTByOgAAIABC/////58BViEDIAIhACADDQALCwJAIAKnIgNFDQADQCABQX9qIgEgAyADQQpuIgRBCmxrQTByOgAAIANBCUshBSAEIQMg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QYABcjoAAiAAIAFBDHZB4AFyOgAAIAAgAUEGdkE/cUGAAXI6AAFBAw8LAkAgAUGAgHxqQf//P0sNACAAIAFBP3FBgAFyOgADIAAgAUESdkHwAXI6AAAgACABQQZ2QT9xQYABcjoAAiAAIAFBDHZBP3FBgAFyOgABQQQPCxAaQRk2AgALQX8hAwsgAw8LIAAgAToAAEEBCxQAAkAgAA0AQQAPCyAAIAFBABAwC1MBAX4CQAJAIANBwABxRQ0AIAEgA0FAaq2GIQJCACEBDAELIANFDQAgAUHAACADa62IIAIgA60iBIaEIQIgASAEhiEBCyAAIAE3AwAgACACNwMIC1MBAX4CQAJAIANBwABxRQ0AIAIgA0FAaq2IIQFCACECDAELIANFDQAgAkHAACADa62GIAEgA60iBIiEIQEgAiAEiCECCyAAIAE3AwAgACACNwMIC+IDAgJ/An4jAEEgayICJAACQAJAIAFC////////////AIMiBEKAgICAgIDA/0N8IARCgICAgICAwIC8f3xaDQAgAEI8iCABQgSGhCEEAkAgAEL//////////w+DIgBCgYCAgICAgIAIVA0AIARCgYCAgICAgIDAAHwhBQwCCyAEQoCAgICAgICAwAB8IQUgAEKAgICAgICAgAhSDQEgBSAEQgGDfCEFDAELAkAgAFAgBEKAgICAgIDA//8AVCAEQoCAgICAgMD//wBRGw0AIABCPIggAUIEhoRC/////////wODQoCAgICAgID8/wCEIQUMAQtCgICAgICAgPj/ACEFIARC////////v//DAFYNAEIAIQUgBEIwiKciA0GR9wBJDQAgAkEQaiAAIAFC////////P4NCgICAgICAwACEIgQgA0H/iH9qEDIgAiAAIARBgfgAIANrEDMgAikDACIEQjyIIAJBCGopAwBCBIaEIQUCQCAEQv//////////D4MgAikDECACQRBqQQhqKQMAhEIAUq2EIgRCgYCAgICAgIAIVA0AIAVCAXwhBQwBCyAEQoCAgICAgICACFINACAFQgGDIAV8IQULIAJBIGokACAFIAFCgICAgICAgICAf4OEvwsEACMACwYAIAAkAAsSAQJ/IwAgAGtBcHEiASQAIAELFABB8JfAAiQCQfAXQQ9qQXBxJAELBwAjACMBawsEACMCCwQAIwELDQAgASACIAMgABEGAAsjAQF+IAAgASACrSADrUIghoQgBBA8IQUgBUIgiKcQAyAFpwsLyYWAgAADAEGACAugBC0rICAgMFgweAAtMFgrMFggMFgtMHgrMHggMHgAbmFuAGluZgBOQU4ASU5GAC4AKG51bGwpAGxhbGEKAAAAAAAZAAoAGRkZAAAAAAUAAAAAAAAJAAAAAAsAAAAAAAAAABkAEQoZGRkDCgcAAQAJCxgAAAkGCwAACwAGGQAAABkZGQAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAZAAoNGRkZAA0AAAIACQ4AAAAJAA4AAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAAAAAAEwAAAAATAAAAAAkMAAAAAAAMAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAA8AAAAEDwAAAAAJEAAAAAAAEAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASAAAAAAAAAAAAAAARAAAAABEAAAAACRIAAAAAABIAABIAABoAAAAaGhoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGgAAABoaGgAAAAAAAAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAABcAAAAAFwAAAAAJFAAAAAAAFAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWAAAAAAAAAAAAAAAVAAAAABUAAAAACRYAAAAAABYAABYAADAxMjM0NTY3ODlBQkNERUYAQaAMC5QBBQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAMAAAA4BwAAAAQAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAP////8KAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAYAAABBtA0LAA==';
  if (!isDataURI(wasmBinaryFile)) {
    wasmBinaryFile = locateFile(wasmBinaryFile);
  }

function getBinary(file) {
  try {
    if (file == wasmBinaryFile && wasmBinary) {
      return new Uint8Array(wasmBinary);
    }
    var binary = tryParseAsDataURI(file);
    if (binary) {
      return binary;
    }
    if (readBinary) {
      return readBinary(file);
    } else {
      throw "both async and sync fetching of the wasm failed";
    }
  }
  catch (err) {
    abort(err);
  }
}

function getBinaryPromise() {
  // If we don't have the binary yet, try to to load it asynchronously.
  // Fetch has some additional restrictions over XHR, like it can't be used on a file:// url.
  // See https://github.com/github/fetch/pull/92#issuecomment-140665932
  // Cordova or Electron apps are typically loaded from a file:// url.
  // So use fetch if it is available and the url is not a file, otherwise fall back to XHR.
  if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER)) {
    if (typeof fetch == 'function'
      && !isFileURI(wasmBinaryFile)
    ) {
      return fetch(wasmBinaryFile, { credentials: 'same-origin' }).then(function(response) {
        if (!response['ok']) {
          throw "failed to load wasm binary file at '" + wasmBinaryFile + "'";
        }
        return response['arrayBuffer']();
      }).catch(function () {
          return getBinary(wasmBinaryFile);
      });
    }
    else {
      if (readAsync) {
        // fetch is not available or url is file => try XHR (readAsync uses XHR internally)
        return new Promise(function(resolve, reject) {
          readAsync(wasmBinaryFile, function(response) { resolve(new Uint8Array(/** @type{!ArrayBuffer} */(response))) }, reject)
        });
      }
    }
  }

  // Otherwise, getBinary should be able to get it synchronously
  return Promise.resolve().then(function() { return getBinary(wasmBinaryFile); });
}

// Create the wasm instance.
// Receives the wasm imports, returns the exports.
function createWasm() {
  // prepare imports
  var info = {
    'env': asmLibraryArg,
    'wasi_snapshot_preview1': asmLibraryArg,
  };
  // Load the wasm module and create an instance of using native support in the JS engine.
  // handle a generated wasm instance, receiving its exports and
  // performing other necessary setup
  /** @param {WebAssembly.Module=} module*/
  function receiveInstance(instance, module) {
    var exports = instance.exports;

    Module['asm'] = exports;

    wasmMemory = Module['asm']['memory'];
    assert(wasmMemory, "memory not found in wasm exports");
    // This assertion doesn't hold when emscripten is run in --post-link
    // mode.
    // TODO(sbc): Read INITIAL_MEMORY out of the wasm file in post-link mode.
    //assert(wasmMemory.buffer.byteLength === 16777216);
    updateGlobalBufferAndViews(wasmMemory.buffer);

    wasmTable = Module['asm']['__indirect_function_table'];
    assert(wasmTable, "table not found in wasm exports");

    addOnInit(Module['asm']['__wasm_call_ctors']);

    removeRunDependency('wasm-instantiate');
  }
  // we can't run yet (except in a pthread, where we have a custom sync instantiator)
  addRunDependency('wasm-instantiate');

  // Prefer streaming instantiation if available.
  // Async compilation can be confusing when an error on the page overwrites Module
  // (for example, if the order of elements is wrong, and the one defining Module is
  // later), so we save Module and check it later.
  var trueModule = Module;
  function receiveInstantiationResult(result) {
    // 'result' is a ResultObject object which has both the module and instance.
    // receiveInstance() will swap in the exports (to Module.asm) so they can be called
    assert(Module === trueModule, 'the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?');
    trueModule = null;
    // TODO: Due to Closure regression https://github.com/google/closure-compiler/issues/3193, the above line no longer optimizes out down to the following line.
    // When the regression is fixed, can restore the above USE_PTHREADS-enabled path.
    receiveInstance(result['instance']);
  }

  function instantiateArrayBuffer(receiver) {
    return getBinaryPromise().then(function(binary) {
      return WebAssembly.instantiate(binary, info);
    }).then(function (instance) {
      return instance;
    }).then(receiver, function(reason) {
      err('failed to asynchronously prepare wasm: ' + reason);

      // Warn on some common problems.
      if (isFileURI(wasmBinaryFile)) {
        err('warning: Loading from a file URI (' + wasmBinaryFile + ') is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing');
      }
      abort(reason);
    });
  }

  function instantiateAsync() {
    if (!wasmBinary &&
        typeof WebAssembly.instantiateStreaming == 'function' &&
        !isDataURI(wasmBinaryFile) &&
        // Don't use streaming for file:// delivered objects in a webview, fetch them synchronously.
        !isFileURI(wasmBinaryFile) &&
        typeof fetch == 'function') {
      return fetch(wasmBinaryFile, { credentials: 'same-origin' }).then(function(response) {
        // Suppress closure warning here since the upstream definition for
        // instantiateStreaming only allows Promise<Repsponse> rather than
        // an actual Response.
        // TODO(https://github.com/google/closure-compiler/pull/3913): Remove if/when upstream closure is fixed.
        /** @suppress {checkTypes} */
        var result = WebAssembly.instantiateStreaming(response, info);

        return result.then(
          receiveInstantiationResult,
          function(reason) {
            // We expect the most common failure cause to be a bad MIME type for the binary,
            // in which case falling back to ArrayBuffer instantiation should work.
            err('wasm streaming compile failed: ' + reason);
            err('falling back to ArrayBuffer instantiation');
            return instantiateArrayBuffer(receiveInstantiationResult);
          });
      });
    } else {
      return instantiateArrayBuffer(receiveInstantiationResult);
    }
  }

  // User shell pages can write their own Module.instantiateWasm = function(imports, successCallback) callback
  // to manually instantiate the Wasm module themselves. This allows pages to run the instantiation parallel
  // to any other async startup actions they are performing.
  if (Module['instantiateWasm']) {
    try {
      var exports = Module['instantiateWasm'](info, receiveInstance);
      return exports;
    } catch(e) {
      err('Module.instantiateWasm callback failed with error: ' + e);
      return false;
    }
  }

  instantiateAsync();
  return {}; // no exports yet; we'll fill them in later
}

// Globals used by JS i64 conversions (see makeSetValue)
var tempDouble;
var tempI64;

// === Body ===

var ASM_CONSTS = {
  1716: function() {window.startTerminal();},  
 1740: function() {window.term.clear();},  
 1761: function() {window.term.cursorOff();},  
 1786: function() {window.term.cursorOn();},  
 1810: function() {window.term.close();}
};






  function callRuntimeCallbacks(callbacks) {
      while (callbacks.length > 0) {
        var callback = callbacks.shift();
        if (typeof callback == 'function') {
          callback(Module); // Pass the module as the first argument.
          continue;
        }
        var func = callback.func;
        if (typeof func == 'number') {
          if (callback.arg === undefined) {
            getWasmTableEntry(func)();
          } else {
            getWasmTableEntry(func)(callback.arg);
          }
        } else {
          func(callback.arg === undefined ? null : callback.arg);
        }
      }
    }

  function withStackSave(f) {
      var stack = stackSave();
      var ret = f();
      stackRestore(stack);
      return ret;
    }
  function demangle(func) {
      warnOnce('warning: build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling');
      return func;
    }

  function demangleAll(text) {
      var regex =
        /\b_Z[\w\d_]+/g;
      return text.replace(regex,
        function(x) {
          var y = demangle(x);
          return x === y ? x : (y + ' [' + x + ']');
        });
    }

  var wasmTableMirror = [];
  function getWasmTableEntry(funcPtr) {
      var func = wasmTableMirror[funcPtr];
      if (!func) {
        if (funcPtr >= wasmTableMirror.length) wasmTableMirror.length = funcPtr + 1;
        wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr);
      }
      assert(wasmTable.get(funcPtr) == func, "JavaScript-side Wasm function table mirror is out of date!");
      return func;
    }

  function handleException(e) {
      // Certain exception types we do not treat as errors since they are used for
      // internal control flow.
      // 1. ExitStatus, which is thrown by exit()
      // 2. "unwind", which is thrown by emscripten_unwind_to_js_event_loop() and others
      //    that wish to return to JS event loop.
      if (e instanceof ExitStatus || e == 'unwind') {
        return EXITSTATUS;
      }
      quit_(1, e);
    }

  function jsStackTrace() {
      var error = new Error();
      if (!error.stack) {
        // IE10+ special cases: It does have callstack info, but it is only populated if an Error object is thrown,
        // so try that as a special-case.
        try {
          throw new Error();
        } catch(e) {
          error = e;
        }
        if (!error.stack) {
          return '(no stack trace available)';
        }
      }
      return error.stack.toString();
    }

  function setWasmTableEntry(idx, func) {
      wasmTable.set(idx, func);
      wasmTableMirror[idx] = func;
    }

  function stackTrace() {
      var js = jsStackTrace();
      if (Module['extraStackTrace']) js += '\n' + Module['extraStackTrace']();
      return demangleAll(js);
    }

  var readAsmConstArgsArray = [];
  function readAsmConstArgs(sigPtr, buf) {
      ;
      // Nobody should have mutated _readAsmConstArgsArray underneath us to be something else than an array.
      assert(Array.isArray(readAsmConstArgsArray));
      // The input buffer is allocated on the stack, so it must be stack-aligned.
      assert(buf % 16 == 0);
      readAsmConstArgsArray.length = 0;
      var ch;
      // Most arguments are i32s, so shift the buffer pointer so it is a plain
      // index into HEAP32.
      buf >>= 2;
      while (ch = HEAPU8[sigPtr++]) {
        assert(ch === 100/*'d'*/ || ch === 102/*'f'*/ || ch === 105 /*'i'*/, 'Invalid character ' + ch + '("' + String.fromCharCode(ch) + '") in readAsmConstArgs! Use only "d", "f" or "i", and do not specify "v" for void return argument.');
        // A double takes two 32-bit slots, and must also be aligned - the backend
        // will emit padding to avoid that.
        var readAsmConstArgsDouble = ch < 105;
        if (readAsmConstArgsDouble && (buf & 1)) buf++;
        readAsmConstArgsArray.push(readAsmConstArgsDouble ? HEAPF64[buf++ >> 1] : HEAP32[buf]);
        ++buf;
      }
      return readAsmConstArgsArray;
    }
  function _emscripten_asm_const_int(code, sigPtr, argbuf) {
      var args = readAsmConstArgs(sigPtr, argbuf);
      if (!ASM_CONSTS.hasOwnProperty(code)) abort('No EM_ASM constant found at address ' + code);
      return ASM_CONSTS[code].apply(null, args);
    }

  function _emscripten_memcpy_big(dest, src, num) {
      HEAPU8.copyWithin(dest, src, src + num);
    }

  function flush_NO_FILESYSTEM() {
      // flush anything remaining in the buffers during shutdown
      ___stdio_exit();
      var buffers = SYSCALLS.buffers;
      if (buffers[1].length) SYSCALLS.printChar(1, 10);
      if (buffers[2].length) SYSCALLS.printChar(2, 10);
    }
  
  var SYSCALLS = {buffers:[null,[],[]],printChar:function(stream, curr) {
        var buffer = SYSCALLS.buffers[stream];
        assert(buffer);
        if (curr === 0 || curr === 10) {
          (stream === 1 ? out : err)(UTF8ArrayToString(buffer, 0));
          buffer.length = 0;
        } else {
          buffer.push(curr);
        }
      },varargs:undefined,get:function() {
        assert(SYSCALLS.varargs != undefined);
        SYSCALLS.varargs += 4;
        var ret = HEAP32[(((SYSCALLS.varargs)-(4))>>2)];
        return ret;
      },getStr:function(ptr) {
        var ret = UTF8ToString(ptr);
        return ret;
      },get64:function(low, high) {
        if (low >= 0) assert(high === 0);
        else assert(high === -1);
        return low;
      }};
  function _fd_write(fd, iov, iovcnt, pnum) {
      ;
      // hack to support printf in SYSCALLS_REQUIRE_FILESYSTEM=0
      var num = 0;
      for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAP32[((iov)>>2)];
        var len = HEAP32[(((iov)+(4))>>2)];
        iov += 8;
        for (var j = 0; j < len; j++) {
          SYSCALLS.printChar(fd, HEAPU8[ptr+j]);
        }
        num += len;
      }
      HEAP32[((pnum)>>2)] = num;
      return 0;
    }

  function _setTempRet0(val) {
      setTempRet0(val);
    }
var ASSERTIONS = true;



/** @type {function(string, boolean=, number=)} */
function intArrayFromString(stringy, dontAddNull, length) {
  var len = length > 0 ? length : lengthBytesUTF8(stringy)+1;
  var u8array = new Array(len);
  var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
  if (dontAddNull) u8array.length = numBytesWritten;
  return u8array;
}

function intArrayToString(array) {
  var ret = [];
  for (var i = 0; i < array.length; i++) {
    var chr = array[i];
    if (chr > 0xFF) {
      if (ASSERTIONS) {
        assert(false, 'Character code ' + chr + ' (' + String.fromCharCode(chr) + ')  at offset ' + i + ' not in 0x00-0xFF.');
      }
      chr &= 0xFF;
    }
    ret.push(String.fromCharCode(chr));
  }
  return ret.join('');
}


// Copied from https://github.com/strophe/strophejs/blob/e06d027/src/polyfills.js#L149

// This code was written by Tyler Akins and has been placed in the
// public domain.  It would be nice if you left this header intact.
// Base64 code from Tyler Akins -- http://rumkin.com

/**
 * Decodes a base64 string.
 * @param {string} input The string to decode.
 */
var decodeBase64 = typeof atob == 'function' ? atob : function (input) {
  var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

  var output = '';
  var chr1, chr2, chr3;
  var enc1, enc2, enc3, enc4;
  var i = 0;
  // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
  do {
    enc1 = keyStr.indexOf(input.charAt(i++));
    enc2 = keyStr.indexOf(input.charAt(i++));
    enc3 = keyStr.indexOf(input.charAt(i++));
    enc4 = keyStr.indexOf(input.charAt(i++));

    chr1 = (enc1 << 2) | (enc2 >> 4);
    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    chr3 = ((enc3 & 3) << 6) | enc4;

    output = output + String.fromCharCode(chr1);

    if (enc3 !== 64) {
      output = output + String.fromCharCode(chr2);
    }
    if (enc4 !== 64) {
      output = output + String.fromCharCode(chr3);
    }
  } while (i < input.length);
  return output;
};

// Converts a string of base64 into a byte array.
// Throws error on invalid input.
function intArrayFromBase64(s) {
  if (typeof ENVIRONMENT_IS_NODE == 'boolean' && ENVIRONMENT_IS_NODE) {
    var buf = Buffer.from(s, 'base64');
    return new Uint8Array(buf['buffer'], buf['byteOffset'], buf['byteLength']);
  }

  try {
    var decoded = decodeBase64(s);
    var bytes = new Uint8Array(decoded.length);
    for (var i = 0 ; i < decoded.length ; ++i) {
      bytes[i] = decoded.charCodeAt(i);
    }
    return bytes;
  } catch (_) {
    throw new Error('Converting base64 string to bytes failed.');
  }
}

// If filename is a base64 data URI, parses and returns data (Buffer on node,
// Uint8Array otherwise). If filename is not a base64 data URI, returns undefined.
function tryParseAsDataURI(filename) {
  if (!isDataURI(filename)) {
    return;
  }

  return intArrayFromBase64(filename.slice(dataURIPrefix.length));
}


function checkIncomingModuleAPI() {
  ignoredModuleProp('fetchSettings');
}
var asmLibraryArg = {
  "emscripten_asm_const_int": _emscripten_asm_const_int,
  "emscripten_memcpy_big": _emscripten_memcpy_big,
  "fd_write": _fd_write,
  "setTempRet0": _setTempRet0
};
var asm = createWasm();
/** @type {function(...*):?} */
var ___wasm_call_ctors = Module["___wasm_call_ctors"] = createExportWrapper("__wasm_call_ctors");

/** @type {function(...*):?} */
var _main = Module["_main"] = createExportWrapper("main");

/** @type {function(...*):?} */
var ___errno_location = Module["___errno_location"] = createExportWrapper("__errno_location");

/** @type {function(...*):?} */
var ___stdio_exit = Module["___stdio_exit"] = createExportWrapper("__stdio_exit");

/** @type {function(...*):?} */
var _emscripten_stack_init = Module["_emscripten_stack_init"] = function() {
  return (_emscripten_stack_init = Module["_emscripten_stack_init"] = Module["asm"]["emscripten_stack_init"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var _emscripten_stack_get_free = Module["_emscripten_stack_get_free"] = function() {
  return (_emscripten_stack_get_free = Module["_emscripten_stack_get_free"] = Module["asm"]["emscripten_stack_get_free"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var _emscripten_stack_get_base = Module["_emscripten_stack_get_base"] = function() {
  return (_emscripten_stack_get_base = Module["_emscripten_stack_get_base"] = Module["asm"]["emscripten_stack_get_base"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var _emscripten_stack_get_end = Module["_emscripten_stack_get_end"] = function() {
  return (_emscripten_stack_get_end = Module["_emscripten_stack_get_end"] = Module["asm"]["emscripten_stack_get_end"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var stackSave = Module["stackSave"] = createExportWrapper("stackSave");

/** @type {function(...*):?} */
var stackRestore = Module["stackRestore"] = createExportWrapper("stackRestore");

/** @type {function(...*):?} */
var stackAlloc = Module["stackAlloc"] = createExportWrapper("stackAlloc");

/** @type {function(...*):?} */
var dynCall_jiji = Module["dynCall_jiji"] = createExportWrapper("dynCall_jiji");





// === Auto-generated postamble setup entry stuff ===

unexportedRuntimeFunction('intArrayFromString', false);
unexportedRuntimeFunction('intArrayToString', false);
unexportedRuntimeFunction('ccall', false);
unexportedRuntimeFunction('cwrap', false);
unexportedRuntimeFunction('setValue', false);
unexportedRuntimeFunction('getValue', false);
unexportedRuntimeFunction('allocate', false);
unexportedRuntimeFunction('UTF8ArrayToString', false);
unexportedRuntimeFunction('UTF8ToString', false);
unexportedRuntimeFunction('stringToUTF8Array', false);
unexportedRuntimeFunction('stringToUTF8', false);
unexportedRuntimeFunction('lengthBytesUTF8', false);
unexportedRuntimeFunction('stackTrace', false);
unexportedRuntimeFunction('addOnPreRun', false);
unexportedRuntimeFunction('addOnInit', false);
unexportedRuntimeFunction('addOnPreMain', false);
unexportedRuntimeFunction('addOnExit', false);
unexportedRuntimeFunction('addOnPostRun', false);
unexportedRuntimeFunction('writeStringToMemory', false);
unexportedRuntimeFunction('writeArrayToMemory', false);
unexportedRuntimeFunction('writeAsciiToMemory', false);
unexportedRuntimeFunction('addRunDependency', true);
unexportedRuntimeFunction('removeRunDependency', true);
unexportedRuntimeFunction('FS_createFolder', false);
unexportedRuntimeFunction('FS_createPath', true);
unexportedRuntimeFunction('FS_createDataFile', true);
unexportedRuntimeFunction('FS_createPreloadedFile', true);
unexportedRuntimeFunction('FS_createLazyFile', true);
unexportedRuntimeFunction('FS_createLink', false);
unexportedRuntimeFunction('FS_createDevice', true);
unexportedRuntimeFunction('FS_unlink', true);
unexportedRuntimeFunction('getLEB', false);
unexportedRuntimeFunction('getFunctionTables', false);
unexportedRuntimeFunction('alignFunctionTables', false);
unexportedRuntimeFunction('registerFunctions', false);
unexportedRuntimeFunction('addFunction', false);
unexportedRuntimeFunction('removeFunction', false);
unexportedRuntimeFunction('getFuncWrapper', false);
unexportedRuntimeFunction('prettyPrint', false);
unexportedRuntimeFunction('dynCall', false);
unexportedRuntimeFunction('getCompilerSetting', false);
unexportedRuntimeFunction('print', false);
unexportedRuntimeFunction('printErr', false);
unexportedRuntimeFunction('getTempRet0', false);
unexportedRuntimeFunction('setTempRet0', false);
unexportedRuntimeFunction('callMain', false);
unexportedRuntimeFunction('abort', false);
unexportedRuntimeFunction('keepRuntimeAlive', false);
unexportedRuntimeFunction('zeroMemory', false);
unexportedRuntimeFunction('stringToNewUTF8', false);
unexportedRuntimeFunction('abortOnCannotGrowMemory', false);
unexportedRuntimeFunction('emscripten_realloc_buffer', false);
unexportedRuntimeFunction('ENV', false);
unexportedRuntimeFunction('withStackSave', false);
unexportedRuntimeFunction('ERRNO_CODES', false);
unexportedRuntimeFunction('ERRNO_MESSAGES', false);
unexportedRuntimeFunction('setErrNo', false);
unexportedRuntimeFunction('inetPton4', false);
unexportedRuntimeFunction('inetNtop4', false);
unexportedRuntimeFunction('inetPton6', false);
unexportedRuntimeFunction('inetNtop6', false);
unexportedRuntimeFunction('readSockaddr', false);
unexportedRuntimeFunction('writeSockaddr', false);
unexportedRuntimeFunction('DNS', false);
unexportedRuntimeFunction('getHostByName', false);
unexportedRuntimeFunction('Protocols', false);
unexportedRuntimeFunction('Sockets', false);
unexportedRuntimeFunction('getRandomDevice', false);
unexportedRuntimeFunction('traverseStack', false);
unexportedRuntimeFunction('convertFrameToPC', false);
unexportedRuntimeFunction('UNWIND_CACHE', false);
unexportedRuntimeFunction('saveInUnwindCache', false);
unexportedRuntimeFunction('convertPCtoSourceLocation', false);
unexportedRuntimeFunction('readAsmConstArgsArray', false);
unexportedRuntimeFunction('readAsmConstArgs', false);
unexportedRuntimeFunction('mainThreadEM_ASM', false);
unexportedRuntimeFunction('jstoi_q', false);
unexportedRuntimeFunction('jstoi_s', false);
unexportedRuntimeFunction('getExecutableName', false);
unexportedRuntimeFunction('listenOnce', false);
unexportedRuntimeFunction('autoResumeAudioContext', false);
unexportedRuntimeFunction('dynCallLegacy', false);
unexportedRuntimeFunction('getDynCaller', false);
unexportedRuntimeFunction('dynCall', false);
unexportedRuntimeFunction('callRuntimeCallbacks', false);
unexportedRuntimeFunction('wasmTableMirror', false);
unexportedRuntimeFunction('setWasmTableEntry', false);
unexportedRuntimeFunction('getWasmTableEntry', false);
unexportedRuntimeFunction('handleException', false);
unexportedRuntimeFunction('runtimeKeepalivePush', false);
unexportedRuntimeFunction('runtimeKeepalivePop', false);
unexportedRuntimeFunction('callUserCallback', false);
unexportedRuntimeFunction('maybeExit', false);
unexportedRuntimeFunction('safeSetTimeout', false);
unexportedRuntimeFunction('asmjsMangle', false);
unexportedRuntimeFunction('asyncLoad', false);
unexportedRuntimeFunction('alignMemory', false);
unexportedRuntimeFunction('mmapAlloc', false);
unexportedRuntimeFunction('reallyNegative', false);
unexportedRuntimeFunction('unSign', false);
unexportedRuntimeFunction('reSign', false);
unexportedRuntimeFunction('formatString', false);
unexportedRuntimeFunction('PATH', false);
unexportedRuntimeFunction('PATH_FS', false);
unexportedRuntimeFunction('SYSCALLS', false);
unexportedRuntimeFunction('getSocketFromFD', false);
unexportedRuntimeFunction('getSocketAddress', false);
unexportedRuntimeFunction('JSEvents', false);
unexportedRuntimeFunction('registerKeyEventCallback', false);
unexportedRuntimeFunction('specialHTMLTargets', false);
unexportedRuntimeFunction('maybeCStringToJsString', false);
unexportedRuntimeFunction('findEventTarget', false);
unexportedRuntimeFunction('findCanvasEventTarget', false);
unexportedRuntimeFunction('getBoundingClientRect', false);
unexportedRuntimeFunction('fillMouseEventData', false);
unexportedRuntimeFunction('registerMouseEventCallback', false);
unexportedRuntimeFunction('registerWheelEventCallback', false);
unexportedRuntimeFunction('registerUiEventCallback', false);
unexportedRuntimeFunction('registerFocusEventCallback', false);
unexportedRuntimeFunction('fillDeviceOrientationEventData', false);
unexportedRuntimeFunction('registerDeviceOrientationEventCallback', false);
unexportedRuntimeFunction('fillDeviceMotionEventData', false);
unexportedRuntimeFunction('registerDeviceMotionEventCallback', false);
unexportedRuntimeFunction('screenOrientation', false);
unexportedRuntimeFunction('fillOrientationChangeEventData', false);
unexportedRuntimeFunction('registerOrientationChangeEventCallback', false);
unexportedRuntimeFunction('fillFullscreenChangeEventData', false);
unexportedRuntimeFunction('registerFullscreenChangeEventCallback', false);
unexportedRuntimeFunction('registerRestoreOldStyle', false);
unexportedRuntimeFunction('hideEverythingExceptGivenElement', false);
unexportedRuntimeFunction('restoreHiddenElements', false);
unexportedRuntimeFunction('setLetterbox', false);
unexportedRuntimeFunction('currentFullscreenStrategy', false);
unexportedRuntimeFunction('restoreOldWindowedStyle', false);
unexportedRuntimeFunction('softFullscreenResizeWebGLRenderTarget', false);
unexportedRuntimeFunction('doRequestFullscreen', false);
unexportedRuntimeFunction('fillPointerlockChangeEventData', false);
unexportedRuntimeFunction('registerPointerlockChangeEventCallback', false);
unexportedRuntimeFunction('registerPointerlockErrorEventCallback', false);
unexportedRuntimeFunction('requestPointerLock', false);
unexportedRuntimeFunction('fillVisibilityChangeEventData', false);
unexportedRuntimeFunction('registerVisibilityChangeEventCallback', false);
unexportedRuntimeFunction('registerTouchEventCallback', false);
unexportedRuntimeFunction('fillGamepadEventData', false);
unexportedRuntimeFunction('registerGamepadEventCallback', false);
unexportedRuntimeFunction('registerBeforeUnloadEventCallback', false);
unexportedRuntimeFunction('fillBatteryEventData', false);
unexportedRuntimeFunction('battery', false);
unexportedRuntimeFunction('registerBatteryEventCallback', false);
unexportedRuntimeFunction('setCanvasElementSize', false);
unexportedRuntimeFunction('getCanvasElementSize', false);
unexportedRuntimeFunction('demangle', false);
unexportedRuntimeFunction('demangleAll', false);
unexportedRuntimeFunction('jsStackTrace', false);
unexportedRuntimeFunction('stackTrace', false);
unexportedRuntimeFunction('getEnvStrings', false);
unexportedRuntimeFunction('checkWasiClock', false);
unexportedRuntimeFunction('flush_NO_FILESYSTEM', false);
unexportedRuntimeFunction('writeI53ToI64', false);
unexportedRuntimeFunction('writeI53ToI64Clamped', false);
unexportedRuntimeFunction('writeI53ToI64Signaling', false);
unexportedRuntimeFunction('writeI53ToU64Clamped', false);
unexportedRuntimeFunction('writeI53ToU64Signaling', false);
unexportedRuntimeFunction('readI53FromI64', false);
unexportedRuntimeFunction('readI53FromU64', false);
unexportedRuntimeFunction('convertI32PairToI53', false);
unexportedRuntimeFunction('convertU32PairToI53', false);
unexportedRuntimeFunction('setImmediateWrapped', false);
unexportedRuntimeFunction('clearImmediateWrapped', false);
unexportedRuntimeFunction('polyfillSetImmediate', false);
unexportedRuntimeFunction('uncaughtExceptionCount', false);
unexportedRuntimeFunction('exceptionLast', false);
unexportedRuntimeFunction('exceptionCaught', false);
unexportedRuntimeFunction('ExceptionInfo', false);
unexportedRuntimeFunction('CatchInfo', false);
unexportedRuntimeFunction('exception_addRef', false);
unexportedRuntimeFunction('exception_decRef', false);
unexportedRuntimeFunction('Browser', false);
unexportedRuntimeFunction('funcWrappers', false);
unexportedRuntimeFunction('getFuncWrapper', false);
unexportedRuntimeFunction('setMainLoop', false);
unexportedRuntimeFunction('wget', false);
unexportedRuntimeFunction('FS', false);
unexportedRuntimeFunction('MEMFS', false);
unexportedRuntimeFunction('TTY', false);
unexportedRuntimeFunction('PIPEFS', false);
unexportedRuntimeFunction('SOCKFS', false);
unexportedRuntimeFunction('_setNetworkCallback', false);
unexportedRuntimeFunction('tempFixedLengthArray', false);
unexportedRuntimeFunction('miniTempWebGLFloatBuffers', false);
unexportedRuntimeFunction('heapObjectForWebGLType', false);
unexportedRuntimeFunction('heapAccessShiftForWebGLHeap', false);
unexportedRuntimeFunction('GL', false);
unexportedRuntimeFunction('emscriptenWebGLGet', false);
unexportedRuntimeFunction('computeUnpackAlignedImageSize', false);
unexportedRuntimeFunction('emscriptenWebGLGetTexPixelData', false);
unexportedRuntimeFunction('emscriptenWebGLGetUniform', false);
unexportedRuntimeFunction('webglGetUniformLocation', false);
unexportedRuntimeFunction('webglPrepareUniformLocationsBeforeFirstUse', false);
unexportedRuntimeFunction('webglGetLeftBracePos', false);
unexportedRuntimeFunction('emscriptenWebGLGetVertexAttrib', false);
unexportedRuntimeFunction('writeGLArray', false);
unexportedRuntimeFunction('AL', false);
unexportedRuntimeFunction('SDL_unicode', false);
unexportedRuntimeFunction('SDL_ttfContext', false);
unexportedRuntimeFunction('SDL_audio', false);
unexportedRuntimeFunction('SDL', false);
unexportedRuntimeFunction('SDL_gfx', false);
unexportedRuntimeFunction('GLUT', false);
unexportedRuntimeFunction('EGL', false);
unexportedRuntimeFunction('GLFW_Window', false);
unexportedRuntimeFunction('GLFW', false);
unexportedRuntimeFunction('GLEW', false);
unexportedRuntimeFunction('IDBStore', false);
unexportedRuntimeFunction('runAndAbortIfError', false);
unexportedRuntimeFunction('warnOnce', false);
unexportedRuntimeFunction('stackSave', false);
unexportedRuntimeFunction('stackRestore', false);
unexportedRuntimeFunction('stackAlloc', false);
unexportedRuntimeFunction('AsciiToString', false);
unexportedRuntimeFunction('stringToAscii', false);
unexportedRuntimeFunction('UTF16ToString', false);
unexportedRuntimeFunction('stringToUTF16', false);
unexportedRuntimeFunction('lengthBytesUTF16', false);
unexportedRuntimeFunction('UTF32ToString', false);
unexportedRuntimeFunction('stringToUTF32', false);
unexportedRuntimeFunction('lengthBytesUTF32', false);
unexportedRuntimeFunction('allocateUTF8', false);
unexportedRuntimeFunction('allocateUTF8OnStack', false);
Module["writeStackCookie"] = writeStackCookie;
Module["checkStackCookie"] = checkStackCookie;
unexportedRuntimeFunction('intArrayFromBase64', false);
unexportedRuntimeFunction('tryParseAsDataURI', false);
unexportedRuntimeSymbol('ALLOC_NORMAL', false);
unexportedRuntimeSymbol('ALLOC_STACK', false);

var calledRun;

/**
 * @constructor
 * @this {ExitStatus}
 */
function ExitStatus(status) {
  this.name = "ExitStatus";
  this.message = "Program terminated with exit(" + status + ")";
  this.status = status;
}

var calledMain = false;

dependenciesFulfilled = function runCaller() {
  // If run has never been called, and we should call run (INVOKE_RUN is true, and Module.noInitialRun is not false)
  if (!calledRun) run();
  if (!calledRun) dependenciesFulfilled = runCaller; // try this again later, after new deps are fulfilled
};

function callMain(args) {
  assert(runDependencies == 0, 'cannot call main when async dependencies remain! (listen on Module["onRuntimeInitialized"])');
  assert(__ATPRERUN__.length == 0, 'cannot call main when preRun functions remain to be called');

  var entryFunction = Module['_main'];

  args = args || [];

  var argc = args.length+1;
  var argv = stackAlloc((argc + 1) * 4);
  HEAP32[argv >> 2] = allocateUTF8OnStack(thisProgram);
  for (var i = 1; i < argc; i++) {
    HEAP32[(argv >> 2) + i] = allocateUTF8OnStack(args[i - 1]);
  }
  HEAP32[(argv >> 2) + argc] = 0;

  try {

    var ret = entryFunction(argc, argv);

    // In PROXY_TO_PTHREAD builds, we should never exit the runtime below, as
    // execution is asynchronously handed off to a pthread.
    // if we're not running an evented main loop, it's time to exit
    exit(ret, /* implicit = */ true);
    return ret;
  }
  catch (e) {
    return handleException(e);
  } finally {
    calledMain = true;

  }
}

function stackCheckInit() {
  // This is normally called automatically during __wasm_call_ctors but need to
  // get these values before even running any of the ctors so we call it redundantly
  // here.
  // TODO(sbc): Move writeStackCookie to native to to avoid this.
  _emscripten_stack_init();
  writeStackCookie();
}

/** @type {function(Array=)} */
function run(args) {
  args = args || arguments_;

  if (runDependencies > 0) {
    return;
  }

  stackCheckInit();

  preRun();

  // a preRun added a dependency, run will be called later
  if (runDependencies > 0) {
    return;
  }

  function doRun() {
    // run may have just been called through dependencies being fulfilled just in this very frame,
    // or while the async setStatus time below was happening
    if (calledRun) return;
    calledRun = true;
    Module['calledRun'] = true;

    if (ABORT) return;

    initRuntime();

    preMain();

    if (Module['onRuntimeInitialized']) Module['onRuntimeInitialized']();

    if (shouldRunNow) callMain(args);

    postRun();
  }

  if (Module['setStatus']) {
    Module['setStatus']('Running...');
    setTimeout(function() {
      setTimeout(function() {
        Module['setStatus']('');
      }, 1);
      doRun();
    }, 1);
  } else
  {
    doRun();
  }
  checkStackCookie();
}
Module['run'] = run;

function checkUnflushedContent() {
  // Compiler settings do not allow exiting the runtime, so flushing
  // the streams is not possible. but in ASSERTIONS mode we check
  // if there was something to flush, and if so tell the user they
  // should request that the runtime be exitable.
  // Normally we would not even include flush() at all, but in ASSERTIONS
  // builds we do so just for this check, and here we see if there is any
  // content to flush, that is, we check if there would have been
  // something a non-ASSERTIONS build would have not seen.
  // How we flush the streams depends on whether we are in SYSCALLS_REQUIRE_FILESYSTEM=0
  // mode (which has its own special function for this; otherwise, all
  // the code is inside libc)
  var oldOut = out;
  var oldErr = err;
  var has = false;
  out = err = (x) => {
    has = true;
  }
  try { // it doesn't matter if it fails
    var flush = flush_NO_FILESYSTEM;
    if (flush) flush();
  } catch(e) {}
  out = oldOut;
  err = oldErr;
  if (has) {
    warnOnce('stdio streams had content in them that was not flushed. you should set EXIT_RUNTIME to 1 (see the FAQ), or make sure to emit a newline when you printf etc.');
    warnOnce('(this may also be due to not including full filesystem support - try building with -s FORCE_FILESYSTEM=1)');
  }
}

/** @param {boolean|number=} implicit */
function exit(status, implicit) {
  EXITSTATUS = status;

  // Skip this check if the runtime is being kept alive deliberately.
  // For example if `exit_with_live_runtime` is called.
  if (!runtimeKeepaliveCounter) {
    checkUnflushedContent();
  }

  if (keepRuntimeAlive()) {
    // if exit() was called, we may warn the user if the runtime isn't actually being shut down
    if (!implicit) {
      var msg = 'program exited (with status: ' + status + '), but EXIT_RUNTIME is not set, so halting execution but not exiting the runtime or preventing further async execution (build with EXIT_RUNTIME=1, if you want a true shutdown)';
      err(msg);
    }
  } else {
    exitRuntime();
  }

  procExit(status);
}

function procExit(code) {
  EXITSTATUS = code;
  if (!keepRuntimeAlive()) {
    if (Module['onExit']) Module['onExit'](code);
    ABORT = true;
  }
  quit_(code, new ExitStatus(code));
}

if (Module['preInit']) {
  if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']];
  while (Module['preInit'].length > 0) {
    Module['preInit'].pop()();
  }
}

// shouldRunNow refers to calling main(), not run().
var shouldRunNow = true;

if (Module['noInitialRun']) shouldRunNow = false;

run();





