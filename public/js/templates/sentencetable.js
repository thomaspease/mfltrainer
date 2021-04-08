function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}export function sentencetableTemplate(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {"frontend-views\u002F\u002Fsentencetable.pug":"table\n    tr\n        th\n            -\u002F\u002F empty\n        each field in fields\n            th\n                =field\n    each sentence in sentences\n        tr\n            td\n                input(type=\"checkbox\" checked=\"\" data-sentence_id=sentence.data._id)\n            each field in fields\n                td\n                    =sentence.data[field]\n            \n"};
;var locals_for_with = (locals || {});(function (fields, sentences) {;pug_debug_line = 1;pug_debug_filename = "frontend-views\u002F\u002Fsentencetable.pug";
pug_html = pug_html + "\u003Ctable\u003E";
;pug_debug_line = 2;pug_debug_filename = "frontend-views\u002F\u002Fsentencetable.pug";
pug_html = pug_html + "\u003Ctr\u003E";
;pug_debug_line = 3;pug_debug_filename = "frontend-views\u002F\u002Fsentencetable.pug";
pug_html = pug_html + "\u003Cth\u003E";
;pug_debug_line = 4;pug_debug_filename = "frontend-views\u002F\u002Fsentencetable.pug";
// empty
pug_html = pug_html + "\u003C\u002Fth\u003E";
;pug_debug_line = 5;pug_debug_filename = "frontend-views\u002F\u002Fsentencetable.pug";
// iterate fields
;(function(){
  var $$obj = fields;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var field = $$obj[pug_index0];
;pug_debug_line = 6;pug_debug_filename = "frontend-views\u002F\u002Fsentencetable.pug";
pug_html = pug_html + "\u003Cth\u003E";
;pug_debug_line = 7;pug_debug_filename = "frontend-views\u002F\u002Fsentencetable.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = field) ? "" : pug_interp)) + "\u003C\u002Fth\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var field = $$obj[pug_index0];
;pug_debug_line = 6;pug_debug_filename = "frontend-views\u002F\u002Fsentencetable.pug";
pug_html = pug_html + "\u003Cth\u003E";
;pug_debug_line = 7;pug_debug_filename = "frontend-views\u002F\u002Fsentencetable.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = field) ? "" : pug_interp)) + "\u003C\u002Fth\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ftr\u003E";
;pug_debug_line = 8;pug_debug_filename = "frontend-views\u002F\u002Fsentencetable.pug";
// iterate sentences
;(function(){
  var $$obj = sentences;
  if ('number' == typeof $$obj.length) {
      for (var pug_index1 = 0, $$l = $$obj.length; pug_index1 < $$l; pug_index1++) {
        var sentence = $$obj[pug_index1];
;pug_debug_line = 9;pug_debug_filename = "frontend-views\u002F\u002Fsentencetable.pug";
pug_html = pug_html + "\u003Ctr\u003E";
;pug_debug_line = 10;pug_debug_filename = "frontend-views\u002F\u002Fsentencetable.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 11;pug_debug_filename = "frontend-views\u002F\u002Fsentencetable.pug";
pug_html = pug_html + "\u003Cinput" + (" type=\"checkbox\" checked=\"\""+pug_attr("data-sentence_id", sentence.data._id, true, false)) + "\u002F\u003E\u003C\u002Ftd\u003E";
;pug_debug_line = 12;pug_debug_filename = "frontend-views\u002F\u002Fsentencetable.pug";
// iterate fields
;(function(){
  var $$obj = fields;
  if ('number' == typeof $$obj.length) {
      for (var pug_index2 = 0, $$l = $$obj.length; pug_index2 < $$l; pug_index2++) {
        var field = $$obj[pug_index2];
;pug_debug_line = 13;pug_debug_filename = "frontend-views\u002F\u002Fsentencetable.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 14;pug_debug_filename = "frontend-views\u002F\u002Fsentencetable.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = sentence.data[field]) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index2 in $$obj) {
      $$l++;
      var field = $$obj[pug_index2];
;pug_debug_line = 13;pug_debug_filename = "frontend-views\u002F\u002Fsentencetable.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 14;pug_debug_filename = "frontend-views\u002F\u002Fsentencetable.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = sentence.data[field]) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ftr\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index1 in $$obj) {
      $$l++;
      var sentence = $$obj[pug_index1];
;pug_debug_line = 9;pug_debug_filename = "frontend-views\u002F\u002Fsentencetable.pug";
pug_html = pug_html + "\u003Ctr\u003E";
;pug_debug_line = 10;pug_debug_filename = "frontend-views\u002F\u002Fsentencetable.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 11;pug_debug_filename = "frontend-views\u002F\u002Fsentencetable.pug";
pug_html = pug_html + "\u003Cinput" + (" type=\"checkbox\" checked=\"\""+pug_attr("data-sentence_id", sentence.data._id, true, false)) + "\u002F\u003E\u003C\u002Ftd\u003E";
;pug_debug_line = 12;pug_debug_filename = "frontend-views\u002F\u002Fsentencetable.pug";
// iterate fields
;(function(){
  var $$obj = fields;
  if ('number' == typeof $$obj.length) {
      for (var pug_index3 = 0, $$l = $$obj.length; pug_index3 < $$l; pug_index3++) {
        var field = $$obj[pug_index3];
;pug_debug_line = 13;pug_debug_filename = "frontend-views\u002F\u002Fsentencetable.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 14;pug_debug_filename = "frontend-views\u002F\u002Fsentencetable.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = sentence.data[field]) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index3 in $$obj) {
      $$l++;
      var field = $$obj[pug_index3];
;pug_debug_line = 13;pug_debug_filename = "frontend-views\u002F\u002Fsentencetable.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 14;pug_debug_filename = "frontend-views\u002F\u002Fsentencetable.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = sentence.data[field]) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ftr\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ftable\u003E";}.call(this,"fields" in locals_for_with?locals_for_with.fields:typeof fields!=="undefined"?fields:undefined,"sentences" in locals_for_with?locals_for_with.sentences:typeof sentences!=="undefined"?sentences:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}