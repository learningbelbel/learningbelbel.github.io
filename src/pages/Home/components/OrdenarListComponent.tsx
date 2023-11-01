import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog'
import { Dropdown } from 'primereact/dropdown';
import { ScrollPanel } from 'primereact/scrollpanel';
import { SongModel } from '../../../models/Model.Song';
import { useToast } from '../../../context/Context.Toast';
import { SongListService } from '../../../services/Service.ListService';
import { useState } from 'react';
import { Nullable } from 'primereact/ts-helpers';

export const OrdenarListComponent = ({ setIsVisibleSongList, isVisibleSongList, songList, setSongList, setIsVisible }: any) => {

    const toast = useToast();
    const listService = new SongListService();

    const [listDate, setListDate] = useState<Nullable<Date>>();

    const handleVerifySong = () => {
        const isValid = songList.every((song: SongModel) => song.chord.length <= 1);

        if (!isValid) {
            toast?.toast('warn', 'Error', 'Se permite una sola Nota por Canción!')
            return;
        }
        handleSaveList();
    }

    const handleUpdateSong = (index: number, song: SongModel, e: any) => {
        const updatedSongList: SongModel[] = [...songList];
        updatedSongList[index] = { ...song, chord: [e.value] };
        setSongList(updatedSongList);
    }

    const chordTemplate = (rowData: SongModel, i: any) => {

        const options = rowData.chord;
        const isDisabled = rowData.chord.length > 1 ? false : true;

        return <Dropdown
            value={isDisabled ? rowData.chord[0] : rowData.chord}
            placeholder={rowData.chord[0]}
            onChange={(e) => handleUpdateSong(i.rowIndex, rowData, e)}
            options={options}
            disabled={isDisabled}
            className="dropdown-style"
        />
    }

    const handleSaveList = async () => {

        const res = await listService.createList({ songs: songList, date: listDate })

        if (res.status !== 200) {
            return toast?.toast('error', 'Error', 'Error al crear el Listado!')
        }
        setIsVisible(false)
        toast?.toast('success', 'Exito', 'Listado creado exitosamente!')
    }

    const footerContentSongList = (
        <div>
            <div className="pt-3 mb-3 flex justify-content-between align-items-center">
                <label> Seleccionar Fecha: </label>
                <Calendar value={listDate} onChange={(e) => setListDate(e.value)} />
            </div>
            <Button label="Cancelar" icon="pi pi-times" onClick={() => setIsVisibleSongList(false)} className="p-button-text" severity="danger" />
            <Button label="Guardar" icon="pi pi-check" onClick={() => handleVerifySong()} autoFocus severity="success" />
        </div>
    );

    return (
        <div>
            <Dialog header="Ordenar y Asignar Fecha"
                className="randomDialog"
                visible={isVisibleSongList}
                onHide={() => setIsVisibleSongList(false)}
                footer={footerContentSongList}>

                <div className="dialog-content">
                    <ScrollPanel style={{ width: '100%', height: '60vh' }}>
                        <DataTable
                            value={songList}
                            reorderableColumns
                            reorderableRows
                            onRowReorder={(e) => setSongList(e.value)}>
                            <Column rowReorder style={{}} headerStyle={{ display: 'none' }} />
                            <Column field='name' header='Nombre' headerStyle={{ display: 'none' }} />
                            <Column field='chord' header='Nota' headerStyle={{ display: 'none' }} body={chordTemplate} />
                        </DataTable>
                    </ScrollPanel>
                </div>
            </Dialog>
        </div>
    )
}
