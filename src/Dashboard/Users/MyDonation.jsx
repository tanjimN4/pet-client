import React, { useContext, useEffect, useState } from 'react';
import useDonation from '../../Hooks/useDonation';
import useAxios from '../../Hooks/useAxios';
import { AuthContext } from '../../Pages/provider/AuthProvider';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

const MyDonation = () => {
    const [data, setData] = useState()
    const axiosPublic = useAxios()
    const { user } = useContext(AuthContext)
    const [filteredData, setFilteredData] = useState([])

    useEffect(() => {
        axiosPublic.get('/donater/data')
            .then(res => {
                setData(res.data)

            })
    }, [])

    useEffect(() => {
        if (data) {
            const filtered = data.filter(item => item.donater_email === user.email);
            setFilteredData(filtered);
        }
    }, [data, user.email])
    console.log(filteredData);

    const columnHelper = createColumnHelper()

    const columns = [
        columnHelper.accessor("", {
            id: "S.No",
            cell: (info) => <span>{info.row.index + 1}</span>,
            header: "S.NO",
        }),
        columnHelper.accessor("image", {
            cell: (info) => (
                <img src={info?.getValue()} alt="" className="rounded-full w-10 h-10 object-cover" />
            ), header: 'Pet_image'
        }),
        columnHelper.accessor("amount", {
            id: "amount",
            cell: (info) => <span>{info?.getValue()}$</span>,
            header: "Amount",
        }),
        columnHelper.accessor("_id", {
            cell: (info) => <button className='btn btn-primary'>
                Refund
            </button>,
            header: "Refund",
        }),

    ];

    const table = useReactTable({
        data:filteredData,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })



    return (
        <div>
            <div className=''><h1 className='text-3xl text-center font-extrabold mx-10 my-10'>My Donations</h1></div>
            <div>
                <div className="m-5 text-white fill-gray-400 ">
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
            </div>
        </div>
    );
};

export default MyDonation;