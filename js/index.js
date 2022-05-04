var dTable = "";
var dataSet = "";
var dataSrc = [];
var count = 0;
var sStatusOrder = 0;
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear()+543;
today = dd + '/' + mm + '/' + yyyy;
var _0x2223a8=_0x4a06;function _0x4a06(_0x58d05f,_0x37522b){var _0x51897b=_0x5189();return _0x4a06=function(_0x4a065c,_0x574a38){_0x4a065c=_0x4a065c-0xa6;var _0x5ad908=_0x51897b[_0x4a065c];return _0x5ad908;},_0x4a06(_0x58d05f,_0x37522b);}function _0x5189(){var _0x4c9d9a=['1193208OLbmRR','retailproject-6f4fc.firebaseapp.com','793537bcfEnc','1029280khHJRm','AIzaSyDfTJJ425U4OY0xac6jdhtSxDeuJ-OF-lE','3048VLbdVv','retailproject-6f4fc','653667385625','15090327YLbHCA','3241BeunWp','20392sIqUAD','retailproject-6f4fc.appspot.com','380qTLowL','1133772GbhIaw','G-9SKTRHHSW9'];_0x5189=function(){return _0x4c9d9a;};return _0x5189();}(function(_0xd95154,_0xe1abc4){var _0xb84bf7=_0x4a06,_0x110b75=_0xd95154();while(!![]){try{var _0x27bd57=-parseInt(_0xb84bf7(0xab))/0x1+-parseInt(_0xb84bf7(0xa9))/0x2+-parseInt(_0xb84bf7(0xa7))/0x3+-parseInt(_0xb84bf7(0xb3))/0x4*(-parseInt(_0xb84bf7(0xa6))/0x5)+parseInt(_0xb84bf7(0xae))/0x6*(parseInt(_0xb84bf7(0xb2))/0x7)+-parseInt(_0xb84bf7(0xac))/0x8+parseInt(_0xb84bf7(0xb1))/0x9;if(_0x27bd57===_0xe1abc4)break;else _0x110b75['push'](_0x110b75['shift']());}catch(_0x436a60){_0x110b75['push'](_0x110b75['shift']());}}}(_0x5189,0x624c6));var firebaseConfig={'apiKey':_0x2223a8(0xad),'authDomain':_0x2223a8(0xaa),'projectId':_0x2223a8(0xaf),'storageBucket':_0x2223a8(0xb4),'messagingSenderId':_0x2223a8(0xb0),'appId':'1:653667385625:web:a5aed08500de80839f0588','measurementId':_0x2223a8(0xa8)};
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore().collection("SocietyMenu");
var dateString="";
var Eid = "";
//var sstatusconfirm = 2;
loadData();



