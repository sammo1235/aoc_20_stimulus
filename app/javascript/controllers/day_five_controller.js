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
        var seatIds = [];
        for(var i=0; i<data.length; i++) {
          var rows = $this.mkArr(128);
          var cols = $this.mkArr(8);
          for(var j=0; j<data[i].length; j++) {
            if(data[i][j] == "F") {
              rows = rows.slice(0, rows.length/2);
            } else if(data[i][j] == "B") {
              rows = rows.slice(rows.length/2);
            } else if(data[i][j] == "L") {
              cols = cols.slice(0, cols.length/2);
            } else if(data[i][j] == "R") {
              cols = cols.slice(cols.length/2);
            }
          }
          seatIds.push((rows[0] * 8) + cols[0]);
        }
        result = Math.max(...seatIds);
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
        var result = 0;

        output.innerHTML = result;
      }; 
      this.partTwoSolveTarget.innerHTML = "Solve Part Two";
      reader.readAsText(myFile);
    } else {
      output.innerHTML = "Please add a file";
    }
  }

  mkArr(size) {
    var arr = [];
    for(var i=0; i<size; i++) {
      arr.push(i);
    }
    return arr;
  }
}