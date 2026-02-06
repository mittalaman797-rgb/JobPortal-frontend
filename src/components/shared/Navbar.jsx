import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { LogOut, User2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'

import axios from 'axios'
import { toast } from 'sonner'
import USER_API_END_POINT from '@/API/api'
import { setUser } from '@/redux/authSlice'


const Navbar = () => {
  const { user } = useSelector(store => store.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = async () => {
    try {
      const res = await axios.delete(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      console.log(res)
      console.log('logout enter')
      if (res.status===200 ) {
        dispatch(setUser(null));
        navigate("/login");
        console.log("logout")
        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  }
  return (
    <div className='mb-2 bg-gray-900 '>
      <div className='flex items-center justify-between mx-auto max-w-5xl h-16'>
        <div>
          <h1 className='text-2xl font-bold text-white'>Job<span className='text-[#6A38C2]'>Hub</span></h1>
        </div>
        <div className='flex items-center gap-8'>
          <ul className='flex items-center font-medium gap-5 text-white'>
            {
              user && user.role=="recruiter" ? (
                <>
                 <li><Link to="/admin/companies">companies</Link></li>
            <li><Link to="/admin/jobs">Jobs</Link></li>
                </>
                
              ) :  <>
               <li><Link to="/">Home</Link></li>
            <li><Link to="/jobs">Jobs</Link></li>
            <li><Link to="/browse">Browse</Link></li>
              </>
            }
           


          </ul>
          {
            !user ? (
              <div className='flex items-center gap-2'>
                <Link to="/login"><Button variant="outline" className="cursor-pointer">Login</Button></Link>
                <Link to="/signup"><Button className="bg-[#5A38C2] hover:bg-[#5b30a6] cursor-pointer" >SignUp</Button></Link>


              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" />

                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80 flex flex-col gap-3 ">
                  <div className='flex items-center gap-4'>
                    <Avatar className="cursor-pointer">
                      <AvatarImage src="https://github.com/shadcn.png" />

                    </Avatar>
                    <div>
                      <h4 className='font-medium'>{user?.fullname}</h4>
                      <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                    </div>

                  </div>

                  <div className='flex flex-col text-gray-600 mx-1 gap-3'>
                    {
                      user && user.role=="student" && (
                              <div className='flex items-center gap-1 w-fit '>
                      <User2 />
                      <Link to="/profile">
                        <Button variant="link" className="text-gray-700 flex gap-1">
                    View Profile
                        </Button>
                      </Link>
                    </div>
                      )
                    }
                   
                    <div className='flex items-center gap-1 w-fit mx-0.5 '>
                      <LogOut />
                      <Button onClick={logoutHandler} className="cursor-pointer text-gray-700" variant="link">LogOut</Button>
                    </div>
                  </div>

                </PopoverContent>
              </Popover>
            )
          }


        </div>

      </div>
    </div>
  )
}

export default Navbar
