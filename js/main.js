let contacts = [];
displayData();

function contactForm(){
    window.scrollTo(0,0);
    let form = document.getElementById("newContactForm");
    if (form.classList.contains("hideForm")){
        form.classList.remove("hideForm");
    }
    else{
        form.classList.add("hideForm");
    }
}

function addContact(){
    contactForm();
    let newContact = new Contact(document.getElementById("fullNameInput").value, document.getElementById("emailInput").value, document.getElementById("phoneInput").value);
    document.getElementById("fullNameInput").value = "";
    document.getElementById("emailInput").value = "";
    document.getElementById("phoneInput").value = "";
    contacts.push(newContact);
    saveData();
    displayData();
}

function Contact(name, email, phone){
    this.name = name;
    this.email = email;
    this.phone = phone;
}

function saveData(){
    if (localStorage.contacts != null){
        JSON.parse(localStorage.contacts).forEach(function(contact){
            contacts.push(contact);
        });
    }
    localStorage.contacts = JSON.stringify(contacts);
    contacts = [];
}

function displayData(){
    if (localStorage.contacts != null){
        document.getElementById("contacts").innerHTML = null;
        let counter = 0; 
        JSON.parse(localStorage.contacts).forEach(function(contact){
            let htmlCode = "<li class='contact'><span class='delete' onclick='deleteContact(" + counter + ")'></span><h3>" + contact.name + "</h3><p class'email'>" + contact.email + "</p><p class='phone'>" + contact.phone + "</p></li>";
            document.getElementById("contacts").innerHTML += htmlCode; 
            counter++;
        });
    }                                                                                                  
}

function deleteContact(index){
    let currentList = JSON.parse(localStorage.contacts);
    currentList.splice(index, 1);
    localStorage.contacts = JSON.stringify(currentList);
    displayData();
}

// Event Listeners
document.getElementById("submitButton").addEventListener("click", addContact);
document.getElementById("newContactButton").addEventListener("click", contactForm);