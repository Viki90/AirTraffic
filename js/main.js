function isChecked(checkbox, submit1) {
    var button = document.getElementById(submit1);

    if (checkbox.checked === true) {
        button.disabled = "";
    } else {
        button.disabled = "disabled";
    }
}