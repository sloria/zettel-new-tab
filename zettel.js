/* jshint esnext: true, unused: true */
(function(){
  const URL = 'http://127.0.0.1:4444/';
  fetch(URL)
    .then((resp) => resp.json())
    .then((resp) => {
      let content = '# ' + resp.title + '\n' + resp.content;
      let quote = markdown.toHTML(content);
      var elm = document.getElementById('app');
      elm.innerHTML = quote;
    });
})();