function loadData(){
  //alert(x);
  var i = 0;
  count = 0;
  dataSet = "";
  dataSrc = [];

  db
  //.where('statusconfirm','==',parseInt(sstatusconfirm))
  .orderBy('GroupRank','asc')
  //.limit(20)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      i = (i+1);
      var sGroupID = "";
      if(doc.data().GroupID == 0) {
        sGroupID = '<b>0. ข่าวเด่น</b>';
      } else if(doc.data().GroupID == 1) {
        sGroupID = '<b>1. ระบบงาน</b>';
      } else if(doc.data().GroupID == 2) {
        sGroupID = '<b>2. กิจกรรม</b>';
      } else if(doc.data().GroupID == 3) {
        sGroupID = '<b>3. ข่าวสาร</b>';
      } else if(doc.data().GroupID == 4) {
        sGroupID = '<b>4. ทั่วไป</b>';
      }

      var sGroupStatus = "";
      if(doc.data().GroupStatus == 0) {
        sGroupStatus = '<font color="#0056ff"><b>เปิดใช้งาน</b></font>';
      } else {
        sGroupStatus = '<font color="#f68b1f"><b>ปิดใช้งาน</b></font>';
      }
      //var dataSet = [sGroupID, doc.data().GroupRank, doc.data().GroupName, doc.data().GroupLink, doc.data().GroupDetail, sGroupStatus, doc.data().CountView,  "<div class='btn-t1 btn-add' id="+i+">คลิก</div>" , doc.id, i];
      var dataSet = [sGroupID, doc.data().GroupRank, doc.data().GroupName, doc.data().GroupLink, sGroupStatus, doc.data().CountView,  "<div class='btn-t1 btn-add' id="+i+">คลิก</div>" , doc.id, i];
      dataSrc.push(dataSet);
      count++;
    }); 
    //alert(count);
    //console.log("Select : "+ sStatusOrder +" | จำนวน "+ count + " ข้อมูล");
    document.getElementById('loading').style.display = 'none';
    //document.getElementById('OpenData').style.display = 'block';

    dTable=$('#ex-table').DataTable({
      "bDestroy": true,    
      data: dataSrc,
      columns: [
        { title: "GroupID", className: "txt-center" },
        { title: "Rank", className: "txt-center" },
        { title: "GroupName" },
        { title: "GroupLink" },
        //{ title: "GroupDetail" },
        { title: "GroupStatus", className: "txt-center" },
        { title: "CountView", className: "txt-center" },
        { title: "รายการ", className: "txt-center" }
        ],
        dom: 'lfrtipB',
        buttons: [
            'copy', 'excelFlash', 'excel', 'pdf', 'print'
        ],
          lengthMenu: [[50, 100, -1], [50, 100, "All"]]
        //dom: 'Bfrtip', buttons: [ 'copy', 'csv', 'excel', 'pdf', 'print' ]
      });   
      $('#ex-table tbody').on( 'click', 'tr', function () {
        var data = dTable.row( $(this).parents('tr') ).data();
        if(count!=0) {
            ClickID(dTable.row( this ).data()[7],dTable.row( this ).data()[8]);
        }
        //console.log(dTable.row( this ).data()[6]);
      });
  });
  $('#ex-table').DataTable().destroy();
  $("#ex-table tbody").remove();
}


function ClickID(x,id) {
  var sid = id;
  //alert(x+"==="+id);
  var str = "";
  db.where(firebase.firestore.FieldPath.documentId(), "==", x)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      Eid = doc.id;
      str += '<div style="margin-top:10px;">';
      str += '<div class="redeem-header">'+ doc.data().GroupName +'</div>';
      str += '<div style="width:550px;margin:auto;text-align: left;">';
      str += '<div class="redeem-txt4">สถานะ</div>';
      str += '<div class="redeem-txt5"><input type="text" value="'+ doc.data().GroupStatus +'" id="idGroupStatus"> (0. เปิดใช้งาน | 1. ปิดการใช้งาน)</div>';
      str += '<div class="redeem-txt4">หมวด</div>';
      str += '<div class="redeem-txt5"><input type="text" value="'+ doc.data().GroupID +'" id="idGroupID"> (1. ระบบ | 2. กิจกรรม | 3. News | 4. ทั่วไป)</div>';
      str += '<div class="redeem-txt4">ลำดับ</div>';
      str += '<div class="redeem-txt5"><input type="text" value="'+ doc.data().GroupRank +'" id="idGroupRank"></div>';
      str += '<div class="redeem-txt4">กิจกรรม</div>';
      str += '<div class="redeem-txt5"><input type="text" value="'+ doc.data().GroupName +'" id="idGroupName" style="width:100%;"></div>';
      str += '<div class="redeem-txt4">บนเว็บ</div>';
      str += '<div class="redeem-txt5"><input type="text" value="'+ doc.data().GroupNameWeb +'" id="idGroupNameWeb" style="width:100%;"></div>';
      str += '<div class="redeem-txt4">รายละเอียด</div>';
      str += '<div class="redeem-txt5"><input type="text" value="'+ doc.data().GroupDetail +'" id="idGroupDetail" style="width:100%;"></div>';
      str += '<div class="redeem-txt4">ลิงก์ URL</div>';
      str += '<div class="redeem-txt5"><input type="text" value="'+ doc.data().GroupLink +'" id="idGroupLink" style="width:100%;"></div>';
      str += '<div class="redeem-txt4">ลิงก์รูป</div>';
      str += '<div class="redeem-txt5"><input type="text" value="'+ doc.data().GroupImg +'" id="idGroupImg" style="width:100%;"></div>';
      str += '<div class="redeem-txt4">Click</div>';
      str += '<div class="redeem-txt5"><input type="text" value="'+ doc.data().CountView +'" id="idCountView"></div>';
      str += '</div><div class="clr"></div>';
      str += '<div class="btn-t1" onclick="SaveClass(\''+ doc.id +'\')" style="margin:30px auto 20px auto;">บันทึกรายการ</div>';
      str += '<div class="btn-t2" onclick="CloseAll()" style="margin:30px auto 20px 10px;">ปิดหน้าต่างนี้</div>';
      str += '<div class="clr"></div>';
      str += '</div><dic class="clr" style="height:30px;"></div>';
    });
    $("#DisplayByItem").html(str);
    //str = "";
    document.getElementById("id01").style.display = "block";
  });
}



