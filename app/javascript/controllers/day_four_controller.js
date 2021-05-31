import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [
    "file",
    "partOneSolution",
    "partOneSolve",
    "partTwoSolution",
    "partTwoSolve"
  ]

  partOneSolve() {
    var input = this.fileTarget;
    var output = this.partOneSolutionTarget;

    if (input.files && input.files[0]) {
      this.partOneSolveTarget.innerHTML = "Computing...";
      var myFile = input.files[0];
      var reader = new FileReader();

      var $this = this;
      reader.onload = function() {
        var data = reader.result.split("\n");

        var result = 0;
        var passports = {};
        var passportIndex = 0;
        for(var i=0; i<data.length; i++) {
          if(data[i] === "") {
            passportIndex++;
          } else {
            if(passportIndex in passports) {
              data[i].split(" ").map(function(item) {
                passports[passportIndex].push(item);
              });
            } else {
              passports[passportIndex] = [];
              data[i].split(" ").map(function(item) {
                passports[passportIndex].push(item);
              });
            }
          }
        }

        var valid = ["byr", "cid", "ecl", "eyr", "hcl", "hgt", "iyr", "pid"];
        var alsoValid = ["byr", "ecl", "eyr", "hcl", "hgt", "iyr", "pid"];
        for(var j=0; j<=passportIndex; j++) {
          var els = passports[j].map(function(item){
            return item.split(":")[0];
          });

          if($this.matching(els.sort(), valid)) {
            result++;
          } else if($this.matching(els.sort(), alsoValid)) {
            result++;
          }
        }
        output.innerHTML = result;
      };
      this.partOneSolveTarget.innerHTML = "Solve Part One";
      reader.readAsText(myFile);
    } else {
      output.innerHTML = "Please add a file";
    }
  }

  partTwoSolve() {
    var input = this.fileTarget;
    var output = this.partTwoSolutionTarget;

    if (input.files && input.files[0]) {
      this.partTwoSolveTarget.innerHTML = "Computing...";
      var myFile = input.files[0];
      var reader = new FileReader();

      var $this = this;
      reader.onload = function() {
        var data = reader.result.split("\n");
        // todo
        output.innerHTML = result;
      }; 

      this.partTwoSolveTarget.innerHTML = "Solve Part Two";
      reader.readAsText(myFile);
    } else {
      output.innerHTML = "Please add a file";
    }
  }

  matching(a, b) {
    if(a.length !== b.length) return false;
    for(var i=0; i<a.length; i++) {
      if(a[i] !== b[i]) return false;
    }
    return true;
  }
}