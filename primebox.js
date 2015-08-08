/*   
  Implements a prime-generating function discovered by Matt Frank
  in 2003 and given further analysis in 2008 by Eric S. Rowland.
  See Journal of Integer Sequences, Vol. 11 (2008), Article 08.2.8
*/

(function() {

  var numberTape = document.getElementById("primebox-number-tape");
  var nextButton = document.getElementById("primebox-next-button");
  nextButton.onclick = doNextButton;
  
  function init() {
    console.log("initing");
  }
  
  function doNextButton(e) {
    console.log("buttoning")
    numberTape.innerHTML = gcdPrimes.next();
  }
  
  function gcd(x, y) {
    while (y > 0) {
      var rem = x % y;
      x = y;
      y = rem;
    }
    return x;
  }

  var a0 = 7;
  
  var gcdPrimes = {
    n: 1,
    left: a0,
    right: a0,
    init: function() {
      this.left = a0;
      this.right = a0;
    },
    next: function() {
      this.left = this.right;
      this.right = this.left + gcd(this.n, this.left);
      this.n += 1;
      var diff = this.right - this.left;
      if (diff > 1) {
        return diff;
      }
      else {
        return gcdPrimes.next();
      }
    }
  }
  
  init();  
  

})();
