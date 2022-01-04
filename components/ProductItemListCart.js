import ProductItemCart from "./ProductItemCart"


const ProductItemListCart = ({ cartList }) => {
    return (
        <div className='flex flex-col w-full items-center mt-5'>
            {
                cartList.map((item, index) => (
                    <ProductItemCart
                        key={item._id}
                        product={item}
                    />
                ))
            }
        </div>
    )
}

export default ProductItemListCart
