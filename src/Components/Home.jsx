import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <div>
        <h1>Welcome to Tunr</h1>
        <Link to='/songs'>Get Started</Link>
    </div>
  )
}
