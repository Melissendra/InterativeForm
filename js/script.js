// Caret in the name input when loading the page.
const $name = $('#name');
const $otherTitle = $('#other-title');
const $jobCheck = $("#title");
const $design = $("#design");
const $designOption = $("#design option");
const $colors = $("#color");
const $colorOption = $("#color option");

const loadPage = () => {
    $name.trigger('focus'); // I use the trigger() method because it is said that focus() is deprecated and that it was better to use the trigger();
    $otherTitle.hide();
    $design.prepend("<option>-------</option>");
    $("#design option:first-child").prop("selected", true);
    $colors.prepend("<option>Please select a T-shirt theme</option>");
    $("#color option:first-child").prop("selected", true);
};


// we loop through the option of the dropdown
$jobCheck.each(function(){
    $(this).on("change", function () {
        this.value === 'other' ? $otherTitle.show() : $otherTitle.hide();
    });
});



loadPage();





