import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { SongService } from "../../../services/Service.Song";
import { useState } from 'react';
import { useEffect } from 'react';
import { SongModel } from "../../../models/Model.Song";

export const DataTableContainer = () => {

    const songService = new SongService();

    const [songList, setSongList] = useState<SongModel[]>([]);
    const [listAmount, setListAmount] = useState(0);

    useEffect(() => {
        getSongService();
    }, [])

    const getSongService = async () => {
        const resp = await songService.getAllSong();
        setSongList(resp.data.result);
        setListAmount(resp.data.listCount)
    }

    const ratingBodyTemplate = (rowData: any, i: any) => {
        const percentaje = (rowData.usage / listAmount) * 100;
        return (
            <div style={{
                width: '100%',
                height: '10px',
                backgroundColor: 'gray',
                borderRadius: '5px',
            }} key={i}>
                <div style={{
                    width: `${percentaje}%`,
                    height: '10px',
                    backgroundColor: percentaje > 80 ? 'red' : 'blue',
                    borderRadius: '5px',

                }}>
                </div>
                {rowData.usage + " /" + listAmount}
            </div >
        )
    };
    const chordTemplate = (rowData: any) => {
        return (<>
            {rowData.chord.map((chord: any, i: any) => {
                return <span key={i} style={{ display: 'block' }}>{chord}</span>
            })}
        </>)
    }
    return (
        <div className="card">
            <DataTable
                value={songList}
                paginator
                rows={20}>
                <Column field="name" header="Nombre" sortable ></Column>
                <Column field="chord" header="Nota" body={chordTemplate} sortable ></Column>
                <Column field="usage" header="Uso" body={ratingBodyTemplate} sortable></Column>
            </DataTable>
        </div>
    )
}
