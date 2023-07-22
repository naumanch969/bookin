import { DataGrid } from "@mui/x-data-grid";
import { BrokenImage } from '@mui/icons-material'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteRoom, getRooms } from "../../redux/actions/room";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import { useEffect } from "react";
import { useStateContext } from "../../contexts/ContextProvider";


const Rooms = () => {
    //////////////////////////////////////// Variables ////////////////////////////////////////
    const { rooms, error } = useSelector(state => state.room)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { currentColor } = useStateContext()

    //////////////////////////////////////// States ////////////////////////////////////////

    //////////////////////////////////////// UseEffects ////////////////////////////////////////
    useEffect(() => {
        dispatch(getRooms())
    }, [])

    //////////////////////////////////////// Functions ////////////////////////////////////////
    const handleDelete = (id) => {
        dispatch(deleteRoom(id))
        navigate('/rooms')
    }

    const fakeRooms = [
        {
            _id: 415561,
            title: 'Room 15561',
            price: 43,
            description: '1 bathroom, 21 sq meters, two beds, 1 window',
            capacity: 2,
            roomNumbers: [101, 102, 103, 104, 105, 106, 17],
            createdAt: '1 month ago',
        },
        {
            _id: 125562,
            title: 'Room 25562',
            price: 43,
            description: '1 bathroom, 21 sq meters, two beds, 1 window',
            capacity: 2,
            roomNumbers: [101, 102, 103, 104, 105, 106, 17],
            createdAt: '1 month ago',
        },
        {
            _id: 915563,
            title: 'Room 15563',
            price: 43,
            description: '1 bathroom, 21 sq meters, two beds, 1 window',
            capacity: 2,
            roomNumbers: [101, 102, 103, 104, 105, 106, 17],
            createdAt: '1 month ago',
        },
        {
            _id: 202564,
            title: 'Room 02564',
            price: 43,
            description: '1 bathroom, 21 sq meters, two beds, 1 window',
            capacity: 2,
            roomNumbers: [101, 102, 103, 104, 105, 106, 17],
            createdAt: '1 month ago',
        },
        {
            _id: 928565,
            title: 'Room 28565',
            price: 43,
            description: '1 bathroom, 21 sq meters, two beds, 1 window',
            capacity: 2,
            roomNumbers: [101, 102, 103, 104, 105, 106, 17],
            createdAt: '1 month ago',
        },
        {
            _id: 253564,
            title: 'Room 53564',
            price: 43,
            description: '1 bathroom, 21 sq meters, two beds, 1 window',
            capacity: 2,
            roomNumbers: [101, 102, 103, 104, 105, 106, 17],
            createdAt: '1 month ago',
        },
        {
            _id: 392565,
            title: 'Room 92565',
            price: 43,
            description: '1 bathroom, 21 sq meters, two beds, 1 window',
            capacity: 2,
            roomNumbers: [101, 102, 103, 104, 105, 106, 17],
            createdAt: '1 month ago',
        },
        {
            _id: 294561,
            title: 'Room 94561',
            price: 43,
            description: '1 bathroom, 21 sq meters, two beds, 1 window',
            capacity: 2,
            roomNumbers: [101, 102, 103, 104, 105, 106, 17],
            createdAt: '1 month ago',

        },
        {
            _id: 325262,
            title: 'Room 25262',
            price: 43,
            description: '1 bathroom, 21 sq meters, two beds, 1 window',
            capacity: 2,
            roomNumbers: [101, 102, 103, 104, 105, 106, 17],
            createdAt: '1 month ago',
        },
        {
            _id: 352562,
            title: 'Room 52562',
            price: 43,
            description: '1 bathroom, 21 sq meters, two beds, 1 window',
            capacity: 2,
            roomNumbers: [101, 102, 103, 104, 105, 106, 17],
            createdAt: '1 month ago',
        },
    ];

    const roomColumns = [
        { field: '_id', headerName: 'Room ID', width: '150' },
        { field: 'title', headerName: 'Title', width: '200' },
        { field: 'description', headerName: 'Description', width: '150' },
        { field: 'capacity', headerName: 'Capacity', width: '150' },
        { field: 'price', headerName: 'Price', width: '150' },
        { field: 'roomNumbers', headerName: 'Room Numbers', width: '150' },
        {
            field: "action", headerName: "Action", width: 150, renderCell: (params) => (
                <>
                    <Link to={`/room/${params.row._id}`}>
                        <button style={{ background: currentColor }} className="blist-none rounded-[8px] py-[4px] px-[10px] text-white cursor-pointer mr-[20px]">
                            Edit
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

                <div>
                    <h1 className='text-[40px] font-bold ' >Rooms</h1>
                </div>

                <DataGrid
                    rows={fakeRooms}
                    columns={roomColumns}
                    initialState={{
                        pagination: { paginationModel: { page: fakeRooms.length % 10, pageSize: 10 }, },
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

export default Rooms

