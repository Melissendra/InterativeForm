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
const $activitiesInput = $(".activities input");
const $payment = $("#payment");
const $mail = $('#mail');


// function that load the page
const loadPage = () => {
    $name.trigger('focus'); // I use the trigger() method because it is said that focus() is deprecated and that it was better to use the trigger();
    $otherTitle.hide();
    showColorOption();
    $activities.append($totalCost);
    errSentences();
    activityDate();
    activityChange();
    selectOptionPayment();
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

//function that show you only the color option according to the theme chosen
const showColorOption= () =>{
    $showFirstColorOption();
    $design.each(function(){
        $(this).on('change', function(){
            $colorIntro.hide();
            if(this.value === 'js puns'){
                $colorOption.each(function(){
                    $(this).val() === "cornflowerblue" || $(this).val() === "darkslategrey" || $(this).val() === "gold"
                        ? $(this).show()
                        : $(this).hide();
                });
                $("#color option[value='cornflowerblue']").prop("selected", true);

            }else if(this.value === 'heart js'){
                $colorOption.each(function(){
                    $(this).val() === "tomato" || $(this).val() === "steelblue" || $(this).val() === "dimgrey"
                        ? $(this).show()
                        : $(this).hide();
                });
                $("#color option[value='tomato']").prop("selected", true);

            }else if(this.value === 'Select Theme'){
                $showFirstColorOption();
            }
        });
    });
};

// function that calculate the cost of the activities chosen
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

// function that disable the incompatible activities
const activityDate = () => {
    $activities.change(function(e){
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

//function to add/remove dynamically the payment choice div
const paymentChoice = (id1, id2, id3) =>{
    $("#" + id1).show();
    $("#" + id2).hide();
    $("#" + id3).hide();
};

//selection of the payment choice
const selectOptionPayment = () => {
    paymentChoice("credit-card", "paypal", "bitcoin");
    $payment.change(function(){
        const $optionPayment = $(this).val();
        const $selectOptionInitial = $("#payment option[value='select method']");
        if($optionPayment !== $selectOptionInitial){
            $selectOptionInitial.hide();
        }

        switch($optionPayment){
            case("Credit Card"):
                paymentChoice("credit-card", "paypal", "bitcoin");
                break;
            case("PayPal"):
                paymentChoice("paypal", "credit-card", "bitcoin");
                break;
            case("Bitcoin"):
                paymentChoice("bitcoin", "credit-card", "paypal");
                break;
            default:
                paymentChoice("credit-card", "paypal", "bitcoin");
                break;
        }
    });
};

const errSentences = () =>{
    const $nameError = $("<div>Please enter a name!</div>");
    const $mailError = $("<div>Mail address invalid</div>");
    const $activityError = $("<div>Please choose at least one activity</div>");
    const $cardError = $("<div>Please select the 'credit card' payment method</div>");
    const $zipCodeError = $("<div>Please enter a correct zip code");

    $nameError.attr('id', 'nameError')
        .hide()
        .insertBefore($name);
    $mailError.attr("id", "mailError")
        .hide()
        .insertBefore($mail);
    $activityError.attr("id", "actError")
        .hide()
        .insertAfter('.activities legend');
    $cardError.attr("id", "errorCard")
        .hide()
        .insertBefore($payment);
};

const nameValidation = () => {
    const $errorName = $("#nameError");
    const $nameVal = $name.val();
    if($nameVal.length === 0){
        $errorName.show();
        $errorName.css("color", "#A91937");
        $name.css("border", "1px solid red");
    }else{
        $errorName.hide();
        $name.css("border", "");
    }
};

const emailValidation = () =>{
    const $errMail = $("#mailError");
    const mailReg = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if(!mailReg.test($mail.val())){
        $errMail.show();
        $errMail.css("color", "#A91937");
        $mail.css("border", "1px solid red")
    }else{
        $errMail.hide();
        $mail.css("border", "");
    }
};

const activitiesValidation = () =>{
    const $errorAct = $("#actError");
    const $activityChecked = $(".activities input:checked");
    if($activityChecked.length > 0){
        $errorAct.hide();
    }else{
        $errorAct.show();
        $errorAct.css("color", "#A91937");
    }
};

const cardValidation = () =>{
    const $errCard = $("#errorCard");
    const $cardMethod = $payment.val();
    if($cardMethod !== "Credit Card") {
        $errCard.show();
        $errCard.css("color", "#A91937");
    }else{
        validCardNumber();
    }
};

const validCardNumber = () => {
    const $ccNum = $("#cc-num");
    const $errCard = $("#errorCard");
    const numReg = /^\d{13,16}$/;
    const $cardNum = $ccNum.val();
    if (numReg.test($cardNum)) {
        $errCard.hide();
        $ccNum.css("border", "")
    }else {
        $errCard.text("Please enter a number between 13 and 16 digits");
        $errCard.show();
        $errCard.css("color", "#A91937");
        $ccNum.css("border", "1px solid red");
    }
};

$("button").click(function(e){
    e.preventDefault();
    nameValidation();
    emailValidation();
    activitiesValidation();
    cardValidation();
});

loadPage();




