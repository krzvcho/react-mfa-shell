import React, { useState } from 'react';
import { searchBooks } from '../../api/openlibrary';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

const BookList: React.FC = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const data = await searchBooks(query);
      setBooks(data.docs || []);
    } catch (err: any) {
      setError(err.message || 'Error searching books');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="standard"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for books..."
        />
        <Button
          type="submit"
          variant="contained"
          disabled={loading || !query.trim()}
        >
          Search
        </Button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {books.map((book) => (
          <li key={book.key || book.cover_edition_key}>
            {book.title}{' '}
            {book.author_name ? `by ${book.author_name.join(', ')}` : ''}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
