function check() {
  const posts = document.querySelectorAll(".post");
  console.log(posts)
  posts.forEach(function (post) {
     if (post.getAttribute("data-load") != null) {  //dataが一回でも読み込まれましたか？
      return null;   //dataが２回目の読み込みなら関数が終了します
    }
    post.setAttribute("data-load", "true");  //dataが一回目であればdata-loadをセットする
    post.addEventListener("click", () => {
      const postId = post.getAttribute("data-id");
      const XHR = new XMLHttpRequest();
      XHR.open("GET", `/posts/${postId}`, true);
      XHR.responseType = "json";
      XHR.send();
      XHR.onload = () => {
          if (XHR.status != 200) {
            alert(`Error ${XHR.status}: ${XHR.statusText}`);
            return null;
          }
          const item = XHR.response.post;
          if (item.checked === true) {
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          post.removeAttribute("data-check");
        }
      };
    });
  });
}
setInterval(check, 1000);

