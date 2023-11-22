window.addEventListener("load", function() {
    var section = document.querySelector("#sec1");

    var titleInput = document.querySelector(".title-input");
    var addButton = document.querySelector(".add-button");
    var delButton = document.querySelector(".del-button");
    var menuList = document.querySelector(".menu-list");

    addButton.onclick = function() {

        var title = titleInput.value;

        var html = '<a href="">'+title+'</a>';
        var li = document.createElement("li");
        li.innerHTML = html;

        // menuList.appendChild(li);

        // 여러개를 한번에 넣을수 있고, 문자열도 넣을 수 있음 
        menuList.append(li);

    }

    delButton.onclick = function() {
        // var txtNode = menuList.childNodes[0];  // 모든 노드 삭제
        var ilNode = menuList.children[0]; // 엘리멘트 노드만 삭제
        // menuList.removeChild(ilNode);

        // 부모입장에서 지우는것이 아닌 본인 스스로 지움
        ilNode.remove();
    }

});