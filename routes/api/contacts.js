
const express = require('express');

const express = require("express");
const { contactSchema } = require("../../models/contact");

const {
  listContacts,
  addContact,
  getContactById,
  removeContact,
  updateContact,

  updateStatus,
} = require("../../controllers/contacts");

const { contactSchema } = require("../../models/contact");

} = require("../../controllers/contacts");


const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const result = await listContacts();
    res.json(result);
  } catch {
    return res.status(500).send("Something went wrong");
  };
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getContactById(id);

    if (!result) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(result);
  } catch {
    return res.status(500).send("Something went wrong");
  };
});

router.post('/', async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const newContact = await addContact(name, email, phone);
    console.log("new contact", newContact);
    return res.json(newContact);
  } catch {
    return res.status(500).send("Something went wrong");
  };
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await removeContact(id);
    if (!result) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    return res.json({ message: "Contact delated" });
  } catch {
   return res.status(500).send("Something went wrong");
  };
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { error } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'Missing required name field' });
    }
    try {
    const result = await updateContact(id, req.body);
    if (!result) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(result);
  } catch {
return res.status(500).send("Something went wrong");  };
});

router.patch("/:id/favorite", async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;
  try {
    const findContactById = await getContactById(id);
    if (!findContactById) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    const result = await updateStatus(id, favorite);
    res.json(result);
  } catch {
    return res.status(500).send("Something went wrong");
  };
});

module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);

    if (!result) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "Invalid request body" });
    }
    const result = await addContact(req.body);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);
    if (!result) {
      return res.status(404).json({ message: "Contact not found" });
    }
    return res.json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "Invalid request body" });
    }
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);
    if (!result) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

