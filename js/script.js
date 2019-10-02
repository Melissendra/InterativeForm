// Caret in the name input when loading the page.
const $name = $('#name');

$name.trigger('focus'); // i use the trigger() method because it is said that focus() is deprecated and that it was better to use the trigger();

// hiding hte input of other job when loading the page.
const $otherTitle = $('#other-title');
$otherTitle.hide();

// Adding an event listener to the job role's dropdown
const $jobCheck = $("#title");

//we loop through the option of the dropdown
for(let i = 0; i < $jobCheck.length; i++){
    //Adding a listener to each option
    $jobCheck[i].addEventListener("click", function(e){
        if(e.target.value === 'other'){
            $otherTitle.show();
        }else {
            $otherTitle.hide();
        }
    });
}
