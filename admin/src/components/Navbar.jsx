import { useEffect, useState } from "react"
import { AiOutlineMenu } from "react-icons/ai"
import { FiShoppingCart } from "react-icons/fi"
import { BsChatLeft } from "react-icons/bs"
import { RiNotification3Line } from "react-icons/ri"
import { MdKeyboardArrowDown } from "react-icons/md"
import avatar from "../data/avatar.jpg"
import { logout } from '../redux/actions/user'
import { Cart, Chat, Notification, } from "."
import { useStateContext } from "../contexts/ContextProvider"
import { Tooltip } from "@mui/material"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"




const Navbar = () => {

    //////////////////////////////////////// VARIABLES //////////////////////////////////////
    const { setActiveMenu, activeMenu, isClicked, setIsClicked, handleClick, screenSize, setScreenSize, currentColor } = useStateContext()
    const { loggedUser } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    //////////////////////////////////////// STATES //////////////////////////////////////
    const [showUserProfile, setShowUserProfile] = useState(false)

    //////////////////////////////////////// USE EFFECTS //////////////////////////////////////
    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);
        window.addEventListener("resize", handleResize)
        handleResize()
        return () => window.removeEventListener("resize", handleResize)
    }, [])
    useEffect(() => {
        if (screenSize <= 900) {
            setActiveMenu(false)
        } {
            setActiveMenu(true)
        }
    }, [screenSize])

    //////////////////////////////////////// COMPONENTS //////////////////////////////////////
    const handleLogout = () => {
        setShowUserProfile(false)
        dispatch(logout(navigate))
    }

    //////////////////////////////////////// COMPONENTS //////////////////////////////////////
    const NavButton = ({ style, title, customFunc, icon, color, dotColor }) => (
        <Tooltip title={title} placement="bottom" >
            <button type="button" className={`${style} relative text-xl rounded-full p-3 hover:bg-light-gray`} onClick={customFunc} style={{ color }}>
                <span style={{ backgroundColor: dotColor }} className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2  " >
                </span>
                {icon}
            </button>
        </Tooltip>
    )

    return (
        <div className="flex justify-between p-2 md:mx-6 relative " >
            <NavButton
                style="relative"
                title="Menu"
                customFunc={() => setActiveMenu((prev) => !prev)}
                icon={<AiOutlineMenu />}
                color={currentColor}
            />
            <div className="flex" >
                <NavButton
                    title="Cart"
                    customFunc={() => handleClick('cart')}
                    icon={<FiShoppingCart />}
                    color={currentColor}
                />
                <NavButton
                    title="Chat"
                    customFunc={() => handleClick('chat')}
                    icon={<BsChatLeft />}
                    color={currentColor}
                    dotColor="#03c907"
                />
                <NavButton
                    title="Notifications"
                    customFunc={() => handleClick('notification')}
                    icon={<RiNotification3Line />}
                    color={currentColor}
                    dotColor="#03c907"
                />
                <div className="relative " >
                    <Tooltip title='Profile' placement="bottom" >
                        <div onClick={() => setShowUserProfile(pre => !pre)} className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg " >
                            <img src={avatar} alt="avatar" className="rounded-full w-8 h-8" />
                            <p>
                                <span className="text-gray-400 text-[14px] " >Hi, </span> {' '}
                                <span className="text-gray-400 font-bold ml-[4px] text-[14] capitalize " >{loggedUser?.username}</span>
                            </p>
                            <MdKeyboardArrowDown className="text-gray-400 text-14" />
                        </div>
                    </Tooltip>
                    {
                        showUserProfile &&
                        <div className="absolute top-full bg-white shadow-box rounded-[4px] " >
                            <div className="flex flex-col gap-[1rem] p-[8px] " >
                                <button onClick={() => setShowUserProfile(false)} className="px-[8px] py-[4px] cursor-pointer rounded-[4px] bg-white text-black hover:bg-gray-200 " >Profile</button>
                                <button onClick={() => setShowUserProfile(false)} className="px-[8px] py-[4px] cursor-pointer rounded-[4px] bg-white text-black hover:bg-gray-200 " >Saved</button>
                                <button onClick={() => setShowUserProfile(false)} className="px-[8px] py-[4px] cursor-pointer rounded-[4px] bg-white text-black hover:bg-gray-200 " >Notifications</button>
                                <button onClick={handleLogout} className="px-[8px] py-[4px] cursor-pointer rounded-[4px] bg-white text-black hover:bg-gray-200 " >Logout</button>
                            </div>
                        </div>
                    }
                </div>

                {isClicked.cart && <Cart />}
                {isClicked.chat && <Chat />}
                {isClicked.notification && <Notification />}

            </div>

        </div>
    )
}

export default Navbar
