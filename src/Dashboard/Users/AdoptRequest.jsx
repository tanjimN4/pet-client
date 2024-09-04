import React, { useContext, useEffect, useState } from 'react';
import useAxios from '../../Hooks/useAxios';
import { AuthContext } from '../../Pages/provider/AuthProvider';
import { data } from 'autoprefixer';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

const AdoptRequest = () => {
    const axiosPublic=useAxios()
    const [items,setItem]=useState([])
    const {user}=useContext(AuthContext)
    const [filteardata,setFilterData]=useState([])
    useEffect(()=>{
        axiosPublic.get('/getAdoptPet')
        .then(res=>{
            setItem(res.data)
        })
    },[])
    useEffect(()=>{
        const filter=items.filter(item=>item.pet_email===user.email)
        setFilterData(filter)
    },[items,user?.email])
    console.log(filteardata);
    
    const columnHelper = createColumnHelper()

    const columns = [
        columnHelper.accessor("", {
            id: "S.No",
            cell: (info) => <span>{info.row.index + 1}</span>,
            header: "S.NO",
        }),
        columnHelper.accessor("username", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Name",
        }),
        columnHelper.accessor("email", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Email",
        }),

        columnHelper.accessor('phone', {
            cell: (info) => <span>{info.getValue()}</span>,
            header: 'Phone Number',
        }),
        columnHelper.accessor('address', {
            cell: (info) => <span>{info.getValue()}</span>,
            header: 'Location',
        }),
        columnHelper.accessor('_id', {
            id: 'actions2',
            cell: (info) => (
                <div className="flex gap-2">
                    <button
                        onClick={() => handleCancel(info.getValue())}
                        className=" btn btn-success"
                    >
                        cancel
                    </button>
                    <button
                        onClick={() => handleAdoption(info.getValue())}
                        className=" btn btn-primary"
                    >
                        Accepted
                    </button>
                </div>
            ),
            header: () => (
                <div className="Adopted"></div>
            ),
        }),

    ];


    const table = useReactTable({
        data:filteardata,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    const handleCancel = (id) => {
        axiosPublic.delete(`/delete/adopt/${id}`)
        .then(res=>{
            
        })
        
    }
    
    return (
        <div>
            <table className="border border-gray-700 w-full text-left">
                    <thead className=" bg-indigo-600">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id} className="capitalize px-3.5 py-2">
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row, index) => (
                            <tr key={row.id} className={`${index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'}`}>
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className="px-3.5 py-2">
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
        </div>
    );
};

export default AdoptRequest;