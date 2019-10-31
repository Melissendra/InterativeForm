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

const errSentences = (id, el, text) =>{
    const $error = $(`<div>${text}</div>`);
    $error.attr("id", id)
        .addClass("error")
        .hide()
        .insertBefore(el);
};

const nameValidation = () => {
    errSentences("nameError", $name, "Please enter a name");
    const $errorName = $("#nameError");
    const $nameVal = $name.val();
    if($nameVal.length === 0){
        $errorName.show();
        $name.css("border", "1px solid red");
    }else{
        $errorName.hide();
        $name.css("border", "");
    }
};

const emailValidation = () =>{
    errSentences('mailError', $mail, "Address mail invalid");
    const $errMail = $("#mailError");
    // $errMail.text("Address mail invalid");
    const mailReg = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if(!mailReg.test($mail.val())){
        $errMail.show();
        $mail.css("border", "1px solid red")
    }else{
        $errMail.hide();
        $mail.css("border", "");
    }
};

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

const $ccNum = $("#cc-num");
const numReg = /^\d{13,16}$/;
const $cardNum = $ccNum.val();
const zipReg = /^\d{5}$/;
const $zip= $("#zip");
const $zipNum = $zip.val();
const cvvReg = /^\d{3}$/;
const $cvv = $("#cvv");
const $cvvNum = $cvv.val();

const cardValidation = () =>{
    errSentences("errorCard", $payment, "Please select the card payment method");
    const $errCard = $("#errorCard");
    const $cardMethod = $payment.val();
    if($cardMethod !== "Credit Card") {
        $errCard.show();
    }else{
        $errCard.hide();
        cardValid("cardNumErr", numReg, $cardNum, "The Credit Card number must be between 13 and 16 digits", $ccNum);
        cardValid("zipErr", zipReg, $zipNum, "Please enter a 5 digits number", $zip);
        cardValid("cvvErr", cvvReg, $cvvNum, "Enter a 3 digits number", $cvv);
    }
};



const cardValid = (id, reg, num, text, el) =>{
    errSentences(id, $card, text);
    const $err = $('#' + id);
    if(reg.test(num)){
        $err.hide();
        el.css("border", "");
    }else{
        $err.show();
        el.css("border", "1px solid red");
    }
};
/*const validCardNumber = () => {
    const $ccNum = $("#cc-num");
    errSentences("errNum", $card, "The Credit Card number must be between 13 and 16 digits");
    const $errCardNum = $("#errNum");
    const numReg = /^\d{13,16}$/;
    const $cardNum = $ccNum.val();
    if (numReg.test($cardNum)) {
        $errCardNum.hide();
        $ccNum.css("border", "");
    }else {
        $errCardNum.show();
        $ccNum.css("border", "1px solid red");
    }
};

const validZip = () =>{
    const zipReg = /^\d{5}$/;
    errSentences("zipErr", $card, "Please enter a 5 digits number");
    const $zip= $("#zip");
    const $errZip = $("#zipErr");
    const $zipNum = $zip.val();
    if(zipReg.test($zipNum)){
        $errZip.hide();
        $zip.css("border", "");
    }else {
        $errZip.show();
        $zip.css("border", "1px solid red");
    }
};

const validCvv = () =>{
    const cvvReg = /^\d{3}$/;
    errSentences("cvvErr", $card, "Enter a 3 digits number");
    const $cvv = $("#cvv");
    const $errCvv = $("#cvvErr");
    const $cvvNum = $cvv.val();
    if(cvvReg.test($cvvNum)){
        $errCvv.hide();
        $cvv.css("border", "");
    }else{
        $errCvv.show();
        $cvv.css("border", "1px solid red");
    }
};*/

$("button").click(function(e){
    e.preventDefault();
    nameValidation();
    emailValidation();
    activitiesValidation();
    cardValidation();
});

loadPage();




