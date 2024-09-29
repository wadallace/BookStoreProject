import { useEffect, useState } from 'react'
import axios from 'axios'

import SelectDropdown from './SelectDropdown' // Adjust the path as necessary
import BookDetails from './BookDetails' // Adjust the path as necessary

interface SearchProps {
  searchTerm: string
}

const Search: React.FC<SearchProps> = ({ searchTerm }) => {
  interface Book {
    id: number
    title: string
    authors: string
    imageLinks?: {
      smallThumbnail?: string | undefined
      thumbnail?: string | undefined
    }
    description?: string | undefined
    publishedDate?: string | undefined
  }

  const [books, setBooks] = useState<Book[]>([])

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`/api/book/search/${searchTerm}`)
        setBooks(response.data.books || [])
      } catch (error) {
        console.error('Error fetching books:', error)
      }
    }

    if (searchTerm) {
      fetchBooks()
    }
  }, [searchTerm])

  return (
    <div className='mt-4'>
      <ul>
        {books.length > 0 &&
          books.map((book) => (
            <li
              key={book.id}
              className='p-2 flex flex-col-2 lg:flex-row justify-between items-center hover:bg-blue-gray-50 rounded-md'
            >
              <div className='flex flex-col-2 lg:flex-row lg:space-x-4 w-full'>
                <div className='flex flex-col w-1/4 lg:w-1/5 p-2'>
                  <img
                    src={book.imageLinks?.thumbnail}
                    alt={book.title}
                    className='mb-4 w-40 lg:max-w-xs'
                  />
                </div>
                <div className='flex flex-col w-1/2 lg:w-3/5 p-4 justify-center'>
                  <div className='font-semibold lg:text-xl mb-2'>
                    {book.title}
                  </div>
                  <div className='mb-8 text-xs lg:text-base'>
                    by {book.authors}
                  </div>
                  <div>
                    <BookDetails
                      title={book.title}
                      description={
                        book.description || 'No description available'
                      }
                      authors={book.authors}
                      publishedDate={book.publishedDate}
                    />
                  </div>
                </div>
                <div className='flex w-1/4 lg:w-1/5 items-center justify-end p-4'>
                  <SelectDropdown />
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Search
