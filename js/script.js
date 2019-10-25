// Caret in the name input when loading the page.
const $name = $('#name');
const $otherTitle = $('#other-title');
const $jobCheck = $("#title");
const $design = $("#design");
const $colors = $("#color");
const $colorOption = $("#color option");
const $colorIntro = $("<option>Please select a T-shirt theme</option>");
let $cost = 0;
const $totalCost = $("<div></div>").html("<strong> Total: " + $cost + "$</strong>");
const $activities = $(".activities");



const loadPage = () => {
    $name.trigger('focus'); // I use the trigger() method because it is said that focus() is deprecated and that it was better to use the trigger();
    $otherTitle.hide();
    showColorOption();
    $activities.append($totalCost);
    activityDate();
    activityChange();
};


// we loop through the option of the dropdown
$jobCheck.each(function(){
    $(this).on("change", function () {
        this.value === 'other' ? $otherTitle.show() : $otherTitle.hide();
    });
});


const $showFirstColorOption = () => {
    $colorOption.hide();
    $colors.prepend($colorIntro);
    $("#color option:first-child").prop("selected", true);
};

const showColorOption= () =>{
   $showFirstColorOption();
    $design.each(function(){
        $(this).on('change', function(){
            if(this.value === 'js puns'){
                $colorOption.each(function(){
                    $(this).val() === "cornflowerblue" || $(this).val() === "darkslategrey" || $(this).val() === "gold"
                        ? $(this).show()
                        : $(this).hide();
                });
                $("#color option:selected").remove();
                $("#color option[value='cornflowerblue']").prop("selected", true);

            }else if(this.value === 'heart js'){
                $colorOption.each(function(){
                    $(this).val() === "tomato" || $(this).val() === "steelblue" || $(this).val() === "dimgrey"
                        ? $(this).show()
                        : $(this).hide();
                });
                $("#color option:selected").remove();
                $("#color option[value='tomato']").prop("selected", true);
            }else if(this.value === 'Select Theme'){
                showColorOption();
            }
        });
    });
};


const activityChange = () => {
    $activities.change(function(e){
        const $check  = e.target;
        const $dataCost = parseInt($($check).attr("data-cost").replace(/\D(\d+)/, "$1"));
        if($check.checked){
            $cost += $dataCost;
            $totalCost.html("<strong>Total: $" + $cost + "</strong>");
        }else{
            $cost -= $dataCost;
            $totalCost.html("<strong>Total: $" + $cost + "</strong>");
        }
    });
};

const activityDate = () => {
    $activities.change(function(e){
        const $activitiesInput = $(".activities input");
        const $check = e.target;
        const $time = $check.dataset.dayAndTime;
        const $name = $check.name;
        $activitiesInput.each(function () {
            if($time === $(this).attr("data-day-and-time") && $name !== $(this).attr('name')){
                if($check.checked){
                    $(this).attr("disabled", true);
                    $(this).parent().css("color", "gray");
                }else{
                    $(this).removeAttr("disabled");
                    $(this).parent().css("color", "black");
                }
            }
        });
    })
};

loadPage();




