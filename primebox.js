/*   
  What is it? How does it work? Who wrote it?  
*/

(function() {

  var theNumber = document.getElementById("the-number");
  var theButton = document.getElementById("the-button");
  theButton.onclick = doButton;  
  
  function init() {
    console.log("initing");
  }
  
  function doButton(e) {
    console.log("buttoning")
    theNumber.innerHTML = gcdPrimes.next();
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
