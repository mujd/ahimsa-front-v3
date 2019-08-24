function init_wizard() {

    var form = $(".validation-wizard").show();


    $(".validation-wizard").steps({
        headerTag: "h6",
        bodyTag: "section",
        transitionEffect: "fade",
        titleTemplate: '<span class="step">#index#</span> <span class="step-title">#title#</span>',
        labels: {
            previous: "Anterior",
            next: "Siguiente",
            finish: "Aceptar"
        },
        onStepChanging: function(event, currentIndex, newIndex) {
            return currentIndex > newIndex || !(3 === newIndex && Number($("#age-2").val()) < 18) && (currentIndex < newIndex && (form.find(".body:eq(" + newIndex + ") label.error").remove(), form.find(".body:eq(" + newIndex + ") .error").removeClass("error")), form.validate().settings.ignore = ":disabled,:hidden", form.valid())
        },
        onFinishing: function(event, currentIndex) {
            return form.validate().settings.ignore = ":disabled", form.valid()
        },
        onFinished: function(event, currentIndex) {
            /* swal("Form Submitted!", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem erat eleifend ex semper, lobortis purus sed."); */
        }
    });
    /* $('form').each(function() {
        $(this).validate({
    }); */
    $(".validation-wizard").validate({
        ignore: "input[type=hidden]",
        errorClass: "neat-error-text font-neat-sm w-100",
        successClass: "text-success",
        errorElement: "span",
        onfocusout: false,
        onkeyup: false,
        onclick: false,
        /* focusInvalid: false, */
        invalidHandler: function() {
            $(this).find(":input.error:first").focus();
        },
        highlight: function(element, errorClass) {
            $(element).removeClass(errorClass)
        },
        unhighlight: function(element, errorClass) {
            $(element).removeClass(errorClass)
        },
        errorPlacement: function(error, element) {
            error.insertAfter(element)
        },
        rules: {
            email: {
                email: !0
            },
            rut: {
                required: true,
                rut: true
            }
        },
        messages: {
            rut: { required: 'Escriba el rut', rut: 'Revise que esté bien escrito' }
        }
    });
    $(".validation-user-form").validate({
        ignore: "input[type=hidden]",
        errorClass: "neat-error-text font-neat-sm w-100",
        successClass: "text-success",
        errorElement: "span",
        highlight: function(element, errorClass) {
            $(element).removeClass(errorClass)
        },
        unhighlight: function(element, errorClass) {
            $(element).removeClass(errorClass)
        },
        errorPlacement: function(error, element) {
            error.insertAfter(element)
        },
        rules: {
            email: {
                email: !0
            }
        }
    });

    $('#pre-config-button-simplePayment').on('click', function(e) {
        e.preventDefault();
        $('.wizard>div.steps>ul>li.last.current').addClass('done');
    });
}