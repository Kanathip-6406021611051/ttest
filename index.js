
const express = require("express");
const axios = require("axios");
var bodyParser = require("body-parser");
const path = require("path");
const app = express();

const base_url = "http://localhost:3000";


app.set("views", path.join(__dirname, "/public/views"));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/public"));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(base_url + "/books");
    res.render("books", { books: response.data });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

app.get("/book/:id", async (req, res) => {
  try {
    const response = await axios.get(base_url + "/books/" + req.params.id);
    res.render("book", { book: response.data });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

app.get("/create", (req, res) => {
  res.render("create");
});

app.post("/create", async (req, res) => {
  try {
    const data = { title: req.body.title, author: req.body.author, shelf_id: req.body.shelf_id };
    await axios.post(base_url + "/books", data);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

app.get("/bookonShelve/:shelf_id", async (req, res) => {
  try {
      const response = await axios.get(base_url + "/bookinshelve/" + req.params.shelf_id);
      res.render("bookonShelve", { data: response.data });
  }catch (err) {
      console.error(err);
      res.status(500).send("Error");
    }
});

app.get("/update/:id", async (req, res) => {
  try {
    const response = await axios.get(base_url + "/books/" + req.params.id);
    res.render("update", { book: response.data });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

app.post("/update/:id", async (req, res) => {
  try {
    const data = { title: req.body.title, author: req.body.author, shelf_id: req.body.shelf_id };
    await axios.put(base_url + "/books/" + req.params.id, data);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

app.get("/delete/:id", async (req, res) => {
  try {
    await axios.delete(base_url + "/books/" + req.params.id);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

app.get('/Shelve', async (req, res) => {
  try {
    const response = await axios.get(base_url + '/Shelve');
    res.render("Shelves", { Shelves: response.data });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

app.get("/Shelve/:shelf_id", async (req, res) => {
  try {
    const response = await axios.get(base_url + "/Shelve/" + req.params.shelf_id);
    res.render("Shelve", { Shelve: response.data });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

app.get("/createShelve", (req, res) => {
  res.render("createShelve");
});

app.post("/createShelve", async (req, res) => {
  try {
    const data = { category: req.body.category, total_books:0 };
    await axios.post(base_url + "/Shelve", data);
    res.redirect("/Shelve");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

app.get("/updateShelve/:id", async (req, res) => {
  try {
    const response = await axios.get(base_url + "/Shelve/" + req.params.id);
    res.render("updateShelve", { Shelve: response.data });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

app.post("/updateShelve/:id", async (req, res) => {
  try {
    const data = { category: req.body.category, total_books: req.body.total_books };
    await axios.put(base_url + "/Shelve/" + req.params.id, data);
    res.redirect("/Shelve");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

app.get("/deleteShelve/:id", async (req, res) => {
  try {
    await axios.delete(base_url + "/Shelve/" + req.params.id);
    res.redirect("/Shelve");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

app.listen(5500, () => {
  console.log("Server started on port 5500");
});