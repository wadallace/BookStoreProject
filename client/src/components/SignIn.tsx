import { useState } from 'react'
import { useAuth } from '../context/authContext'
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

const SignIn = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      const response = await axios.post('/api/signin', { username, password })
      login(response.data.token)
      navigate('/') // Redirect after 2 seconds
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError('Error signing in. Please try again.')
      } else {
        setError('An unexpected error occurred. Please try again.')
      }
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
