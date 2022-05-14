// Обработка стандартной формы
$(function () {
    function initFormFields($context) {
        const $form = $('form', $context);
        const $textInputs = $('input[type="text"], input[type="email"], input[type="tel"]', $form);
        const $textareas = $('textarea', $form);
        const $selects = $('select', $form);
        const $checks = $('input[type="checkbox"], input[type="radio"]', $form);
        const $successMessage = $(`.${$context[0].classList[0]}__success-message`);

        function checkVal($input, regExp) {
            const result = regExp.test($input.val());
            const $relatedField = $input.closest(`.field`);

            if (result) {
                $relatedField.removeClass('is-error');
            } else {
                $relatedField.addClass('is-error');
            }
        }

        function checkTextInputFill($input) {
            const $relatedField = $input.closest(`.field`);

            if ($input.val().length > 0 && $input.val() !== '(___)___-__-__') {
                $relatedField.addClass('is-dirty').removeClass('is-empty');
            } else {
                $relatedField.removeClass('is-dirty').addClass('is-empty');
            }
            $relatedField.removeClass('is-focus');
        }

        function checkBinaryInput($input) {
            const $relatedField = $input.closest(`.field`);

            if ($input.is('[data-necessary]') && $input.prop('checked') === false) {
                $relatedField.addClass('is-error');
            } else {
                $relatedField.removeClass('is-error');
            }
        }

        function checkSelect($input) {
            const $relatedField = $input.closest(`.field`);

            if ($input.is('[data-necessary]') && $input.val() === '') {
                $relatedField.addClass('is-none');
            } else {
                $relatedField.removeClass('is-none');
            }
        }

        function checkTextarea(textarea) {
            const $relatedField = $(textarea).closest(`.field`);

            if ($(textarea).is('[data-necessary]') && textarea.value.length < 1) {
                $relatedField.addClass('is-none');
            } else {
                $relatedField.removeClass('is-none');
            }
        }

        function validateTextInput($input) {
            const $relatedField = $input.closest(`.field`);

            if (!$input.is('[data-necessary]')) return;

            if ($input.val().length < 1 || $input.val() === '(___)___-__-__') {
                $relatedField.addClass('is-none');
            } else if ($input.is('[type="tel"]')) {
                const regex = /\+7\(\d{3}\)\d{3}-\d{2}-\d{2}/;
                $relatedField.removeClass('is-none');
                checkVal($input, regex);
            } else if ($input.is('[type="email"]')) {
                const regex = /^([A-Za-z0-9_-]+\.)*[A-Za-z0-9\+_-]+@[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*\.[a-z]{2,6}$/g;
                $relatedField.removeClass('is-none');
                checkVal($input, regex);
            } else {
                $relatedField.removeClass('is-none');
            }
        }

        $('input[type="tel"]', $form).mask('(999)999-99-99', {autoclear: false});

        $textInputs.each(function() {
            checkTextInputFill($(this));
        });

        $form.on('focusout', function(e) {
           const $input = $(e.target).closest('input');
           const textarea = e.target.closest('textarea');

           if (!$input && !textarea) return;

           if ($input.is('[type="text"]') || $input.is('[type="email"]') || $input.is('[type="tel"]')) {
               checkTextInputFill($input);
               validateTextInput($input);
            }
            if (textarea) {
                checkTextarea(textarea);
            }
        }).on('focusin', function(e){
            const $input = $(e.target).closest('input');
            const $relatedField = $input.closest(`.field`);

            $relatedField.addClass('is-focus');
        }).on('change', function(e){
            const $input = $(e.target).closest('input');
            const $relatedField = $input.closest(`.field`);

            $relatedField.removeClass('is-empty').addClass('is-dirty').removeClass('is-error');
        }).on('submit', function(e) {
            e.preventDefault();

            $textInputs.each(function() {
                const $input = $(this);

                checkTextInputFill($input);
                validateTextInput($input);
            });

            $textareas.each(function() {
                validateTextInput($(this));
            });

            $checks.each(function() {
                checkBinaryInput($(this));
            });

            $selects.each(function() {
                checkSelect($(this));
            });

            if ($('.is-error, .is-none', $form).length < 1) {
                $form.hide();
                $successMessage.show();
            }
        });

        $selects.each(function() {
            const $select = $(this);
            const $field = $select.closest('.field');
            let data = [];
            let $options = $('.field__select-options', $field).length > 0 ? $('.field__option', $field) : $('option', $field);

            $options.each(function(index, element) {
                data[index] = {
                    id: index,
                    text: element.innerHTML,
                }
            });
            if (!$select.is('.select2-hidden-accessible')) {
                const placeholder = $select.attr('data-placeholder');

                $select.select2({
                    data: data,
                    width: '100%',
                    minimumResultsForSearch: 100,
                    placeholder: placeholder,
                    dropdownParent: $select.parent(),
                    "language": {
                        "noResults": function(){
                            return "Ничего не найдено";
                        }
                    },
                    templateResult: function (d) {
                        return $(d.text);
                    },
                    templateSelection: function (d) {
                        return $(d.text);
                    },
                }).on('select2:opening', function (e) {
                    $field.addClass('is-focus');
                }).on('select2:select', function (e) {
                    $field.addClass('is-dirty');
                }).on('select2:closing', function (e) {
                    $field.removeClass('is-focus');
                }).on('select2:unselecting', function (e) {
                    $field.removeClass('is-dirty');
                }).on('select2:clearing', function (e) {
                    $field.removeClass('is-dirty');
                });
            }
        });

        $context.addClass('is-ready');
    }

    $('.form-standart:not(.is-ready)').each(function() {
        initFormFields($(this));
    });


    $('a[data-webform-fancybox]').on('click', function(e){
        e.preventDefault();
        const $link = $(this);

        $.ajax({
            //type: "POST",
            //data: {WEB_FORM_ID: $(this).data('form_id')},
            url: $link.attr('data-webform-fancybox'),
            success: function (res) {
                $.fancybox.open(res, {
                    touch : {
                        vertical: false
                    },
                    closeExisting: true,
                    afterLoad: function( instance, current ) {
                        initFormFields($('.form-standart:not(.is-ready)'));
                    },
                })
            },
        });
    });
});
