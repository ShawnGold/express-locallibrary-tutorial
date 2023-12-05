// loadData.js

const mongoose = require('mongoose');
const Author = require('./models/author');
const Book = require('./models/book');
const Genre = require('./models/genre');
const BookInstance = require('./models/bookinstance');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/your_database_name', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Function to create and save an author
async function createAuthor(firstName, familyName, dateOfBirth, dateOfDeath) {
  const authorDetail = { first_name: firstName, family_name: familyName, date_of_birth: dateOfBirth, date_of_death: dateOfDeath };
  const author = new Author(authorDetail);
  await author.save();
  console.log('Author created:', author);
  return author;
}

// Function to create and save a book
async function createBook(title, summary, isbn, author, genre) {
  const bookDetail = { title, summary, isbn, author, genre };
  const book = new Book(bookDetail);
  await book.save();
  console.log('Book created:', book);
  return book;
}

async function createGenre(name) {
  const genreDetail = { name };
  const genre = new Genre(genreDetail);
  await genre.save();
  console.log('Genre created:', genre);
  return genre;
}

async function createBookInstance(book, imprint, status, dueBack) {
  const bookInstanceDetail = { book, imprint, status, due_back: dueBack };
  const bookInstance = new BookInstance(bookInstanceDetail);
  await bookInstance.save();
  console.log('BookInstance created:', bookInstance);
  return bookInstance;
}


// Function to load data into the database
async function loadData() {
  // Create authors
  const author1 = await createAuthor('John', 'Doe', new Date('1990-01-01'), null);
  const author2 = await createAuthor('Rick', 'Sanchez', new Date('1985-03-15'), new Date('2020-05-10'));

  // Create genres
  const fictionGenre = await createGenre('Fiction');
  const nonFictionGenre = await createGenre('Non-fiction');

  // Create books with genres
  const book1 = await createBook('Harry Potter (pour les nuls)', 'un super livre.', '1234567890', author1, [fictionGenre]);
  const book2 = await createBook('Cyberpunk le livre (même lui il est buggé)', 'un livre tout nul', '0987654321', author2, [nonFictionGenre]);

  // Create book instances
  const bookInstance1 = await createBookInstance(book1, 'First Edition', 'Available', new Date());
  const bookInstance2 = await createBookInstance(book2, 'Second Edition', 'Loaned', new Date());

  // Add more authors, genres, and books as needed...

  console.log('Data loading complete.');
  mongoose.connection.close(); // Close the database connection
}

// Execute the data loading function
loadData();
