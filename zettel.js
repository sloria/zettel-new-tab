/* global markdownit markdownitZettel Router Mousetrap */
(function app() {
  const $ = document.getElementById.bind(document);

  const URL = 'http://127.0.0.1:4444/';
  const RANDOM_NOTE_URL = URL;

  /* Routing */
  const routes = {
    '/notes/(.+)': (title) => {
      const serverURL = `${URL}notes/${title}`;
      fetchAndRender(serverURL);
    },
  };
  const router = new Router(routes);
  router.init();


  /* Markdown rendering */
  const md = new markdownit()
    .use(markdownitZettel, {
      buildURL: noteName => `#/notes/${encodeURI(noteName)}`,
    });
  function renderMarkdown(content) {
    return md.render(content);
  }

  /* Fetching note */
  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
  function parseJSON(response) {
    return response.json();
  }
  const appElm = $('app');
  function fetchAndRender(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(checkStatus).then(parseJSON)
        .then((resp) => {
          const content = `# ${resp.title} \n ${resp.content}`;
          const rendered = renderMarkdown(content);
          appElm.innerHTML = rendered;
          resolve({ title: resp.title, content: resp.content });
        })
        .catch((err) => {
          appElm.innerHTML = 'Could not render note';
          reject(err);
        });
    });
  }

  /* Theming */
  const lightTheme = 'css/zettel.css';
  const darkTheme = 'css/zettel-dark.css';
  const linkElement = $('styleLink');
  const themeButton = $('themeButton');
  function toggleTheme() {
    const newStyle = (linkElement.getAttribute('href') === lightTheme) ? darkTheme : lightTheme;
    linkElement.setAttribute('href', newStyle);
    localStorage.theme = newStyle;
  }
  let currentStyle = localStorage.theme;
  if (currentStyle == undefined) currentStyle = lightTheme;  // eslint-disable-line
  linkElement.setAttribute('href', currentStyle);
  themeButton.addEventListener('click', toggleTheme);

  /* Focus mode */
  const focusButton = $('focusButton');

  function setFocus() {
    appElm.innerHTML = '';
    focusButton.innerText = '[Unfocus]';
  }
  function unsetFocus() {
    initialRender();
    focusButton.innerText = '[Focus]';
  }
  function toggleFocus() {
    localStorage.focus = parseInt(localStorage.focus, 10) ? '0' : '1';
    if (parseInt(localStorage.focus, 10)) {
      setFocus();
    } else {
      unsetFocus();
    }
  }
  focusButton.addEventListener('click', toggleFocus);

  function initialRender() {
    if (parseInt(localStorage.focus, 10)) {
      setFocus();
    } else {
      /* Random note */
      fetchAndRender(RANDOM_NOTE_URL)
        // We set the route so that the back button will work after the first render.
        .then((value) => {
          const route = `/notes/${encodeURI(value.title)}`;
          router.setRoute(route);
        });
    }
  }

  function setKeyboardShortcuts() {
    Mousetrap.bind('4', toggleFocus);
    Mousetrap.bind('5', toggleTheme);
  }

  initialRender();
  setKeyboardShortcuts();
}());
