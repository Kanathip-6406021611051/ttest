const express = require('express');
const Sequelize = require('sequelize');
const app = express();

app.use(express.json());

const sequelize = new Sequelize('database','username','password',{
    host: 'localhost',
    dialect: 'sqlite',
    storage: './library.db'
});
const Book = sequelize.define('book',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false
    },
    shelf_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

});

const Shelves  = sequelize.define('Shelves',{
    shelf_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false
    },
    total_books: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

});

sequelize.sync();


// Book
app.get('/books',(req,res) => {
    Book.findAll().then(books => {
        res.json(books);
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.get('/books/:id', (req,res) => {
    Book.findByPk(req.params.id).then(book => {
        if (!book){
            res.status(404).send('Book not found');
        }else {
            res.json(book);
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.post('/books',(req,res) => {
    const {title, author, shelf_id} = req.body;
    Shelves.findByPk(shelf_id).then((Shelf)=>{
        if(!Shelf){
            res.status(404).send("Shelves Not Found !!")
        }
        else{
            Shelf.update({total_books: Shelf.total_books + 1}).then(()=>{
                Book.create(req.body).then(book => {
                    res.send(book);
                }).catch(err => {
                    res.status(500).send(err)});  
            }).catch(err => {
                res.status(500).send(err)});
        }
    }); 
});

app.get('/bookinshelve/:shelf_id', (req, res) => {
    const { shelf_id }= req.params;
    Shelves.findByPk(shelf_id).then(() => {
        Book.findAll({where : { shelf_id : shelf_id } }).then((book) => {
            res.json(book);
        }).catch(err => {
            res.status(500).send(err);
        });
    }).catch (err => {
        res.status(500).send(err)
    })
});

app.put('/books/:id', (req,res) => {
    Book.findByPk(req.params.id).then(book => {
        if (!book) {
            res.status(404).send('Book not found');
        } else {
            book.update(req.body).then(() => {
                res.send(book);
            }).catch(err => {
                res.status(500).send(err);
            });
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.delete('/books/:id', (req, res) => {
    Book.findByPk(req.params.id).then(book => {
        if (!book){
            res.status(404).send('Book not found');
        } else {
            book.destroy().then(() => {
                res.send({});
            }).catch(err => {
                res.status(500).send(err);
                });
        }
}).catch(err => {
    res.status(500).send(err);
});
});


// Shelve
app.get('/Shelve',(req,res) => {
    Shelves.findAll().then(Shelves => {
        res.json(Shelves);
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.get('/Shelve/:id', (req,res) => {
    Shelves.findByPk(req.params.id).then(Shelves => {
        if (!Shelves){
            res.status(404).send('Shelves not found');
        }else {
            res.json(Shelves);
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.post('/Shelve',(req,res) => {
    Shelves.create(req.body).then(Shelves => {
        res.send(Shelves);
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.put('/Shelve/:id', (req,res) => {
    Shelves.findByPk(req.params.id).then(Shelves => {
        if (!Shelves) {
            res.status(404).send('Shelves not found');
        } else {
            Shelves.update(req.body).then(() => {
                res.send(Shelves);
            }).catch(err => {
                res.status(500).send(err);
            });
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.delete('/Shelve/:id', (req, res) => {
    Shelves.findByPk(req.params.id).then(Shelves => {
        if (!Shelves){
            res.status(404).send('Shelves not found');
        } else {
            Shelves.destroy().then(() => {
                res.send({});
            }).catch(err => {
                res.status(500).send(err);
                });
        }
}).catch(err => {
    res.status(500).send(err);
});
});






const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

