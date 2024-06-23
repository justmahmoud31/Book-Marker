var siteName = document.getElementById("sitename");
var siteurl = document.getElementById("siteurl");
var sitedes = document.getElementById("sitedes");
var submitbtn = document.getElementById("submitbtn");
var errorbox = document.getElementById("errormessage");
var deletebtn;
var visitbtn;
var bookmarks = [];

function ok() {
  errorbox.style.display = "none";
}

function displayerror() {
  errorbox.style.display = "inline-block";
}

function captial(str) {
  let strArr = str.split("");
  strArr[0] = strArr[0].toUpperCase();
  return strArr.join("");
}

if (localStorage.getItem("bookmarklist")) {
  bookmarks = JSON.parse(localStorage.getItem("bookmarklist"));
}

function takeinput() {
  var print = {
    Name: captial(siteName.value),
    url: siteurl.value,
    description: sitedes.value,
  };
  if (print.description == "") {
    print.description = "---";
  }
  if (print.Name == "" || print.url == "") {
    displayerror();
  } else {
    bookmarks.push(print);
  }
  localStorage.setItem("bookmarklist", JSON.stringify(bookmarks));
  swal("done", "Your bookmark has been added", "success");
  display();
  clear();
}

function clear() {
  siteName.value = "";
  siteurl.value = "";
  sitedes.value = "";
}

function cancel() {
  siteName.value = "";
  siteurl.value = "";
  sitedes.value = "";
}

function deleteitem(index) {
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this Link",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      bookmarks.splice(index, 1);
      localStorage.setItem("bookmarklist", JSON.stringify(bookmarks));
      display();
      swal("Poof! Your imaginary Link has been deleted!", {
        icon: "success",
      });
    } else {
      swal("Your imaginary Link is safe!");
    }
  });
}

function display() {
  var all = ``;
  for (var i = 0; i < bookmarks.length; i++) {
    all += `
        <tr>  
            <td><a id="link-visit" onclick="visititem(${i})" >${bookmarks[i].Name}<a/></td>
            <td>${bookmarks[i].description}</td> 
            <td><button onclick="updateitem(${i})" class="btn btn-sm btn-secondary"><i class="fa-solid fa-pen" style="color: #f5f5f5;"></i></button></td>
            <td><button onclick="copyitem(${i})" class="btn btn-sm  btn-primary"><i class="fa-solid fa-copy" style="color: #ffffff;"></i></button></td>
            <td><button onclick="deleteitem(${i})" class="btn btn-sm  btn-danger"><i class="fa-solid fa-trash" style="color: #e2e4e9;"></i></button></td>
        </tr>
        `;
  }
  document.getElementById("tableContent").innerHTML = all;
}
//  <td><button onclick="visititem(${i})" class="btn btn-info"><i class="fa-solid fa-arrow-up-right-from-square" style="color: #ededed;"></i></button></td>
display();

visitbtn = document.getElementsByClassName(".btn.btn-info");
if (visitbtn) {
  for (var i = 0; i < visitbtn.length; i++) {
    visitbtn[i].addEventListener("click", function (e) {
      visititem(e);
    });
  }
}

function visititem(index) {
  open(bookmarks[index].url);
}

function updateitem(index) {
  const bookmark = bookmarks[index];

  Swal.fire({
    title: "Update Item",
    html: `
      <div class="inpts">
        <div class="inptsitename w-100 d-flex justify-content-center flex-column">
          <label class="my-4"> <i class="fa-solid fa-book"></i> Site Name </label>
          <input placeholder="Website Name" class="form-control" id="edit-sitename" value="${bookmark.Name}">
        </div>
        <div class="inptsiteurl w-100 d-flex justify-content-center flex-column">
          <label class="my-4"> <i class="fa-solid fa-link"></i> URL Link </label>
          <input placeholder="Website URL" class="form-control" id="edit-siteurl" value="${bookmark.url}">
        </div>
        <div class="inptsiteurl w-100 d-flex justify-content-center flex-column">
          <label class="my-4"><i class="fa-solid fa-comment"></i> Description</label>
          <input placeholder="Website Description" class="form-control" id="edit-sitedes" value="${bookmark.description}">
        </div>
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: "Update",
    preConfirm: () => {
      const updatedName = document.getElementById("edit-sitename").value;
      const updatedUrl = document.getElementById("edit-siteurl").value;
      const updatedDescription = document.getElementById("edit-sitedes").value;

      if (!updatedName || !updatedUrl) {
        Swal.showValidationMessage("Name and URL are required");
        return false;
      }

      return {
        updatedName,
        updatedUrl,
        updatedDescription:
          updatedDescription === "" ? "---" : updatedDescription,
      };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      const { updatedName, updatedUrl, updatedDescription } = result.value;
      bookmarks[index] = {
        Name: captial(updatedName),
        url: updatedUrl,
        description: updatedDescription,
      };
      localStorage.setItem("bookmarklist", JSON.stringify(bookmarks));
      Swal.fire("Updated!", "Your bookmark has been updated.", "success");
      display();
    }
  });
}

function copyitem(index) {
  const bookmarkUrl = bookmarks[index].url;
  navigator.clipboard
    .writeText(bookmarkUrl)
    .then(() => {
      swal("Copied!", "The URL has been copied to your clipboard.", "success");
    })
    .catch((err) => {
      swal("Error", "Failed to copy the URL.", "error");
    });
}

function searchitem() {
  var srch = document.getElementById("srchinpt").value;
  var box = ``;
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].Name.toLowerCase().includes(srch.toLowerCase())) {
      box += `
          <tr>
          <td><a id="link-visit" onclick="visititem(${i})" >${bookmarks[
        i
      ].Name.replace(
        srch,
        '<span style="background-color:#333; color:white;">' + srch + "</span>"
      )}<a/></td>
          <td>${bookmarks[i].description}</td>
          <td><button onclick="updateitem(${i})" class="btn btn-secondary"><i class="fa-solid fa-pen" style="color: #f5f5f5;"></i></button></td>
          <td><button onclick="copyitem(${i})" class="btn btn-primary"><i class="fa-solid fa-copy" style="color: #ffffff;"></i></button></td>
          <td><button onclick="deleteitem(${i})" class="btn btn-danger"><i class="fa-solid fa-trash" style="color: #e2e4e9;"></i></button></td>
           </tr>
          `;
    }
  }
  document.getElementById("tableContent").innerHTML = box;
}

var nRegex = /^\w{3,}(\s+\w+)*$/;
// var Uegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

siteName.addEventListener("input", function () {
  validate(siteName, nRegex);
});

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

function closeModal() {
  boxModal.classList.add("d-none");
}

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

let color = document.getElementById("bdy");

function darkcolor() {
  color.style.backgroundColor = "#333";
  alert("Dark");
}

function lightcolor() {
  color.style.background =
    "linear-gradient(114deg, rgba(114,193,199,1) 0%, rgba(132,69,252,1) 50%, rgba(222,103,228,1) 100%)";
}
