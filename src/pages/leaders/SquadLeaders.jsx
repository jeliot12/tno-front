import { Navigation } from "../../components/Navigation/Navigation";


function SquadLeaders() {
    return (
        <div className='bg-gradient-main min-h-screen px-4 flex flex-col items-center text-white font-medium'>
            <div className='absolute inset-0 h-1/2 bg-gradient-overlay z-0'></div>
            <div className='absolute inset-0 flex item-center justify-center z-0'></div>
            <div className='radial-gradient-overlay'></div>


            <div className='fixed bottom-0 left-0 w-full px-4 pb-4 z-10'>
                <Navigation />
            </div>
        </div>
    )
}

export default SquadLeaders;