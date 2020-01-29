const btn = document.getElementById("send");
const regexpUserName = /\'/g;
const regexpPhone = /\'/g;
const regexpEmail = /\'/g;

btn.addEventListener('click', (event)=>{
    const userName = document.getElementById('userName');
    const phone = document.getElementById('phone');
    const email = document.getElementById('email');
    if (!regexpUserName.test(userName.value)) {
        userName.setAttribute('class', 'errorRegExp')}
    else {
        userName.removeAttribute('class', 'errorRegExp')
    }
    if (!regexpPhone.test(phone.value)) {
        phone.setAttribute('class', 'errorRegExp')}
    else {
        phone.removeAttribute('class', 'errorRegExp')
    }
    if (!regexpEmail.test(email.value)) {
        email.setAttribute('class', 'errorRegExp')}
    else {
        email.removeAttribute('class', 'errorRegExp')
    }
});
