import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import USER_API_END_POINT from '@/API/api'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading,setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'



const Login = () => {
    const [input, setInput] = useState({

        email: "",
        password: "",
        role: "",

    })
    const {loading,user}=useSelector(store=>store.auth)
    const navigate =useNavigate()
    const dispatch=useDispatch()

    const changeEventHandler = (e) => {
        const { name, value } = e.target
        setInput({ ...input, [name]: value })

    }
    


    const submitHandler = async (e) => {
        e.preventDefault()
console.log(USER_API_END_POINT,"ll")
        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, { withCredentials: true })
            console.log(res)
            if (res.data.success) {
                toast.success(res.data.message)
                   
                    dispatch(setUser(res.data.users))
                
                
                setTimeout(() => {

                    dispatch(setLoading(false))
                    
                    navigate("/")
                }, 500)

            }

        } catch (error) {
            dispatch(setLoading(false))
            toast.error(error.response.data.message)
            
            
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
            <div className='flex items-center justify-center max-w-9xl mx-auto mt-15 '>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-1'>
                    <h1 className='font-bold text-xl mb-5'>Login</h1>


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

                    </div>

                    {
                        loading ? <Button className="w-full my-1"><Loader2 className='mr-2 h-4 w-4 animate-spin'/>please wait</Button>:<Button type="submit" className="w-full my-1">Login</Button>
                    }


                    
                    <div className='text-right mt-2'>
                        <span>don't have an account? <Link to="/signup" className='text-blue-600'>signup</Link></span>
                    </div>


                </form>
            </div>
        </div>
    )
}

export default Login
