var Gst = {h:[[0,0,0,0]]};
var sampleSize = 10;

Gst.mouseUp = function() { Gst.isMouseDown = false; Gst.cleanup(); };
Gst.mouseMoves = function(ev) {
	if (Gst.isMouseDown) { ev = ev || window.event; if (ev != null) { 
		var target = ev.target || ev.srcElement;
		var m = Gst.mouseCoords(ev);
		var prv = Gst.h[Gst.h.length-1];
		var nxt = [m.x,m.y,m.x-prv[0],m.y-prv[1]];
		nxt.push(Gst.bearing(Gst.h.slice(Gst.h.length-sampleSize)))
		Gst.h.push(nxt);
	} }
}
Gst.mouseCoords = function(ev) {
	if (ev.pageX || ev.pageY) {
		return { x:ev.pageX, y:ev.pageY };
	} else {
		return {
			x:(ev.clientX+document.body.scrollLeft-document.body.clientLeft),
			y:(ev.clientY+document.body.scrollTop-document.body.clientTop)
		};
	}
}

Gst.bearing = function(s){
	var d = [0,0];
	for (i=0;i<s.length;i++){d=[d[0]+s[i][2],d[1]+s[i][3]];}
	d = [d[0]/s.length,d[1]/s.length];	
	if (Math.abs(d[0])>=Math.abs(d[1])) {
		if (d[0]<0) { return "W"; } else { return "E"; }
	} else {
		if (d[1]<0) { return "N"; } else { return "S"; }
	}
}

Gst.cleanup = function() {
	var h = Gst.h;
	Gst.h = [[0,0,0,0]];
	var o = [];
	for (i=4;i<h.length-1;i++) {
		if ((h[i][4]==h[i-1][4])&&(h[i][4]==h[i+1][4])) {
			o.push(h[i][4]);
		}
	}
	var o_ = [];
	for (i=1;i<o.length;i++) { if ((i==1)||(o[i-1]!=o[i])) { o_.push(o[i]); } }
	Gst.matchP(o_.join(""));
}

Gst.matchP = function(p) {
	for (gestureName in Gst.lib) { if (p==Gst.lib[gestureName]) {
		Gst.doSomething(gestureName);
	} }
}

Gst.doSomething = function(g) {
	if (g.indexOf("letter_")==0) {
		var consoleStr = document.getElementById('console').innerHTML + g.substr(7).toUpperCase();
		document.getElementById('console').innerHTML = consoleStr;
	}
}

document.onmousemove = Gst.mouseMoves;
document.onmouseup = Gst.mouseUp;

Gst.lib = {
	letter_A: "NSNWE",
	letter_B: "NESWESW",
	letter_C: "WSE",
	letter_d: "NWSENS",
	letter_e: "ENWSE",
	letter_F: "WSNEW",
	letter_G: "WSENWE",
	letter_h: "SNES",
	letter_I: "EWSEW",
	letter_J: "SW",
	letter_k: "SEWEW", //wtf
	letter_L: "SE",
	letter_M: "NSNS",
	letter_N: "NSN",
	letter_O: "WNESW",
	letter_P: "NESW",
	letter_q: "WSENSN",
	letter_R: "NESWS",
	letter_S: "WSESW",
	letter_T: "EWS",
	letter_U: "SEN",
	letter_V: "SN",
	letter_W: "SNSN",
	letter_X: "",
	letter_y: "SENS",
	letter_Z: "ESE",
	'letter_ ': "E",
	symbol_sawtooth: "NSNSNS"
};