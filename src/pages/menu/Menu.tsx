function Menu() {
    return <div className=" mt-header">
        <div className="banner text-white font-greatVibes text-4xl  mb-5 "> The Tast Of The Food Life</div>

        <div>Appetizers</div>
        <div className=" w-11/12 mx-auto grid grid-cols-2 ">
            {/* {data.map((item, index) => (
                <div key={index}>
                    <h1 >{item.foodName}</h1>
                    <h4 >{item.idCategory.categoryName}</h4>
                </div>
            ))} */}
            {/* mark */}
            {/* {food.map((food, index) => {
                if (index % 4 === 0 || index % 4 === 1) {
                    return <div className={`${index % 2 == 0 ? " border-r-2" : ""}`}><FirstCompo key={index} /></div>
                } else {
                    return <div className={`${index % 2 == 0 ? " border-r-2" : ""}`}><SecondCompo key={index} /></div>
                }
            })} */}
        </div>
    </div>;
}

export default Menu;
