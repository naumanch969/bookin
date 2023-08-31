import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { deleteImage, uploadImage } from '../redux/actions/general';
import { Camera, Clear } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';

const Upload = ({ image, isMultiple }) => {

    const dispatch = useDispatch()
    const imageRef = useRef(null)
    const { isFetching } = useSelector(state => state.general)

    const returnFilename = (url) => {
        console.log('url', url)
        const lastSlashIndex = url?.lastIndexOf('/');
        const filename = url?.substring(lastSlashIndex + 1);
        return filename
    }

    const handleUploadImage = (e) => {
        e.preventDefault()
        const image = e.target.files[0]
        const formData = new FormData();
        formData.append('image', image);
        dispatch(uploadImage(formData, isMultiple));  // here true is for isMultiple

    };

    const handleDelete = (e, url) => {
        e.preventDefault()
        console.log(url,returnFilename(url))
        // dispatch(deleteImage(returnFilename(url), isMultiple))  // here true is for isMultiple
    }


    const Image = ({ image }) => (
        <div className="w-full h-full relative flex justify-center items-center ">
            <img src={image} alt="" className="rounded-[8px] w-full h-full " />
            <button onClick={(e) => handleDelete(e, image)} className="absolute top-[4px] right-[4px] rounded-full bg-black text-white w-[20px] h-[20px] flex justify-center items-center   " ><Clear style={{ fontSize: '16px' }} /></button>
        </div>
    )
    const Images = ({ images }) => (
        <>
            {
                images?.map((url, index) => (
                    <div key={index} className="relative rounded-[8px] overflow-hidden w-[10rem] h-[10rem] p-[8px] flex justify-center items-center  " >
                        <img src={url} alt="" className="w-full h-full object-cover " />
                        <button onClick={(e) => handleDelete(e, url)} className="absolute top-[5px] right-[5px] text-black   " ><Clear /></button>
                    </div>
                ))
            }
        </>
    )

    return (
        <>
            {
                isFetching
                    ?
                    <div className="w-full flex justify-center items-center ">
                        <CircularProgress />
                    </div>
                    :
                    <>
                        {
                            image
                                ?
                                <>
                                    {
                                        isMultiple
                                            ? <Images images={image} />
                                            : <Image image={image} />
                                    }
                                </>
                                :
                                <div className="w-full h-full flex justify-center items-center" >
                                    <input ref={imageRef} type="file" accept="image/*" className='hidden' onChange={handleUploadImage} />
                                    <button onClick={(e) => { e.preventDefault(); imageRef.current.click() }} className="flex flex-col justify-center items-center text-textGray  " >
                                        <Camera style={{ fontSize: '36px' }} />
                                        Upload Image
                                    </button>
                                </div>
                        }
                    </>
            }
        </>
    )
}

export default Upload