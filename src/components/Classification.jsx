import React from 'react'
import LogoApmf from '../assets/apmf.png'
import { Link } from 'react-router-dom'
import { useState, useEffect, useReducer } from 'react'
import {toast} from 'react-toastify'
import axios from 'axios'

function Classification() {

    const [allData, setAllData] = useState([]);
    const [numero, setNumero] = useState('');
    const [nomClass, setNomClass] = useState('');
    const [isNew, setIsNew] = useState(true);
    const [selectData, setSelectData] = useState(0)
    // const [notifErr, setNotifErr] = useState(false)
    const notifyErr = (message) => toast.error(`Le ${message} ne doit pas être vide`, {theme: "colored", })

    const newData = async () => {
        console.log('numero', numero);
        console.log('nom_class', nomClass);

        if(numero == ''){
            notifyErr('numéro')
        }
        else if(nomClass == '') {
            notifyErr('nom')
        }else{
            const response = await axios.post('https://backapi.apmf.com/new', {'numero': numero, 'nom_class': nomClass})
                .then((resp) => console.log(resp))
                .catch((err) => console.log(err))

            console.log(response);
        }
    } 

    const deleteClass = (e) => {
        let confirm_delete = confirm('Voulez-vous vraiment le supprimer ?')
        if(confirm_delete){
            console.log(e.target.getAttribute('id_data'));
            const select_data = e.target.getAttribute('id_data');
            axios.delete(`https://backapi.apmf.com/delete/${select_data}`)
                    .then((resp) => {
                        console.log(resp);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
        } else {
            console.log("annuler");
        }
    }

    const updateClass = (e) => {
        console.log(e.target.getAttribute('id_data'));
        setIsNew(false)
        axios.get(`https://backapi.apmf.com/one/${e.target.getAttribute('id_data')}`)
                .then(resp => {
                    console.log(resp);
                    setNomClass(resp.data.nom_class)
                    setNumero(resp.data.numero)
                    setSelectData(e.target.getAttribute('id_data'))
                })
                .catch(err => {
                    console.log(err);
                })
    }

    const updateData = () => {
        axios.put(`https://backapi.apmf.com/update/${selectData}`, {'nom_class': nomClass, 'numero': numero})
            .then(resp => {
                console.log(resp);
            })
            .catch(err => {
                console.log(err);
            })
        
        setIsNew(true)
    }

    useEffect(() => {
        axios.get('https://backapi.apmf.com/all')
                .then((resp) => {
                    setAllData(resp.data)
                })
                .catch(err => {
                    console.log(err);
                })
    }, [])

    return (
        <div>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">New message</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="numero" className="col-form-label">Numero de la salle:</label>
                                <input type="text" className="form-control" id="numero" value={numero} onChange={(e) => setNumero(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="class" className="col-form-label">Nom classification:</label>
                                <input type="text" className="form-control" id="class" value={nomClass} onChange={(e) => setNomClass(e.target.value)} />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                        {
                            isNew ? <button type="button" className="btn btn-primary" onClick={newData}>Enregistrer</button> : <button type="button" className="btn btn-primary" onClick={updateData}>Modifier</button>
                        }
                        
                    </div>
                    </div>
                </div>
            </div>

            <div>
                <nav className="navbar navbar-light bg-primary">
                    <div className="container">
                        <Link className="navbar-brand" to="/">
                            <img src={LogoApmf} />
                        </Link>
                    </div>
                </nav>
            </div>

            <div className="container mt-4">
                <Link className="btn btn-primary" type="submit" to={'/'}>Retour</Link>
                <button className="btn btn-primary" style={{marginLeft: '10px'}} type="button"  data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">Ajouter</button>
                <a className="btn btn-primary" href='' style={{marginLeft: '10px'}}>Actualiser</a>
            </div>

            <div className="container mt-4">
                <div className="row">
                    <div className="col-8 offset-2">
                        <table className="table table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Numero</th>
                                    <th>Nom classification</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    allData.map((data, key) => (
                                        <tr key={key}>
                                            <td>{data.id}</td>
                                            <td>{data.numero}</td>
                                            <td>{data.nom_class}</td>
                                            <td>
                                                <button className='btn btn-danger btn-sm' onClick={deleteClass} id_data={data.id}>supprimer</button>
                                                <button className='btn btn-warning btn-sm' style={{marginLeft: '10px'}} id_data={data.id} data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap" onClick={updateClass}> modifier</button>
                                            </td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Classification
