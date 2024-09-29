import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from '@material-tailwind/react'

export default function MenuDefault() {
  return (
    <div>
      <Menu>
        <MenuHandler>
          <Button size='sm'>Add to Bookshelf</Button>
        </MenuHandler>
        <MenuList>
          <MenuItem>Currently Reading</MenuItem>
          <MenuItem>Want to Read</MenuItem>
          <MenuItem>Read</MenuItem>
        </MenuList>
      </Menu>
    </div>
  )
}
