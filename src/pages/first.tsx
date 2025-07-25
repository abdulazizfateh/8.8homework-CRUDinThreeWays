import React, { useEffect, useState } from 'react'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useForm } from 'react-hook-form'
import type { IBlog, IBlogForm } from '../types';

const BASE_URL = "https://68832a2521fa24876a9cefe2.mockapi.io/blog";

const schema = yup.object(
  {
    title: yup.string().required(),
    desc: yup.string().required(),
  }
).required()


const First = () => {
  // CRUD - Form Validation (useForm(schema)), API 
  // Form Schema - yup
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), })

  const [data, setData] = useState<IBlog[] | []>([]);
  const [update, setUpdate] = useState<IBlog | null>(null);

  // Create - Update
  const onSubmit = (data: IBlogForm) => {
    if (update) {
      fetch(`${BASE_URL}/${update.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }
      )
        .then(res => res.json())
        .then(res => {
          setData(prev => prev.map(item => item.id === res.id ? res : item))
        }).catch((e) => {
          console.log(e);
        })
      setUpdate(null);
    } else {
      fetch(`${BASE_URL}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }
      )
        .then(res => res.json())
        .then(res => {
          setData((prev) => [res, ...prev])
        }).catch(e => {
          console.log(e);
        })
    }
    reset();
  }

  // Get 
  useEffect(() => {
    fetch(`${BASE_URL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    }).then((res) => {
      return res.json();
    }).then((data) => {
      const reversedData = data.reverse();
      setData(reversedData);
    }).catch((e) => {
      console.log(e);
    })
  }, [])

  // Update
  const handleEdit = (blog: IBlog) => {
    setUpdate(blog);
    setValue("title", blog.title);
    setValue("desc", blog.desc);
  }

  const handleEditCancel = () => {
    setUpdate(null)
    reset();
  }

  // Delete
  const handleDelete = (id: string | number) => {
    fetch(`${BASE_URL}/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      }
    ).then(res => res.json())
      .then(res => {
        setData((prev) => prev.filter((item) => item.id !== res.id));
      }).catch(e => {
        console.log(e);
      })
  }

  return (
    <>
      <section className='secton_first'>
        <div className='container'>
          <div className='first_wrapper'>
            <div>
              <form onSubmit={handleSubmit(onSubmit)} className='w-full min-[420px]:w-[300px] flex flex-col items-center justify-center gap-1 mb-5'>
                <input {...register("title")} type="text" className='rounded-lg w-full h-10 sm:h-9' autoComplete='off' placeholder='Title' />
                <p className='w-full text-red-500 text-start'>{errors.title?.message}</p>
                <input {...register("desc")} type="text" className='rounded-lg w-full h-10 sm:h-9' autoComplete='off' placeholder='Description' />
                <p className='w-full text-red-500 text-start'>{errors.desc?.message}</p>
                <button type="submit" className='bg-green-600 text-white w-full h-10 sm:h-9 rounded-lg'>
                  {
                    update ? "Save" : "Create"
                  }
                </button>
              </form>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-2 md:gap-3'>
              {
                data?.map((item) => (
                  <div className='min-h-[100px] flex flex-col border border-gray-500 p-2 sm:p-2 sm:px-3 rounded-xl' key={item.id}>
                    <p className='text-base sm:text-lg capitalize'><span className='text-gray-400'>Title: </span>{item.title}</p>
                    <p className='text-gray-300 text-base sm:text-lg capitalize'><span className='text-gray-400'>Description: </span>{item.desc}</p>
                    <div className='flex-1 flex gap-2 items-end justify-end mt-2'>
                      {
                        (update && update.id === item.id) ? <button onClick={handleEditCancel} className='text-[#0084d1]'>Cancel</button> : <button onClick={() => handleEdit(item)} className='text-white'>Edit</button>
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
    </>
  )
}

export default React.memo(First);