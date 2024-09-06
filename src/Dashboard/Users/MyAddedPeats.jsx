import { useContext, useEffect } from "react";
import usePet from "../../Hooks/usePet";
import { AuthContext } from "../../Pages/provider/AuthProvider";
import { createColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { USERS } from "./fakedata";
import { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";


const MyAddedPeats = () => {
    const axiosPublic = useAxios();

    const { data: pets = [], isPending: loading, refetch } = useQuery({
        queryKey: ['pets'],
        queryFn: async () => {
            const res = await axiosPublic.get('/pets');
            return Array.isArray(res.data) ? res.data : []
        }
    })
    const navigate = useNavigate()

    const axiosSecure = useAxiosSecure()
    const { user } = useContext(AuthContext)
    const [data, setData] = useState([])

    useEffect(() => {
        const filtre = pets.filter(item => item.email === user.email);
        setData(filtre);
    }, [pets, user.email]);
    



    const columnHelper = createColumnHelper()

    const columns = [
        columnHelper.accessor("", {
            id: "S.No",
            cell: (info) => <span>{info.row.index + 1}</span>,
            header: "S.NO",
        }),
        columnHelper.accessor("pet_image", {
            cell: (info) => (
                <img src={info?.getValue()} alt="" className="rounded-full w-10 h-10 object-cover" />
            )
        }),
        columnHelper.accessor("pet_name", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Pet name",
        }),
        columnHelper.accessor("pet_code", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Pet category",
        }),

        columnHelper.accessor('adopted', {
            cell: (info) => <span>{info.getValue() ? 'Adopted' : 'Not Adopted'}</span>,
            header: 'Adoption Status',
        }),
        columnHelper.accessor('_id', {
            id: 'actions',
            cell: (info) => (
                <div className="flex gap-2">
                    <Link
                        to={`/dashboard/update-pet/${info.getValue()}`}
                        className="btn btn-primary"
                    >
                        Update
                    </Link>
                    <button
                        onClick={() => handleDelete(info.getValue())}
                        className=" btn btn-primary"
                    >
                        Delete
                    </button>
                </div>
            ),
            header: () => (
                <div className="flex gap-10">
                    <div className="">Update</div>
                    <div className=""> Delete</div>
                </div>
            ),
        }),
        columnHelper.accessor('_id', {
            id: 'actions2',
            cell: (info) => (
                <div className="flex gap-2">
                    <button
                        onClick={() => handleAdoption(info.getValue())}
                        className=" btn btn-primary"
                    >
                        Adopted
                    </button>
                </div>
            ),
            header: () => (
                <div className="Adopted"></div>
            ),
        }),

    ];


    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel()
    })

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/petDelete/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            setData(prevData => prevData.filter(pet => pet._id !== id))
                        }
                    }

                    )

            }
        });


    };
    const handleAdoption = (id) => {
        axiosSecure.patch(`/petAdopted/${id}`, { adopted: true })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Success!",
                        text: "This pet has been marked as adopted.",
                        icon: "success"
                    });
                    setData(prevData => prevData.map(pet =>
                        pet._id === id ? { ...pet, adopted: true } : pet
                    ));
                    refetch()
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
            <div className="">
                <h1 className="text-3xl font-extrabold text-center my-10">My Added Pets</h1>
            </div>
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
                {
                    table.getPageCount() > 1 &&
                    <div className="flex items-center justify-end mt-2 gap-2">
                        {/* pagination */}
                        <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="p-1 border border-gray-300 px-2 disabled:opacity-30">{'<'}</button>
                        <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="p-1 border border-gray-300 px-2 disabled:opacity-30">{'>'}</button>
                        <span className="flex items-center gap-1">
                            <div>Page</div>
                            <strong>
                                {table.getState().pagination.pageIndex + 1} of{' '}
                                {table.getPageCount().toLocaleString()}
                            </strong>
                        </span>
                        <span className="flex items-center gap-1">
                            | Go to page
                            <input type="number" defaultValue={table.getState().pagination.pageIndex + 1}
                                className="border p-1 rounded  bg-transparent"
                                onChange={(e) => {
                                    const page = e.target.value ? Number(e.target.value) - 1 : 0
                                    table.setPageIndex(page)
                                }}
                            >

                            </input>
                        </span>
                    </div>
                }
            </div>
        </div>
    );
};

export default MyAddedPeats;