function SaveClass(x) {
  var sidGroupStatus = document.getElementById("idGroupStatus").value;
  var sidGroupID = document.getElementById("idGroupID").value;
  var sidGroupRank = document.getElementById("idGroupRank").value;
  var sidGroupName = document.getElementById("idGroupName").value;
  var sidGroupNameWeb = document.getElementById("idGroupNameWeb").value;
  var sidGroupDetail = document.getElementById("idGroupDetail").value;
  var sidGroupLink = document.getElementById("idGroupLink").value;
  var sidGroupImg = document.getElementById("idGroupImg").value;
  var sidCountView = document.getElementById("idCountView").value;
  db.doc(x).update({
    GroupStatus : parseFloat(sidGroupStatus),
    GroupID : parseFloat(sidGroupID),
    GroupRank : parseFloat(sidGroupRank),
    GroupName : sidGroupName,
    GroupNameWeb : sidGroupNameWeb,
    GroupDetail : sidGroupDetail,
    GroupLink : sidGroupLink,
    GroupImg : sidGroupImg
    //CountView : parseFloat(sidCountView)
  });
  document.getElementById("idGroupStatus").value = "";
  document.getElementById("idGroupID").value = "";
  document.getElementById("idGroupRank").value = "";
  document.getElementById("idGroupName").value = "";
  document.getElementById("idGroupNameWeb").value = "";
  document.getElementById("idGroupDetail").value = "";
  document.getElementById("idGroupLink").value = "";
  document.getElementById("idGroupImg").value = "";
  document.getElementById("idCountView").value = "";
  document.getElementById('id01').style.display='none';



  //alert("บันทึกรายการแก้ไขเรียบร้อยแล้ว");
  loadData();
}


function NewRecord() {
  var str = "";
  str += '<div style="margin-top:10px;">';
  str += '<div class="redeem-header">เพิ่มข้อมูลใหม่</div>';
  str += '<div style="width:550px;margin:auto;text-align: left;">';
  str += '<div class="redeem-txt4">สถานะ</div>';
  str += '<div class="redeem-txt5"><input type="text" value="0" id="idGroupStatus"> (0. เปิดใช้งาน | 1. ปิดการใช้งาน)</div>';
  str += '<div class="redeem-txt4">หมวด</div>';
  str += '<div class="redeem-txt5"><input type="text" value="0" id="idGroupID"> (1. ระบบ | 2. กิจกรรม | 3. News | 4. ทั่วไป)</div>';
  str += '<div class="redeem-txt4">ลำดับ</div>';
  str += '<div class="redeem-txt5"><input type="text" value="0" id="idGroupRank"></div>';
  str += '<div class="redeem-txt4">กิจกรรม</div>';
  str += '<div class="redeem-txt5"><input type="text" id="idGroupName" style="width:100%;"></div>';
  str += '<div class="redeem-txt4">บนเว็บ</div>';
  str += '<div class="redeem-txt5"><input type="text" id="idGroupNameWeb" style="width:100%;"></div>';
  str += '<div class="redeem-txt4">รายละเอียด</div>';
  str += '<div class="redeem-txt5"><input type="text" id="idGroupDetail" style="width:100%;"></div>';
  str += '<div class="redeem-txt4">ลิงก์ URL</div>';
  str += '<div class="redeem-txt5"><input type="text" id="idGroupLink" style="width:100%;"></div>';
  str += '<div class="redeem-txt4">ลิงก์รูป</div>';
  str += '<div class="redeem-txt5"><input type="text" id="idGroupImg" style="width:100%;"></div>';
  str += '<div class="redeem-txt4">Click</div>';
  str += '<div class="redeem-txt5"><input type="text" value="0" id="idCountView"></div>';
  str += '</div><div class="clr"></div>';
  str += '<div class="btn-t1" onclick="SaveNewRecord()" style="margin:30px auto 20px auto;">บันทึกรายการ</div>';
  str += '<div class="btn-t2" onclick="CloseAll()" style="margin:30px auto 20px 10px;">ปิดหน้าต่างนี้</div>';
  str += '<div class="clr"></div>';
  str += '</div><dic class="clr" style="height:30px;"></div>';
  $("#DisplayByItem").html(str);
  document.getElementById("id01").style.display = "block";
}


