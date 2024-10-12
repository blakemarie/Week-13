import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import "./style.css"; // CSS
import { deleteBookById } from './api'; // Import the deleteBook function

// Book object
type Book = {
    id: number;
    title: string;
    author: string;
};

const apiUrl: string = 'http://localhost:3000/books'; 

// fetch books from the server and display them
async function displayBooks(): Promise<void> {
    try {
        // fetch all books from the API
        const response: Response = await fetch(apiUrl); 
        

        const books: Book[] = await response.json(); 
        

        renderBookCards(books); 
    } catch (error) {
        
        console.error('Error fetching books:', error); 
    }
}

//render book cards and display them on the page
function renderBookCards(books: Book[]): void {
    // Get the DOM element 
    const bookList = document.getElementById('book-list') as HTMLElement;
    
    bookList.innerHTML = ''; 

    books.forEach(book => {
        // Create a new div for the card
        const card = document.createElement('div');
        
        card.className = 'col-md-4 mb-4'; 

        // give the inner HTML 
        card.innerHTML = `
            <div class="card"> 
                <div class="card-body"> 
                    <h5 class="card-title">${book.title}</h5> 
                    <p class="card-text">Author: ${book.author}</p> 
                    <button class="btn btn-danger" id="delete-btn-${book.id}">Remove</button>
                </div>
            </div>
        `;

        // Append the new card 
        bookList.appendChild(card); 

        // Add event listener to the delete button
        const deleteBtn = document.getElementById(`delete-btn-${book.id}`) as HTMLButtonElement;
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => deleteBook(book.id));
        }
    });
}

// Adds a new book
document.getElementById('add-book-form')?.addEventListener('submit', async function (e: Event) {

    e.preventDefault(); 

    // Create a new book object using the input values from the form
    const newBook: Book = {
        id: 0, 
        title: (document.getElementById('title') as HTMLInputElement).value, // Get the title from the form input
        author: (document.getElementById('author') as HTMLInputElement).value, // Get the author from the form input
    };

    // Calculate the next available ID
    try {
        const response: Response = await fetch(apiUrl); 
        const existingBooks: Book[] = await response.json();


        newBook.id = existingBooks.length > 0 ? Math.max(...existingBooks.map(book => book.id)) + 1 : 1;


        const postResponse: Response = await fetch(apiUrl, {
            method: 'POST', // Use POST to create a new resource
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(newBook) // Add the new book
        });


        if (postResponse.ok) {
            console.log('Book added successfully!');
            displayBooks(); 
        }
    } catch (error) {
        
        console.error('Error adding book:', error); 
    }


    (document.getElementById('title') as HTMLInputElement).value = ''; // Clear the title input
    (document.getElementById('author') as HTMLInputElement).value = ''; // Clear the author input
});

// Function to delete a book by its ID with URL 
export async function deleteBook(id: number): Promise<void> {
    const url: string = `${apiUrl}/${id}`; 
    console.log(`Deleting book at: ${url}`); 
    try {
        const res: Response = await fetch(url, { method: 'DELETE' });
        if (res.ok) {
            console.log("Book deleted successfully!");
            displayBooks(); 
        } else {
            console.error('Error deleting book: Not Found');
        }
    } catch (error) {
        console.error('Error deleting book:', error);
    }
}

deleteBookById;
displayBooks(); 
