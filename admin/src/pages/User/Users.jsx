import { DataGrid } from "@mui/x-data-grid";
import { BrokenImage } from '@mui/icons-material'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DeleteModal } from "../../components";
import { deleteUser, getUsers } from "../../redux/actions/user";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { format } from 'timeago.js'
import { image0 } from '../../assets'


const Users = () => {
    //////////////////////////////////////// Variables ////////////////////////////////////////
    const { users, error } = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { currentColor } = useStateContext()

    //////////////////////////////////////// States ////////////////////////////////////////
    const [currentUserId, setCurrentUserId] = useState('')
    const [openDeleteModal, setOpenDeleteModal] = useState('')

    //////////////////////////////////////// UseEffects ////////////////////////////////////////
    useEffect(() => {
        dispatch(getUsers())
    }, [])


    //////////////////////////////////////// Functions ////////////////////////////////////////
    const handleDelete = () => {
        dispatch(deleteUser(currentUserId, navigate))
        setCurrentUserId('')
        setOpenDeleteModal(false)
    }


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
                <div className='flex gap-[4px] '>
                    <Link to={`/user/${params.row._id}`}>
                        <button style={{ background: currentColor }} className=" rounded-[8px] py-[4px] px-[10px] text-white cursor-pointer mr-[20px]">
                            View/Edit
                        </button>
                    </Link>
                    <IconButton style={{ background: '#ff00002e' }} className="bg-light-red " onClick={() => { setOpenDeleteModal(true); setCurrentUserId(params.row._id) }}>
                        <DeleteOutline style={{ color: "red", cursor: "pointer" }} />
                    </IconButton>
                </div >
            ),
        },
    ]


    return (
        <>
            {error && <div className="w-full bg-light-red text-center py-[8px] font-medium rounded-[4px] ">{error}</div>}
            <DeleteModal open={openDeleteModal} setOpen={setOpenDeleteModal} handleDelete={handleDelete} />

            <div className="flex flex-col gap-[1rem] pb-[2rem]" >

                <div className="flex justify-between items-center  " >
                    <h1 className='text-[40px] font-bold ' >Users</h1>
                    <Link to='/user/new' style={{ background: currentColor }} className="text-white px-[1rem] py-[8px] rounded-[8px] ">Create</Link>
                </div>

                <DataGrid
                    rows={users}
                    columns={userColumns}
                    initialState={{
                        pagination: { paginationModel: { page: users.length % 10, pageSize: 10 }, },
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