function SaveNewRecord() {
  var sidGroupStatus = document.getElementById("idGroupStatus").value;
  var sidGroupID = document.getElementById("idGroupID").value;
  var sidGroupRank = document.getElementById("idGroupRank").value;
  var sidGroupName = document.getElementById("idGroupName").value;
  var sidGroupNameWeb = document.getElementById("idGroupNameWeb").value;
  var sidGroupDetail = document.getElementById("idGroupDetail").value;
  var sidGroupLink = document.getElementById("idGroupLink").value;
  var sidGroupImg = document.getElementById("idGroupImg").value;
  var sidCountView = document.getElementById("idCountView").value;
  db.add({
    GroupStatus : parseFloat(sidGroupStatus),
    GroupID : parseFloat(sidGroupID),
    GroupRank : parseFloat(sidGroupRank),
    GroupName : sidGroupName,
    GroupNameWeb : sidGroupNameWeb,
    GroupDetail : sidGroupDetail,
    GroupLink : sidGroupLink,
    GroupImg : sidGroupImg,
    CountView : 0
  });
  document.getElementById("idGroupStatus").value = "";
  document.getElementById("idGroupID").value = "";
  document.getElementById("idGroupRank").value = "";
  document.getElementById("idGroupName").value = "";
  document.getElementById("idGroupNameWeb").value = "";
  document.getElementById("idGroupDetail").value = "";
  document.getElementById("idGroupLink").value = "";
  document.getElementById("idGroupImg").value = "";
  document.getElementById("idCountView").value = "";
  document.getElementById('id01').style.display='none';
  loadData();
}

/*
function ConfirmRead(id) {
  document.getElementById(id).style.display = "none";
  var a1 = 1;
  db.doc(Eid).update({
      statusconfirm : parseInt(a1)
  });
  Eid = "";
  document.getElementById("id01").style.display = "none";
}


function CancelRead(id) {
  document.getElementById(id).style.display = "none";
  //alert("Cancel "+id);
  var a1 = 9;
  db.doc(Eid).update({
      statusconfirm : parseInt(a1)
  });
  Eid = "";
  document.getElementById("id01").style.display = "none";
}


function DeleteRead(id) {
  document.getElementById(id).style.display = "none";
  //alert("Cancel "+id);
  db.doc(Eid).delete();
  Eid = "";
  document.getElementById("id01").style.display = "none";
}
*/

/*
function SendGift(x,id) {
  document.getElementById(id).style.display = "none";
	//alert(x+"==="+EidStockList);
  dbStockList.doc(EidStockList).update({
    StatusOrder : 1,
    DateSend : dateString
  });
}
*/

function CloseAll() {
  document.getElementById('id01').style.display='none';
}


function NewDate() {
  var today = new Date();
  var day = today.getDate() + "";
  var month = (today.getMonth() + 1) + "";
  var year = today.getFullYear() + "";
  var hour = today.getHours() + "";
  var minutes = today.getMinutes() + "";
  var seconds = today.getSeconds() + "";
  var ampm = hour >= 12 ? 'PM' : 'AM';

  day = checkZero(day);
  month = checkZero(month);
  year = checkZero(year);
  hour = checkZero(hour);
  minutes = checkZero(minutes);
  seconds = checkZero(seconds);
  dateString = day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + seconds +" "+ ampm;
  //alert(GetNewDate);
  //console.log(day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + seconds +" "+ ampm);
}


function checkZero(data){
  if(data.length == 1){
    data = "0" + data;
  }
  return data;
}

