import Link from 'next/link'
export default function Navbar() {
    //navigation bar
    return <>
        <div className="text-center pt-[20px] border-2">
            <h1 className="text-3xl font-bold tracking-[1px] mb-[10px] max-sm:text-[1.5rem]">Try crypto exchanges</h1>
            <p className="mb-[20px] max-sm:text-[.8rem]">Compare all 190 top crypto exchanges. The list is ranked by trading volume.</p>
            <div className="flex justify-center">
                <div className=" py-[10px] w-fit m-auto border-b-4 border-[#0083ff] m-0">
                    <span className="text-[#0083ff]"> Exchanges </span>
                </div>
                <Link href="/dashboard" className=" py-[10px] w-fit m-auto border-b-4  m-0 ml-[20px]">
                    <span  > Dashboard </span>
                </Link>
            </div>
        </div>

    </>
}