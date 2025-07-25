import React, { useEffect, useRef, useState, type FormEvent } from 'react'

type typeBlog = {
    id: number,
    title: string | undefined,
    desc: string | undefined
}

const Third = () => {
    const savedData = localStorage.getItem("data");
    const [data, setData] = useState<typeBlog[] | []>(savedData ? JSON.parse(savedData) : []);
    useEffect(() => {
        localStorage.setItem("data", JSON.stringify(data));
    }, [data])
    const inputTitle = useRef<HTMLInputElement | null>(null);
    const inputDesc = useRef<HTMLInputElement | null>(null);
    const [update, setUpdate] = useState<typeBlog | null>(null);

    // Create
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (update) {
            const updatedBlog = {
                id: update?.id,
                title: inputTitle?.current?.value,
                desc: inputDesc?.current?.value,
            }
            setData(data.map(item => item.id === updatedBlog.id ? updatedBlog : item));
        } else {
            const newBlog: typeBlog = {
                id: new Date().getTime(),
                title: inputTitle?.current?.value,
                desc: inputDesc?.current?.value
            }
            setData(prev => [...prev, newBlog]);
        }

        if (inputTitle.current) {
            inputTitle.current.value = ""
        }
        if (inputDesc.current) {
            inputDesc.current.value = "";
        }
    }

    // Delete
    const handleDelete = (id: number) => {
        setData(data.filter(item => item.id !== id));
    }

    // Update
    const handleUpdate = (item: typeBlog) => {
        setUpdate(item);
        if (inputTitle.current) {
            inputTitle.current.value = item.title || "";
        }
        if (inputDesc.current) {
            inputDesc.current.value = item.desc || "";
        }
    }

    const handleUpdateCancel = () => {
        setUpdate(null);
        if (inputTitle.current) {
            inputTitle.current.value = "";
        }
        if (inputDesc.current) {
            inputDesc.current.value = "";
        }
    }

    return (
        <section className='section_third'>
            <div className='container'>
                <div className='third_wrapper'>
                    <form onSubmit={handleSubmit} className='w-full min-[420px]:w-[300px] flex flex-col items-center justify-center gap-2 mb-5'>
                        <input ref={inputTitle} type="text" placeholder='Title' className='rounded-lg w-full h-10 sm:h-9' />
                        <input ref={inputDesc} type="text" placeholder='Description' className='rounded-lg w-full h-10 sm:h-9' />
                        <button className='bg-green-600 text-white w-full h-10 sm:h-9 rounded-lg'>
                            {
                                update ? "Save" : "Create"
                            }
                        </button>
                    </form>
                    <div className='grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-2 md:gap-3'>
                        {
                            data?.map((item) => (
                                <div className='min-h-[100px] flex flex-col border border-gray-500 p-2 sm:p-2 sm:px-3 rounded-xl' key={item.id}>
                                    <p className='text-base sm:text-lg capitalize'><span className='text-gray-400'>Title: </span>{item.title}</p>
                                    <p className='text-gray-300 text-base sm:text-lg capitalize'><span className='text-gray-400'>Description: </span>{item.desc}</p>
                                    <div className='flex-1 flex gap-2 items-end justify-end mt-2'>
                                        {
                                            update?.id === item.id
                                                ? <button onClick={handleUpdateCancel} className='text-[#0084d1]'>Cancel</button>
                                                : <button onClick={() => handleUpdate(item)} className='text-white'>Edit</button>
                                        }
                                        <button onClick={() => handleDelete(item.id)} className='text-red-500'>Delete</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default React.memo(Third);