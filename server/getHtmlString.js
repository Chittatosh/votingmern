import app from './app';

const getHtmlString = (serializedComponent, serializedState) => {
  return `
    <!doctype html>
    <html class="no-js" lang="en">
        <head>
          <title>Votingmern</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
          <link rel="stylesheet" href="/style.css" media="screen">
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lipis/bootstrap-social@5.1.1/bootstrap-social.css" integrity="sha256-rnmbX+ZXZml9xbNUKt/qXfgpCi6zLJX7qqR+7vX/1ZY=" crossorigin="anonymous">
          <meta name="theme-color" content="#2F3BA2">
          <link rel="manifest" href="/manifest.json">
        </head>
        <body class="container">
          <div id="root">${serializedComponent}</div>
          <script>window.__PRELOADED_STATE__ = ${serializedState}</script>
          <script src="https://d3js.org/d3.v5.min.js"></script>
          ${app.get('env') === 'development' ? '<script src="http://localhost:3001/main.js"></script>' : '<script src="/main.js" charset="utf-8"></script>'}
        </body>
        <footer>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>
          <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
        </footer>
    </html>
    `;
};

export default getHtmlString;
