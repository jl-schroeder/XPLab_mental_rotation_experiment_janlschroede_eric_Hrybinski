// Here, you can define all custom functions, you want to use and initialize some variables

/* Variables
*
*
*/
const coin = _.sample(["head", "tail"]); // You can flip a coin for your experiment here
// Declare your variables here

const numb = _.shuffle(["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"]);
const rotation = ["50","150"];
const same_or_different = ["same","different"];
var num_of_trials = 60;
var num_of_practice_trials = 12;
var trial_array_main = [];
var trial_array_practice = [];
// create an array with a random number of the picture, a random rotation of an object and if the object are the same or different.
// This gets created for the specific number of trials


//var file_name = numb+"_"+rotation+"_"+same_or_different+".jpg";

/* Helper functions
*
*
*/

/* For generating random participant IDs */
    // https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
// dec2hex :: Integer -> String
const dec2hex = function(dec) {
    return ("0" + dec.toString(16)).substr(-2);
};
// generateId :: Integer -> String
const generateID = function(len) {
    let arr = new Uint8Array((len || 40) /2);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, this.dec2hex).join("");
};
// Declare your helper functions here

// This function saves the Objcet of a KeyPress task in an array with random generated picture names
for(var i=0; i < numb.length; i++){
  for (var j = 0; j < rotation.length; j++) {
    for (var k = 0; k < same_or_different.length; k++) {
      if(i > (num_of_practice_trials/(rotation.length * same_or_different.length))){
        trial_array_main.push({
      			question: "Are the objects the same or different?",
      			picture: "mental_rotation_images/"+numb[i]+"_"+rotation[j]+"_"+same_or_different[k]+".jpg",
      			key1: 's',
      			key2: 'd',
      			s: 'same',
      			d: 'different',
      			expected: same_or_different[k],
            correct: same_or_different[k],
            ID_of_picture: numb[i],
      			degree_of_rotation: rotation[j]
    		});
      } else{
        trial_array_practice.push({
            question: "Are the objects the same or different?",
            picture: "mental_rotation_images/"+numb[i]+"_"+rotation[j]+"_"+same_or_different[k]+".jpg",
            key1: 's',
            key2: 'd',
            s: 'same',
            d: 'different',
            expected: same_or_different[k],
            correct: same_or_different[k],
            ID_of_picture: numb[i],
            degree_of_rotation: rotation[j]
        });
      }
    }
  }
};
trial_array_main = _.shuffle(trial_array_main);
trial_array_practice = _.shuffle(trial_array_practice);


/* Hooks
*
*
*/

//Error feedback if participants exceeds the time for responding
const time_limit = function(data, next) {
    if (typeof window.timeout === 'undefined'){
        window.timeout = [];
    }
    // Add timeouts to the timeoutarray
    // Reminds the participant to respond after 5 seconds
    window.timeout.push(setTimeout(function(){
          $('#reminder').text('Please answer more quickly!');
    }, 5000));
    next();
};
// Declare your hooks here

//hook.after_response_enabled:

const check_response = function(data, next) {
    data.response_checked = false;
    $("body").on("keydown", function(e) {
        if (data.response_checked == false) {
            const keyPressed = String.fromCharCode(
                e.which
            ).toLowerCase();
            if (keyPressed == data.key1 || keyPressed == data.key2) {
                if (data[keyPressed] === data.correct) {
                    alert('Your answer is correct! Yey!');
                } else {
                    alert('Sorry, this answer is incorrect :( The correct answer was ' + data.correct);
                }
                data.response_checked = true;
                next();
            }
        }})
}
