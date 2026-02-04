import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/API/api'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { Loader2 } from 'lucide-react'
import { setLoading } from '@/redux/authSlice'

const Signup = () => {

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    })
    const navigate = useNavigate()
    const dispatch=useDispatch()
    const {loading,user}=useSelector(store=>store.auth)

    const changeEventHandler = (e) => {
        const { name, value } = e.target
        setInput({ ...input, [name]: value })

    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] })
    }

    const submitHandler = async (e) => {
    
        try {
                e.preventDefault()
        const formData = new FormData()
        formData.append("fullname", input.fullname)
        formData.append("email", input.email)
        formData.append("phoneNumber", input.phoneNumber)
        formData.append("password", input.password)
        formData.append("role", input.role)
        if (input.file) {
            formData.append("file", input.file)
        }
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, { withCredentials: true })
            if (res.data.success) {
                toast.success(res.data.message)
                setTimeout(() => {
                    dispatch(setLoading(false))
                    navigate("/login")
                }, 1000)

            }

        } catch (error) {
            dispatch(setLoading(false))
                  
            toast.error( error.response?.data?.message || "Something went wrong")
        }
    }

    useEffect(()=>{
            if(user){
                navigate("/")
            }
        },[])
    return (
        <div className='h-screen'>
            <Navbar />
            <div className='flex items-center justify-center max-w-9xl mx-auto  '>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 '>
                    <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
                    <div className='my-3'>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                            id="name"
                            name="fullname"
                            value={input.fullname}
                            onChange={changeEventHandler}
                            type="text"
                            placeholder="Enter your full name"

                        />

                    </div>

                    <div className='my-3'>
                        <Label htmlFor="email">Email</Label>
                        <Input
                        id="email"
                            type="email"
                            name="email"
                            value={input.email}
                            onChange={changeEventHandler}

                            placeholder="Enter your email"

                        />

                    </div>

                    <div className='my-3'>
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input
                             id="phoneNumber"
                            type="tel"
                            name="phoneNumber"
                            value={input.phoneNumber}
                            onChange={changeEventHandler}
                            placeholder="Enter your phone number"

                        />

                    </div>

                    <div className='my-3'>
                        <Label htmlFor="password">Password</Label>
                        <Input
                        id="password"
                            type="password"
                            name="password"
                            value={input.password}
                            onChange={changeEventHandler}
                            placeholder="Enter your password"

                        />

                    </div>

                    <div className='flex items-center gap-5'>
                        <RadioGroup className="flex items-center gap-5 my-4" >
                            <div className="flex items-center space-x-2">
                                <Input
                                id="option-one"
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === "student"}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="option-one">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                id="option-two"
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === "recruiter"}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="option-two">Recruiter</Label>
                            </div>
                        </RadioGroup>
                        <div className='flex items-center gap-2'>
                            <Label htmlFor="profile">Profile</Label>
                            <Input
                            id="profile"
                                accept="image/*"
                                type="file"
                                onChange={changeFileHandler}
                                className="cursor-pointer"
                            />
                        </div>
                    </div>

                      {
                        loading ? <Button className="w-full my-1"> <Loader2 className='mr-2 h-4 w-4 animate-spin'/></Button>:<Button type="submit" className="w-full my-1">Signup</Button>
                      }
                    
                    <div className='text-right mt-2'>
                        <span>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
                    </div>


                </form>
            </div>
        </div>
    )
}

export default Signup
