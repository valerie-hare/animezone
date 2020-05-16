//First Likes Counter Button on Index.html
window.onload = function() {
  var button = document.getElementById("clickme"),
    count = 0;
  button.onclick = function() {
    count += 1;
    button.innerHTML = count + " likes";
  };
  //Second Likes Counter Button on Index.html
  var button1 = document.getElementById("clickme1"),
    count1 = 0;
  button1.onclick = function() {
    count1 += 1;
    button1.innerHTML = count1 + " likes";
  };
};

//Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      //Registration was succcessful
      console.log('ServiceWorker registration was succcessful: ', registration.scope);
    }, function(err) {
      //Registration has failed
      console.log('ServiceWorker registration has failed: ', err);
    });
  });
}
