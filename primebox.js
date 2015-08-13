/*   
  Implements a prime-generating function discovered by Matt Frank
  in 2003 and given further analysis in 2008 by Eric S. Rowland.
  See Journal of Integer Sequences, Vol. 11 (2008), Article 08.2.8
  
  Written by Brian Hayes for a blog post titled "Pumping the Primes"
  posted to bit-player.org.
*/

/* jshint browser: true */

(function() {

  var numberTape = document.getElementById("primebox-number-tape");
  var nextButton = document.getElementById("primebox-next-button");
  var resetSwitch = document.getElementById("primebox-reset-switch");
  nextButton.onclick = doNextButton;
  resetSwitch.onclick = doResetSwitch;
  
  
  var scrollTimer;
  var scrolling = false;
  
  function doNextButton(e) {
    var p = document.createElement("p");
    p.innerHTML = nextPrime();
    numberTape.appendChild(p);
    if (!scrolling) {
      scrolling = true;
      scrollTimer = setInterval(scrollUp, 5);
    }
    
  }
  
  function scrollUp() {
    var y = numberTape.scrollTop;
    numberTape.scrollTop += 1;
    if (y === numberTape.scrollTop) {
      clearInterval(scrollTimer);
      scrolling = false;
    }
  }
  
  function doResetSwitch() {
    n = 1; p = 7;
    while (numberTape.firstChild) {
      numberTape.removeChild(numberTape.firstChild);
    }
  }
  
  function gcd(x, y) {
    while (y > 0) {
      var rem = x % y;
      x = y;
      y = rem;
    }
    return x;
  }

  
  // how I would like to write this function,
  // but tail-call optimization is an ES6 feature
  // that hasn't hit the streets yet
  
  function recursiveNextPrime(n, p) {
    var q = gcd(n, p);
    if (q > 1) {
      return q;
    }
    else {
      return recursiveNextPrime(n + 1, p + q);
    }
    
  }

  var n = 2, p = 7;   // initial values
  
  function nextQ() {
    var q = gcd(n, p);
    n += 1;
    p += q;
    return q;
  }

  function nextPrime() {
    var q;
    do {
      q = nextQ();
    } while (q === 1);
    return q;
  }
    
})();
