import { DataGrid } from "@mui/x-data-grid";
import { BrokenImage } from '@mui/icons-material'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteHotel, getHotels } from "../../redux/actions/hotel";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import { useEffect } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { format } from 'timeago.js'
import { image0, image1, image2, image4, image5, image6, image7, image8, image9 } from '../../assets'


const Hotels = () => {
    //////////////////////////////////////// Variables ////////////////////////////////////////
    const { hotels, error } = useSelector(state => state.hotel)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { currentColor } = useStateContext()

    //////////////////////////////////////// States ////////////////////////////////////////

    //////////////////////////////////////// UseEffects ////////////////////////////////////////
    useEffect(() => {
        dispatch(getHotels())
    }, [])

    //////////////////////////////////////// Functions ////////////////////////////////////////
    const handleDelete = (id) => {
        dispatch(deleteHotel(id))
        navigate('/hotels')
    }


    const fakeHotels = [
        {
            _id: 415561,
            name: 'grand hotel 561',
            city: 'Lahore',
            address: 'Near Anarkali',
            type: 'resort',
            distance: '500',
            title: 'Have a nice time at sam singeston hotel in the heart of lahore',
            description: 'this is hotel lies amid of the city center having a prime location of area',
            rating: 5,
            cheapestPrice: 45,
            featured: false,
            images: [image0, image1, image2],
        },
        {
            _id: 415562,
            name: 'grand hotel 561',
            city: 'Lahore',
            address: 'Near Anarkali',
            type: 'resort',
            distance: '500',
            title: 'Have a nice time at sam singeston hotel in the heart of lahore',
            description: 'this is hotel lies amid of the city center having a prime location of area',
            rating: 5,
            cheapestPrice: 45,
            featured: false,
            images: [],
        },
        {
            _id: 415563,
            name: 'grand hotel 561',
            city: 'Lahore',
            address: 'Near Anarkali',
            type: 'resort',
            distance: '500',
            title: 'Have a nice time at sam singeston hotel in the heart of lahore',
            description: 'this is hotel lies amid of the city center having a prime location of area',
            rating: 5,
            cheapestPrice: 45,
            featured: false,
            images: [image6, image7, image8, image9],
        },
        {
            _id: 415564,
            name: 'grand hotel 561',
            city: 'Lahore',
            address: 'Near Anarkali',
            type: 'resort',
            distance: '500',
            title: 'Have a nice time at sam singeston hotel in the heart of lahore',
            description: 'this is hotel lies amid of the city center having a prime location of area',
            rating: 5,
            cheapestPrice: 45,
            featured: false,
            images: [],
        },
        {
            _id: 415565,
            name: 'grand hotel 561',
            city: 'Lahore',
            address: 'Near Anarkali',
            type: 'resort',
            distance: '500',
            title: 'Have a nice time at sam singeston hotel in the heart of lahore',
            description: 'this is hotel lies amid of the city center having a prime location of area',
            rating: 5,
            cheapestPrice: 45,
            featured: false,
            images: [image0, image1, image2, image4,],
        },
        {
            _id: 415566,
            name: 'grand hotel 561',
            city: 'Lahore',
            address: 'Near Anarkali',
            type: 'resort',
            distance: '500',
            title: 'Have a nice time at sam singeston hotel in the heart of lahore',
            description: 'this is hotel lies amid of the city center having a prime location of area',
            rating: 5,
            cheapestPrice: 45,
            featured: false,
            images: []
        },
        {
            _id: 415517,
            name: 'grand hotel 561',
            city: 'Lahore',
            address: 'Near Anarkali',
            type: 'resort',
            distance: '500',
            title: 'Have a nice time at sam singeston hotel in the heart of lahore',
            description: 'this is hotel lies amid of the city center having a prime location of area',
            rating: 5,
            cheapestPrice: 45,
            featured: false,
            images: [],
        },
        {
            _id: 415568,
            name: 'grand hotel 561',
            city: 'Lahore',
            address: 'Near Anarkali',
            type: 'resort',
            distance: '500',
            title: 'Have a nice time at sam singeston hotel in the heart of lahore',
            description: 'this is hotel lies amid of the city center having a prime location of area',
            rating: 5,
            cheapestPrice: 45,
            featured: false,
            images: [],
        },
        {
            _id: 415569,
            name: 'grand hotel 561',
            city: 'Lahore',
            address: 'Near Anarkali',
            type: 'resort',
            distance: '500',
            title: 'Have a nice time at sam singeston hotel in the heart of lahore',
            description: 'this is hotel lies amid of the city center having a prime location of area',
            rating: 5,
            cheapestPrice: 45,
            featured: false,
            images: [],
        },
        {
            _id: 415560,
            name: 'grand hotel 561',
            city: 'Lahore',
            address: 'Near Anarkali',
            type: 'resort',
            distance: '500',
            title: 'Have a nice time at sam singeston hotel in the heart of lahore',
            description: 'this is hotel lies amid of the city center having a prime location of area',
            rating: 5,
            cheapestPrice: 45,
            featured: false,
            images: [],
        },
    ];

    const hotelColumns = [
        { field: '_id', headerName: 'Employee ID', width: '150' },
        {
            field: 'hotelname', headerName: 'Hotel', width: '200', renderCell: (params) => (
                <div className="flex justify-start items-center gap-[8px] " >
                    {params.row.images.length ? <img src={params.row.images[0]} alt="image" className="w-[40px] h-[40px] rounded-full object-cover " /> : <BrokenImage />}
                    <span>{params.row.name}</span>
                </div>
            )
        },
        { field: 'city', headerName: 'City', width: '200' },
        { field: 'address', headerName: 'Address', width: '150' },
        { field: 'type', headerName: 'Type', width: '150' },
        { field: 'distance', headerName: 'Distance', width: '150' },
        { field: 'rating', headerName: 'Rating', width: '150' },
        { field: 'featured', headerName: 'Featured', width: '150' },
        { field: 'cheapestPrice', headerName: 'Cheapest Price', width: '150' },
        {
            field: "action", headerName: "Action", width: 150, renderCell: (params) => (
                <>
                    <Link to={`/hotel/${params.row._id}`}>
                        <button style={{ background: currentColor }} className="blist-none rounded-[8px] py-[4px] px-[10px] text-white cursor-pointer mr-[20px]">
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
        <div className="flex flex-col gap-[1rem] pb-[2rem]" >

            <div>
                <h1 className='text-[40px] font-bold ' >Hotels</h1>
            </div>

            <DataGrid
                rows={hotels}
                columns={hotelColumns}
                initialState={{
                    pagination: { paginationModel: { page: hotels.length % 10, pageSize: 10 }, },
                }}
                getRowId={row => row._id}
                checkboxSelection
                pageSizeOptions={[5, 10]}
                disableSelectionOnClick={true}
            />
        </div>
    )
}

export default Hotels
