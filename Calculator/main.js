const displaybtn = document.getElementById("screen");
const clearbtn = document.getElementById("clear");
const backspacebtn = document.getElementById("backspace");

clearbtn.addEventListener("click", function() {
        displaybtn.value = "0";
});

backspacebtn.addEventListener("click", function() {
        displaybtn.value = displaybtn.value.slice(0, -1);
    
        if (displaybtn.value === "") {
            displaybtn.value = "0";
        }
});


displaybtn.value = "0";

const buttons = document.querySelectorAll(".values button");
buttons.forEach(button => {
    button.addEventListener("click", function() {
        if(this.textContent === "=") {
            try {
                displaybtn.value = eval(displaybtn.value);
            } catch(error) {
                displaybtn.value = "Error";
            }
        } else {
            // If the current value is "0", replace it with the button's text
            // Otherwise, append the button's text
            if (displaybtn.value === "0") {
                displaybtn.value = this.textContent;
            } else {
                displaybtn.value += this.textContent;
            }
        }
    });
});