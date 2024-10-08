let contacts = [];
let editingContactId = null; 

function displayContacts() {
    const contactList = document.getElementById('contacts');
    contactList.innerHTML = '';

    contacts.forEach(contact => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="name">${contact.name}</span>
            <span class="phone"><label>Tel:</label>${contact.phone}</span>
            <span>
                <button class="edit" onclick="editContact(${contact.id})">Editar</button>
                <button class="delete" onclick="deleteContact(${contact.id})">Excluir</button>
            </span>
        `;
        contactList.appendChild(li);
    });
}

function editContact(id) {
    const contact = contacts.find(c => c.id === id);

    if (contact) {
        document.getElementById('name').value = contact.name;
        document.getElementById('phone').value = contact.phone;
        document.getElementById('email').value = contact.email;

        document.getElementById('form-title').textContent = 'Editar Contato';

        document.getElementById('submitBtn').textContent = 'Salvar';

        editingContactId = id;
    }
}

document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    if (editingContactId !== null) {
        const contact = contacts.find(c => c.id === editingContactId);
        contact.name = name;
        contact.phone = phone;
        contact.email = email;

        editingContactId = null;
    } else {
        const newContact = {
            id: contacts.length + 1,
            name: name,
            phone: phone,
            email: email
        };
        contacts.push(newContact);
    }

    document.getElementById('contactForm').reset();

    document.getElementById('form-title').textContent = 'Adicionar Contato';

    document.getElementById('submitBtn').textContent = 'Adicionar';

    displayContacts();
});

function deleteContact(id) {
    contacts = contacts.filter(contact => contact.id !== id);
    displayContacts(); 
}

displayContacts();
