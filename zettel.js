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

  function fetchJSON(...args) {
    return fetch(...args).then(checkStatus).then(parseJSON);
  }

  const appElm = $('app');
  function fetchAndRender(url) {
    return new Promise((resolve, reject) => {
      fetchJSON(url)
        .then((resp) => {
          const title = resp.title;
          const content = `# ${resp.title} \n ${resp.content}`;
          const rendered = renderMarkdown(content);
          appElm.innerHTML = rendered;
          resolve({ title, content });
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
  function toggleTheme(theme) {
    let newStyle;
    if (theme) {
      newStyle = theme === 'dark' ? darkTheme : lightTheme;
    } else {
      newStyle = (linkElement.getAttribute('href') === lightTheme) ? darkTheme : lightTheme;
    }
    linkElement.setAttribute('href', newStyle);
    window.localStorage.theme = newStyle;
  }
  themeButton.addEventListener('click', toggleTheme);

  // Match system theme
  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const lightQuery = window.matchMedia('(prefers-color-scheme: light)');
  const isSupported = darkQuery.matches || lightQuery.matches;
  if (isSupported) {
    if (darkQuery.matches) toggleTheme('dark');
    if (lightQuery.matches) toggleTheme('light');
    darkQuery.addListener(q => q.matches && toggleTheme('dark'));
    lightQuery.addListener(q => q.matches && toggleTheme('light'));
  }

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
    window.localStorage.focus = parseInt(window.localStorage.focus, 10) ? '0' : '1';
    if (parseInt(window.localStorage.focus, 10)) {
      setFocus();
    } else {
      unsetFocus();
    }
  }
  focusButton.addEventListener('click', toggleFocus);

  function initialRender() {
    let currentStyle = window.localStorage.theme;
    if (currentStyle == undefined) currentStyle = lightTheme;  // eslint-disable-line
    linkElement.setAttribute('href', currentStyle);

    if (parseInt(window.localStorage.focus, 10)) {
      setFocus();
    } else {
      /* Random note */
      fetchAndRender(RANDOM_NOTE_URL);
    }
  }

  function setKeyboardShortcuts() {
    Mousetrap.bind('4', toggleFocus);
    Mousetrap.bind('5', toggleTheme);
  }

  initialRender();
  setKeyboardShortcuts();
}());
