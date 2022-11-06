window.onload = function() {
    //Buttons
    var addBtn = document.getElementById("addContact");

    var contactFormDiv = document.querySelector('.formContaier');

    var contactName = document.getElementById("cName");
    var phone = document.getElementById("phone");
    var email = document.getElementById("email");

    //array for storage array
    var phonebook = [];

    //adding contact to array
    addBtn.addEventListener("click",addContact);

    function createJson(contactName,phone,email){
       this.contactName = contactName;
       this.phone = phone;
       this.email = email;
    }

    function addContact() {
        var isNull = contactName.value == "" || phone.value == "" || email.value == "";
        console.log(isNull);

        if(isNull){
           alert("Please fill all the fields");

        }
        else{
            var contact = new createJson(contactName.value,phone.value,email.value);
            phonebook.push(contact);
            localStorage['addContact'] = JSON.stringify(phonebook);
            clearForm();
        }
    }

    //clear form text fields
    function clearForm(){
        contactName.value = "";
        phone.value = "";
        email.value = "";
    }

    function displayPhonebook(){
        if(localStorage['addContact'] === undefined){
            localStorage['addContact'] = "";
        }
        else{
            phonebook = JSON.parse(localStorage['addContact']);
            for(var i = 0; i < phonebook.length; i++){
                var name = phonebook[i].contactName;
                var phone = phonebook[i].phone;
                var email = phonebook[i].email;
                addContact(name,phone,email);
            }
        }
    }
}