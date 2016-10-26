/* global markdown */
(function app() {
  const URL = 'http://127.0.0.1:4444/';
  fetch(URL)
    .then(resp => resp.json())
    .then((resp) => {
      const content = `# ${resp.title} \n`;
      const quote = markdown.toHTML(content);
      const elm = document.getElementById('app');
      elm.innerHTML = quote;
    });
}());
