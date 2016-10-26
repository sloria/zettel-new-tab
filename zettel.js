/* global markdown */
(function app() {
  const $ = document.getElementById.bind(document);

  const URL = 'http://127.0.0.1:4444/';
  fetch(URL)
    .then(resp => resp.json())
    .then((resp) => {
      const content = `# ${resp.title} \n ${resp.content}`;
      const quote = markdown.toHTML(content);
      const elm = $('app');
      elm.innerHTML = quote;
    });


  const lightTheme = 'css/zettel.css';
  const darkTheme = 'css/zettel-dark.css';
  const linkElement = $('styleLink');
  const themeButton = $('themeButton');
  function themeSwitch() {
    const newStyle = (linkElement.getAttribute('href') === lightTheme) ? darkTheme : lightTheme;
    linkElement.setAttribute('href', newStyle);
    localStorage.theme = newStyle;
  }
  let currentStyle = localStorage.theme;
  if (currentStyle == undefined) currentStyle = lightTheme;  // eslint-disable-line
  linkElement.setAttribute('href', currentStyle);
  themeButton.addEventListener('click', themeSwitch);
}());
