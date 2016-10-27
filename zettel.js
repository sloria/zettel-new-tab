/* global markdownit markdownitZettel */
(function app() {
  const $ = document.getElementById.bind(document);

  const URL = 'http://127.0.0.1:4444/';

  /* Markdown rendering */
  const md = new markdownit().use(markdownitZettel, {url: URL, onClick: () => {console.log('works!'); }});  // eslint-disable-line
  function renderMarkdown(content) {
    return md.render(content);
  }

  function fetchAndRender(url) {
    /* Fetching note */
    fetch(url)
      .then(resp => resp.json())
      .then((resp) => {
        const content = `# ${resp.title} \n ${resp.content}`;
        const rendered = renderMarkdown(content);
        const elm = $('app');
        elm.innerHTML = rendered;
        setUpLinks();
      });
  }

  function setUpLinks() {
    const elms = document.getElementsByClassName('zettel-link');
    for (let i = 0, len = elms.length; i < len; i++) {
      const elm = elms[i];
      elm.addEventListener('click', () => {
        const url = elm.getAttribute('data-zettel-url');
        fetchAndRender(url);
      });
    }
  }


  /* Theming */
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

  // Random note
  fetchAndRender(URL);
}());
