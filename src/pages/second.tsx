import React, { useEffect, useState, type FormEvent } from 'react'
import type { IBlog } from '../types';

const Second = () => {
    // CRUD - useState, Local Data
    const savedData = localStorage.getItem("data");
    const [data, setData] = useState<IBlog[] | []>(savedData ? JSON.parse(savedData) : []);
    useEffect(() => {
        localStorage.setItem("data", JSON.stringify(data));
    }, [data])

    const [title, setTitle] = useState<string>("");
    const [desc, setDesc] = useState<string>("");
    const [update, setUpdate] = useState<IBlog | null>(null);

    // Create - Update
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!(title.trim() && desc.trim())) {
            return null
        }
        if (update) {
            console.log(10);
            const updatedBlog: IBlog = {
                id: update.id,
                title,
                desc
            }
            setData(data.map((item) => item.id === update.id ? updatedBlog : item));
            setUpdate(null);

        } else {
            const newBlog: IBlog = {
                id: new Date().getTime(),
                title,
                desc
            }
            setData(prev => [...prev, newBlog]);
        }
        setTitle('');
        setDesc('');
    }

    // Delete
    const handleDelete = (id: number | string) => {
        setData(data.filter((item) => item.id !== id));
    }

    // Update
    const handleUpdate = (item: IBlog) => {
        setUpdate(item);
        setTitle(item.title);
        setDesc(item.desc);
    }

    const handleCancel = () => {
        setUpdate(null);
        setTitle('');
        setDesc('');
    }

    return (
        <section className='section_second'>
            <div className='container'>
                <div className='second_wrapper'>
                    <form onSubmit={handleSubmit} className='w-full min-[420px]:w-[300px] flex flex-col items-center justify-center gap-2 mb-5'>
                        <input value={title} onChange={((e) => setTitle(e.target.value))} className='rounded-lg w-full h-10 sm:h-9' type="text" placeholder='Title' />
                        <input value={desc} onChange={(e) => setDesc(e.target.value)} className='rounded-lg w-full h-10 sm:h-9' type="text" placeholder='Description' />
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
                                                ? <button onClick={handleCancel} className='text-[#0084d1]'>Cancel</button>
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

export default React.memo(Second);