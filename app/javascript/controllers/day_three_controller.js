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

        var result = $this.downSlope(data, 1, 3);
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
        var result = 1;
        var routes = [[1, 1], [1, 3], [1, 5], [1, 7], [2, 1]];

        for(var i=0; i<routes.length; i++) {
          result *= $this.downSlope(data, routes[i][0], routes[i][1]);
        }

        output.innerHTML = result;
      }; 

      this.partTwoSolveTarget.innerHTML = "Solve Part Two";
      reader.readAsText(myFile);
    } else {
      output.innerHTML = "Please add a file";
    }
  }

  downSlope(slope, down, right) {
    var count = 0;
    var x = right;
    for(var i=down; i < slope.length; i+=down) {
      if(x >= slope[i].length) {
        x -= slope[i].length;
      }

      if(slope[i][x] == '#') {
        count++;
      }
      x += right;
    }
    return count;
  }
}