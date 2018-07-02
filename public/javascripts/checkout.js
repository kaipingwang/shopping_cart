var stripe = Stripe('pk_test_RXX6RR4z3GK59thqbM9jlWOl');
var elements = stripe.elements();

var card = elements.create('card', {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#8898AA',
      color: 'black',
      lineHeight: '36px',
      fontWeight: 300,
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSize: '14px',

      '::placeholder': {
        color: '#8898AA',
      },
    },
    invalid: {
      iconColor: '#e85746',
      color: '#e85746',
    }
  },
  classes: {
    focus: 'is-focused',
    empty: 'is-empty',
  },
});
card.mount('#card-element');

var inputs = document.querySelectorAll('input.field');
Array.prototype.forEach.call(inputs, function(input) {
  input.addEventListener('focus', function() {
    input.classList.add('is-focused');
  });
  input.addEventListener('blur', function() {
    input.classList.remove('is-focused');
  });
  input.addEventListener('keyup', function() {
    if (input.value.length === 0) {
      input.classList.add('is-empty');
    } else {
      input.classList.remove('is-empty');
    }
  });
});

function setOutcome(result) {
  var successElement = document.querySelector('.success');
  var errorElement = document.querySelector('.error');
  successElement.classList.remove('visible');
  errorElement.classList.remove('visible');

  if (result.token) {
    // Use the token to create a charge or a customer
    // https://stripe.com/docs/charges
    successElement.querySelector('.token').textContent = result.token.id;
    successElement.classList.add('visible');
   //action="/checkout" method="post" id="checkout-form"
   $.post("/checkout",
      {
          address: $('#phone-number').val(),
          phone:$('#address').val(),
          token: result.token.id
      },(data, status)=>{
        if(data){
          window.location.href = '/';
        }
      });
  } else if (result.error) {
    errorElement.textContent = result.error.message;
    errorElement.classList.add('visible');
  }
}

card.on('change', function(event) {
  setOutcome(event);
});

document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();
  var form = document.querySelector('form');
  var extraDetails = {
    name: form.querySelector('input[name=cardholder-name]').value
  };
  stripe.createToken(card, extraDetails).then(setOutcome);
});












/*
$form.submit(function(event){
    $('#charge-error').addClass('hidden');
    $form.find('button').prop('disabled', true);
    Stripe.card.createToken({
        number: $('#card-number').val(),
        email: $('#email').val(),
        cvc: $('#card-cvc').val(),
        exp_month: $('#card-expiry-month').val(),
        exp_year: $('#card-expiry-year').val(),
        name: $('#card-name').val()
    }, (status, response)=> {
            var token = "tok_1BsowwLrFLICnSRfZPn3UZ3h";
            // Insert the token into the form so it gets submitted to the server:
            $form.append($('<input type="hidden" name="stripeToken" />').val(token));
            // Submit the form:
            $form.get(0).submit();

    });
    return false;
});
*/
