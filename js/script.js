
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
let linkTag = searchWrapper.querySelector("a");
let webLink;


inputBox.onkeyup = (e)=>{
    
    let userData = e.target.value; 
  
    let emptyArray = [];
    if(userData){
        $.ajax({
            type: "get",
            url: "https://reqres.in/api/users?page=2",
            dataType: "json",
            success: function (response) {
                let suggestions = response.data.map((data)=>{
                    return data.first_name + " " + data.last_name;
                })
               
                emptyArray = suggestions.filter((data)=>{
                    
                    return (data.toLocaleLowerCase().search(userData.toLocaleLowerCase()) >= 0);
                });
                emptyArray = emptyArray.map((data)=>{
                    
                    return data = `<li class="dropdown-item">${data}</li>`;
                });
                searchWrapper.classList.add("active");
                showSuggestions(emptyArray);
                let allList = suggBox.querySelectorAll("li");
                for (let i = 0; i < allList.length; i++) {
                
                    allList[i].setAttribute("onclick", "select(this)");
                }
            }
        });
        icon.onclick = ()=>{
            webLink = `https://www.google.com/search?q=${userData}`;
            linkTag.setAttribute("href", webLink);
            linkTag.click();
        }
       
    }else{
        searchWrapper.classList.remove("active"); 
        icon.onclick = ()=>{};
    }
}

function select(element){
    let selectData = element.textContent;
    inputBox.value = selectData;
    icon.onclick = ()=>{
        webLink = `https://www.google.com/search?q=${selectData}`;
        linkTag.setAttribute("href", webLink);
        linkTag.click();
    }
    searchWrapper.classList.remove("active");
}

function showSuggestions(list){
    let listData;
    if(!list.length){
        userValue = inputBox.value;
        listData = `<li class="dropdown-item">${userValue}</li>`;
    }else{
      listData = list.join('');
    }
    suggBox.innerHTML = listData;
}


$(".sub-cate").css("transform",`translate3d(${$("#cate-menu").width()}px, 0px, 0px)`);
$("#categories").mouseenter(function () { 
  $("#cate-menu").addClass("show");
});
$("#categories").mouseleave(function () {
  $("#cate-menu").removeClass("show");
});
$("#cate-menu").mouseenter(function () { 
  $(".sub-cate").addClass("show");
});
$("#cate-menu").mouseleave(function () {
  $(".sub-cate").removeClass("show");
});
$("#my-account").mouseenter(function () { 
  $("#account-menu").addClass("show");
});
$("#my-account").mouseleave(function () {
  $("#account-menu").removeClass("show");
});