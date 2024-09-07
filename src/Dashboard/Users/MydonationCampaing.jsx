import { useContext, useEffect, useState } from "react";
import useDonation from "../../Hooks/useDonation";
import { AuthContext } from "../../Pages/provider/AuthProvider";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import ViewDonators from "./ViewDonators";

const MydonationCampaing = () => {
    const { donations, refetch } = useDonation();
    const { user } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const filtre = donations.filter(item => item.email === user.email);
        setData(filtre);
    }, [donations, user.email]);

    const columnHelper = createColumnHelper();

    const handlePause = async (id, currentStatus) => {
        const updatedStatus = { paused: !currentStatus };
        const response = await axiosSecure.patch(`/donation/user/${id}`, updatedStatus);

        if (response.data.modifiedCount > 0) {
            refetch?.();
        }
    };

    const columns = [
        columnHelper.accessor("", {
            id: "S.No",
            cell: (info) => <span>{info.row.index + 1}</span>,
            header: "S.NO",
        }),
        columnHelper.accessor("image", {
            cell: (info) => (
                <img src={info?.getValue()} alt="" className="rounded-full w-12 h-12 sm:w-20 sm:h-20 object-cover" />
            ), 
            header: 'Pet Image',
        }),
        columnHelper.accessor("name", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Name",
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
        columnHelper.accessor("paused", {
            cell: (info) => {
                const isPaused = info.getValue();
                const id = info.row.original._id;

                return (
                    <button
                        onClick={() => handlePause(id, isPaused)}
                        className={`btn ${isPaused ? 'btn-warning' : 'btn-success'}`}
                    >
                        {isPaused ? 'Unpause' : 'Pause'}
                    </button>
                );
            },
            header: "Pause/Unpause",
        }),
        columnHelper.accessor("_id", {
            cell: (info) => (
                <Link
                    to={`/dashboard/edit/${info.getValue()}`}
                    className="btn btn-primary"
                >
                    Edit
                </Link>
            ),
            header: "Edit",
        }),
        columnHelper.accessor("name", {
            cell: (info) => (
                <div>
                    <button className="btn btn-info" onClick={() => document.getElementById('my_modal_4').showModal()}>
                        View Donators
                    </button>
                    <dialog id="my_modal_4" className="modal">
                        <div className="modal-box w-11/12 max-w-5xl">
                            <ViewDonators></ViewDonators>
                            <div className="modal-action">
                                <form method="dialog">
                                    <button className="btn">Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>
            ),
            header: "View Donators",
        }),
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="p-4">
            <div className="text-center my-10">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-amber-500">My Added Donation Campaigns</h1>
            </div>
            <div className="overflow-x-auto">
                <table className="border border-gray-700 w-full text-left text-white">
                    <thead className="bg-indigo-600">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id} className="px-3.5 py-2">
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
