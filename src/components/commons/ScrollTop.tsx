import { GoMoveToTop } from "react-icons/go";
interface ITest {
    idName:string,
    onclick: () => void
}

export const ScrollTop = ({idName,onclick}: ITest) => {
    return <div id={idName} className=' z-10 absolute bottom-10 right-10 md:bottom-20 md:right-20   bg-red-500'>
        <div className='fixed bottom-10 right-10 md:bottom-20 md:right-20 '>
            <div onClick={onclick} className='animate-bounce scroll-smooth bg-black border-2 border-white p-3 rounded-full'>
                <GoMoveToTop className='text-white text-xl font-bold' />
            </div>
        </div>
    </div>
};
