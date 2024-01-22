var siteName = document.getElementById("sitename");
var siteurl = document.getElementById("siteurl");
var sitedes = document.getElementById("sitedes");
var submitbtn = document.getElementById('submitbtn');
var errorbox = document.getElementById('errormessage');
var deletebtn;
var visitbtn;
var bookmarks = [];
function ok(){
    errorbox.style.display="none";
}
function displayerror(){
    errorbox.style.display="inline-block";
}
function captial(str){
    let strArr = str.split("");
    strArr[0] = strArr[0].toUpperCase();
    return strArr.join("");
}
if(localStorage.getItem("bookmarklist")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarklist"));
}
 function takeinput(){
    var print={
        Name:captial(siteName.value),
        url:siteurl.value,
        description:sitedes.value
    }
    if(print.description==""){
      print.description="---";
    }
    if(print.Name==""||print.url==""){
       displayerror()
    }
    else {
        bookmarks.push(print);
    }
    localStorage.setItem('bookmarklist',JSON.stringify(bookmarks))
    display()
    clear()
   
 }
 function clear(){
    siteName.value="";
    siteurl.value="";
    sitedes.value="";
 }
 function cancel(){
    siteName.value="";
    siteurl.value="";
    sitedes.value="";
}
function deleteitem(index){
    bookmarks.splice(index,1)
    localStorage.setItem('bookmarklist',JSON.stringify(bookmarks))
    display()
}
function display(){
    var all=``;
    for(var i=0;i<bookmarks.length;i++){
        all+=`
        <tr>
            <td>${i+1}</td>
            <td>${bookmarks[i].Name}</td>
            <td>${bookmarks[i].description}</td> 
            <td><button onclick="visititem(${i})" class="btn btn-info"><i class="fa-solid fa-arrow-up-right-from-square" style="color: #ededed;"></i></button></td>
            <td><button onclick="updateitem(${i})" class="btn btn-secondary"><i class="fa-solid fa-pen" style="color: #f5f5f5;"></i></button></td>
            <td><button onclick="deleteitem(${i})" class="btn btn-danger"><i class="fa-solid fa-trash" style="color: #e2e4e9;"></i></button></td>
        </tr>
        `
    }
    document.getElementById("tableContent").innerHTML=all
}
display()
visitbtn = document.getElementsByClassName(".btn.btn-info");
if(visitbtn){
    for(var i=0;i<visitbtn.length;i++){
        visitbtn[i].addEventListener("click",function(e){
            visititem(e);
        })
    }
}
function visititem(index){
  
    open(bookmarks[index].url);
      console.log(bookmarks[index].url);
    // open(`https://${bookmarks[index].siteURL}`);


}
function updateitem(index){
  // bookmarks[index].Name=siteName.value
  // bookmarks[index].url=siteurl.value
  // bookmarks[index].description=sitedes.value
  // if(bookmarks[index].description.value==""){
  //  bookmarks[index].description.value="---";
  // }
  takeinput()
  deleteitem(index)
  localStorage.setItem('bookmarklist',JSON.stringify(bookmarks))
  display()
  clear()
}
function searchitem(){
  var srch=document.getElementById('srchinpt').value
  var box=``
  for(var i=0;i<bookmarks.length;i++){
      if(bookmarks[i].Name.toLowerCase().includes(srch.toLowerCase())){
        
          box+=`
          <tr>
          <td>${i+1}</td>
          <td>${bookmarks[i].Name.replace(srch,'<span style="background-color:#333; color:white;">'+srch+'</span>')}</td>
          <td>${bookmarks[i].description}</td>
          <td><button onclick="visititem(${i})" class="btn btn-info"><i class="fa-solid fa-arrow-up-right-from-square" style="color: #ededed;"></i></button></td>
          <td><button onclick="deleteitem(${i})" class="btn btn-danger"><i class="fa-solid fa-trash" style="color: #e2e4e9;"></i></button></td>
           </tr>
          `
      }
  }
  document.getElementById('tableContent').innerHTML=box
  }
var nRegex = /^\w{3,}(\s+\w+)*$/;
// var Uegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

siteName.addEventListener("input", function () {
  validate(siteName, nRegex);
});

// siteurl.addEventListener("input", function () {
//   validate(siteurl, Uegex);
// });

function validate(element, regex) {
  var testRegex = regex;
  if (testRegex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}

//Close Modal Function

function closeModal() {
  boxModal.classList.add("d-none");
}

// 3 ways to close modal => close button -  Esc key - clicking outside modal

document.addEventListener("keydown", function (e) {
  if (e.key == "Escape") {
    closeModal();
  }
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("box-info")) {
    closeModal();
  }
});
let color= document.getElementById("bdy")
 function darkcolor() {
 color.style.backgroundColor="#333";
alert("Dark")

 }
 function lightcolor() {
    color.style.background="linear-gradient(114deg, rgba(114,193,199,1) 0%, rgba(132,69,252,1) 50%, rgba(222,103,228,1) 100%)";
  
}