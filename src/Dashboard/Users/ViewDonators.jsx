import { useContext } from "react";
import { AuthContext } from "../../Pages/provider/AuthProvider";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

const ViewDonators = () => {
    const {user}=useContext(AuthContext)
    const axiosPublic = useAxios();

    const { data :donators = [], isPending: loading, refetch } = useQuery({
        queryKey: ['donators'],
        queryFn: async () => {
            const res = await axiosPublic.get('/donater/data');
            return res.data;
        }
    })
    const filter=donators.filter(item=>item.get_donater_email===user.email)
    // console.log(filter);
    const columnHelper = createColumnHelper()
    const columns = [
        columnHelper.accessor("", {
            id: "S.No",
            cell: (info) => <span>{info.row.index + 1}</span>,
            header: "S.NO",
        }),
        
        columnHelper.accessor("donater_name", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "donater_name",
        }),
        columnHelper.accessor("amount", {
            cell: (info) => <span>{info.getValue()}$</span>,
            header: "amount",
        }),
    ]
    
    const table = useReactTable({
        data:filter,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div>
        <div className="">
            <h1 className="text-3xl font-extrabold text-center my-10">dONATORS</h1>
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

export default ViewDonators;