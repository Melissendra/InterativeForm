// Caret in the name input when loading the page.
const $name = $('#name');
const $otherTitle = $('#other-title');
const $jobCheck = $("#title");
const $designItem = $('#design option');
const $colorOption = $("#color option");
const $colorTshirt = $("<option>Please select a T-Shirt theme</option>");

const loadPage = () => {
    $name.trigger('focus'); // I use the trigger() method because it is said that focus() is deprecated and that it was better to use the trigger();
    $otherTitle.hide();
    $("#color").prepend($colorTshirt);
    $colorOption.eq(0).prop("selected", true);
};


// we loop through the option of the dropdown
$jobCheck.each(function(){
    $(this).on("change", function () {
        if(this.value === 'other'){
            $otherTitle.show();
        }else{
            $otherTitle.hide();
        }
    });
});


loadPage();





