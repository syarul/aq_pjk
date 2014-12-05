$(document).ready(function () {
	
	var searchql = false; //declare search query status
	
	var scnt = 0; //declare search query count
	var quranData = 'aq.simple'; // alquran simple
	var transData = 'id.indonesia'; // indonesia translation
	
	//clear global variables and search entries once user focus on input
	$("#container").focus(function () {
		//alert(bar);
		scnt = 0;
		sgr = [];
		$("#demo-1").html('');
		$('#sqlAnno').html('');
		searchql = false;
		//alert(scnt);
	});
	
	//lowercase array
	Array.prototype.toLowerCase = function () {
		var L = this.length,
		t;
		while (L) {
			t = this[--L] || '';
			if (t.toLowerCase)
				this[L] = t.toLowerCase();
		}
		return this;
	}
	//declare search string array
	var srr = [];
	//search trigger button
	$(function () {
		$("#search-button").click(function () {
			//saveDataState();
			hitelem();
			if (searchql == false) {
				var textParams = $("#container").val().trim();
				//srr = textParams.toLowerCase().split(" ");
				srr = textParams.split(" ");
				if (srr.length > 0 && srr[0] != "") {
					$('#loading').show();
					searchData();
				}
			}
		});
	});
	
	//search trigger form
	$("#searchForm").submit(function (e) {
        e.preventDefault();
		//alert('this');
		if (searchql == false) {
				var textParams = $("#container").val().trim();
				//srr = textParams.toLowerCase().split(" ");
				srr = textParams.split(" ");
				if (srr.length > 0 && srr[0] != "") {
					$('#loading').show();
					searchData();
				}
			}
		$("#search-button").focus();
    });
	
	var sgr = [];
	//advance search function
	function searchData() {
		$.getJSON("./json/" + transData + ".json", {
			format : "jsonp",
		}, function (data) {
			$.each(data.quran.sura, function (i, v) {
				$.each(v.aya, function (index, w) {
					sgr.push(w.text + ' [<span id="sur">' + v.index + '</span>:<span id="num">' + w.index + '</span>]');
				});
			});
			if (srr.length == 1){token1(sgr);}
			if (srr.length == 2){token2(sgr);}
			if (srr.length == 3){token3(sgr);}
			if (srr.length == 4){token4(sgr);}
			if (srr.length == 5){token5(sgr);}
			if (srr.length > 5) {resultCall();}
		});
		
	};
	//var re = /\w+\s/g;
	//var str = "john amu da";
	//var newstr = str.match(re);
	//console.log(newstr);
	//search Array 1 token
	function token1(r) {
		for (var j = 0; j < r.length; j++) {
			//if (r[j].match(srr[0], "g")) {
			var re = new RegExp(srr[0],"g");
			if (r[j].match(re)) {
				$('<p>').html(r[j]).appendTo("#demo-1");
				scnt++;	
			} 
		} 
		searchql = true;
		hlsSyntax(srr[0]);
		resultCall();
	}
	//search Array 2 tokens
	function token2(r) {
		for (var j = 0; j < r.length; j++) {
			if (r[j].match(srr[0], "g") && r[j].match(srr[1], "g")) {
				$('<p>').html(r[j]).appendTo("#demo-1");
				scnt++;
			}
		}
		searchql = true;
		hlsSyntax(srr[0]);hlsSyntax(srr[1]);
		resultCall();
	}
	//search Array 3 tokens
	function token3(r) {
		for (var j = 0; j < r.length; j++) {
			if (r[j].match(srr[0], "g") && r[j].match(srr[1], "g") && r[j].match(srr[2], "g")) {
				$('<p>').html(r[j]).appendTo("#demo-1");
				scnt++;
			}
		}
		searchql = true;
		hlsSyntax(srr[0]);hlsSyntax(srr[1]);hlsSyntax(srr[2]);
		resultCall();
	}
	//search Array 4 tokens
	function token4(r) {
		for (var j = 0; j < r.length; j++) {
			if (r[j].match(srr[0], "g") && r[j].match(srr[1], "g") && r[j].match(srr[2], "g") && r[j].match(srr[3], "g")) {
				$('<p>').html(r[j]).appendTo("#demo-1");
				scnt++;
			}
		}
		searchql = true;
		hlsSyntax(srr[0]);hlsSyntax(srr[1]);hlsSyntax(srr[2]);hlsSyntax(srr[3]);
		resultCall();
	}
	//search Array 5 tokens
	function token5(r) {
		for (var j = 0; j < r.length; j++) {
			if (r[j].match(srr[0], "g") && r[j].match(srr[1], "g") && r[j].match(srr[2], "g") && r[j].match(srr[3], "g") && r[j].match(srr[4], "g")) {
				$('<p>').html(r[j]).appendTo("#demo-1");
				scnt++;
			}
		}
		searchql = true;
		hlsSyntax(srr[0]);hlsSyntax(srr[1]);hlsSyntax(srr[2]);hlsSyntax(srr[3]);hlsSyntax(srr[4]);
		resultCall();
	}
	
	var gsur = 1;
	var gnum = 1;
	var timeLoad;
	var timeNow;
	var thisevent;
	//append search count on search entries header
	function resultCall() {
		if (srr.length > 5) {
			$('#loading').hide();
			$('#sqlAnno').append('Too many search tokens.<br>You could write up to "5" search tokens, use space between them; eg. "token1" "token2" "token3" without the quotation marks.');
		} else {
			$('#loading').hide();
			$('#sqlAnno').append('found: ' + scnt + ' result(s) for "' + srr.join('", "') + '".');

			$("#demo-1").bind("touchstart", function(e) {
				var $target = $(e.target);
				if ($target.is("p")) {
					$target.addClass("bg-color-blueLight");
					
					gsur = $target.find("span#sur").html();
					gnum = $target.find("span#num").html();
					
					timeLoad = new Date().getTime();
			
					thisevent = setTimeout(function(){ 
						timeNow = new Date().getTime();
						if (timeNow - timeLoad > 500) {
							get_aqData();
						}
					}, 1000);
				}
			});
			
			$("#demo-1").bind("touchmove", function(e) {
				var $target = $(e.target);
				if ($target.is("p")) {
					clearTimeout(thisevent);
					//timeLoad = "";
					timeNow = 0;
					thisevent = "";
					$target.removeClass("bg-color-blueLight");
				}
			});

			$("#demo-1").bind("touchend", function(e) {
				var $target = $(e.target);
				if ($target.is("p")) {
					clearTimeout(thisevent);
					//timeLoad = "";
					timeNow = 0;
					thisevent = "";
					$target.removeClass("bg-color-blueLight");
				}
			});
		}
	}
	$(function () {
		$("#goto").click(function () {
			//hitelem();
			var x = $('#selectSur').val();
			var y = $('#selectNum').val();
			if (x=="sura" && y=="index"){}else{
				//alert(y);
				gsur = parseInt(x)+1;
				gnum = parseInt(y)+1;
				$("#gridsearch").show();
				$("#searchregion").hide();
				$("#gridindex").hide();
				//$("#demo-2").show();
				get_aqData();
			}
		});
	});
	//hitelem();
	function hitelem() {

		//get_aqData();
		//dataReady();
		//alert(surName[1]);
		//indexSur();
	}

	function get_aqData(){
		x = gsur;
		y = gnum;
		$.getJSON("./json/" + quranData + ".json", {
			format : "jsonp",
		}, function (data) {
			eventAq = data.quran.sura[x-1].aya[y-1].text;
			if (eventAq != undefined){
			get_aqTrans();
			return eventAq;
			} else {alert("no data found!");return false;}
			//return alert(eventAq);
		});
	};

	function get_aqTrans(){
		x = gsur;
		y = gnum;
		$.getJSON("./json/" + transData + ".json", {
			format : "jsonp"
		}, function (data) {
			eventTrans = data.quran.sura[x-1].aya[y-1].text;
			dataReady();

			return eventTrans;
		});	
	};
	
	// retrieve surah length
	var surLength = [];
	var surName = [];
	function get_aqLength() {
		$.getJSON("json/" + quranData + ".json", {
			format : "jsonp"
		}, function (data) {
			var r = {};
			var rname = {};
			for (var i = 0; i < data.quran.sura.length; i++) {
				r[i] = data.quran.sura[i].aya.length;
				rname[i] = data.quran.sura[i].name;
				surLength.push(r[i]);
				surName.push(rname[i]);
			}
		});	
	};
	get_aqLength();
	
	//var numAr = ["&#1776;","&#1777;","&#1778;","&#1779;","&#1780;","&#1781;","&#1782;","&#1783;",  ]
	var numr = [];
	for (var ar = 0; ar < 10; ar++) {
		numr[ar] = '&#17'+(76+ar)+';'
	}
	function cTaha(input){
	  var output = "";
	  for (var i = 0; i < input.length; i++)
	  {
		var letter = input.charAt(i);
		output += numr[letter];    	  
	  }
	return output;                   
	}
	//console.log(cTaha(''+13+''));
	function dataReady(){
			$("#demo-1").html('');
			$("#demo-2").html('');
			$("#sqlAnno").html('');
			$("<li>").html(
				'<span id="headerSur" style="margin-bottom:5px;padding-top:3px;min-height:22px;line-height:22px;background-color:#eee;display:block;text-align:center">'+surName[gsur-1]+ ' '+gsur+':'+gnum+'</span>'+
				'<div dir="rtl" id="arabic3">'+eventAq+'  <span id="arabic2">&#64831;'+cTaha(''+gsur+'')+':'+cTaha(''+gnum+'')+
				'</span><span id="arabic2">&#64830;</span></div>'+
				'<p dir="ltr" style="text-align:justify">' +eventTrans+ 
				'</p><div id="prev" style="float:left;min-height:40px;min-width:40px;line-height:40px;background-color:#eee;display:block;text-align:center">&#8249;</div><div id="next" style="float:right;min-height:40px;min-width:40px;line-height:40px;background-color:#eee;display:block;text-align:center">&#8250;</div>').appendTo("#demo-2");

			clearTimeout(thisevent);

			timeNow = 0;
			thisevent = "";

			$("#next").bind("touchstart", function(e) {
				$(this).addClass("bg-color-greenLight");
				}).bind("touchmove", function(e) {
					$(this).removeClass("bg-color-greenLight");
				}).bind("touchend", function(e) {
					$(this).removeClass("bg-color-greenLight");
					gnum++;
					if (gnum > surLength[gsur-1]){gnum=surLength[gsur-1];return false} else {
						get_aqData();
					}
				})

			$("#prev").bind("touchstart", function(e) {
				$(this).addClass("bg-color-greenLight");
				}).bind("touchmove", function(e) {
					$(this).removeClass("bg-color-greenLight");
				}).bind("touchend", function(e) {
					$(this).removeClass("bg-color-greenLight");
					gnum--;
					if (gnum < 1){ gnum=1;return false} else{
						get_aqData();
					}
				})
	}
	
	//highlight search string plugin call
	function hlsSyntax(regex) {
		$("#demo-1").highlight(regex);
    };

	for (var i = 1; i < 11; ++i) {
		$("#s"+i).bind("touchstart", function(e) {
			var x = $(this).html();
			$("#sD").append(x) ;
			$(this).addClass("bg-color-blueLight");
		}).bind("touchmove", function(e) {
			$(this).removeClass("bg-color-blueLight");
		}).bind("touchend", function(e) {
			$(this).removeClass("bg-color-blueLight");
		})
	}
	for (var i = 1; i < 11; ++i) {
		$("#i"+i).bind("touchstart", function(e) {
			var x = $(this).html();
			$("#iD").append(x);
			$(this).addClass("bg-color-blueLight");
		}).bind("touchmove", function(e) {
			$(this).removeClass("bg-color-blueLight");
		}).bind("touchend", function(e) {
			$(this).removeClass("bg-color-blueLight");
		})
	}
	
	$("#sRem").bind("touchstart", function(e) {
		$(this).addClass("bg-color-greenLight");
		}).bind("touchmove", function(e) {
			$(this).removeClass("bg-color-greenLight");
		}).bind("touchend", function(e) {
			$("#sD").html("");
			$("#iD").html("");
			$(this).removeClass("bg-color-greenLight");
		})
		
	$("#iGo").bind("touchstart", function(e) {
			$(this).addClass("bg-color-greenLight");			
	}).bind("touchmove", function(e) {
			$(this).removeClass("bg-color-greenLight");
		}).bind("touchend", function(e) {
			$(this).removeClass("bg-color-greenLight");
			var x = $('#sD').html();
			var y = $('#iD').html();
			if (x=="sura" && y=="index"){}else{
				gsur = parseInt(x);
				gnum = parseInt(y);
				$("#gridsearch").show();
				//$("#searchregion").hide();
				$("#gridindex").hide();
				get_aqData();
			}
		})
		
	$("#searchGo").bind("touchstart", function(e) {
			$(this).addClass("bg-color-greenLight");			
	}).bind("touchmove", function(e) {
			$(this).removeClass("bg-color-greenLight");
		}).bind("touchend", function(e) {
			$(this).removeClass("bg-color-greenLight");
			$("#gridindex").hide();
			$("#gridsearch").show();
		})
});
