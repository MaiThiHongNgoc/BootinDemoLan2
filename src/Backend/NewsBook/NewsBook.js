import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NewsBook.css'; // Tạo file CSS riêng cho NewsBook
import { add, deleteBook, updateBook } from '../Service (1)/newsBookService'; // Thay đổi đường dẫn dịch vụ tương ứng

const NewsBook = () => {
    const [books, setBooks] = useState([]);
    const [editingBook, setEditingBook] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(10);
    const [totalBooks, setTotalBooks] = useState(0);
    const [apiType, setApiType] = useState('all'); // Trạng thái để chọn API

    useEffect(() => {
        loadBooks(apiType);
    }, [currentPage, apiType]);

    const loadBooks = async (apiType = 'all') => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(
                apiType === 'deleted'
                    ? 'http://localhost:9191/api/news-books/false'
                    : 'http://localhost:9191/api/news-books/'
            );
            
            setBooks(response.data || []);
            setTotalBooks(response.data.length || 0);
        } catch (error) {
            console.error('Failed to fetch books', error);
            setError('Failed to load books. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (book) => {
        try {
            await deleteBook(book.id);
            loadBooks(apiType); // Tải lại danh sách sách
        } catch (error) {
            console.error('Failed to delete book', error);
            setError('Failed to delete book. Please try again later.');
        }
    };

    const handleUpdate = async (book) => {
        try {
            const updatedBook = { ...book, approved: false };
            await updateBook(book.id, updatedBook); // Cập nhật thuộc tính approved
            loadBooks(apiType); // Tải lại danh sách sách
        } catch (error) {
            console.error('Failed to update book', error);
            setError('Failed to update book. Please try again later.');
        }
    };

    const handleRestore = async (book) => {
        try {
            const updatedBook = { ...book, approved: true };
            await updateBook(book.id, updatedBook);
            loadBooks(apiType); // Tải lại danh sách sách
        } catch (error) {
            console.error('Failed to restore book', error);
            setError('Failed to restore book. Please try again later.');
        }
    };

    const handleAddBook = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await add();
            window.alert(response);
        } catch (error) {
            console.error('Failed to add book', error);
            setError('Failed to add book. Please try again later.');
        } finally {
            setLoading(false);
        }
        setShowForm(true);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleApiTypeChange = (e) => {
        setApiType(e.target.value);
    };

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(totalBooks / booksPerPage);

    return (
        <div className="book-container">
            <h1>Book Management</h1>
            <button className="book-button-add" onClick={handleAddBook}>Auto Add Book</button>
            {/* {showForm && (
                <BookForm book={editingBook} onSave={handleFormClose} />
            )} */}
            <input
                type="text"
                placeholder="Search books..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="book-search"
            />
            <select onChange={handleApiTypeChange} value={apiType} className="api-select">
                <option value="all">Books</option>
                <option value="deleted">Restore</option>
            </select>

            {loading ? (
                <p>Loading books...</p>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : filteredBooks.length === 0 ? (
                <p>No approved books available</p>
            ) : (
                <>
                    <table className="book-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Thumbnail</th>
                                <th>Preview Link</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBooks.map((book) => (
                                <tr key={book.id}>
                                    <td>{book.id}</td>
                                    <td>{book.title}</td>
                                    <td>{(book.description && book.description.length > 35 ? book.description.substring(0, 35) + '...' : book.description) || null}</td>
                                    <td>
                                        <img src={book.thumbnail} alt={book.title} className="book-image" />
                                    </td>
                                    <td>
                                        <a href={book.preview_Link} target="_blank" rel="noopener noreferrer">Preview</a>
                                    </td>
                                    <td>
                                        {apiType === 'deleted' ? (
                                            <>
                                                <button
                                                    className="book-button book-button-restore"
                                                    onClick={() => handleRestore(book)}
                                                >
                                                    Restore
                                                </button>
                                                <button
                                                    className="book-button book-button-delete"
                                                    onClick={() => handleDelete(book)}
                                                >
                                                    Delete
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                className={`book-button ${book.approved ? 'book-button-delete' : 'book-button-restore'}`}
                                                onClick={() => handleUpdate(book)}
                                            >
                                                {book.approved ? 'Delete' : 'Restore'}
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default NewsBook;
