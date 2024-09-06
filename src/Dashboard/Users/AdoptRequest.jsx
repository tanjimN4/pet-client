import React, { useContext, useEffect, useState } from 'react';
import useAxios from '../../Hooks/useAxios';
import { AuthContext } from '../../Pages/provider/AuthProvider';
import { data } from 'autoprefixer';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const AdoptRequest = () => {
    const axiosSecure=useAxiosSecure()
    const axiosPublic=useAxios()
    const [items,setItem]=useState([])
    const {user}=useContext(AuthContext)
    const [filteardata,setFilterData]=useState([])
    const [reload, setReload] = useState(false)
    useEffect(()=>{
        axiosPublic.get('/getAdoptPet')
        .then(res=>{
            setItem(res.data)
        })
    },[reload])
    useEffect(()=>{
        const filter=items.filter(item=>item.pet_email===user.email)
        setFilterData(filter)
    },[items,user?.email])
    // console.log(filteardata);
    
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
        columnHelper.accessor('adopted', {
            cell: (info) => <span>{info.getValue() ? 'Adopted' : 'Not Adopted'}</span>,
            header: 'Adoption Status',
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
            if(res.data.deletedCount >0){
                Swal.fire({
                    title: "Cancel",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
            
        })
        
    }
    const handleAdoption = (id) => {
        axiosSecure.patch(`/adopted/${id}`, { adopted: true })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Success!",
                        text: "This pet has been marked as adopted.",
                        icon: "success"
                    });
                    setReload(!reload)
                }
            })
            .catch(error => {
                console.error("Error updating adoption status:", error);
                Swal.fire({
                    title: "Error!",
                    text: "There was a problem updating the adoption status.",
                    icon: "error"
                });
            });
    }

    
    return (
        <div>
            <table className="border text-white border-gray-700 w-full text-left">
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