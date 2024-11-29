$(document).ready(function () {

    $(".deliveryOptionInput").val("takeaway");

    function handleQuantityInput(event) {
        const numberInput = event.target;

        // Prevent decimal input
        if (event.key === '.' || event.key === 'Decimal' || event.key === 'Unidentified') {
            numberInput.classList.add('is-invalid');
            event.preventDefault();
        } else {
            numberInput.classList.remove('is-invalid');
        }

        // Validate maximum value
        const value = parseFloat(numberInput.value);
        if (value > 10) {
            numberInput.value = numberInput.value.slice(0, -1);
            numberInput.classList.add('is-invalid');
            event.preventDefault();
        } else {
            numberInput.classList.remove('is-invalid');
        }
    }

    const quantityInputs = document.querySelectorAll('.quantity-input');

    quantityInputs.forEach(function (quantityInput) {
        quantityInput.addEventListener('keydown', handleQuantityInput);
        quantityInput.addEventListener('input', handleQuantityInput);
    });

    var unitPrice = 0;

    // Event listeners for location and quantity changes
    $(".location-select").on("change", function () {
        var totalToppingPrice = 0;
        var values = $(this).parent().parent().children().find(".toppingSelect").val();
        if (values !== undefined && values !== null) {
            values.forEach(function (value) {
                totalToppingPrice += value.split(":")[1];
            });
        }
        var deliveryFee = parseFloat($(this).val().split(":")[1]);
        var quantityInput = $(this).parent().parent().children().find(".quantity-input");
        var quantity = parseInt(quantityInput.val()) || 0;
        $(this).parent().parent().children().find(".deliveryFeeLabel").text(deliveryFee.toFixed(2))
        var totalPrice = parseFloat(deliveryFee) + (parseFloat(unitPrice) + parseFloat(totalToppingPrice)) * parseInt(quantity);
        $(this).parent().parent().children().find(".totalPriceLabel").text(parseFloat(totalPrice).toFixed(2));
    });

    $(".quantity-input").on("change", function () {
        var totalToppingPrice = 0;
        var values = $(this).parent().parent().children().find(".toppingSelect").val();
        if (values !== undefined && values !== null) {
            values.forEach(function (value) {
                totalToppingPrice += value.split(":")[1];
            });
        } else {
            totalToppingPrice = 0;
        }
        var quantity = parseInt($(this).val()) || 0;
        var location = $(this).parent().parent().children().find(".location-select").val();
        var deliveryFee = 0;
        if (location !== undefined && location !== null) {
            deliveryFee = location.split(":")[1];
        }
        var totalPrice = parseFloat(deliveryFee) + (parseFloat(unitPrice) + parseFloat(totalToppingPrice)) * parseInt(quantity);
        $(this).parent().parent().children().find(".totalPriceLabel").text(parseFloat(totalPrice).toFixed(2));
    });

    $(".toppingSelect").on("change", function () {
        var totalToppingPrice = 0;

        $(".toppingSelect option:selected").each(function () {
            var optionValue = $(this).val();
            var price = parseFloat(optionValue.split(":")[1]) || 0;
            totalToppingPrice += price;
        });
        var location = $(this).parent().parent().children().find(".location-select").val();
        var deliveryFee = 0;
        if (location !== undefined && location !== null) {
            deliveryFee = location.split(":")[1];
        }
        var quantityInput = $(this).parent().parent().children().find(".quantity-input");
        var quantity = parseInt(quantityInput.val()) || 0;
        var totalPrice = (parseFloat(unitPrice) + parseFloat(totalToppingPrice)) * quantity + parseFloat(deliveryFee);
        $(this).parent().parent().children().find(".totalPriceLabel").text(parseFloat(totalPrice).toFixed(2));
    });

    // Initially hide the 'takeaway' form
    $(".delivery").hide();
    $(".takeaway").hide();
    $(".delivery :input").prop("disabled", true);
    $(".delivery :input").attr("disabled", true);
    $(".takeaway :input").prop("disabled", true);
    $(".takeaway :input").attr("disabled", true);
    $(".modal label").addClass("disabled-label");
    $(".quantity-input").val(1);
    $(".toppingSelect option").prop("selected", false);

    // Event handler for modal opening
    $(".modal").on("show.bs.modal", function (event) {
        $(event.target).find(".deliveryOptionInput").val("takeaway");
        $(event.target).find("input[name='btn-radio'].left").prop("disabled", false);
        $(event.target).find("input[name='btn-radio'].right").prop("disabled", false);
        $(event.target).find("input[name='btn-radio'].left").prop("checked", true);
        $(event.target).find("input[name='btn-radio'].right").prop("checked", false);
        $(event.target).find(".takeaway").show();
        $(event.target).find(".delivery").hide();
        $(event.target).find(".takeaway :input").prop("disabled", false);
        // $(event.target).find(".delivery :input").prop("disabled", true);
        $(event.target).find(".takeaway label").removeClass("disabled-label");
        unitPrice = $(this).find("input[type='hidden'][name='price']").val();
    });


    // Event handler for modal closing
    $(".modal").on("hidden.bs.modal", function (event) {
        $(event.target).find('.delivery').hide();
        $(event.target).find('.takeaway').hide();
        $(event.target).find("select").prop("selectedIndex", 0);
        $(event.target).find(".delivery:input").prop("disabled", true);
        $(event.target).find(".takeaway:input").prop("disabled", true);
        $(".delivery :input").attr("disabled", true);
        $(".takeaway :input").attr("disabled", true);
        $(event.target).find("label").addClass("disabled-label");
        $(event.target).find(".delivery :input").val('');
        $(event.target).find(".takeaway :input").val('');
        $(event.target).find('.totalPriceLabel').each(function () {
            var defaultVal = $(this).data("default-value");
            $(this).text(defaultVal);
        });
        $(event.target).find(".deliveryFeeLabel").text('0.00');
        $(event.target).find(".toppingSelect option").prop("selected", false);
    });


    // Event handler for radio button clicks
    $("input[name='btn-radio']").on("click", function () {
        var selectedValue = $(this).attr("class");
        $(".modal.show .delivery :input").val('');
        $(".modal.show .takeaway :input").val('');
        $(".modal.show select").prop("selectedIndex", 0);
        $(".modal.show .deliveryFeeLabel").text('0.00');
        $(".modal.show .quantity-input").val(1);
        $(".modal.show .totalPriceLabel").each(function () {
            var defaultVal = $(this).data("default-value");
            $(this).text(defaultVal);
        });
        $(".modal.show .toppingSelect option").prop("selected", false);

        if (selectedValue.indexOf("left") > -1) {
            // If 'Order Option' is selected, disable and hide the 'delivery' form
            $(".modal.show .deliveryOptionInput").val("takeaway");
            $(".modal.show .delivery :input").prop("disabled", true);
            $(".modal.show .delivery :input").attr("disabled", true);
            $(".modal.show .takeaway :input").prop("disabled", false);
            $(".modal.show .takeaway :input").attr("disabled", false);
            $(".modal.show .delivery label").addClass("disabled-label");
            $(".model.show .takeaway label").removeClass("disabled-label");
            $(".modal.show .delivery").hide();
            $(".modal.show .takeaway").fadeIn("slow");
        } else if (selectedValue.indexOf("right") > -1) {
            $(".modal.show .deliveryOptionInput").val("delivery");
            // If 'Delivery' is selected, enable and show the 'delivery' form
            $(".modal.show .takeaway :input").prop("disabled", true);
            $(".modal.show .takeaway :input").attr("disabled", true);
            $(".modal.show .delivery :input").prop("disabled", false);
            $(".modal.show .delivery :input").attr("disabled", false);
            $(".modal.show .delivery label").removeClass("disabled-label");
            $(".modal.show .takeaway label").addClass("disabled-label");
            $(".modal.show .takeaway").hide();
            $(".modal.show .delivery").fadeIn("slow");

            // Additional logic if needed for 'Delivery'
        }
    });

    $("input[type='number']").inputSpinner();

});

function updatePrices(form) {

    var totalPriceLabel = document.querySelector('.totalPriceLabel:not(.disabled-label)');
    var totalPriceInput = document.querySelector('.totalPriceInput:not([disabled])');
    console.log(totalPriceInput);
    totalPriceInput.value = totalPriceLabel.innerText;

    var deliveryFeeLabel = document.querySelector('.deliveryFeeLabel:not(.disabled-label)');
    if (deliveryFeeLabel !== null) {
        var deliveryFeeInput = document.querySelector('.deliveryFee:not([disabled])');
        var deliveryFeeValue = deliveryFeeLabel.innerText;
        deliveryFeeInput.value = deliveryFeeValue;
    }


    if (form.checkValidity()) {
        return true;
    } else {
        return false;
    }
}
