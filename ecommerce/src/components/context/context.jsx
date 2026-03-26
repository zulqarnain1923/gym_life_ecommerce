import React, { use } from 'react'
import { createContext, useState, useEffect, } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const Authcontext = createContext()


export default function Context({ children }) {
    const Navigation = useNavigate()
    const [loguser, setloguser] = useState(null)
    const [reguser, setreguser] = useState(null)
    const [loading, setloading] = useState(false)
    const [showcart, setshowcart] = useState(false)
    const [orderprd,setorderprd]=useState({})
    const [ requestproduct , setrequestproduct]=useState()
    const [showuser,setshowuser]=useState(false)

    const url = 'http://127.0.0.1:8000'
    // const url = 'https://zulqarnain111.pythonanywhere.com'
    
    const checkuserauth = async () => {
        let refresh_token = localStorage.getItem('refresh')
        if (refresh_token) {
            try {
                const res = await axios.post(`${url}/api/user/token/`, { refresh: refresh_token })
                if (res.data.access) {
                    localStorage.setItem('access', res.data.access)
                    return true
                } else { return false }
            }
            catch (error) {
                if (error.response.status === 401) {
                    alert('session expired please login again')
                    localStorage.removeItem('refresh')
                    localStorage.removeItem('access')
                    Navigation('/login')
                    return false
                }
            }
        } else {
            alert('please register your account or login')
            Navigation('/register')
            return false
        }
    }


    async function login(data) {
        try {
            const res = await axios.post(`${url}/api/login/`, data)
            console.log(res.data)
            localStorage.setItem('refresh', res.data.refresh)
            localStorage.setItem('access', res.data.access)
            Navigation(-1)
            // console.log("helow",data)
        }
        catch (error) {
            alert('email and password does not match')
            console.log('error', error.response.data)
        }
    }


    async function register(data) {
        try {
            const res = await axios.post(`${url}/api/user/register/`, { ...data })
            alert(res.data)
            localStorage.setItem('refresh', res.data.refresh)
            alert('registeration successful')
            Navigation(-1)
        }
        catch (error) {
            console.log(error.response.data)
            alert('data cannot save')
        }
    }

    async function logout(){
            localStorage.removeItem('refresh')
            localStorage.removeItem('access')
            
            setshowuser(false)
            alert('user is loged out')
    }

    async function checks(){
        const refresh =localStorage.getItem('refresh')
        if (refresh){
            console.log('hello')
            try {
                const res = await axios.post(`${url}/api/user/token/`, { refresh: refresh })
                if (res.data.access) {
                    localStorage.setItem('access', res.data.access)
                    setshowuser(true)
                    
                    console.log(showuser)

                } else {
                    setshowuser(false) 
                    console.log(showuser)
                    return false }
            }catch{setshowuser(false)}

        }
        
    }

    const cartitem = async (data) => {
        console.log('functin is called', data)
        let access_token = localStorage.getItem('access')
        let refresh_token = localStorage.getItem('refresh')
        if (!refresh_token && !access_token) {
            alert('please login first')
            Navigation('/login')
            return
        }
        try {
            const res = await axios.post(`${url}/api/user/addtocart/`, { ...data }, { headers: { Authorization: `Bearer ${access_token}` } })
            alert('item added to cart successfully')
            getcartitem()
            // console.log(res.data)
        }
        catch (error) {
            console.log('error', error.response.data)
            if (error.response.status === 401) {
                const isauth = await checkuserauth()
                if (isauth) {
                    let access_token = localStorage.getItem('access')
                    const res = await axios.post(`${url}/api/user/addtocart/`, data, { headers: { Authorization: `Bearer ${access_token}` } })
                    // console.log(res.data[0]) 
                    alert('item added to cart successfully')
                    getcartitem()
                }
            }
        }
    }

    const getcartitem = async () => {
        let access_token = localStorage.getItem('access')
        let refresh_token = localStorage.getItem('refresh')
        if (refresh_token) {
            try {
                const res = await axios.get(`${url}/api/user/addtocart/`, { headers: { Authorization: `Bearer ${access_token}` } })
                setshowcart(res.data)
                console.log(res.data)
            }
            catch (error) {
                if (error.response.status === 401) {
                    const isauth = await checkuserauth()
                    if (isauth) {
                        let access_token = localStorage.getItem('access')
                        const res = await axios.get(`${url}/api/user/addtocart/`, { headers: { Authorization: `Bearer ${access_token}` } })
                        setshowcart(res.data)
                        console.log(res.data)
                    }
                } else {
                    alert('something went wrong please login again')
                    localStorage.removeItem('refresh')
                    localStorage.removeItem('access')
                    Navigation('/login')
                    console.log('error in getcartitem', error.response.data)
                }
            }
        } else {
            alert('please login first')
            Navigation('/login')
        }

    }

    const deletecartitem = async (id) => {
        const access = localStorage.getItem('access')
        try {
            const res = await axios.delete(`${url}/api/user/addtocart/`, { data: { pr_id: id }, headers: { Authorization: `Bearer ${access}` } })
            getcartitem()
            console.log(res.data)
        }
        catch (error) {
            if (error.response.status === 401) {
                const isauth = await checkuserauth()
                if (isauth) {
                    const access = localStorage.getItem('access')
                    const res = await axios.delete(`${url}/api/user/addtocart/`, { data: { pr_id: id }, headers: { Authorization: `Bearer ${access}` } })
                    getcartitem()
                    console.log(res.data)
                }
            }
        }
    }

    const placeorder= async(data)=>{
        let refresh=localStorage.getItem('refresh')
        let access=localStorage.getItem('access')
        if (refresh){
            try{
            const res =await axios.post(`${url}/order/add/`,{...orderprd,...data},{headers:{Authorization:`Bearer ${access}`}})
            console.log(res.data)
            alert('order is placed successfully')
            return true
            }
            catch (error){
                console.log({error:error.response})
                if (error.response.status== 401){
                    const isauth=await checkuserauth()
                    if (isauth){
                        let access=localStorage.getItem('access')
                        const res = await axios.post (`${url}/order/add/`,{...orderprd,...data},{headers:{Authorization:`Bearer ${access}`}})
                        console.log(res.data)
                        alert('order is placed successfully')
                        return true
                    }
                }else{
                    console.log(error.response.data)
                    alert(error.response.data.status)
                    return false
                }
            }
        }else{
            Navigation('/login')
        }
    }
    
    function runfunctions(e = null, type, data = null) {
        if (e) { e.preventDefault() }
        if (type === 'login') { login(data) }
        if (type === 'register') { register(data) }
        if (type === 'checkuser') { checkuserauth() }
        if (type === 'cartitem') { cartitem(data) }
        if (type === 'getcartitem') { getcartitem() }
        if (type === 'deletecartitem') { deletecartitem(data) }
        if (type === 'placeorder') {placeorder(data)}
        if (type === 'logout') { logout()}
        if (type === 'check') {checks()}
        }

    const data = {
        runfunctions: runfunctions,
        loginuser: setloguser,
        registeruser: setreguser,
        showcart: showcart,
        setorderprd:setorderprd,
        orderprd:orderprd,
        url:url,
        requestproduct:requestproduct,
        setrequestproduct:setrequestproduct,
        showuser:showuser,
    
    }
    console.log(orderprd)

    return (
        <Authcontext.Provider value={data}>
            {loading ? null : children}
        </Authcontext.Provider>
    )
}

