import 'tailwindcss/tailwind.css'
import Layout from '../components/Layout'
import { OrderProvider } from '../context/OrderProvider'
import { UserProvider } from '../context/UserProvider'
import { CheckoutProvider } from '../context/CheckoutProvider'
import { Auth0Provider } from '@auth0/auth0-react'

function MyApp({ Component, pageProps }) {

  return (
    <Auth0Provider
      domain='dev-eczb0az4.us.auth0.com'
      clientId='9kSFQxUsLzUJWHlTYgVfDwGpgbW3XUPd'
      redirectUri='http://localhost:3000'
    >
      <UserProvider>
        <CheckoutProvider>
          <OrderProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </OrderProvider>
        </CheckoutProvider>
      </UserProvider>
    </Auth0Provider>
  )
}

export default MyApp
