/*   
  Implements a prime-generating function discovered by Matt Frank
  in 2003 and given further analysis in 2008 by Eric S. Rowland.
  See Journal of Integer Sequences, Vol. 11 (2008), Article 08.2.8
*/

(function() {

  var numberTape = document.getElementById("primebox-number-tape");
  var nextButton = document.getElementById("primebox-next-button");
  var resetSwitch = document.getElementById("primebox-reset-switch")
  nextButton.onclick = doNextButton;
  resetSwitch.onclick = doResetSwitch;
  
  var left = 7, right = 7, n = 1;
  var scrollTimer;
  
  function doNextButton(e) {
    var p = document.createElement("p");
    p.innerHTML = gcdPrimes();
    numberTape.appendChild(p);
    scrollTimer = setInterval(scrollUp, 5);
  }
  
  function scrollUp() {
    var y = numberTape.scrollTop;
    numberTape.scrollTop += 1;
    if (y === numberTape.scrollTop) {
      clearInterval(scrollTimer);
    }
  }
  
  function doResetSwitch() {
    left = 7; right = 7; n = 1;
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

  
  function gcdPrimes() {
    var delta = 1;
    while (delta === 1) {
      left = right;
      right = left + gcd(n, left);
      n++;
      delta = right - left;
    }
    return delta;
  }
    
})();
