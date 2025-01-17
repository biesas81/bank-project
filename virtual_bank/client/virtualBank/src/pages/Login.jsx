

const Login = () => {



    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: '90vh' }}>
            <div className="card" style={{ width: '30rem' }}>
                <div className="card-body">
                    <h5 className="card-title text-center mb-4">Prisijungti</h5>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">El. paštas</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Įveskite savo el. paštą"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Slaptažodis</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Įveskite savo slaptažodį"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Prisijungti</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login;