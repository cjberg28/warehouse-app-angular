function onSubmit() {
    var id = document.getElementById("slot-id-input").value;//String
    var space = document.getElementById("space-required-input").value;//String
    var description = document.getElementById("description-input").value;//String
    var type = document.getElementById("type-dropdown-input").value;//String

    processRequest();
}