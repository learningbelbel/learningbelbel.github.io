import { DataTable, DataTableValueArray } from "primereact/datatable";
import { SongService } from "../../../services/Service.Song"
import { useState } from 'react';
import { useEffect } from 'react';
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { OrdenarListComponent } from "./OrdenarListComponent";

interface Props {
    setRegularDialogVisible: any;
    regularDialogVisible: boolean;
}

export const CreateListDialog = ({ setRegularDialogVisible, regularDialogVisible }: Props) => {

    const service = new SongService();

    const [songList, setSongList] = useState([]);
    const [listAmount, setListAmount] = useState(0);
    const [selectedSong, setSelectedSong] = useState<DataTableValueArray>();
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        getSongList()
    }, [])

    const getSongList = async () => {
        const res = await service.getAllSong();
        setListAmount(res.data.listCount)
        setSongList(res.data.result);
    }

    const ratingBodyTemplate = (rowData: any, i: any) => {
        const percentaje = (rowData.usage / listAmount) * 100;
        return (
            <div className="container-bar" key={i}>
                <div style={{
                    width: `${percentaje}%`,
                    height: '10px',
                    backgroundColor: percentaje > 80 ? 'red' : 'green',
                    borderRadius: '5px',
                }}>
                </div>
                <center>
                    {rowData.usage + " /" + listAmount}
                </center>
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

    const onSelectionChange = (event: any) => {
        const value = event.value;

        setSelectedSong(value);
    };

    return (
        <Dialog
            className="selectSongDialog"
            header="Seleccionar Canciones"
            visible={regularDialogVisible}
            onHide={() => setRegularDialogVisible(false)}>

            <DataTable
                scrollable
                scrollHeight="58vh"
                value={songList}
                dataKey="_id"
                paginator
                rows={20}
                selection={selectedSong}
                onSelectionChange={onSelectionChange}>

                <Column selectionMode="multiple" exportable={false}></Column>
                <Column field="name" header="Nombre" sortable ></Column>
                <Column field="chord" header="Nota" body={chordTemplate} sortable ></Column>
                <Column field="usage" header="Uso" body={ratingBodyTemplate} sortable></Column>
            </DataTable>

            <div className="flex justify-content-end">
                <Button label="Continuar" onClick={() => { setIsVisible(true) }} />
            </div>

            <OrdenarListComponent
                setIsVisibleSongList={setIsVisible}
                isVisibleSongList={isVisible}
                songList={selectedSong}
                setSongList={setSelectedSong}
                setIsVisible={setIsVisible}
            />
        </Dialog>

    )
}
