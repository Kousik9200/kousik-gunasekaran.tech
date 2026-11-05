(function () {
  'use strict';

  var root = document.documentElement;
  var calm = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Theme toggle */
  document.getElementById('theme').addEventListener('click', function () {
    var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  /* Home: rotating "currently" line */
  var typed = document.getElementById('typed');
  if (typed && !calm) {
    var phrases = JSON.parse(typed.dataset.phrases);
    var p = 0, n = phrases[0].length, del = false;
    (function loop() {
      var s = phrases[p];
      typed.textContent = s.slice(0, n);
      var wait = del ? 26 : 50;
      if (!del && n === s.length) { del = true; wait = 2300; }
      else if (del && n === 0) { del = false; p = (p + 1) % phrases.length; wait = 280; }
      else n += del ? -1 : 1;
      setTimeout(loop, wait);
    })();
  }

  /* Projects: filter and count */
  var pills = document.querySelectorAll('[data-filter]');
  var count = document.getElementById('count');
  pills.forEach(function (b) {
    b.addEventListener('click', function () {
      var shown = 0;
      pills.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      document.querySelectorAll('[data-cat]').forEach(function (c) {
        var match = b.dataset.filter === 'all' || c.dataset.cat === b.dataset.filter;
        c.hidden = !match;
        if (match) shown++;
      });
      count.textContent = 'Showing ' + shown + ' project' + (shown === 1 ? '' : 's');
    });
  });

  /* Education: tabs */
  var tabs = document.querySelectorAll('[role="tab"]');
  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      tabs.forEach(function (x) {
        var on = x === t;
        x.setAttribute('aria-selected', on ? 'true' : 'false');
        document.getElementById(x.getAttribute('aria-controls')).hidden = !on;
      });
    });
  });

  /* Contact: sends the message through Web3Forms, which delivers it to the site owner's inbox */
  var form = document.getElementById('contactForm');
  if (form) {
    var status = document.getElementById('formStatus');
    var button = form.querySelector('button[type="submit"]');
    var say = function (text, kind) {
      status.textContent = text;
      status.dataset.kind = kind || '';
    };
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (form.elements.botcheck.checked) return;
      if (form.elements.access_key.value === 'YOUR_WEB3FORMS_ACCESS_KEY') {
        say('This form is not connected yet. Please try again later.', 'error');
        return;
      }
      button.disabled = true;
      button.textContent = 'Sending...';
      say('');
      fetch(form.action, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) })
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (!data.success) throw new Error(data.message || (data.body && data.body.message) || 'The form service rejected it.');
          form.reset();
          say('Thanks! Your message has been sent.', 'ok');
        })
        .catch(function (err) {
          console.error('Contact form:', err);
          say('Sorry, your message could not be sent. ' + err.message, 'error');
        })
        .finally(function () {
          button.disabled = false;
          button.textContent = 'Send message';
        });
    });
  }
})();
