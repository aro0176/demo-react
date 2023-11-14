import React from 'react'
import LogoApmf from '../assets/apmf.png'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <div className='home'>
            <h1 className="visually-hidden">Heroes examples</h1>

            <div className="px-4 py-5 my-5 text-center">
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <img src={LogoApmf} alt="" />
                    </div>
                    <div className="col-6">
                        <img src={LogoApmf} alt="" />
                    </div>
                </div>
            </div>
            <h1 className="display-5 fw-bold">My APP</h1>
            <div className="col-lg-6 mx-auto">
                <p className="lead mb-4">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem, cumque laborum. Eaque vero saepe reiciendis provident. Animi ut aliquam consequuntur.
                </p>
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                <Link to={'/class'}>
                    <button type="button" className="btn btn-primary btn-lg px-4 gap-3">Classification</button>
                </Link>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Home