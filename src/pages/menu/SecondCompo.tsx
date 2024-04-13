import React from "react";

function SecondCompo() {
    return <div className="flex items-center px-8 py-5">
        <div className="flex-1 px-4 space-y-2">
            <div className="flex justify-between text-xl">
                <div>Truffle Deviled Eggs</div>
                <div>125k</div>
            </div>
            <div className="text-justify">Hard-boiled eggs filled with a creamy mixture of egg yolks, mayonnaise, and truffle oil, topped with a sprinkle of truffle salt and chives.</div>
        </div>
        <div className="h-52 w-52">
            <img className="h-full w-full object-cover rounded-full" src="https://stripedspatula.com/wp-content/uploads/2019/03/truffled-deviled-eggs-4.jpg" alt="" />
        </div>
    </div>;
}

export default SecondCompo;
