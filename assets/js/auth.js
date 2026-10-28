/* Kavora accounts — Firebase Authentication (Google + email/password). */
const cfg = window.KAVORA_FIREBASE;
const $ = (s, r = document) => r.querySelector(s);
const page = document.body.dataset.page;
const params = new URLSearchParams(location.search);
const safeNext = (() => { const n = params.get("next") || "/account"; return n.startsWith("/") && !n.startsWith("//") ? n : "/account"; })();

function say(msg, kind = "err") {
  const el = $(".auth-msg"); if (!el) return;
  el.textContent = msg; el.className = "auth-msg " + kind;
}
const friendly = (code) => ({
  "auth/invalid-credential": "That email and password don't match. Try again or reset your password.",
  "auth/wrong-password": "That email and password don't match. Try again or reset your password.",
  "auth/user-not-found": "No account uses that email. Create one instead.",
  "auth/email-already-in-use": "An account already uses that email. Sign in instead.",
  "auth/weak-password": "Use at least 8 characters for your password.",
  "auth/invalid-email": "Enter a valid email address.",
  "auth/too-many-requests": "Too many attempts. Wait a few minutes, then try again.",
  "auth/popup-closed-by-user": "Google sign-in was closed before it finished.",
  "auth/popup-blocked": "Your browser blocked the Google window. Allow pop-ups for this site and try again.",
  "auth/network-request-failed": "No connection. Check your internet and try again.",
  "auth/unauthorized-domain": "Sign-in isn't enabled for this web address yet."
}[code] || "Something went wrong. Try again.");

function busy(form, on) { form && form.querySelectorAll("button, input").forEach((el) => (el.disabled = on)); }

if (!cfg) {
  // Accounts not switched on yet: keep guest buttons, explain on auth pages.
  if (["login", "signup", "account"].includes(page)) {
    document.querySelectorAll(".auth-card button, .auth-card input").forEach((el) => (el.disabled = true));
    say("Accounts open on launch day. Join the list on the home page to hear first.", "ok");
  }
} else {
  const V = "10.12.2";
  const { initializeApp } = await import(`https://www.gstatic.com/firebasejs/${V}/firebase-app.js`);
  const A = await import(`https://www.gstatic.com/firebasejs/${V}/firebase-auth.js`);
  const app = initializeApp(cfg);
  const auth = A.getAuth(app);
  auth.useDeviceLanguage();
  const google = new A.GoogleAuthProvider();
  google.setCustomParameters({ prompt: "select_account" });

  A.onAuthStateChanged(auth, (user) => {
    document.querySelectorAll("[data-guest]").forEach((el) => (el.hidden = !!user));
    document.querySelectorAll("[data-user]").forEach((el) => (el.hidden = !user));
    if (user) {
      const av = $(".nav .avatar");
      if (av) av.innerHTML = user.photoURL ? `<img src="${user.photoURL}" alt="" referrerpolicy="no-referrer">` : (user.displayName || user.email || "?").trim()[0].toUpperCase();
      if (page === "login" || page === "signup") location.replace(safeNext);
      if (page === "account") {
        $("[data-name]").textContent = user.displayName || "there";
        $("[data-email]").textContent = user.email;
        $("[data-verified]").textContent = user.emailVerified ? "Verified" : "Not verified yet — check your inbox";
        $("[data-since]").textContent = new Date(user.metadata.creationTime).toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" });
        document.querySelector(".acct").hidden = false;
      }
    } else if (page === "account") {
      location.replace("/login?next=/account");
    }
  });

  const gBtn = $("[data-google]");
  if (gBtn) gBtn.addEventListener("click", async () => {
    say("", "ok");
    try { await A.signInWithPopup(auth, google); } catch (e) { say(friendly(e.code)); }
  });

  const login = $("form[data-login]");
  if (login) login.addEventListener("submit", async (e) => {
    e.preventDefault(); busy(login, true); say("", "ok");
    try { await A.signInWithEmailAndPassword(auth, login.email.value.trim(), login.password.value); }
    catch (err) { say(friendly(err.code)); busy(login, false); }
  });

  const reset = $("[data-reset]");
  if (reset) reset.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = login && login.email.value.trim();
    if (!email) { say("Enter your email above, then tap Reset password."); return; }
    try { await A.sendPasswordResetEmail(auth, email); say("Reset link sent. Check your inbox.", "ok"); }
    catch (err) { say(friendly(err.code)); }
  });

  const signup = $("form[data-signup]");
  if (signup) signup.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (signup.password.value.length < 8) { say("Use at least 8 characters for your password."); return; }
    busy(signup, true); say("", "ok");
    try {
      const cred = await A.createUserWithEmailAndPassword(auth, signup.email.value.trim(), signup.password.value);
      if (signup.name.value.trim()) await A.updateProfile(cred.user, { displayName: signup.name.value.trim() });
      await A.sendEmailVerification(cred.user);
    } catch (err) { say(friendly(err.code)); busy(signup, false); }
  });

  document.querySelectorAll("[data-signout]").forEach((b) => b.addEventListener("click", async () => { await A.signOut(auth); location.href = "/"; }));
}
