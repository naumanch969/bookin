import { DataGrid } from "@mui/x-data-grid";
import { BrokenImage } from '@mui/icons-material'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "../../redux/actions/user";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import { useEffect } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { format } from 'timeago.js'
import { image0 } from '../../assets'


const Users = () => {
    //////////////////////////////////////// Variables ////////////////////////////////////////
    const { users, error } = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { currentColor } = useStateContext()
console.log('users',users)
    //////////////////////////////////////// States ////////////////////////////////////////

    //////////////////////////////////////// UseEffects ////////////////////////////////////////
    useEffect(() => {
        dispatch(getUsers())
    }, [])

    //////////////////////////////////////// Functions ////////////////////////////////////////
    const handleDelete = (id) => {
        dispatch(deleteUser(id))
        navigate('/users')
    }

    const fakeUsers = [
        {
            _id: 415561,
            username: 'Joh Ellen',
            email: 'email@gmail.com',
            phone: '+92 300 1230909',
            country: 'Pakistan',
            city: 'Lahore',
            image: image0,
            createdAt: '1 month ago',
        },
        {
            _id: 125562,
            username: 'Joh Ellen',
            email: 'email@gmail.com',
            phone: '+92 300 1230909',
            country: 'Pakistan',
            city: 'Lahore',
            image: image0,
            createdAt: '1 month ago',
        },
        {
            _id: 915563,
            username: 'Joh Ellen',
            email: 'email@gmail.com',
            phone: '+92 300 1230909',
            country: 'Pakistan',
            city: 'Lahore',
            image: image0,
            createdAt: '1 month ago',
        },
        {
            _id: 202564,
            username: 'Joh Ellen',
            email: 'email@gmail.com',
            phone: '+92 300 1230909',
            country: 'Pakistan',
            city: 'Lahore',
            image: image0,
            createdAt: '1 month ago',
        },
        {
            _id: 928565,
            username: 'Joh Ellen',
            email: 'email@gmail.com',
            phone: '+92 300 1230909',
            country: 'Pakistan',
            city: 'Lahore',
            image: image0,
            createdAt: '1 month ago',
        },
        {
            _id: 253564,
            username: 'Joh Ellen',
            email: 'email@gmail.com',
            phone: '+92 300 1230909',
            country: 'Pakistan',
            city: 'Lahore',
            image: image0,
            createdAt: '1 month ago',
        },
        {
            _id: 392565,
            username: 'Joh Ellen',
            email: 'email@gmail.com',
            phone: '+92 300 1230909',
            country: 'Pakistan',
            city: 'Lahore',
            image: image0,
            createdAt: '1 month ago',
        },
        {
            _id: 294561,
            username: 'Joh Ellen',
            email: 'email@gmail.com',
            phone: '+92 300 1230909',
            country: 'Pakistan',
            city: 'Lahore',
            image: image0,
            createdAt: '1 month ago',

        },
        {
            _id: 325262,
            username: 'Joh Ellen',
            email: 'email@gmail.com',
            phone: '+92 300 1230909',
            country: 'Pakistan',
            city: 'Lahore',
            image: image0,
            createdAt: '1 month ago',
        },
        {
            _id: 352562,
            username: 'Joh Ellen',
            email: 'email@gmail.com',
            phone: '+92 300 1230909',
            country: 'Pakistan',
            city: 'Lahore',
            image: image0,
            createdAt: '1 month ago',
        },
    ];

    const userColumns = [
        { field: '_id', headerName: 'ID', width: 200 },
        {
            field: 'username', headerName: 'User', width: 200, renderCell: (params) => (
                <div className='flex items-center gap-[12px] ' >
                    {params.row.image ? <img src={params.row.image} alt='' className='w-[40px] h-[40px] rounded-full object-cover ' /> : <BrokenImage />}
                    <span className=' ' > {params.row.username}</span>
                </div>)
        },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'phone', headerName: 'Phone', width: 200 },
        { field: 'country', headerName: 'Country', width: 200 },
        { field: 'city', headerName: 'City', width: 200 },
        {
            field: 'createdAt', headerName: 'Price', width: 150, renderCell: (params) => (
                <>{format(params.row.createdAt)}</>
            )
        },
        {
            field: "action", headerName: "Action", width: 150, renderCell: (params) => (
                <>
                    <Link to={`/user/${params.row._id}`}>
                        <button style={{ background: currentColor }} className=" rounded-[8px] py-[4px] px-[10px] text-white cursor-pointer mr-[20px]">
                            View/Edit
                        </button>
                    </Link>
                    <IconButton style={{ background: '#ff00002e' }} className="bg-light-red " onClick={() => handleDelete(params.row._id)}>
                        <DeleteOutline style={{ color: "red", cursor: "pointer" }} />
                    </IconButton>
                </>
            ),
        },
    ]


    return (
        <>
            {error && <div className="w-full bg-light-red text-center py-[8px] font-medium ">{error}</div>}
            <div className="flex flex-col gap-[1rem] pb-[2rem]" >

                <div className="flex justify-between items-center  " >
                    <h1 className='text-[40px] font-bold ' >Users</h1>
                    <Link to='/user/new' style={{ background: currentColor }} className="text-white px-[1rem] py-[8px] rounded-[8px] ">Create</Link>
                </div>

                <DataGrid
                    rows={fakeUsers}
                    columns={userColumns}
                    initialState={{
                        pagination: { paginationModel: { page: fakeUsers.length % 10, pageSize: 10 }, },
                    }}
                    getRowId={row => row._id}
                    checkboxSelection
                    pageSizeOptions={[5, 10]}
                    disableSelectionOnClick={true}
                />
            </div>
        </>
    )
}

export default Users