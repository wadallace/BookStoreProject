import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
  Input,
  Button,
} from '@material-tailwind/react'
import { AuthContext } from '../context/AuthContext'

interface ILoginResponse {
  message?: string
  token?: string
  expiry?: number
}

const SignIn: React.FC = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const authContext = useContext(AuthContext)

  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthContextProvider')
  }

  const { login } = authContext
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      const { data } = await axios.post<ILoginResponse>(
        '/api/signin',
        {
          username,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (!data?.token) {
        throw new Error('Missing access token in login response')
      }

      login(data.token)

      navigate('/', { replace: true })
    } catch (error) {
      console.error(error)
      setError('Login failed. Please try again.')
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <Card className='w-96'>
        <form onSubmit={handleSubmit}>
          <CardHeader
            variant='gradient'
            color='transparent'
            className='place-items-center p-2'
          >
            <Typography
              variant='h3'
              color='deep-purple'
            >
              Welcome Back
            </Typography>
          </CardHeader>
          <CardBody className='flex flex-col gap-4 my-6'>
            <Input
              label='Username'
              size='lg'
              value={username || ''}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              label='Password'
              size='lg'
              type='password'
              value={password || ''}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <Typography
                variant='h6'
                color='red'
              >
                {error}
              </Typography>
            )}
          </CardBody>
          <CardFooter className='pt-0'>
            <Button
              variant='gradient'
              fullWidth
              type='submit'
            >
              Sign In
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default SignIn
