import 'tailwindcss/tailwind.css'
import Layout from '../components/Layout'
import { ProductProvider } from '../context/ProductProvider'
import { Auth0Provider } from '@auth0/auth0-react'
import { UserProvider } from '../context/UserProvider'

function MyApp({ Component, pageProps }) {

  return (
    <UserProvider>
      <ProductProvider>
        <Auth0Provider
          domain='dev-eczb0az4.us.auth0.com'
          clientId='8vycuS8FN5v2Tx7pQEyMUbIlAE61oq9s'
          redirectUri='http://localhost:3000'
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Auth0Provider>
      </ProductProvider>
    </UserProvider>
  )
}

export default MyApp
