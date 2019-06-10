document.addEventListener('submit', e => {
    let email = document.querySelector('input[name=email]');
    let password_test = document.querySelector('input[name=password]');
    let password_confirm = document.querySelector('input[name=confirm_password]');
    let first_name = document.querySelector('input[name=first_name]');

    if (password_test.value !== password_confirm.value){
        alert('Passwords do not match!');
        e.preventDefault();
    } else if (email.value.indexOf('.') === -1){
        alert('Invalid email.');
        e.preventDefault();
    } else if (!first_name){
        alert('Must enter a first name.');
        e.preventDefault();
    } else
        document.getElementById('register_form').submit();
});
