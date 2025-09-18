import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { searchBooks } from '../../api/openlibrary';

type BookRow = { id: number; title: string; author: string; year: any };

const BookGrid: React.FC = () => {
  const [rows, setRows] = React.useState<BookRow[]>([]);
  const [page, setPage] = React.useState(1);
  const [rowCount, setRowCount] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [loadedPages, setLoadedPages] = React.useState<Set<number>>(new Set());

  const pageSize = 50; // ile rekordów na raz pobieramy

  const loadPage = async (page: number) => {
    if (loadedPages.has(page)) {
      // Page already loaded, do nothing
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await searchBooks('test', page, pageSize);
      console.log('Fetched data:', data);
      // przemapowanie wyników API do formatu DataGrid
      const newRows = data.docs.map((book, index) => ({
        id: (page - 1) * pageSize + index + 1,
        title: book.title,
        author: book.author_name ? book.author_name.join(', ') : 'Unknown',
        year: book.first_publish_year || '-',
      }));

      // dokładamy nowe rekordy do istniejących (lazy loading) - UNIQ rows
      setRows((prev) => {
        const allRows = [...prev, ...newRows];
        const uniqueRowsMap = new Map<number, BookRow>();
        allRows.forEach(row => uniqueRowsMap.set(row.id, row));
        return Array.from(uniqueRowsMap.values());
      });
      setRowCount(data.numFound);
      setLoadedPages(prev => new Set(prev).add(page)); // Mark page as loaded
    } catch (err: any) {
      setError(err.message || 'Error searching books');
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    let active = true;
    if (active) {
      loadPage(page);
    }
    return () => {
      active = false;
    };
  }, [page]);

  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={[
          { field: 'id', headerName: 'ID', width: 80 },
          { field: 'title', headerName: 'Title', width: 300 },
          { field: 'author', headerName: 'Author', width: 250 },
          { field: 'year', headerName: 'Year', width: 120 },
        ]}
        loading={loading}
        disableRowSelectionOnClick
        rowCount={rowCount}
        pageSizeOptions={[pageSize]}
        paginationMode="server"
        paginationModel={{ pageSize, page: page - 1 }}
        onPaginationModelChange={(model) => {
          const newPage = model.page + 1; // DataGrid ma 0-index, API ma 1-index
          if (newPage !== page) {
            setPage(newPage);
          }
        }}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default BookGrid;