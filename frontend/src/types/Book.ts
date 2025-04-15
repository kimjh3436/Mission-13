// book interface, essentially just an object, defining all the keys and their data types
export interface Book {
    bookId: number,
    title: string,
    author: string,
    publisher: string,
    isbn: string,
    classification: string, 
    category: string,
    pageCount: number, 
    price: number,
}