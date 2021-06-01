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
        var [passports, passportIndex] = $this.getPassports(data);

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
        var result = 0;
        var [passports, passportIndex] = $this.getPassports(data);

        var valid = ["byr", "cid", "ecl", "eyr", "hcl", "hgt", "iyr", "pid"];
        var alsoValid = ["byr", "ecl", "eyr", "hcl", "hgt", "iyr", "pid"];
        for(var j=0; j<=passportIndex; j++) {
          var els = passports[j].map(function(item){
            return item.split(":")[0];
          });

          if($this.matching(els.sort(), valid) && $this.extraRules(passports[j])) {
            result++;
          } else if($this.matching(els.sort(), alsoValid) && $this.extraRules(passports[j])) {
            result++;
          }
        }
        output.innerHTML = result;
      }; 

      this.partTwoSolveTarget.innerHTML = "Solve Part Two";
      reader.readAsText(myFile);
    } else {
      output.innerHTML = "Please add a file";
    }
  }

  extraRules(data) {
    var cols = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
    for(var i=0; i<data.length; i++) {
      var rule = data[i].split(":")[0];
      var value = data[i].split(":")[1];
      if(rule == "byr") {
        if(value < 1920 || value > 2002) return false;
      } else if( rule == "iyr") {
        if(value < 2010 || value > 2020) return false;
      } else if(rule == "eyr") {
        if(value < 2020 || value > 2030) return false;
      } else if(rule == "hgt") {
        var num = +value.replace(/\D/g, "");
        var measure = value.replace(/\d/g, "");
        if(measure === "cm") {
          if(num < 150 || num > 193) return false;
        } else if(measure === "in") {
          if(num < 59 || num > 76) return false;
        } else if(measure === ""){
          return false;
        }
      } else if(rule == "hcl") {
        if(!value.match(/^#[0-9a-f]{6}$/g)) return false;
      } else if(rule == "ecl") {
        if(!cols.includes(value)) return false;
      } else if(rule == "pid") {
        if(!value.match(/^[0-9]{9}$/g)) return false;
      }
    }
    return true;
  }

  matching(a, b) {
    if(a.length !== b.length) return false;
    for(var i=0; i<a.length; i++) {
      if(a[i] !== b[i]) return false;
    }
    return true;
  }

  getPassports(data) {
    var passports = {0: []};
    var passportIndex = 0;
    for(var i=0; i<data.length; i++) {
      if(data[i] === "") {
        passportIndex++;
        passports[passportIndex] = [];
      } else {
        data[i].split(" ").map(function(item) {
          passports[passportIndex].push(item);
        });
      }
    }
    return [passports, passportIndex];
  }
}