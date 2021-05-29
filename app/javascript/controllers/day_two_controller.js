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
      reader.onload = function() {
        var data = reader.result.split("\n");

        var result = 0;
        for(var i=0; i < data.length; i++) {
          var rule = data[i].split(":")[0];
          var letter = rule.split(" ")[1];
          var low = Number(rule.split(" ")[0].split("-")[0]);
          var high = Number(rule.split(" ")[0].split("-")[1]);
          var password = data[i].split(": ")[1].trim().split('');

          var letterCount = 0;
          for(var j=0; j < password.length; j++) {
            if(password[j] == letter) {
              letterCount++;
            }
          }
          if(letterCount <= high && letterCount >= low) {
            result++;
          } 
        }

        if(result === null) {
          result = "None found";
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
      reader.onload = function() {
        var data = reader.result.split("\n")

        // todo
        
        if(result === null) {
          result = "Not found";
        }

        output.innerHTML = result;
      }; 
      this.partTwoSolveTarget.innerHTML = "Solve Part Two";
      reader.readAsText(myFile);
    } else {
      output.innerHTML = "Please add a file";
    }
  }
}