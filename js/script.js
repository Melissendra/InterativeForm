// Caret in the name input when loading the page.
const $name = $('#name');
const $otherTitle = $('#other-title');
const $jobCheck = $("#title");
const $design = $("#design");
// const $colors = $("#color");
const $colorOption = $("#color option");
// const $colorIntro = $("<option>Please select a T-shirt theme</option>");
const $colorDiv = $("#colors-js-puns");
let $cost = 0;
const $totalCost = $("<div></div>").html("<strong> Total: " + $cost + "$</strong>");
const $activities = $(".activities");
const $activitiesInput = $(".activities input");
const $activitiesLabelName = $(".activities input[name='all']");
const $payment = $("#payment");
const $mail = $('#mail');
const $card = $("#credit-card");


// function that load the page
const loadPage = () => {
    $name.trigger('focus'); // I use the trigger() method because it is said that focus() is deprecated and that it was better to use the trigger();
    $otherTitle.hide();
    showColorOption();
    $activities.append($totalCost);
    activityDate();
    activityChange();
    selectOptionPayment();
    cardValidation();
    submitForm();
    nameValidationRealTime();
};

// we loop through the option of the dropdown
$jobCheck.each(function(){
    $(this).on("change", function () {
        this.value === 'other' ? $otherTitle.show() : $otherTitle.hide();
    });
});

/***** No longer needed since we hide the div color if no T-shirt theme select *****/

/*const $showFirstColorOption = () => {
    $colorOption.hide();
    $colors.prepend($colorIntro);
    $("#color option:first-child").prop("selected", true);
};*/

//function that shows you only the color option according to the theme chosen
const showColorOption= () =>{
    // $showFirstColorOption(); No longer needed
    if($design.val() === "Select Theme"){
        $colorDiv.hide();
    }

    $design.each(function(){
        $(this).on('change', function(){
            $colorDiv.show();
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
                $colorDiv.hide();
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

//function to create dynamically error sentences
const errSentences = (id, el, text) =>{
    const $error = $(`<div>${text}</div>`);
    $error.attr("id", id)
        .addClass("error")
        .hide()
        .insertBefore(el);
};

//function to validate the different forms
const validation = (id, reg, num, text, el, el2=el) =>{
    errSentences(id, el, text);
    const $err = $('#' + id);
    if(reg.test(num)){
        $err.hide();
        el2.css("border", "");
    }else{
        $err.show();
        el2.css("border", "1px solid red");
    }
};

//Check the name form
const nameValidation = () => {
    const nameReg = /^([a-zA-Z]{2,10})+$/;
    const $nameVal = $name.val();
    validation('nameError', nameReg, $nameVal, "Please enter a valid name", $name);
};

//check the name form in real time
const nameValidationRealTime = () =>{
    $name.keypress(function(e){
        const nameReg = /^([a-zA-Z]{2,10})+$/;
        const $nameVal = e.target.value;
        validation("nameError", nameReg, $nameVal, "Please enter a valid name", $name);
    });
};

const emailValidation = () =>{
    const $mailVal = $mail.val();
    const mailReg = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    validation("mailError", mailReg, $mailVal, "Address Mail Invalid", $mail);
};

// Function to check if at least one activity is checked
const activitiesValidation = () =>{
    errSentences("actError", $activitiesLabelName, "Please check at least one activity");
    const $errorAct = $("#actError");
    const $activityChecked = $(".activities input:checked");
    if($activityChecked.length > 0){
        $errorAct.hide();
    }else{
        $errorAct.show();
    }
};

const cardValidation = () =>{
    const $ccNum = $("#cc-num");
    const numReg = /^\d{13,16}$/;
    const $cardNum = $ccNum.val();
    const zipReg = /^\d{5}$/;
    const $zip= $("#zip");
    const $zipNum = $zip.val();
    const cvvReg = /^\d{3}$/;
    const $cvv = $("#cvv");
    const $cvvNum = $cvv.val();
    const $errCard = $("#errorCard");
    const $paymentMethod = $payment.val();
    errSentences("errorCard", $payment, "Please select the card payment method");
    if($paymentMethod !== "Credit Card" && $cardNum.length > 0) {
        $errCard.show();
    }else if($paymentMethod === "Credit Card"){
        $errCard.hide();
        validation("cardNumErr", numReg, $cardNum, "The Credit Card number must be between 13 and 16 digits", $card, $ccNum);
        validation("zipErr", zipReg, $zipNum, "Please enter a 5 digits number",$card, $zip);
        validation("cvvErr", cvvReg, $cvvNum, "Enter a 3 digits number",$card, $cvv);
    }
};


const submitForm = () => {
    $("form").submit(function (e) {
        e.preventDefault();
        nameValidation();
        emailValidation();
        activitiesValidation();
        cardValidation();
    });
};

loadPage();




