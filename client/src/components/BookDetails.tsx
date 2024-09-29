import React from 'react'
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from '@material-tailwind/react'

interface BookDetailsProps {
  title: string
  description: string
  publishedDate?: string
  authors: string
}

const BookDetails: React.FC<BookDetailsProps> = ({
  title,
  description,
  publishedDate,
  authors,
}) => {
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => setOpen(!open)

  return (
    <>
      <Button
        variant='outlined'
        size='sm'
        onClick={handleOpen}
      >
        About This Book
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
      >
        <DialogHeader>{title}</DialogHeader>
        <DialogBody className='h-[60vh] overflow-scroll'>
          <Typography className='font-normal'>
            <div className='text-lg font-semibold text-blue-gray-900'>
              Description
            </div>
            <div className='my-2'>{description}</div>
            <div className='mt-2 mb-1'>
              <span className='font-semibold text-blue-gray-800'>
                Published:{' '}
              </span>
              {publishedDate}
            </div>
            <div>
              <span className='font-semibold text-blue-gray-800'>Author: </span>
              {authors}
            </div>
          </Typography>
        </DialogBody>
        <DialogFooter className='space-x-2'>
          <Button
            variant='text'
            color='blue-gray'
            onClick={handleOpen}
          >
            Close
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}

export default BookDetails
