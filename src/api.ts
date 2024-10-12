// Function to delete a book by its ID
const apiUrl: string = 'http://localhost:3000/books';

export async function deleteBookById(id: number): Promise<void> {
    const url: string = `${apiUrl}/${id}`; // Construct URL for the specific book
    try {
        const res: Response = await fetch(url, { method: 'DELETE' });
        if (res.ok) {
            console.log("Book deleted successfully!");
        } else {
            console.error('Error deleting book: Not Found');
        }
    } catch (error) {
        console.error('Error deleting book:', error);
    }
    
}