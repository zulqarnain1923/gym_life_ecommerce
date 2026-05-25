import React, { use, useRef } from 'react'
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
    const [orderprd, setorderprd] = useState({})
    const [requestproduct, setrequestproduct] = useState()
    const [showuser, setshowuser] = useState(false)
    const [bottomnote, setbottomnote] = useState({ msg: "Welcome to our site" })

    const accessToken = useRef(null)

    const url = 'http://localhost:8000'
    // const url = 'https://zulqarnain111.pythonanywhere.com'




    const checkuserauth = async () => {
        try {
            const refresh_token = localStorage.getItem('refresh_token')
            const res = await axios.post(`${url}/api/user/token/`, { refresh_token: refresh_token },)
            if (res.data.access) {
                accessToken.current = res.data.access;
                return true
            } else { return false }
        }
        catch (error) {
            if (error.response?.status === 401) {
                alert('session expired please login again')
                Navigation('/login')
                return false
            }
        }
    }

    async function login(data) {
        try {
            const res = await axios.post(`${url}/api/user/login/`, data, { withCredentials: true })
            accessToken.current = res.data.access
            localStorage.setItem('refresh_token', res.data.refresh)
            getcartitem()
            setshowuser(true)
            Navigation(-1)
            setbottomnote({ ...bottomnote, msg: res.data.message })
        }
        catch (error) {
        
            setbottomnote({ msg: error.response.data.message })

        }

    }

    async function register(data) {
        try {
            const res = await axios.post(`${url}/api/user/register/`, { ...data }, { withCredentials: true })
            let resdata = res.data;
            let flag = false

            if (res.data && res.data.access) {
                localStorage.setItem('refresh_token', res.data.refresh);
                accessToken.current = res.data.access;
                delete data.access;
            }

            for (let key of Object.keys(resdata)) {

                if (key === 'message') {
                    setbottomnote({ msg: resdata[key] });
                    flag = true
                    break;
                }
                if (key === 'errormessage') {
                    setbottomnote({ msg: resdata[key] })
                    break;
                }

            }

            if (!flag && Object.keys(resdata).length > 0) {
                const firstvalue = Object.values(resdata)[0]
                setbottomnote({ ...bottomnote, msg: firstvalue })
            }

            (flag ? Navigation(-1) : null);
        }
        catch (error) {
            console.log(error)
            alert('data cannot save')
        }
    }

    async function logout() {

        // const res = await axios.delete(`${url}/api/user/logout/`, { withCredentials: true })
        localStorage.removeItem("refresh_token")
        setbottomnote({ msg: 'logout successfully' })
        accessToken.current = null
        setshowuser(false)
        setshowcart(null)
    

    }

    const cartitem = async (data) => {

        try {
            const res = await axios.post(`${url}/api/user/addtocart/`, { ...data }, { headers: { Authorization: `Bearer ${accessToken.current}` } })
            getcartitem()
            setbottomnote({ msg: res.data.message })
        }
        catch (error) {

            if (error.response.status === 401) {
                const isauth = await checkuserauth()
                if (isauth) {

                    const res = await axios.post(`${url}/api/user/addtocart/`, data, { headers: { Authorization: `Bearer ${accessToken.current}` } })
                    getcartitem()
                    setbottomnote({ msg: res.data.message })

                }
            }
        }
    }

    const getcartitem = async () => {
        try {
            const res = await axios.get(`${url}/api/user/addtocart/`, { headers: { Authorization: `Bearer ${accessToken.current}` } })
            setshowcart(res.data)
        }
        catch (error) {
            if (error.response.status === 401) {
                const isauth = await checkuserauth()

                if (isauth) {
                    const res = await axios.get(`${url}/api/user/addtocart/`, { headers: { Authorization: `Bearer ${accessToken.current}` } })
                    setshowcart(res.data)
                }
            }
            else {
                alert('something went wrong please login again')
                accessToken.current = null;
                Navigation('/login')
            }
        }
    }

    const deletecartitem = async (id) => {

        try {
            const res = await axios.delete(`${url}/api/user/addtocart/`, { data: { pr_id: id }, headers: { Authorization: `Bearer ${accessToken.current}` } })
            getcartitem()
            setbottomnote({ msg: res.data.message })
        }
        catch (error) {
            if (error.response.status === 401) {
                const isauth = await checkuserauth()
                if (isauth) {
                    const access = localStorage.getItem('access')
                    const res = await axios.delete(`${url}/api/user/addtocart/`, { data: { pr_id: id }, headers: { Authorization: `Bearer ${accessToken.current}` } })
                    getcartitem()
                    setbottomnote({ msg: res.data.message })
                }
            }
        }
    }

    const placeorder = async (data) => {

        try {
            const res = await axios.post(`${url}/order/add/order/`, { ...orderprd, ...data }, { headers: { Authorization: `Bearer ${accessToken.current}` } })
            setbottomnote({ msg: res.data.message })
            return true
        }
        catch (error) {

            if (error.response.status == 401) {
           
                const isauth = await checkuserauth()
                if (isauth) {
                    const res = await axios.post(`${url}/order/add/order/`, { ...orderprd, ...data }, { headers: { Authorization: `Bearer ${accessToken.current}` } })
                    setbottomnote({ msg: res.data.message })
                    return false
                }
            } else {
                console.log(error.response.data)
                alert(error.response.data)
                return false
            }
        }
    }


    useEffect(() => {
        const reload = async () => {
            try {
                const refresh_token = localStorage.getItem('refresh_token')
                if (refresh_token) {
                    const res = await axios.post(`${url}/api/user/token/`, { refresh_token: refresh_token })
                    if (res.data.access) {
                        accessToken.current = res.data.access;
                        setshowuser(true)
                        getcartitem()
                    }
                }

            }
            catch (error) {
                if (error.response.status === 401) {
                    accessToken.current = null
                }
            }
        }
        reload();
    }, [])


    function runfunctions(e = null, type, data = null) {
        if (e) { e.preventDefault() }
        if (type === 'login') { login(data) }
        if (type === 'register') { register(data) }
        if (type === 'checkuser') { checkuserauth() }
        if (type === 'cartitem') { cartitem(data) }
        if (type === 'getcartitem') { getcartitem() }
        if (type === 'deletecartitem') { deletecartitem(data) }
        if (type === 'placeorder') { placeorder(data) }
        if (type === 'logout') { logout() }
        if (type === 'check') { checks() }
    }

    const data = {
        runfunctions: runfunctions,
        loginuser: setloguser,
        registeruser: setreguser,
        showcart: showcart,
        setorderprd: setorderprd,
        orderprd: orderprd,
        url: url,
        requestproduct: requestproduct,
        setrequestproduct: setrequestproduct,
        showuser: showuser,
        setbottomnote: setbottomnote,
        bottomnote: bottomnote,
    }


    return (
        <Authcontext.Provider value={data}>
            {loading ? null : children}
        </Authcontext.Provider>
    )
}

