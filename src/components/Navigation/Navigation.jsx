import { Link, useLocation  } from "react-router-dom"
import House from "../../assets/Icon/House"
import TrophyLead from "../../assets/Icon/Trophy"
import Earns from "../../assets/Icon/Earn"
import Frens from "../../assets/Icon/Frens"
import Shield from "../../assets/Icon/Shield"




export const Navigation = ()=>{
  const location = useLocation();
  let colorMain = "#757575"
  let colorLeader = "#757575"
  let colorFrens = "#757575"
  let colorEarns = "#757575"
  let imageHref = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAA9hAAAPYQGoP6dpAAACJklEQVRIib3Xy4uPURzH8dc8uUVJLrkkkqbYiFiLFf+ACBv5C5TmKSsbiy8WlmJDsZqFWMhCjQULUTY0YcxkLgZjbsYw4/azOM9M089cfjS/51Onp3O+p/M+53yfzvmchkqlolbleZ5hC07gKD7gMu5GRF/NA6GhFnCe56uwGQdwGNuwuAh/xhNcw2N0RsT4f4PzPF+JTdhRAPdiLRbOMNYoXuEeHuE1eiJidEZwnueLsAKrsQ6N2IN92Iglc61giir4ila04CnaMThRIqLS0NTUdAzbsbX4NmLpP4BqUa+0A23FJN4swHlsmGdQtdYXZW9R784wUmfodPqS4ZOUl7I0jr4J8M8SwaN4n0mJLxM8gp4J8K+Swd0ZuvCjRPAwOjK8LRk8hPYMnRgoEfwRXRn60V0iuBtDGcbwUjl/9gA68HsC/Ew62Outd3geEZUsIioFeLgEcJd0dcqKhl7p1qi3nkvGYRI8iAfSOVovfcDDYocTOCLGCvBQHcFtkjMxCS70QvJM9dA3yRD2/wUuXOJVRQ7mWc9wfWpDVtWhRXKL86k+XIqInhnBhSM8h5vzBO3H2Yhorg5Ur1hEfMQpXJRy87/qxGlcmS44m69egiM4IznPWvUd93EhIh7M1GnWl0Se5w3YhZM4hDWzAH9KXvoKblXn9J/AUyawHDulN9NByfgvKMLj0rbeQHNEtM45YK3gKRNYht04jv3SbXMHt9EaETVbqD/Tq8f/GS3YlQAAAABJRU5ErkJggg=="
    return (
    <div className='flex-grow flex items-center w-full text-sm mt-4 border-t-2 border-[#151515]'>
        <div className='w-full bg-[#131313] pb-7 pt-4 flex justify-around navigate-menu-hover'>
          <Link to="/home"><button className={`flex flex-col items-center gap-1 ${
              location.pathname === "/home"
                ? colorMain = "#0077b3"
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}>
            <House size={30} className='ml-0 mb-1 inline-block' color={colorMain}/>
            <span className="font-light text-sm text-[#808080]">Главная</span>
          </button></Link>
          <Link to="/leaders"><button className={`flex flex-col items-center gap-1 ${
              location.pathname === "/leaders"
                ? colorLeader = "#0077b3"
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}>
            <TrophyLead size={30} className='ml-0 mb-1 inline-block' color={colorLeader}/>
            <span className="font-light text-sm text-[#808080]">Лидеры</span>
          </button></Link>
          <Link to="/squads"><button className={`flex flex-col items-center gap-1 ${
              location.pathname === "/squads"
                ? imageHref = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAA9hAAAPYQGoP6dpAAACJ0lEQVRIib3Xz4uNURzH8dfz5FeU5EckkTTFRsRarDz/gAgb+QuUxVwrGz0LFpZiQ7GyEAvuQrFgIcqGJoyZzMz1a8wvDMavY3Geq9vlzlya+3zq9NT5ns77e8736ZzPSUII2lVSqaZYj0PYjzc4g+shz4bbnghJO+CkUl2GddiNvdiI+UX4Pe7jPO5hIOTZ1H+Dk0p1KdZicwHcgZWY22KuSTxFFXfxDLWQZ5MtwUmlOg9LsByr0IXt2Ik1WDDTChoU8Ak9uIUH6MNYvYU8C4nuGwewCRuKbxcW/gOoHb0Sd6C3SOJ5ovtGDatnGTSThlJ8KBkKH1O8E+tSlqYwXAd/LxE8idepWPgywR9Qq4N/lAweSjGIbyWCJ9Cf4kXJ4HH0pRjAaIngtxhMMYKhEsFDGE/xBU+U82ePoh8/6+CH4sHeab3Eo5BnIQ15FgrwRAngQfHqlBYdr8Rbo9N6JBqH3+Ax3BbP0U7pDe4UOxzBIc++FODxDoJ7RWfiN7jQY9EzdUKfRUM48ge4cInnFDWYZT3EhcaOtGnALdEtzqaGcTrkWa0luHCEJ3BplqAjOB7y7HJzoHnFQp69xRGcEmvzvxrAUZz9W3A6X70A+3BMdJ7t6itu4mTIs9utBk37kkgq1QRbcRh7sGIa4HfRS5/Fleaa/hO4IYHF2CK+mTLR+M8pwlPitl7E5ZBnPTNO2C64IYFF2IaD2CXeNtdwFT0hz9q2UL8AAmTK4XuKnocAAAAASUVORK5CYII="
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}>
            <Shield size={30} className='ml-0 mb-1 inline-block'imageHref={imageHref}/>
            <span className="font-light text-sm text-[#808080]">Сквады</span>
          </button></Link>
          <Link to="/frens"><button className={`flex flex-col items-center gap-1 ${
              location.pathname === "/frens"
                ? colorFrens = "#0077b3"
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}>
            <Frens size={30} className='ml-0 mb-1 inline-block' color={colorFrens}/>
            <span className="font-light text-sm text-[#808080]">Друзья</span>
          </button></Link>
          <Link to="/earn"><button className={`flex flex-col items-center gap-1 ${
              location.pathname === "/earn"
                ? colorEarns = "#0077b3"
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}>
            <Earns size={30} className='ml-0 mb-1 inline-block' color={colorEarns}/>
            <span className="font-light text-sm text-[#808080]">Задания</span>
          </button></Link>
        </div>
    </div>
    )
}