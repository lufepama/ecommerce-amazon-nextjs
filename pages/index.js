import Head from 'next/head'
import Image from 'next/image'
import mainImage from '../public/images/index.jpg'
import ProductsList from '../components/ProductsList'
import { getProductsController } from '../controllers/products'
import withAuth from '../components/withAuth'
import { useEffect } from 'react'
import { useCheckout } from '../hooks/useCheckout'
import { useOrder } from '../hooks/useOrder'

const Home = ({ products }) => {


  return (
    <div className='h-screen' >
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='flex flex-col' >
        <div className='flex w-full h-100 justify-center bg-white my-16'>
          <Image
            className='object-cover w-1/2 h-1/2 bg-black opacity-80'
            src={mainImage}
          />
        </div>
        <ProductsList
          products={products}
        />
      </main>
    </div>
  )
}


export async function getStaticProps() {

  const products = await getProductsController()

  return {
    props: {
      products
    }
  }
}

export default withAuth(Home)
