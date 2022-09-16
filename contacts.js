
const { v4 } = require("uuid")
const path = require("path")
const fs = require("fs").promises

const contactsPath = path.join(__dirname, "db", "contacts.json")

  async function listContacts ()  {
        try{const data = await fs.readFile(contactsPath);
         return JSON.parse(data);
        } catch(error) {
          throw error;
         };
    };
    
  async function  getContactById (contactId) {

       try {
        const contacts = await listContacts();
        const result = contacts.find((item) => item.id === contactId)


        return result
       } catch (error) {
        throw error;
       };
    };
    
    async function removeContact(contactId) {


      try {
        const contacts = await listContacts();
        const newContacts = contacts.filter((item) => item.id !==contactId || Number(item.id) !== Number(contactId) );

        const result = JSON.stringify(newContacts);
        await fs.writeFile(contactsPath, result);
        return newContacts;

      } catch (error){
        throw error;
      };
    };
    
    async function addContact(name, email, phone) {
      try {
        const newContact = {
          name,
          email,
          phone,
        };

        const contacts = await listContacts();
        const {length} = contacts;
        const lastId = contacts[length - 1].id;
        newContact.id = String( Number(lastId) + 1);
        const newContacts = [...contacts, newContact];
        const result = JSON.stringify(newContacts);
        await fs.writeFile(contactsPath, result);
        return newContact

      } catch (error) {
        throw error;
      };
    };

    module.exports = {
      listContacts,
      getContactById,
      removeContact,
      addContact,
    }
