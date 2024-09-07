import { createColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';
import usePet from '../../Hooks/usePet';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AllPet = () => {
    const { pets, refetch } = usePet();
    const axiosSecure = useAxiosSecure();
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(pets);
    }, [pets]);

    const columnHelper = createColumnHelper();

    const columns = [
        columnHelper.accessor("", {
            id: "S.No",
            cell: (info) => <span>{info.row.index + 1}</span>,
            header: "S.NO",
        }),
        columnHelper.accessor("pet_name", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Pet Name",
        }),
        columnHelper.accessor("email", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Email",
        }),
        columnHelper.accessor('pet_code', {
            cell: (info) => <span>{info.getValue()}</span>,
            header: 'Category',
        }),
        columnHelper.accessor('adopted', {
            id: 'status',
            cell: (info) => (
                <span className={info.getValue() ? 'text-green-500' : 'text-red-500'}>
                    {info.getValue() ? 'Adopted' : 'Not Adopted'}
                </span>
            ),
            header: 'Status',
        }),
        columnHelper.accessor('_id', {
            id: 'actions',
            cell: (info) => (
                <div className="flex flex-col md:flex-row gap-2">
                    <button
                        onClick={() => handleDelete(info.getValue())}
                        className="btn btn-success"
                    >
                        Delete
                    </button>
                    <Link
                        to={`/dashboard/update-pet/${info.getValue()}`}
                        className="btn btn-primary"
                    >
                        Update
                    </Link>
                    <button
                        onClick={() => toggleAdoptionStatus(info.getValue(), info.row.original.adopted)}
                        className={`btn ${info.row.original.adopted ? 'btn-warning' : 'btn-info'}`}
                    >
                        {info.row.original.adopted ? 'Mark as Not Adopted' : 'Mark as Adopted'}
                    </button>
                </div>
            ),
            header: "Actions",
        }),
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    const handleDelete = (id) => {
        axiosSecure.delete(`/delete/pets/${id}`)
            .then(res => {
                if (res.data.deletedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Deleted successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                }
            });
    };

    const toggleAdoptionStatus = (id, currentStatus) => {
        axiosSecure.patch(`/pets/${id}`, { adopted: !currentStatus })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Pet marked as ${!currentStatus ? 'Adopted' : 'Not Adopted'}`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                }
            });
    };

    return (
        <div className="p-4">
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-700 text-left">
                    <thead className="bg-indigo-600">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id} className="capitalize px-2 md:px-4 py-2 text-sm md:text-base">
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
                                    <td key={cell.id} className="px-2 md:px-4 py-2 text-sm md:text-base">
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
            {table.getPageCount() > 1 && (
                <div className="flex flex-col md:flex-row items-center justify-between mt-4 gap-2">
                    <div className="flex gap-2">
                        <button
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className="p-1 border border-gray-300 px-2 disabled:opacity-30"
                        >
                            {'<'}
                        </button>
                        <button
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            className="p-1 border border-gray-300 px-2 disabled:opacity-30"
                        >
                            {'>'}
                        </button>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm">Page</span>
                        <strong className="text-sm">
                            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                        </strong>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm">Go to page</span>
                        <input
                            type="number"
                            defaultValue={table.getState().pagination.pageIndex + 1}
                            className="border p-1 rounded bg-transparent w-16"
                            onChange={(e) => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                                table.setPageIndex(page);
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllPet;
