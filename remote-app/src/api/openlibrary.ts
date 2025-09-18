export interface Book {
  key?: string;
  cover_edition_key?: string;
  title: string;
  author_name?: string[];
  [key: string]: any;
}

export interface SearchBooksResponse {
  docs: Book[];
  [key: string]: any;
}

export async function searchBooks(
  query: string,
  page?: number,
  pageSize?: number
): Promise<SearchBooksResponse> {
  let url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`;
  if (page !== undefined) {
    url += `&page=${page}`;
  }
  if (pageSize !== undefined) {
    url += `&limit=${pageSize}`;
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch books');
  }
  const data = await response.json();
  return data;
}