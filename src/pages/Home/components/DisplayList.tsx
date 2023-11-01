import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { SongListService } from "../../../services/Service.ListService";
import { useState, useEffect } from 'react';

interface Props {
    setRandomDialogVisible: any;
    randomDialogVisible: boolean;
    setRegularDialogVisible: any;
    regularDialogVisible: boolean;
}

export const DisplayList = ({ setRandomDialogVisible, randomDialogVisible,
    setRegularDialogVisible, regularDialogVisible }: Props) => {

    const listService = new SongListService();

    const [currentSongList, setCurrentSongList] = useState<SongListModel>();

    useEffect(() => { getCurrentSongList() }, [])

    const getCurrentSongList = async () => {
        const list = await listService.getCurrentList();
        setCurrentSongList(list.data.result)
    }

    return (
        <div>
            <div className="content-header">
                <h1>Listado Actual</h1>
                <div className="head-btn">
                    <input type="submit" value="Crear Random" onClick={() => setRandomDialogVisible(!randomDialogVisible)} />
                    <input type="submit" value="Crear Manual" onClick={() => setRegularDialogVisible(!regularDialogVisible)} />
                </div>
            </div>

            <div className="card">
                <DataTable
                    value={currentSongList?.songs}>
                    <Column rowReorder style={{ width: '3rem' }} />
                    <Column field='name' header='Nombre' />
                    <Column field='chord' header='Nota' />
                </DataTable>
            </div>
        </div>
    )
}
