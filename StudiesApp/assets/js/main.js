$(document).ready(function () {
    $("#form-signin").validate({
        rules: {
            name: {
                required: true
            },
            title: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 6
            },
            password_confirmation: {
                minlength: 6,
                equalTo: "#password"
            }
        },
        success: function (element) {
            element.text("Ok").addClass("valid");
        }
    });
    $("#form-payment").hide();
    var idCurrentPlan, btCurrentPlan;
    $(".btn-coins").click(function (event) {
        if (btCurrentPlan)btCurrentPlan.prop("disabled", false);

        idCurrentPlan = $(event.target).data("plan");
        btCurrentPlan = $(event.target);
        btCurrentPlan.prop("disabled", true);

        $("#form-payment").show();
        scrollToAnchor("payment");
        $("#card-holder-name").focus();

        updatePurchasingCoins(idCurrentPlan);
    });
    function updatePurchasingCoins(idCurrentPlan) {
        var coins = 0;
        switch (idCurrentPlan) {
            case 0:
                coins = 1;
                break;
            case 1:
                coins = 15;
                break;
            case 2:
                coins = 50;
                break;
            case 3:
                coins = 120;
                break;
        };
        $("#coins_purchasing").attr("value", coins);
    }
});
$('#deleteModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var recipient = button.data('whatever') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    $('#delete_form').attr('action', "/user/destroy/" + recipient);
});

function scrollToAnchor(aid) {
    var aTag = $("#" + aid);
    $('html,body').animate({scrollTop: aTag.offset().top}, 'slow');
}