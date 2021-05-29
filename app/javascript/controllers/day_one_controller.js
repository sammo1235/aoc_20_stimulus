import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [
    "dayOneFile",
    "partOneSolution",
    "partOneSolve",
    "partTwoSolution",
    "partTwoSolve"
  ]

  partOneSolve() {
    var input = this.dayOneFileTarget;
    var output = this.partOneSolutionTarget;

    if (input.files && input.files[0]) {
      this.partOneSolveTarget.innerHTML = "Computing...";
      var myFile = input.files[0];
      var reader = new FileReader();
      reader.onload = function() {
        var data = reader.result.split("\n").map(function(item) { 
          return Number(item);
        });

        var result;
        for(var i=0; i < data.length; i++) {
          if(data.includes(2020 - data[i])) {
            result = data[i] * (2020 - data[i]);
          }
        }

        if(result === null) {
          result = "Not found";
        }

        output.innerHTML = result;
      };
      this.partOneSolveTarget.innerHTML = "Solve Part One";
      reader.readAsText(myFile);
    }
  }

  partTwoSolve() {
    var input = this.dayOneFileTarget;
    var output = this.partTwoSolutionTarget;

    if (input.files && input.files[0]) {
      this.partTwoSolveTarget.innerHTML = "Computing...";
      var myFile = input.files[0];
      var reader = new FileReader();
      reader.onload = function() {
        var data = reader.result.split("\n").map(function(item) {
          return Number(item);
        });

        var result;
        for(var i=0; i < data.length; i++) {
          for(var j=0; j < data.length; j++) {
            if(data.includes(2020 - data[i] - data[j])) {
              result = data[i] * data[j] * (2020 - data[i] - data[j]);
            }
          }
        }

        if(result === null) {
          result = "Not found";
        }

        output.innerHTML = result;
      }; 
      this.partTwoSolveTarget.innerHTML = "Solve Part Two";
      reader.readAsText(myFile);
    }
  }
}