/* Tracepath — Android packaging bridge.
   Added only for the Capacitor/Android build. Runs strictly no-op when the
   app is opened as a normal web page or installed PWA (window.Capacitor is
   undefined there), so the existing browser/PWA experience is untouched. */
(function () {
  if (!window.Capacitor || !window.Capacitor.isNativePlatform || !window.Capacitor.isNativePlatform()) return;

  var CapacitorApp = window.Capacitor.Plugins && window.Capacitor.Plugins.App;
  if (!CapacitorApp) return;

  function showToast(msg) {
    var t = document.getElementById("toast");
    if (!t) return;
    t.innerHTML = "<span>" + msg + "</span>";
    t.classList.add("show");
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(function () { t.classList.remove("show"); }, 2000);
  }

  var exitArmed = false;
  var exitTimer = 0;

  CapacitorApp.addListener("backButton", function (ev) {
    // 1. Close any open dialog/sheet first (Settings' confirm dialogs, resource editor, etc.)
    var sheet = document.getElementById("sheet");
    if (sheet && sheet.open) {
      try { sheet.close(); } catch (e) { sheet.removeAttribute("open"); }
      return;
    }

    var hash = location.hash.replace(/^#\/?/, "");
    var atHome = hash === "";

    // 2. Not on the home/Today screen: step back one screen, same as the
    //    in-app navigation would (Tracepath uses plain hash routing, so
    //    browser history already has one entry per screen visited).
    if (!atHome && ev.canGoBack) {
      window.history.back();
      return;
    }
    if (!atHome) {
      location.hash = "#/";
      return;
    }

    // 3. On the home screen: require a second back-press to exit, so the
    //    app isn't closed by accident.
    if (exitArmed) {
      CapacitorApp.exitApp();
      return;
    }
    exitArmed = true;
    showToast("Press back again to exit");
    clearTimeout(exitTimer);
    exitTimer = setTimeout(function () { exitArmed = false; }, 2000);
  });
})();
