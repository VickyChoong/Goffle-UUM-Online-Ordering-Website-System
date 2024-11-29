function aos_init() {
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
}

window.addEventListener('load', () => {
    aos_init();
});


// Function to update the total price based on quantity
function updateTotalPrice(spinner) {
    var totalPrice = 0;
    $(".quantity-input").each(function () {
        var quantity = parseFloat($(this).val());
        var unitPrice = parseFloat($(this).closest("tr").find("[name='unitPrice']").val());
        var deliveryFee = parseFloat($(this).closest("tr").find("[name='deliveryFee']").val());
        console.log(deliveryFee)
        rowPrice = quantity * unitPrice + deliveryFee
        $(this).closest("tr").find("[data-th='Price']").text(rowPrice.toFixed(2));

        totalPrice += rowPrice;
    });
    $("#totalPrice").text("RM" + totalPrice.toFixed(2));

    var unitPrice = parseFloat(spinner.closest("tr").find("[name='unitPrice']").val());
    var deliveryFee = parseFloat(spinner.closest("tr").find("[name='deliveryFee']").val());
    var newQuantity = parseInt(spinner.val());
    var newTotalPrice = newQuantity * unitPrice + deliveryFee;
    var orderId = spinner.closest("tr").find("[name='orderId']").val()
    $.ajax({
        type: "POST",
        url: "/updateQuantity", // Replace this with the actual URL for your Flask route to handle the quantity update
        data: {orderId: orderId, quantity: newQuantity, totalPrice: newTotalPrice},
        success: function (response) {
            console.log("Quantity updated successfully");
        },
        error: function (error) {
            console.log("Error updating quantity: " + error);
        }
    });
};

// Bind the updateTotalPrice function to the change event of quantity inputs
$(".quantity-input").on("change", function () {
    updateTotalPrice($(this));
});

$(document).on('submit', '#checkoutForm', function(event){
    if (document.getElementById('orderIds').getAttribute('value') === '') {
        event.preventDefault();
        alert('Your cart is empty. Add items to your cart before checking out.');
    }
});

$(document).ready(function () {
    window.setTimeout(function () {
        $(".alert-auto-close").fadeTo(500, 0).slideUp(500, function () {
            $(this).remove();
        });
    }, 3000)
});