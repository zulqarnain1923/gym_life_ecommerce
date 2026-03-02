import React, { useContext, useEffect, useState } from 'react'
import { Card, CardContent, Button, Badge } from './component'
import { Authcontext } from '../context/context';
import { Plus } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Product = () => {
    const Navigation= useNavigate();
    const data = useContext(Authcontext);
    const [params, setparams] = useState({ dashproduct: 'true', stock: '' });
    const [product, setproduct] = useState();
    const getproduct = async () => {
        try {
            const res = await axios.get(`${data.url}/get/`, { params: { ...params } })

            console.log(res.data);
            setproduct(res.data);
        }
        catch (error) {
            console.log(error.response.data);
        }
    }

    useEffect(() => {
        getproduct();
    }, [params])


    return (
        <div>
            <div className="p-2">
                <Card className="rounded-2xl shadow-lg mb-4 mt-4 ">
                    <CardContent className="p-2">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-white">Products</h3>
                            <div className='flex justify-between'>

                                <div className='flex h-[50px] justify-center items-center gap-3'>
                                    <p className='text-white h-[30px] flex justify-center items-center mt-3 text-lg'>Filter : </p>
                                    <select className='border-1 text-white h-[25px] rounded-2 w-[100px]' onChange={(e) => setparams({ ...params, stock: e.target.value })}>
                                        <option className='text-white bg-gray-800' value="in stock">in stock</option>

                                        <option className='text-white bg-gray-800' value="low stock">low stock</option>
                                    </select>
                                </div>

                            </div>
                            <Button className='flex ' onClick={()=>Navigation('/productform')}><Plus size={18} /> Add </Button>
                        </div>

                        <table className="w-full text-left">
                            <thead>
                                <tr className="border">
                                    <th className="border px-1 text-white">Pr_id</th>
                                    <th className="border px-1 text-white">Name</th>
                                    <th className="border px-1 text-white">Price</th>
                                    <th className="border px-1 text-white">Stock</th>
                                    <th className="border px-1 text-white">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {product && product.length>1 ? product.map((p, index) => (
                                    <tr key={index} className="border-b hover:bg-gray-100 dark:hover:bg-gray-700 text-white">
                                        <td className="border px-1">{p.pr_id}</td>
                                        <td className="border px-1">{p.pr_name}</td>
                                        <td className="border px-1">${p.pr_price}</td>
                                        <td className="border px-1">{p.stock}</td>
                                        <td className="border px-1">
                                            {p.stock === 0 ? (
                                                <Badge type="out">Out of Stock</Badge>
                                            ) : p.stock <= 10 ? (
                                                <Badge type="low">Low Stock</Badge>
                                            ) : (
                                                <Badge>In Stock</Badge>
                                            )}
                                        </td>
                                    </tr>
                                )) : <tr><td className='text-white mt=4 '>No related item</td></tr>}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Product
