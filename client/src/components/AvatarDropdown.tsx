import { useState } from 'react'
import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from '@material-tailwind/react'

import React from 'react'
import userProfileImage from '../assets/userprofile.png'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import { profileMenuItems } from './profileMenuItems'

export function AvatarDropdown() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = () => setIsMenuOpen(false)

  const navigate = useNavigate()

  const { logout } = useAuth()

  const handleSignOut = () => {
    logout()
    navigate('/signin')
  }

  return (
    <Menu
      open={isMenuOpen}
      handler={setIsMenuOpen}
      placement='bottom-end'
    >
      <MenuHandler>
        <Button
          variant='text'
          color='blue-gray'
          className='flex items-center rounded-full p-0'
        >
          <Avatar
            variant='circular'
            size='md'
            alt='logout'
            withBorder={true}
            color='blue-gray'
            className=' p-0.5'
            src={userProfileImage}
          />
        </Button>
      </MenuHandler>
      <MenuList className='p-1'>
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1
          return (
            <MenuItem
              key={label}
              onClick={isLastItem ? handleSignOut : closeMenu}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? 'hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10'
                  : ''
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? 'text-red-500' : ''}`,
                strokeWidth: 2,
              })}
              <Typography
                as='span'
                variant='small'
                className='font-normal'
                color={isLastItem ? 'red' : 'inherit'}
              >
                {label}
              </Typography>
            </MenuItem>
          )
        })}
      </MenuList>
    </Menu>
  )
}
export default AvatarDropdown
