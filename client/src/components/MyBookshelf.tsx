import React from 'react'
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from '@material-tailwind/react'

export default function Example() {
  const [openAcc1, setOpenAcc1] = React.useState(true)
  const [openAcc2, setOpenAcc2] = React.useState(true)
  const [openAcc3, setOpenAcc3] = React.useState(true)

  const handleOpenAcc1 = () => setOpenAcc1((prev) => !prev)
  const handleOpenAcc2 = () => setOpenAcc2((prev) => !prev)
  const handleOpenAcc3 = () => setOpenAcc3((prev) => !prev)

  return (
    <div className='mt-8 mx-2 md:mt-10 lg:min-mx-10'>
      <div>
        <Accordion
          open={openAcc1}
          placeholder={undefined}
        >
          <AccordionHeader
            onClick={handleOpenAcc1}
            placeholder={undefined}
          >
            Currently Reading
          </AccordionHeader>
          <AccordionBody>Items here</AccordionBody>
        </Accordion>
        <Accordion
          open={openAcc2}
          placeholder={undefined}
        >
          <AccordionHeader
            onClick={handleOpenAcc2}
            placeholder={undefined}
          >
            Want to Read
          </AccordionHeader>
          <AccordionBody>Items here</AccordionBody>
        </Accordion>
        <Accordion
          open={openAcc3}
          placeholder={undefined}
        >
          <AccordionHeader
            onClick={handleOpenAcc3}
            placeholder={undefined}
          >
            Read
          </AccordionHeader>
          <AccordionBody>Items here</AccordionBody>
        </Accordion>
      </div>
    </div>
  )
}
