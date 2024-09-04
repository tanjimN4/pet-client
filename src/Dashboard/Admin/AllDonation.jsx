import React, { useEffect, useState } from 'react';
import { createColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const AllDonation = () => {
    const [campaigns, setCampaigns] = useState([]);
    const axiosSecure = useAxiosSecure();
    console.log(campaigns);
    

    useEffect(() => {
        axiosSecure.get('/donation')
            .then(res => {
                setCampaigns(res.data);
            })
            .catch(err => {
                console.error('Error fetching donation campaigns:', err);
            });
    }, [axiosSecure]);

    const columnHelper = createColumnHelper();

    const columns = [
        columnHelper.accessor('name', {
            cell: info => <span>{info.getValue()}</span>,
            header: 'Campaign Name',
        }),
        columnHelper.accessor('description', {
            cell: info => <span>{info.getValue()}</span>,
            header: 'Description',
        }),
        columnHelper.accessor('status', {
            cell: info => (
                <span className={info.getValue() ? 'text-green-500' : 'text-red-500'}>
                    {info.getValue() ? 'Active' : 'Paused'}
                </span>
            ),
            header: 'Status',
        }),
        columnHelper.accessor('_id', {
            id: 'actions',
            cell: info => (
                <div className="flex gap-2">
                    <Link to={`/dashboard/edit-donation/${info.getValue()}`} className="btn btn-primary">
                        Edit
                    </Link>
                    <button
                        onClick={() => handlePause(info.getValue(), info.row.original.status)}
                        className={`btn ${info.row.original.status ? 'btn-warning' : 'btn-info'}`}
                    >
                        {info.row.original.status ? 'Pause' : 'Unpause'}
                    </button>
                    <button
                        onClick={() => handleDelete(info.getValue())}
                        className="btn btn-danger"
                    >
                        Delete
                    </button>
                </div>
            ),
            header: () => <div className="flex gap-4">Actions</div>,
        }),
    ];

    const table = useReactTable({
        data: campaigns,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const handleDelete = (id) => {
        axiosSecure.delete(`/donation/${id}`)
            .then(res => {
                if (res.data.deletedCount > 0) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Deleted',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setCampaigns(campaigns.filter(campaign => campaign._id !== id));
                }
            })
            .catch(err => {
                console.error('Error deleting campaign:', err);
            });
    };

    const handlePause = (id, currentStatus) => {
        axiosSecure.patch(`/donation/${id}`, { status: !currentStatus })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `Campaign ${!currentStatus ? 'Unpaused' : 'Paused'}`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setCampaigns(campaigns.map(campaign =>
                        campaign._id === id ? { ...campaign, status: !currentStatus } : campaign
                    ));
                }
            })
            .catch(err => {
                console.error('Error updating campaign status:', err);
            });
    };

    return (
        <div className="p-4 text-white">
            <h1 className="text-2xl font-bold mb-4">All Donation Campaigns</h1>
            <table className="border border-gray-700 w-full text-left">
                <thead className="bg-indigo-600">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
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
                            {row.getVisibleCells().map(cell => (
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

export default AllDonation;
