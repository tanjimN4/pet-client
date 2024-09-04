import { useContext, useEffect, useState } from "react";
import useDonation from "../../Hooks/useDonation";
import { AuthContext } from "../../Pages/provider/AuthProvider";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Link } from "react-router-dom";

const MydonationCampaing = () => {
    const { donations } = useDonation()
    const { user } = useContext(AuthContext)
    const [data, setData] = useState([])

    useEffect(() => {
        const filtre = donations.filter(item => item.email === user.email)
        console.log(filtre);
        setData(filtre)
    }, [donations, user.email])

    const columnHelper = createColumnHelper()

    const columns = [
        columnHelper.accessor("", {
            id: "S.No",
            cell: (info) => <span>{info.row.index + 1}</span>,
            header: "S.NO",
        }),
        columnHelper.accessor("image", {
            cell: (info) => (
                <img src={info?.getValue()} alt="" className="rounded-full w-20 h-20 object-cover" />
            ), header: 'Pet_image'
        }),
        columnHelper.accessor("name", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "name",
        }),
        columnHelper.accessor('adopted', {
            cell: (info) => {
                const maxDonation = info.row.original.maxDonation;
                const donatedAmount = info.row.original.donatedAmount;
                const progressPercentage = (donatedAmount / maxDonation) * 100;

                return (
                    <div className="flex items-center">
                        <div
                            className="radial-progress bg-primary text-primary-content border-primary border-4"
                            style={{ "--value": progressPercentage }}
                            role="progressbar"
                        >
                            {Math.round(progressPercentage)}%
                        </div>
                    </div>
                );
            },
            header: 'Donation Progress',
        }),
        columnHelper.accessor("name", {
            cell: (info) => <button>
                push
            </button>,
            header: "push",
        }),
        columnHelper.accessor("_id", {
            cell: (info) => <Link
                to={`/dashboard/edit/${info.getValue()}`}
                className="btn btn-primary"
            >
                Edit
            </Link>,
            header: "Edit",
        }),
        columnHelper.accessor("name", {
            cell: (info) => <button>
                View Donators
            </button>,
            header: "View Donators",
        }),

    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

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
            </div>
        </div>
    );
};

export default MydonationCampaing;
