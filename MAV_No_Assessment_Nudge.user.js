// ==UserScript==
// @name        MAV No Assessment Nudge
// @namespace   https://damos.world
// @description Nudge students based on assessment submission status
// @include     https://moodle.cqu.edu.au/*
// @grant       GM_openInTab
// @version     0.0.3
// ==/UserScript==

console.log("At the start") ;

try
{
  console.log("about to add EASI Menu") ;
  var option = document.createElement("option") ;
  option.setAttribute("value","nudge") ;
  option.textContent = "Nudge with EASICONNECT" ;
  var list = document.querySelector("#id_operation") ;
  list.appendChild(option) ;
  console.log("EASI menu added") ;

  document.querySelector("#id_submit").addEventListener('click',function(e){
    if(list.value === 'nudge') {
      e.preventDefault() ;
      //Hacky and unreliable
      var course = document.querySelector('div#page-navbar a[href^="https://moodle.cqu.edu.au/course/view.php"]').textContent ;
      var rows = document.querySelectorAll('tr.selectedrow') ;
      var students = [] ;
      for(var i=0;i<rows.length;i++) {
        students.push(rows[i].querySelector('td.idnumber').textContent) ;
      }
      console.log("opening 'https://indicators.cqu.edu.au/easi/easi-courseview.php?coursecode="+course+"&selectStudents="+students.join()+"'") ;
      GM_openInTab("https://indicators.cqu.edu.au/easi/easi-courseview.php?coursecode="+course+"&selectStudents="+students.join(),false);
    }
  },{"capture":true,"passive":false}) ;

  
}
catch(err)
{
  console.log('Error: '+err) ;
  console.log('On line: '+err.lineNumber) ;
  console.log('Stack:'+err.stack) ;
}
