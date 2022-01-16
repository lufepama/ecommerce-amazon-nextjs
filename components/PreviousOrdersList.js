import PreviousOrderCard from "./PreviousOrderCard"


const PreviousOrdersList = ({ orders }) => {

    return (
        <div className="">
            {orders.map((item, index) => (
                <div className="mt-5">
                    <PreviousOrderCard key={index} order={item} />
                </div>
            ))}
        </div>
    )
}

export default PreviousOrdersList
