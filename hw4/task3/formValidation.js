const btn = document.getElementById("send");
const regexpUserName = /[А-ЯА-я]\s[А-ЯА-я]/g;
const regexpPhone = /\+7\(\d{3}\)\d{3}-\d{4}/g;
const regexpEmail = /my(|\.|-)mail@mail\.ru/;

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
