import PreviousOrderProduct from "./PreviousOrderProduct"


const PreviousOrderCard = ({ order }) => {

    return (
        <div key={order._id} className='bg-white border-2 rounded-md'>
            <div className='w-full h-14 flex flex-row justify-between bg-gray-300'>
                <div className='flex flex-row w-1/3 justify-between'>
                    <div className='flex flex-col'>
                        <h2>PEDIDO REALIZADO</h2>
                        <h2>30 de diciembre</h2>
                    </div>
                    <div className='flex flex-col'>
                        <h2>TOTAL</h2>
                        <h2>EUR 33.99</h2>
                    </div>
                    <div className='flex flex-col'>
                        <h2>ENVIAR A</h2>
                        <h2>FELIPE</h2>
                    </div>
                </div>
                <div>
                    <h1>PEDIDO NUMERO: {order._id}</h1>
                </div>
            </div>
            {order.productList.map((item) => (
                <PreviousOrderProduct key={item._id} product={item} />
            ))}
        </div>
    )
}

export default PreviousOrderCard
